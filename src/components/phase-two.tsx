import { motion } from "framer-motion";
import "../App.css"
import { MoveRight } from "lucide-react";
import { sections } from "../constants";

export default function PhaseTwo() {

    const wrapText = (str: string, limit = 60) => {
        let out = [];
        let words = str.split(" ");
        let curLine = "";

        for (let word of words) {
            if ((curLine + word).length > limit) {
                out.push(curLine.trim());
                curLine = word + " ";
            } else {
                curLine += word + " ";
            }
        }

        if (curLine.trim()) {
            out.push(curLine.trim());
        }
        return out.join("<br/>");
    }


    return (
        <div className="z-5 flex flex-col items-center">
            <div className=" flex flex-col items-center justify-center px-4 select-none relative">
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
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                {sec.company}
                            </h3>
                            <p className="text-sm sm:text-base italic mb-4 text-muted-foreground">
                                {sec.timeline}
                            </p>

                            <ul className="text-sm sm:text-base text-muted-foreground space-y-2">
                                {sec.points.map((p, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.25 }}
                                    >• {
                                        wrapText(p)
                                            .split("<br/>")
                                            .map((line, idx) => (
                                                <span key={idx}>
                                                    {line}
                                                    {idx < wrapText(p).split("<br/>").length - 1 ? <br /> : <></>}
                                                </span>
                                            ))
                                    }</motion.li>
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
