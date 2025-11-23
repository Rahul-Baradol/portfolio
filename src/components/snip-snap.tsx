import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface SnipSnapCardProps {
    title: string;
    description: string;
    href: string;
}

export default function SnipSnapCard({ title, description, href }: SnipSnapCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="group overflow-hidden cursor-pointer p-3 border border-white/10 rounded-xl bg-black hover:bg-cyan-600/10 hover:border-cyan-500/5"
        >
            <Link to={href} className="relative">
                <div className="text-sm italic absolute group-hover:-translate-y-[150px] transition-all duration-500">
                    {title.length > 50 ? `${title.slice(0, 50)}...` : title}
                </div>

                <div className="text-sm relative translate-y-[150px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {description.length > 125 ? `${description.slice(0, 125)}...` : description}
                </div>
            </Link>
        </motion.div>
    );
}

interface SnipSnapContainerProps {
    snaps: SnipSnapCardProps[];
}

export function SnipSnapContainer({ snaps }: SnipSnapContainerProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.7,
                        staggerChildren: 0.5,
                    },
                },
            }}
            initial="hidden"
            animate="show"
            className="pt-1 pl-1 pr-0 pb-0 text-gray-400 w-[90vw] lg:w-[50vw] h-fit border border-white/10 rounded-xl relative bg-cyan-500/10"
        >
            <div className="pt-3 pl-3 pr-4 pb-4 relative z-10 bg-black rounded-xl h-full flex flex-col gap-5">
                <div className="flex flex-row items-center italic">
                    <div>
                        Snip Snaps
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild className="bg-black">
                            <Button className="hover:bg-black bg-black">
                                <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-gray-400">
                            Stories i share with code :)
                        </TooltipContent>
                    </Tooltip>
                </div>

                {
                    snaps.map((snap: SnipSnapCardProps, index: number) => (
                        <SnipSnapCard
                            key={index}
                            title={snap.title}
                            description={snap.description}
                            href={snap.href}
                        />
                    ))
                }
            </div>
        </motion.div>
    );
}