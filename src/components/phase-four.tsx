import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { links } from "../constants";

export default function PhaseFour() {
  return (
    <div className="z-5 w-full h-full flex flex-col items-center justify-center px-6 select-none">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold mb-10 text-center"
      >
        Connect With Me
      </motion.h2>

      {/* Links */}
      <div className="flex flex-col space-y-6 w-full max-w-md">
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="
              group flex items-center justify-between 
              px-6 py-4 rounded-xl 
              bg-card border border-border
              shadow-sm hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            <span className="text-lg font-medium">{link.label}</span>
            <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition" />
          </motion.a>
        ))}
      </div>

      {/* Footer Text */}
      {/* <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 text-muted-foreground text-sm text-center max-w-sm"
      >
        Bounce!
      </motion.p> */}
    </div>
  );
}
