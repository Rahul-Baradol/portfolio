import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitPullRequest, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { PRCard, PRSkeleton } from "@/components/open-prs";
import { GITHUB_USERNAME } from "@/constants";
import { fetchPagedPRs, GITHUB_PR_PER_PAGE, RateLimitedError } from "@/lib/github";
import type { PR } from "@/types/types";

export function PRsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = (searchParams.get("tab") as "open" | "merged") || "open";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const [prs, setPRs] = useState<PR[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorKind, setErrorKind] = useState<"rate-limited" | "unavailable" | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page, tab]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setPRs([]);
        setErrorKind(null);

        const load = async () => {
            try {
                const result = await fetchPagedPRs(tab, page);
                if (!cancelled) {
                    setPRs(result.prs);
                    setTotalCount(result.totalCount);
                }
            } catch (error) {
                if (!cancelled) setErrorKind(error instanceof RateLimitedError ? "rate-limited" : "unavailable");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [tab, page]);

    const totalPages = Math.ceil(totalCount / GITHUB_PR_PER_PAGE);

    const setTab = (newTab: "open" | "merged") => {
        setSearchParams({ tab: newTab, page: "1" });
    };

    const setPage = (newPage: number) => {
        setSearchParams({ tab, page: String(newPage) });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-[90vw] lg:w-[50vw] flex flex-col gap-6"
        >
            <Link
                to="/"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
                <ArrowLeft className="h-3 w-3" />
                Back
            </Link>

            <div className="flex flex-row items-center gap-2 text-muted-foreground italic">
                <GitPullRequest className="h-4 w-4" />
                Open Source & Contributions
            </div>

            <div className="flex flex-row gap-1 border border-border rounded-lg p-1 self-start">
                <button
                    onClick={() => setTab("open")}
                    className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                        tab === "open"
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Open PRs
                </button>
                <button
                    onClick={() => setTab("merged")}
                    className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                        tab === "merged"
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Merged PRs
                </button>
            </div>

            {errorKind !== null ? (
                <div className="flex flex-col gap-3 py-8 text-sm text-muted-foreground italic">
                    <span>{errorKind === "rate-limited" ? "lot of people visiting — github rate limited us." : "couldn't reach github right now."}</span>
                    <span>However you can view all PRs directly on github</span>
                    <div className="flex flex-row gap-4">
                        <a
                            href={`https://github.com/search?q=is:pr+author:${GITHUB_USERNAME}+is:open&type=pullrequests`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs hover:text-foreground transition-colors underline underline-offset-2"
                        >
                            open PRs →
                        </a>
                        <a
                            href={`https://github.com/search?q=is:pr+author:${GITHUB_USERNAME}+is:merged&type=pullrequests`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs hover:text-foreground transition-colors underline underline-offset-2"
                        >
                            merged PRs →
                        </a>
                    </div>
                </div>
            ) : (
                <>
                    <motion.div
                        key={`${tab}-${page}`}
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
                        }}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-3"
                    >
                        {loading
                            ? [...Array(5)].map((_, i) => <PRSkeleton key={i} />)
                            : prs.length > 0
                            ? prs.map((pr) => <PRCard key={pr.id} pr={pr} />)
                            : (
                                <div className="text-sm text-muted-foreground italic text-center py-12">
                                    No {tab} PRs found.
                                </div>
                            )
                        }
                    </motion.div>

                    {!loading && totalPages > 1 && (
                        <div className="flex flex-row items-center justify-between pt-2">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" />
                                Previous
                            </button>
                            <span className="text-xs text-muted-foreground">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page >= totalPages}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </motion.div>
    );
}
