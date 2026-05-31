import { Code2 } from "lucide-react";
import { skills } from "@/constants";
import { TechBadge } from "./tech-badges";

export function SkillsContainer() {
    return (
        <div className="animate-fade-up p-0 text-muted-foreground w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent">
            <div className="flex flex-row gap-2 items-center italic">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                Skills
            </div>

            <div className="p-4 border border-border bg-background rounded-xl grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 justify-items-stretch">
                {skills.map((badge) => (
                    <TechBadge
                        key={badge.tech}
                        redirect_url={badge.redirect_url}
                        image_url={badge.image_url}
                        tech={badge.tech}
                        size={badge.size}
                    />
                ))}
            </div>
        </div>
    );
}
