import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/lib/lenis";

const SCROLL_OFFSET = 48;

export interface SectionNavEntry {
    id: string;
    label: string;
}

interface SectionNavProps {
    sections: SectionNavEntry[];
}

// Dot rail pinned to the right edge on wide screens: one dot per section, with
// the current one stretched into a pill. Hovering expands it into a labelled
// index; it collapses back on leave. Jumps go through Lenis so the smooth
// scroll isn't interrupted.
export function SectionNav({ sections }: SectionNavProps) {
    const lenisRef = useLenis();
    const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

    useEffect(() => {
        const updateActive = () => {
            const doc = document.documentElement;
            const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
            const present = sections.filter((s) => document.getElementById(s.id));

            if (atBottom && present.length > 0) {
                setActiveId(present[present.length - 1].id);
                return;
            }

            let current = present[0]?.id ?? null;
            for (const entry of present) {
                const el = document.getElementById(entry.id)!;
                if (el.getBoundingClientRect().top <= window.innerHeight * 0.33) {
                    current = entry.id;
                }
            }
            setActiveId(current);
        };

        updateActive();
        window.addEventListener("scroll", updateActive, { passive: true });
        window.addEventListener("resize", updateActive);
        return () => {
            window.removeEventListener("scroll", updateActive);
            window.removeEventListener("resize", updateActive);
        };
    }, [sections]);

    const handleClick = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        const el = document.getElementById(id);
        if (!el) {
            return;
        }

        const lenis = lenisRef?.current;
        if (lenis) {
            lenis.scrollTo(el, { offset: -SCROLL_OFFSET });
        } else {
            el.scrollIntoView({ behavior: "smooth" });
        }
        setActiveId(id);
    };

    const activeIdx = sections.findIndex((s) => s.id === activeId);

    // Portaled to <body> so no transformed ancestor can trap `position: fixed`.
    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <nav
            aria-label="Sections"
            className="group/rail hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-40"
        >
            <ul className="flex flex-col items-end rounded-2xl border border-transparent px-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/rail:border-border group-hover/rail:bg-background/85 group-hover/rail:backdrop-blur-md group-hover/rail:shadow-lg group-hover/rail:px-3 group-focus-within/rail:border-border group-focus-within/rail:bg-background/85 group-focus-within/rail:backdrop-blur-md group-focus-within/rail:px-3">
                {sections.map((section, idx) => {
                    const active = idx === activeIdx;
                    const passed = idx < activeIdx;
                    return (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                onClick={(e) => handleClick(e, section.id)}
                                aria-label={section.label}
                                aria-current={active ? "true" : undefined}
                                className="group/item flex flex-row items-center justify-end py-1.5"
                            >
                                <span
                                    style={{ transitionDelay: `${idx * 25}ms` }}
                                    className="grid grid-cols-[0fr] opacity-0 -translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/rail:grid-cols-[1fr] group-hover/rail:opacity-100 group-hover/rail:translate-x-0 group-focus-within/rail:grid-cols-[1fr] group-focus-within/rail:opacity-100 group-focus-within/rail:translate-x-0"
                                >
                                    <span className={`overflow-hidden whitespace-nowrap pr-3 text-xs italic transition-colors ${active ? "text-foreground dark:text-cyan-300" : "text-muted-foreground group-hover/item:text-foreground"}`}>
                                        {section.label}
                                    </span>
                                </span>
                                <span className="flex w-3 justify-center">
                                    <span
                                        className={`w-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active
                                            ? "h-5 bg-foreground dark:bg-cyan-400"
                                            : passed
                                                ? "h-1.5 bg-foreground/45 dark:bg-cyan-400/45 group-hover/item:bg-foreground"
                                                : "h-1.5 bg-muted-foreground/30 group-hover/item:bg-foreground/70"
                                            }`}
                                    />
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>,
        document.body
    );
}
