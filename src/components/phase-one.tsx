import "../App.css"
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PhaseOne({ scrollNext }: { scrollNext: () => void }) {
  return (
    <>
      <div className="z-5 flex flex-col items-center justify-center h-full text-center 
    relative before:absolute before:inset-0 before:rounded-2xl 
    before:bg-white/8 before:blur-3xl before:content-[''] ">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold"
        >
          Rahul Baradol
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-xl md:text-2xl text-muted-foreground mt-4"
        >
          Software Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground mt-2"
        >
          I go deep into frontend systems — scaling, performance, and DX.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={scrollNext}
          className="z-5 hover:cursor-pointer flex items-center gap-2 mt-10 px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow hover:shadow-lg transition-all"
        >
          <span className="text-md transition-transform duration-500">Impact</span>
          <ArrowRight size={18} className="transition-transform duration-500 animate-left-right" />
        </motion.button>
      </div>
    </>
  );
}
