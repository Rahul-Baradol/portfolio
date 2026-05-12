import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, GitPullRequest } from "lucide-react";
import { Link } from "react-router-dom";
import { FALLBACK_MERGED_PRS, GITHUB_USERNAME } from "@/constants";
import { fetchHomePRs, RateLimitedError } from "@/lib/github";
import type { PR } from "@/types/types";

export function PRSkeleton() {
    return (
        <div className="flex flex-row justify-between items-start p-4 rounded-xl border border-border bg-black/5 dark:bg-black/10 animate-pulse w-full">
            <div className="flex flex-col gap-2 w-[85%]">
                <div className="h-4 w-3/4 rounded bg-foreground/10" />
                <div className="h-3 w-1/4 rounded bg-muted-foreground/10" />
                <div className="h-2 w-1/6 rounded bg-muted-foreground/10" />
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="h-4 w-4 rounded bg-foreground/10" />
                <div className="h-5 w-12 rounded-md bg-foreground/10" />
            </div>
        </div>
    );
}

export function PRCard({ pr, animationDelay }: { pr: PR; animationDelay?: string }) {
    const isMerged = pr.state === "closed";

    const date = new Date(pr.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    return (
        <a
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            style={animationDelay ? { animationDelay } : undefined}
            className="animate-fade-up z-10 flex flex-row justify-between items-start p-4 rounded-xl border border-border bg-black/3 dark:bg-black/10 hover:bg-foreground/5 dark:hover:bg-cyan-600/5 hover:border-foreground/20 dark:hover:border-cyan-400/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer group"
        >
            <div className="flex flex-col gap-1.5 w-[85%]">
                <div className="text-sm italic text-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {pr.title}
                </div>
                <div className="text-xs text-muted-foreground">{pr.repo}</div>
                <div className="text-[10px] text-muted-foreground/70 italic">Created {date}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className={`text-[10px] px-2 py-0.5 rounded-md border ${isMerged
                    ? "border-green-600/20 bg-green-600/10 text-green-600 dark:text-green-300"
                    : "border-yellow-600/20 bg-yellow-600/10 text-yellow-600 dark:text-yellow-300"
                    }`}>
                    {isMerged ? "merged" : "open"}
                </span>
            </div>
        </a>
    );
}

export function OpenPRsContainer() {
    const [openPRs, setOpenPRs] = useState<PR[]>([]);
    const [mergedPRs, setMergedPRs] = useState<PR[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorKind, setErrorKind] = useState<"rate-limited" | "unavailable" | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const result = await fetchHomePRs();
                if (!cancelled) {
                    setOpenPRs(result.openPRs);
                    setMergedPRs(result.mergedPRs);
                }
            } catch (error) {
                if (!cancelled) {
                    setErrorKind(error instanceof RateLimitedError ? "rate-limited" : "unavailable");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    if (!loading && errorKind === null && openPRs.length === 0 && mergedPRs.length === 0) {
        return null;
    }

    const errorMessage = errorKind === "rate-limited"
        ? "lot of people visiting - github rate limited us. Showing some older contributions so you don't leave empty-handed:"
        : "unable to reach github - showing some older contributions in the meantime:";

    return (
        <div className="animate-fade-up z-10 p-0 text-muted-foreground w-[90vw] lg:w-[50vw] flex flex-col gap-5 bg-transparent">
            <div className="flex flex-row items-center gap-2 italic">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                Open Source & Contributions
            </div>

            <div className="flex flex-col gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => <PRSkeleton key={i} />)
                ) : errorKind !== null ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs text-muted-foreground italic">{errorMessage}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider">Merged PRs</h4>
                            {FALLBACK_MERGED_PRS.map((pr, i) => <PRCard key={pr.id} pr={pr} animationDelay={`${i * 0.05}s`} />)}
                        </div>
                        <div className="flex flex-row gap-3 justify-end">
                            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</span>
                            <a
                                href={`https://github.com/search?q=is:pr+author:${GITHUB_USERNAME}+is:open&type=pullrequests`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                            >
                                <span>open PRs</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a
                                href={`https://github.com/search?q=is:pr+author:${GITHUB_USERNAME}+is:merged&type=pullrequests`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                            >
                                <span>merged PRs</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <>
                        {openPRs.length > 0 && (
                            <div className="z-10 flex flex-col gap-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider">Open PRs</h4>
                                {openPRs.map((pr, i) => <PRCard key={pr.id} pr={pr} animationDelay={`${i * 0.05}s`} />)}
                                <Link
                                    to="/prs?tab=open"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors self-end"
                                >
                                    View all →
                                </Link>
                            </div>
                        )}
                        {mergedPRs.length > 0 && (
                            <div className="z-10 flex flex-col gap-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider">Merged PRs</h4>
                                {mergedPRs.map((pr, i) => <PRCard key={pr.id} pr={pr} animationDelay={`${i * 0.05}s`} />)}
                                <Link
                                    to="/prs?tab=merged"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors self-end"
                                >
                                    View all →
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
