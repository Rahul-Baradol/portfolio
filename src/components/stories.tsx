import { motion } from "motion/react";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface BlogCardProps {
    title: string;
    description: string;
    mediumUrl: string;
    tags?: string[];
    date: string;
    className?: string;
}


export function BlogCard({ title, description, mediumUrl, tags, date, className }: BlogCardProps) {
    return (
        <motion.a
            href={mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className={`flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-black/10 hover:bg-cyan-600/5 cursor-pointer group ${className}`}
        >
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-2 w-[90%]">
                    <div className="text-sm italic text-gray-200 group-hover:text-cyan-300 transition-colors">
                        {title}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-4">
                        {description}
                    </div>
                </div>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-gray-400">
                        Read on Medium
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex flex-row items-center gap-2 text-[10px] text-gray-500 italic">
                <span>{date}</span>
                <span>•</span>
                <div className="flex flex-row gap-1 flex-wrap">
                    {tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-cyan-600/10 text-cyan-300 border border-cyan-600/20"
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
            className="p-0 text-gray-400 w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent"
        >
            <div className="flex flex-row gap-2 items-center italic">
                <Lightbulb className="h-4 w-4 text-gray-500" />
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
