import { GraduationCap } from "lucide-react";

interface EducationContainerProps {
    institution: string;
    degree: string;
    timeline: string;
}

export function EducationContainer({ institution, degree, timeline }: EducationContainerProps) {
    return (
        <div className="animate-fade-up p-0 text-muted-foreground w-[90vw] lg:w-[50vw] h-full rounded-xl relative flex flex-col gap-5 bg-transparent">
            <div className="flex flex-row gap-2 items-center italic">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Education
            </div>

            <div className="border border-border rounded-xl p-4 bg-background flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <div className="text-sm text-foreground">{institution}</div>
                    <div className="text-xs italic">{degree}</div>
                </div>
                <div className="text-xs italic text-muted-foreground">{timeline}</div>
            </div>
        </div>
    );
}
