import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, GitPullRequest } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { FALLBACK_MERGED_PRS, GITHUB_USERNAME } from "@/constants";
import type { PR } from "@/types/types";

function PRSkeleton() {
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

function PRCard({ pr }: { pr: PR }) {
    const { theme } = useTheme();
    const isMerged = pr.state === "closed";

    const date = new Date(pr.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    return (
        <motion.a
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            whileHover={{
                scale: 1.01,
                borderColor: theme === "dark" ? "rgba(34,211,238,0.3)" : "rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="z-10 flex flex-row justify-between items-start p-4 rounded-xl border border-border bg-black/3 dark:bg-black/10 hover:bg-foreground/5 dark:hover:bg-cyan-600/5 cursor-pointer group"
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
                <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                    isMerged 
                        ? "border-green-600/20 bg-green-600/10 text-green-600 dark:text-green-300" 
                        : "border-yellow-600/20 bg-yellow-600/10 text-yellow-600 dark:text-yellow-300"
                }`}>
                    {isMerged ? "merged" : "open"}
                </span>
            </div>
        </motion.a>
    );
}

export function OpenPRsContainer() {
    const [openPRs, setOpenPRs] = useState<PR[]>([]);
    const [mergedPRs, setMergedPRs] = useState<PR[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchPRs = async () => {
            try {
                const baseUrl = "https://api.github.com/search/issues";
                
                const [openRes, mergedRes] = await Promise.all([
                    fetch(`${baseUrl}?q=is:pr+author:${GITHUB_USERNAME}+is:open&per_page=2&sort=updated&order=desc`),
                    fetch(`${baseUrl}?q=is:pr+author:${GITHUB_USERNAME}+is:merged&per_page=3&sort=updated&order=desc`)
                ]);

                if (!openRes.ok || !mergedRes.ok) {
                    throw new Error("Failed to get PRs");
                }

                const openData = await openRes.json();
                const mergedData = await mergedRes.json();

                const formatPR = (pr: any): PR => ({
                    id: pr.id,
                    title: pr.title,
                    repo: pr.repository_url.replace("https://api.github.com/repos/", ""),
                    url: pr.html_url,
                    createdAt: pr.created_at,
                    state: pr.state as "open" | "closed",
                });

                if (!cancelled) {
                    setOpenPRs(openData.items?.map(formatPR) || []);
                    setMergedPRs(mergedData.items?.map(formatPR) || []);
                }
            } catch (error) {
                if (!cancelled) {
                    setMergedPRs(FALLBACK_MERGED_PRS);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPRs();

        return () => {
            cancelled = true;
        }
    }, []);

    if (!loading && openPRs.length === 0 && mergedPRs.length === 0) {
        return null;
    }

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="show"
            className="p-0 text-muted-foreground w-[90vw] lg:w-[50vw] flex flex-col gap-5 bg-transparent"
        >
            <div className="flex flex-row items-center gap-2 italic">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                Open Source & Contributions
            </div>

            <div className="flex flex-col gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => <PRSkeleton key={i} />)
                ) : (
                    <>
                        {openPRs.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider ">Open PRs</h4>
                                {openPRs.map((pr) => <PRCard key={pr.id} pr={pr} />)}
                            </div>
                        )}
                        {mergedPRs.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider ">Merged PRs</h4>
                                {mergedPRs.map((pr) => <PRCard key={pr.id} pr={pr} />)}
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}