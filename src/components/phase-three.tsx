import { motion } from "framer-motion";
import DesktopCard from "./desktop-card";
import MobileCard from "./mobile-card";
import { FlowPuzzleCardDetails, SignatureCardDetails } from "../constants";

export default function PhaseThree() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-start overflow-hidden px-4 py-20">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 z-20"
      >
        Projects I'm proud of
      </motion.h1>

      {/* DESKTOP */}
      <div className="hidden md:flex relative w-full items-center justify-center gap-14 mt-4">
        <DesktopCard
          title={SignatureCardDetails.title}
          description={SignatureCardDetails.description}
          videoSrc={SignatureCardDetails.videoSrc}
          posterSrc={SignatureCardDetails.posterSrc}
          redirectUrl={SignatureCardDetails.redirectUrl}
          motionProps={{
            initial: { opacity: 0, rotate: -10, y: 80 },
            animate: { opacity: 1, rotate: -6, y: 0 },
            whileHover: { rotate: -2, scale: 1.02 },
            transition: { type: "spring", stiffness: 110 },
          }}
        />

        <DesktopCard
          title={FlowPuzzleCardDetails.title}
          description={FlowPuzzleCardDetails.description}
          videoSrc={FlowPuzzleCardDetails.videoSrc}
          posterSrc={FlowPuzzleCardDetails.posterSrc}
          redirectUrl={FlowPuzzleCardDetails.redirectUrl}
          motionProps={{
            initial: { opacity: 0, rotate: 10, y: 80 },
            animate: { opacity: 1, rotate: 6, y: 0 },
            whileHover: { rotate: 2, scale: 1.02 },
            transition: { type: "spring", stiffness: 110, delay: 0.1 },
          }}
        />
      </div>

      {/* MOBILE / TABLET */}
      <div
        className="md:hidden w-full flex flex-col items-center gap-8 mt-6 overflow-visible"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <MobileCard
          title={SignatureCardDetails.title}
          description={SignatureCardDetails.description}
          videoSrc={SignatureCardDetails.videoSrc}
          posterSrc={SignatureCardDetails.posterSrc}
          redirectUrl={SignatureCardDetails.redirectUrl}
          motionProps={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          }}
        />

        <MobileCard
          title={FlowPuzzleCardDetails.title}
          description={FlowPuzzleCardDetails.description}
          videoSrc={FlowPuzzleCardDetails.videoSrc}
          posterSrc={FlowPuzzleCardDetails.posterSrc}
          redirectUrl={FlowPuzzleCardDetails.redirectUrl}
          motionProps={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.08 },
          }}
        />
      </div>
    </div>
  );
}
