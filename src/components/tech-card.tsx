import { motion } from "motion/react";

export function TechCard() {
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
            className="p-4 flex flex-row gap-3 items-center text-gray-400 w-[90vw] lg:w-[50vw] h-fit border border-white/10 rounded-xl relative "
        >
            
        </motion.div>
    )   
}