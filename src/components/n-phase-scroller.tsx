import { useEffect, useRef, useState } from "react";

interface PhaseProps {
  index: number;
  scrollNext: () => void;
}

interface Phase {
  id: string;
  content: (props: PhaseProps) => React.ReactNode;
}

interface NPhaseScrollerProps {
  phases: Phase[];
}

export const NPhaseScroller = ({ phases }: NPhaseScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
        const handleScroll = () => {
          const y = container.scrollTop;
          const vh = window.innerHeight;
          const idx = Math.round(y / vh);
    
          if (idx !== currentIndex) setCurrentIndex(idx);
        };
    
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex]);

  const scrollTo = (i: number) => {
    const container = containerRef.current;
    if (container) {
        container.scrollTo({
          top: i * window.innerHeight,
          behavior: "smooth",
        });
    }
  };

  const scrollNext = () => {
    if (currentIndex < phases.length - 1) {
        scrollTo(currentIndex + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {phases.map((phase, i) => (
        <section
          key={phase.id}
          className="snap-start min-h-screen flex items-center justify-center"
        >
          {phase.content({ index: i, scrollNext })}
        </section>
      ))}
    </div>
  );
};
