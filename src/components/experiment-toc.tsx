import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { List, X } from "lucide-react";
import type { TocEntry } from "@/types/types";
import { useLenis } from "@/lib/lenis";

const SCROLL_OFFSET = 50;

interface ExperimentTocProps {
    toc: TocEntry[];
}

export function ExperimentToc({ toc }: ExperimentTocProps) {
    const lenisRef = useLenis();
    const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
    const [open, setOpen] = useState(false);

    // Scroll-spy: highlight whichever section heading was most recently scrolled
    // past. Lenis drives the native scroll position, so a plain scroll listener
    // (with getBoundingClientRect) stays in sync without any Lenis coupling.
    useEffect(() => {
        const updateActive = () => {
            let current = toc[0]?.id ?? null;
            for (const entry of toc) {
                const el = document.getElementById(entry.id);
                if (!el) continue;
                if (el.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
                    current = entry.id;
                } else {
                    break;
                }
            }
            setActiveId(current);
        };

        updateActive();
        window.addEventListener("scroll", updateActive, { passive: true });
        return () => window.removeEventListener("scroll", updateActive);
    }, [toc]);

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
        setOpen(false);
        if (history.replaceState) {
            history.replaceState(null, "", `#${id}`);
        }
    };

    if (toc.length === 0) {
        return null;
    }

    const linkClass = (id: string) =>
        `block text-left text-xs leading-relaxed transition-colors border-l-2 pl-3 py-1 ${
            activeId === id
                ? "border-foreground/60 text-foreground dark:border-cyan-400 dark:text-cyan-300"
                : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30"
        }`;

    const items = (
        <ul className="flex flex-col gap-0.5">
            {toc.map((entry) => (
                <li key={entry.id}>
                    <a
                        href={`#${entry.id}`}
                        onClick={(e) => handleClick(e, entry.id)}
                        className={linkClass(entry.id)}
                    >
                        {entry.label}
                    </a>
                </li>
            ))}
        </ul>
    );

    // Floating button + popover, shown on screens too narrow for the sidebar.
    // Portaled to <body> so it escapes the article column's `animate-fade-up`
    // transform — a transformed ancestor would otherwise contain `position:
    // fixed` and the button would never reach the viewport corner.
    const floating =
        typeof document !== "undefined"
            ? createPortal(
                  <div className="xl:hidden">
                      {open && (
                          <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpen(false)}
                              aria-hidden
                          />
                      )}

                      {open && (
                          <nav className="fixed bottom-24 right-5 z-50 w-64 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-background/95 backdrop-blur p-3 shadow-xl">
                              <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-2">
                                  <List className="h-3.5 w-3.5" />
                                  Contents
                              </p>
                              {items}
                          </nav>
                      )}

                      <button
                          type="button"
                          onClick={() => setOpen((v) => !v)}
                          aria-label={open ? "Close contents" : "Open contents"}
                          aria-expanded={open}
                          className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-transform active:scale-95"
                      >
                          {open ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
                      </button>
                  </div>,
                  document.body
              )
            : null;

    return (
        <>
            {floating}

            {/* Sticky sidebar in the right gutter — shown on wide screens. */}
            <aside className="hidden xl:block absolute left-full inset-y-0 ml-10">
                <nav className="sticky top-28 w-56">
                    <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-3">
                        <List className="h-3.5 w-3.5" />
                        Contents
                    </p>
                    {items}
                </nav>
            </aside>
        </>
    );
}
