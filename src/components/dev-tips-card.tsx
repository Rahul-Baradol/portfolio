import { DEV_TIPS } from "@/constants";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Terminal, Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

function TipModal({ tip, explanation, codeSnippet, onClose }: { tip: string; explanation: string; codeSnippet: string; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background p-5 flex flex-col gap-3 shadow-xl"
            >
                <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-foreground font-medium leading-snug">{tip}</p>
                    <button
                        onClick={onClose}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
                <pre className="text-xs rounded-lg bg-black/5 dark:bg-white/5 border border-border p-3 overflow-x-auto font-mono leading-relaxed whitespace-pre">
                    {codeSnippet}
                </pre>
            </motion.div>
        </motion.div>,
        document.body
    );
}

export function DevTipsCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (modalOpen) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % DEV_TIPS.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [modalOpen]);

    const go = (dir: 1 | -1) => {
        setDirection(dir);
        setCurrentIndex((prev) => (prev + dir + DEV_TIPS.length) % DEV_TIPS.length);
    };

    const current = DEV_TIPS[currentIndex];

    return (
        <>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                initial="hidden"
                animate="show"
                className="z-10 p-4 flex flex-col gap-3 items-start text-muted-foreground w-[90vw] lg:w-[50vw] h-fit border border-border rounded-xl relative bg-[#1E3A8A]/10 dark:bg-cyan-500/5"
            >
                <div className="flex flex-row items-center w-full justify-between">
                    <div className="text-sm flex flex-row items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        dev tips
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Learn more about this tip"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-full min-h-12 flex items-start overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.p
                            key={currentIndex}
                            custom={direction}
                            variants={{
                                enter: (dir: number) => ({ opacity: 0, x: dir * 16 }),
                                center: { opacity: 1, x: 0 },
                                exit: (dir: number) => ({ opacity: 0, x: dir * -16 }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="text-sm"
                        >
                            {current.tip}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => go(-1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Previous tip"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs tabular-nums">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(DEV_TIPS.length).padStart(2, "0")}
                    </span>
                    <button
                        onClick={() => go(1)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Next tip"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {modalOpen && (
                    <TipModal
                        tip={current.tip}
                        explanation={current.explanation}
                        codeSnippet={current.codeSnippet}
                        onClose={() => setModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
