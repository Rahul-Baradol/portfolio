import { motion } from "framer-motion";
import "../App.css"
import { MoveRight } from "lucide-react";

export default function PhaseTwo() {
    const sections = [
        {
            company: "Alaiy",
            points: [
                "Built wallet & credit system ensuring 99.9% transaction reliability",
                "Handled 65k submissions with 8.3k peak users/min",
                "Saved 95% bandwidth with caching",
                "Delivered Kantara campaign frontend in 20 hours",
                "Reduced page latency from 8-10s to <1s",
            ],
        },
        {
            company: "CRED",
            points: [
                "Reduced write IOPS by 87%",
                "Cut CPU usage from 70% → 20%",
                "Restored ingestion pipeline to 99.9% user coverage",
                "Fixed extraction funnel affecting 300k workflows",
            ],
        },
        {
            company: "Cognitive Lab",
            points: [
                "Owned full medical-query chat platform",
                "Next.js + Tailwind + ShadCN frontend",
                "FastAPI backend with real-time structured responses",
            ],
        },
    ];

    return (
        <div className="bottom-left-corner-border flex flex-col items-center">
            <div className="top-right-corner-border flex flex-col items-center justify-center px-4 select-none relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold mb-8 text-center"
                >
                    Impact I've Created
                </motion.h2>

                <div
                    className="
          w-[90vw] flex overflow-x-auto overflow-y-visible snap-x snap-mandatory
          scrollbar-hide space-x-5 pb-3
        "
                >
                    {sections.map((sec) => (
                        <motion.div
                            key={sec.company}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="
              shrink-0 
              min-w-60 sm:min-w-[300px] md:min-w-[380px] 
              snap-center
              p-6 rounded-2xl bg-card 
              shadow-sm hover:shadow-xl hover:scale-[1.03]
              transition-all duration-300
            "
                        >
                            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                                {sec.company}
                            </h3>

                            <ul className="text-sm sm:text-base text-muted-foreground space-y-2">
                                {sec.points.map((p, i) => (
                                    <li key={i}>• {p}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div 
                className="flex gap-4"
                initial={{ opacity: 1 }}
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <MoveRight />
            </motion.div>
        </div>
    );
}
