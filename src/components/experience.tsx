import { ArrowDown, Github, Globe, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { TechBadge } from "./tech-badges";

interface ExperienceCardProps {
    companyName: string;
    companyLogo: string;
    websiteUrl: string;
    githubUrl?: string;
    linkedinUrl?: string;
    role: string;
    techBadges: {
        redirect_url: string;
        image_url: string;
        tech: string;
        size?: number;
    }[];
    bulletPoints?: string[];
    timeline: string;
    active?: boolean;
    expanded?: boolean;
}

export default function ExperienceCard({ companyName, companyLogo, websiteUrl, githubUrl, role, linkedinUrl, timeline, active, techBadges, bulletPoints, expanded }: ExperienceCardProps) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            type="single"
            collapsible
            defaultValue={(expanded === true) ? "item-1" : undefined}
        >
            <AccordionPrimitive.Item data-slot="accordion-item" value="item-1" className="flex flex-col gap-2">
                <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                        data-slot="accordion-trigger"
                        className="flex flex-row items-center gap-3 focus-visible:border-ring focus-visible:ring-ring/50 p-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 group w-full cursor-pointer border border-white/10 rounded-xl bg-black hover:bg-cyan-600/10 hover:border-cyan-500/5"
                    >
                        <div className="flex flex-col items-center w-full">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-row justify-between items-center overflow-hidden w-full"
                            >
                                <div className="w-full sm:w-fit flex flex-row items-center gap-3">
                                    <img
                                        src={companyLogo}
                                        width={45}
                                    />

                                    <div className="flex flex-col gap-1.5 sm:gap-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                            <div className="text-sm italic">
                                                {companyName}
                                            </div>

                                            <div className="flex flex-row gap-2 items-center">
                                                <Tooltip>
                                                    <TooltipTrigger asChild className="bg-black">
                                                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                                            <Globe className="h-3 w-3 text-gray-400" />
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
                                                                    <Github className="h-3 w-3 text-gray-400" />
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
                                                                    <Linkedin className="h-3 w-3 text-gray-400" />
                                                                </a>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-black text-gray-400">
                                                                Go to LinkedIn
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ) : <></>
                                                }

                                                {
                                                    (active === true) ? <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="w-2 h-2 bg-green-600/80 rounded-xl"></span>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-black text-gray-400 border-t border-l border-green-600/80">
                                                            Working
                                                        </TooltipContent>
                                                    </Tooltip> : <></>
                                                }
                                            </div>
                                        </div>

                                        <div className="text-xs italic">
                                            {role}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs italic text-gray-400 flex flex-row items-center gap-1 sm:gap-2">
                                    <div>{timeline}</div>
                                </div>
                            </motion.div>
                        </div>
                        <ArrowDown className="w-4 sm:w-3  transition-transform " />
                    </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content
                    data-slot="accordion-content"
                    className={`data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm `}
                >
                    <div className="p-4 border border-white/10 bg-black/5 rounded-xl flex flex-row items-center gap-1 flex-wrap">
                        {
                            techBadges.map((badge, index) => (
                                <TechBadge
                                    key={index}
                                    redirect_url={badge.redirect_url}
                                    image_url={badge.image_url}
                                    tech={badge.tech}
                                    size={badge.size}
                                />
                            ))
                        }

                        {
                            bulletPoints && bulletPoints.length > 0 ? (
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                                    {bulletPoints.map((point, index) => (
                                        <li className="text-sm" key={index}>{point}</li>
                                    ))}
                                </ul>
                            ) : null
                        }
                    </div>
                </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
    );
}

interface ExperienceContainerProps {
    snaps: ExperienceCardProps[];
}

export function ExperienceContainer({ snaps }: ExperienceContainerProps) {
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
            className="p-0 text-gray-400 w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent"
        >
            <div className="flex flex-row items-center italic">
                Experience
            </div>

            {
                snaps.map((snap: ExperienceCardProps, index: number) => (
                    <ExperienceCard
                        key={index}
                        companyName={snap.companyName}
                        companyLogo={snap.companyLogo}
                        websiteUrl={snap.websiteUrl}
                        githubUrl={snap.githubUrl}
                        linkedinUrl={snap.linkedinUrl}
                        techBadges={snap.techBadges}
                        bulletPoints={snap.bulletPoints}
                        role={snap.role}
                        timeline={snap.timeline}
                        active={snap.active}
                        expanded={snap.expanded}
                    />
                ))
            }
        </motion.div>
    );
}