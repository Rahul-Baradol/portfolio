import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Github, Globe, Linkedin } from "lucide-react";

interface ProjectCardProps {
    title: string;
    videoDemoUrl: string;
    story: string;
    websiteUrl: string;
    githubUrl?: string;
    linkedinUrl?: string;
};

interface ProjectContainerProps {
    projects: ProjectCardProps[];
}

export default function ProjectCard({ title, videoDemoUrl, story, websiteUrl, githubUrl, linkedinUrl }: ProjectCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="pt-1 pl-1 pr-0 pb-0 group text-gray-400 w-[90vw] lg:w-[50vw] h-fit border-l-4 border-t-4 border-r-[1.5px] border-b-[1.5px] border-cyan-500/20 hover:border-cyan-600/10 rounded-xl relative bg-black-500/10 transition-all duration-500"
        >
            <div className="w-full pt-4 pl-4 pr-4 pb-4 relative z-10 bg-black/20 rounded-xl h-full flex flex-col gap-5">
                <div className="w-full flex flex-row items-center justify-between rounded-xl">
                    <span className="text-md">{title}</span>

                    <div className="flex flex-row items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild className="bg-black">
                                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4 text-gray-400" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-gray-400">
                                Go to website
                            </TooltipContent>
                        </Tooltip>

                        {
                            githubUrl ? (
                                <Tooltip>
                                    <TooltipTrigger asChild className="bg-black">
                                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4 text-gray-400" />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black text-gray-400">
                                        Go to GitHub
                                    </TooltipContent>
                                </Tooltip>
                            ) : <></>
                        }

                        {
                            linkedinUrl ? (
                                <Tooltip>
                                    <TooltipTrigger asChild className="bg-black">
                                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-4 w-4 text-gray-400" />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black text-gray-400">
                                        Go to LinkedIn
                                    </TooltipContent>
                                </Tooltip>
                            ) : <></>
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-5">
                    <div className="text-sm w-full">
                        {story}
                    </div>
                    <div className="relative w-full h-[300px] overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full z-10 bg-cyan-500/10 transition-all duration-500 group-hover:bg-cyan-500/20 backdrop-blur-sm group-hover:backdrop-blur-none"></div>
                        <video
                            className="absolute bottom-0 right-0 w-full h-full object-cover scale-[1.5] sm:scale-[1.1] -rotate-10 transition-transform duration-700 ease-in-out group-hover:scale-120 group-hover:rotate-0"
                            loop
                            autoPlay
                            muted
                        >
                            <source src={videoDemoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export function ProjectsContainer({ projects }: ProjectContainerProps) {
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
            className="p-0 text-gray-400 w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-black/30"
        >
            <div className="flex flex-row items-center italic">
                Built for fun
            </div>

            {
                projects.map((project: ProjectCardProps, index: number) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        websiteUrl={project.websiteUrl}
                        githubUrl={project.githubUrl}
                        linkedinUrl={project.linkedinUrl}
                        videoDemoUrl={project.videoDemoUrl}
                        story={project.story}
                    />
                ))
            }

        </motion.div>
    );
}