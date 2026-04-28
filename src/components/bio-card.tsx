import { motion } from "motion/react";
import { Info } from "lucide-react";

export function BioCard() {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            initial="hidden"
            animate="show"
            className="z-10 p-4 flex flex-col gap-3 items-start text-muted-foreground w-[90vw] lg:w-[50vw] h-fit border border-border rounded-xl relative bg-[#1E3A8A]/10 dark:bg-cyan-500/5"
        >
            <div className="text-sm flex flex-row items-center gap-2">
                <Info className="w-4 h-4" />
                About me
            </div>
            <p className="text-sm leading-relaxed">
                I like owning things end-to-end — from data pipelines to high-traffic UIs — especially where latency and throughput actually matter. Most comfortable in fast-moving product teams where the scope isn&apos;t fully defined yet.
            </p>
        </motion.div>
    );
}
