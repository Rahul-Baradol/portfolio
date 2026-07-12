import { Info, ChevronDown } from "lucide-react";
import { useState } from "react";

export function BioCard() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="z-10 p-4 flex flex-col gap-3 items-start text-muted-foreground w-[90vw] lg:w-[50vw] h-fit border border-border rounded-xl relative bg-[#1E3A8A]/10 dark:bg-cyan-500/5">
            <div className="text-sm flex flex-row items-center gap-2">
                <Info className="w-4 h-4" />
                About me
            </div>
            <p className="text-sm leading-relaxed">
                I'm a software engineer passionate about building polished, high-performance products, with a good design in mind.
            </p>

            <p className={`text-sm leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
                At 13, came across Java and started coding, figuring out how software is written, and building toy projects myself for fun.
            </p>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="overflow-hidden flex flex-col gap-3">
                    <p className="text-sm leading-relaxed">
                        At 20, worked on building chat platform for a client, where I took care of the frontend and backend, and worked with some of the best people of my college who took care of design, and ML stuff! 
                    </p>

                    <p className="text-sm leading-relaxed">
                        Around the same time joined a high-scaled startup as an intern, and learned a lot about building scalable systems and working in a team.
                    </p>

                    <p className="text-sm leading-relaxed">
                        At 21, joined an early-stage startup, working on building web apps, and platforms with a focus on user experience and performance. It's been a year, and am still here!
                    </p>
                </div>
            </div>

            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="self-end text-sm flex flex-row items-center gap-1 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            >
                {expanded ? "Show less" : "Learn more"}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}
