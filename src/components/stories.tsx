import { motion } from "motion/react";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useTheme } from "@/lib/theme";

interface BlogCardProps {
    title: string;
    description: string;
    mediumUrl: string;
    tags?: string[];
    date: string;
    className?: string;
}


export function BlogCard({ title, description, mediumUrl, tags, date, className }: BlogCardProps) {
    const { theme } = useTheme();

    return (
        <motion.a
            href={mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)",
            }}
            whileHover={{
                scale: 1.02,
                borderColor: theme === "dark" ? "rgba(34,211,238,0.3)" : "rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className={`flex flex-col gap-3 p-4 rounded-xl border border-border bg-black/3 dark:bg-black/10 hover:bg-foreground/5 dark:hover:bg-cyan-600/5 cursor-pointer group ${className}`}
        >
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-2 w-[90%]">
                    <div className="text-sm italic text-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-colors">
                        {title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-4">
                        {description}
                    </div>
                </div>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground dark:group-hover:text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-background text-muted-foreground border-border">
                        Read on Medium
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex flex-row items-center gap-2 text-[10px] text-muted-foreground italic">
                <span>{date}</span>
                <span>•</span>
                <div className="flex flex-row gap-1 flex-wrap">
                    {tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md border border-foreground/15 dark:border-cyan-600/20 dark:bg-cyan-600/10 text-foreground/60 dark:text-cyan-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.a>
    );
}

export function StoriesContainer({ title, description, mediumUrl, tags, date }: BlogCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, staggerChildren: 0.3 } },
            }}
            initial="hidden"
            animate="show"
            className="p-0 text-muted-foreground w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent"
        >
            <div className="flex flex-row gap-2 items-center italic">
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                Stories
            </div>

            <div className="flex flex-col gap-2">
                <BlogCard
                    title={title}
                    description={description}
                    mediumUrl={mediumUrl}
                    tags={tags}
                    date={date}
                    className="w-full"
                />
            </div>


        </motion.div>
    );
}
