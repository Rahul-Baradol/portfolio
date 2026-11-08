import { Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

export function BioCard() {
    const [expanded, setExpanded] = useState(false);

    // On wide screens the card fills the rest of the sidebar, so it is always
    // open and only its text scrolls.
    const isWide = useMediaQuery("(min-width: 1280px)");
    const open = expanded || isWide;

    return (
        <div className="z-10 p-4 xl:px-6 xl:py-5 xl:-ml-6 flex flex-col gap-3 items-start text-muted-foreground w-full xl:w-[calc(100%+1.5rem)] h-fit xl:flex-1 xl:min-h-0 border border-border rounded-xl relative bg-[#1E3A8A]/10 dark:bg-cyan-500/5">
            <div className="text-sm flex flex-row items-center gap-2 shrink-0">
                <Info className="w-4 h-4" />
                About me
            </div>

            <div
                data-lenis-prevent={isWide ? "" : undefined}
                className="flex flex-col gap-3 w-full xl:min-h-0 xl:overflow-y-auto"
            >
                <p className="text-sm leading-relaxed">
                    I'm a software engineer passionate about building polished, high-performance products, with a good design in mind.
                </p>

                <p className={`text-sm leading-relaxed ${open ? "" : "line-clamp-2"}`}>
                    Currently leading cross-border supply chain tech at Alaiy!
                </p>

                <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                    <div className="overflow-hidden flex flex-col gap-3">
                        <p className={`text-sm leading-relaxed ${open ? "" : "line-clamp-2"}`}>
                            At 13, came across Java and started coding, figuring out how software is written, and building toy projects myself for fun.
                        </p>

                        <p className="text-sm leading-relaxed">
                            At 20, worked on building chat platform for a client, where I took care of the frontend and backend, and worked with some of the best people of my college who took care of design, and ML stuff! 
                        </p>

                        <p className="text-sm leading-relaxed">
                            Around the same time joined a high-scaled startup as an intern, and learned a lot about building scalable systems and working in a team.
                        </p>

                        <p className="text-sm leading-relaxed">
                            At 21, joined an early-stage startup, working on platforms and automations that help in moving products from one place to another.
                        </p>
                        
                        <p className="text-sm leading-relaxed">
                            I also love fingerstyle guitar on the side :)
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="xl:hidden self-end text-sm flex flex-row items-center gap-1 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
                {expanded ? "Show less" : "Learn more"}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}
