import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-[90vh] bg-transparent text-foreground flex flex-col items-center justify-center overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[80px] md:text-[120px] font-bold tracking-tight"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-foreground/70 text-lg md:text-xl"
      >
        <blockquote className="italic text-sm">
            Not all those who wander are lost.
        </blockquote>
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 z-10"
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-xl border border-border bg-foreground/5 hover:bg-foreground/10 transition-all"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
