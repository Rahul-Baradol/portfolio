import { useEffect, useRef } from "react";
import { useLenis } from "@/lib/lenis";

// A thin horizontal bar pinned to the top of the viewport that fills from left
// to right as the page is scrolled, giving a sense of how far down the page the
// reader is. It reads scroll progress straight from the Lenis instance on every
// frame so it stays perfectly in sync with the smooth scroll (and doesn't depend
// on native scroll events, which Lenis can swallow).
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement | null>(null);
    const lenisRef = useLenis();

    useEffect(() => {
        let raf = 0;

        function tick() {
            const bar = barRef.current;
            if (bar) {
                const lenis = lenisRef?.current;
                let progress: number;

                if (lenis && Number.isFinite(lenis.limit) && lenis.limit > 0) {
                    progress = lenis.scroll / lenis.limit;
                } else {
                    const doc = document.documentElement;
                    const scrollable = doc.scrollHeight - doc.clientHeight;
                    progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
                }

                bar.style.width = `${progress * 100}%`;
            }
            raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [lenisRef]);

    return (
        <div
            className="fixed inset-x-0 top-0 h-1 w-full pointer-events-none z-100"
            // Faint neutral track so the bar is discoverable even at the very top,
            // where the fill has zero width.
            style={{ backgroundColor: "rgba(125, 125, 125, 0.18)" }}
        >
            <div
                ref={barRef}
                className="h-full w-0 z-101 dark:bg-[linear-gradient(90deg,#06b6d4,#22d3ee)] bg-black/75 shadow-[0_0_8px_rgba(34,211,238,0.55)]"
            />
        </div>
    );
}
