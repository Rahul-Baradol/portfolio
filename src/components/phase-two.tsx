import { motion } from "framer-motion";

export default function PhaseTwo({ scrollNext }: { scrollNext: () => void }) {
  const sections = [
    {
      company: "Alaiy",
      points: [
        "Built wallet & credit system ensuring 99.9% transaction reliability",
        "Saved 95% bandwidth with intelligent caching",
        "Delivered Kantara campaign frontend in 20 hours",
        "Handled 65k submissions with 8.3k peak users/min",
        "Reduced listing latency from 8-10s to <1s",
      ],
    },
    {
      company: "CRED",
      points: [
        "Reduced write IOPS by 87% (1600 → 200)",
        "Cut CPU usage from 70% → 20%",
        "Restored ingestion pipeline to 99.9% user coverage",
        "Fixed extraction funnel affecting 300k workflows",
      ],
    },
    {
      company: "Cognitive Lab",
      points: [
        "Owned full medical-query chat platform development",
        "Next.js + Tailwind + ShadCN frontend",
        "FastAPI backend with real-time structured responses",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 select-none relative">

      {/* Fade Edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-8 text-center"
      >
        Impact I’ve Created
      </motion.h2>

      {/* Horizontal Scroll */}
      <div
        className="
          w-full max-w-5xl flex overflow-x-auto snap-x snap-mandatory
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
              flex-shrink-0 
              min-w-[240px] sm:min-w-[300px] md:min-w-[380px] 
              snap-center
              p-6 rounded-2xl bg-card border border-border 
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

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onClick={scrollNext}
        className="
          mt-10 px-6 py-3 bg-primary text-primary-foreground rounded-xl 
          shadow hover:shadow-lg transition-all
        "
      >
        Continue →
      </motion.button>
    </div>
  );
}
