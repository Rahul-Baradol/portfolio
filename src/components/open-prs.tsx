import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, GitPullRequest } from "lucide-react";
import { useTheme } from "@/lib/theme";

interface PR {
    id: number;
    branch: string;
    repo: string;
    url: string;
    openedAt: string;
}

function PRCard({ pr }: { pr: PR }) {
    const { theme } = useTheme();

    const repoName = pr.repo.split("/")[1];
    const date = new Date(pr.openedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const humanTitle = pr.branch
        .replace(/^(feat|fix|chore|refactor|docs|test|ci)\//i, "")
        .replace(/-/g, " ");

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
                <div className="text-sm italic text-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-colors line-clamp-2 capitalize">
                    {humanTitle}
                </div>
                <div className="text-xs text-muted-foreground">{repoName}</div>
                <div className="text-[10px] text-muted-foreground/70 italic">{date}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="text-[10px] px-2 py-0.5 rounded-md border border-foreground/15 dark:border-green-600/20 dark:bg-green-600/10 text-foreground/60 dark:text-green-300">
                    open
                </span>
            </div>
        </motion.a>
    );
}

export function OpenPRsContainer() {
    const [prs, setPRs] = useState<PR[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.github.com/users/Rahul-Baradol/events/public")
            .then((res) => res.json())
            .then((events: any[]) => {
                const seen = new Set<number>();
                const extracted: PR[] = [];

                for (const event of events) {
                    if (event.type !== "PullRequestEvent") continue;
                    if (event.payload.action !== "opened") continue;

                    const prId: number = event.payload.pull_request?.id;
                    if (!prId || seen.has(prId)) continue;
                    seen.add(prId);

                    extracted.push({
                        id: prId,
                        branch: event.payload.pull_request.head.ref,
                        repo: event.repo.name,
                        url: `https://github.com/${event.repo.name}/pull/${event.payload.number}`,
                        openedAt: event.created_at,
                    });
                }

                setPRs(extracted);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading || prs.length === 0) return null;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, staggerChildren: 0.15 },
                },
            }}
            initial="hidden"
            animate="show"
            className="p-0 text-muted-foreground w-[90vw] lg:w-[50vw] flex flex-col gap-5 bg-transparent"
        >
            <div className="flex flex-row items-center gap-2 italic">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                Open Source & Contributions
            </div>

            <div className="flex flex-col gap-2">
                {prs.map((pr) => (
                    <PRCard key={pr.id} pr={pr} />
                ))}
            </div>
        </motion.div>
    );
}
