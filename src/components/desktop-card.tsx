import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function DesktopCard({
    title,
    description,
    videoSrc,
    posterSrc,
    redirectUrl,
    motionProps,
}: {
    title: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
    redirectUrl: string;
    motionProps: any;
}) {
    return (
        <a href={redirectUrl} target="_blank">
            <motion.div
                {...motionProps}
                className="
            relative w-[44vw] h-[75vh]
            rounded-3xl overflow-hidden cursor-pointer
            bg-white/6 border border-white/10
            shadow-2xl p-10
            group
          "
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-br from-black-500/12 to-indigo-500/6" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold text-white/95 mb-4">{title}</h2>
                        <p className="text-sm text-white/80 max-w-xl">
                            {description}
                        </p>
                    </div>

                    <div className="h-[60%] w-full overflow-hidden rounded-xl">
                        <video
                            src={videoSrc}
                            poster={posterSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain rounded-xl"
                            style={{ objectPosition: "center" }}
                        />
                    </div>

                    <div className="w-full flex justify-center group-hover:translate-x-4 transition-transform duration-500">
                        <ArrowRight />
                    </div>
                </div>
            </motion.div>
        </a>
    );
}