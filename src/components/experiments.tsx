import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { experiments } from "@/constants";

interface ExperimentCardProps {
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    date: string;
    className?: string;
    animationDelay?: string;
}

export function ExperimentCard({ title, description, slug, tags, date, className, animationDelay }: ExperimentCardProps) {
    return (
        <Link
            to={`/experiments/${slug}`}
            style={animationDelay ? { animationDelay } : undefined}
            className={`animate-fade-up flex flex-col gap-3 p-4 rounded-xl border border-border bg-black/3 dark:bg-black/10 hover:bg-foreground/5 dark:hover:bg-cyan-600/5 hover:border-foreground/20 dark:hover:border-cyan-400/30 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 cursor-pointer group ${className}`}
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
                        View experiment
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
        </Link>
    );
}

export function ExperimentsContainer() {
    return (
        <div className="animate-fade-up p-0 text-muted-foreground w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent">
            <div className="flex flex-row gap-2 items-center italic">
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                Experiments
            </div>

            <div className="flex flex-col gap-2">
                {experiments.map((experiment, idx) => (
                    <ExperimentCard
                        key={experiment.slug}
                        title={experiment.title}
                        description={experiment.description}
                        slug={experiment.slug}
                        tags={experiment.tags}
                        date={experiment.date}
                        animationDelay={`${idx * 0.1}s`}
                        className="w-full"
                    />
                ))}
            </div>
        </div>
    );
}
