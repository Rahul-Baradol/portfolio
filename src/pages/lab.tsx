import { UiLabComponentCard } from "@/components/lab-component-card";
import { motion } from "framer-motion";
import { House } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Lab() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const experiments = [
        {
            title: "\"Smart\" Breadcrumb Navigator",
            description: "A breadcrumb that tracks navigation order, query params, and auto-resets downstream paths.",
            thumbnail: "/labs/fractal.jpg",
            link: "/lab/breadcrumb-navigator",
            tags: ["Motion", "Generative"],
        },
    ];

    return (
        <div className="w-[90vw] lg:w-[50vw] h-[90vh] bg-black flex flex-col gap-10 items-center text-white">
            <div className="flex flex-col items-center gap-4 w-full">
                <div className="w-full border-none z-10">
                    <Link to={"/"} className="w-fit flex flex-row gap-1 items-center z-10 group border border-white/30 py-2 px-3 rounded-lg hover:border-cyan-400/40 transition-all duration-300">
                        <House className="h-4 w-4 cursor-pointer" />
                        <div className="text-xs cursor-pointer">Home</div>
                    </Link>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-semibold"
                >
                    Components
                </motion.h1>
            </div>

            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
                className="flex flex-col w-[90vw] lg:w-[50vw]"
            >
                {experiments.map((exp, i) => (
                    <UiLabComponentCard
                        key={i}
                        title={exp.title}
                        description={exp.description}
                        href={exp.link}
                    />
                ))}
            </motion.div>
        </div>
    );
}
