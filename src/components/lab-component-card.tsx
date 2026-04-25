import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface UiLabComponentCardProps {
    key: number;
    title: string;
    description: string;
    href: string;
    DELAY_PER_ITEM: number;
}

export function UiLabComponentCard({ key, title, description, href, DELAY_PER_ITEM }: UiLabComponentCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover="hover"
            transition={{
                duration: 0.5,
                delay: DELAY_PER_ITEM * (key + 1)
            }}
            onClick={() => navigate(href)}
            className="group w-full bg-foreground/5 flex flex-row justify-between cursor-pointer relative overflow-hidden
                 hover:bg-foreground/5 dark:hover:bg-cyan-600/10 transition-all duration-500"
        >
            <div className="h-full w-px bg-cyan-400 transition-all duration-500 group-hover:h-0"></div>
            <div className="flex flex-col w-full overflow-hidden">
                <div className="h-px w-full bg-cyan-400 group-hover:w-0 transition-all duration-500"></div>
                <div className="flex flex-col gap-2 p-6 w-full">
                    <motion.div
                        variants={{
                            hover: { x: 4}
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-lg font-semibold flex items-center gap-2"
                    >
                        {title}
                        <motion.span
                            variants={{
                                initial: { opacity: 0, x: -10 },
                                hover: { opacity: 1, x: 0 }
                            }}
                            className="text-cyan-400 text-sm"
                        >
                            →
                        </motion.span>
                    </motion.div>

                    <motion.div
                        variants={{
                            hover: { x: 8 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                        className="text-sm text-muted-foreground max-w-[90%]"
                    >
                        {description}
                    </motion.div>
                </div>
                <div className="h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="h-0 w-px bg-cyan-400 transition-all duration-500 group-hover:h-full"></div>
        </motion.div>
    );
}
