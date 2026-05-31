import { aboutMe } from "@/constants";
import { Info } from "lucide-react";

export function BioCard() {
    return (
        <div className="z-10 p-4 flex flex-col gap-3 items-start text-muted-foreground w-[90vw] lg:w-[50vw] h-fit border border-border rounded-xl relative bg-[#1E3A8A]/10 dark:bg-cyan-500/5">
            <div className="text-sm flex flex-row items-center gap-2">
                <Info className="w-4 h-4" />
                About me
            </div>
            <p className="text-sm leading-relaxed">
                {aboutMe}
            </p>
        </div>
    );
}
