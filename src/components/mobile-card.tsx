import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function MobileCard({
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
                className="w-full flex flex-col justify-between gap-10 max-w-lg rounded-2xl overflow-hidden bg-white/5 border border-white/8 shadow-lg p-6"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-white/80 mb-3">
                        {description}
                    </p>
                </div>

                <div className="w-full h-[70%] rounded-lg overflow-hidden">
                    <video
                        src={videoSrc}
                        poster={posterSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full flex justify-center">
                    <ArrowRight />
                </div>
            </motion.div>
        </a>
    );
}