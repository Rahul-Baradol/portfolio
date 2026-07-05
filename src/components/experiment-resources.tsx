import { useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, ExternalLink, X } from "lucide-react";
import type { ResourceLink } from "@/types/types";

interface ExperimentResourcesProps {
    resources: ResourceLink[];
}

export function ExperimentResources({ resources }: ExperimentResourcesProps) {
    const [open, setOpen] = useState(false);

    if (resources.length === 0) {
        return null;
    }

    const items = (
        <ul className="flex flex-col gap-0.5">
            {resources.map((resource, idx) => (
                <li key={`${resource.href}-${idx}`} className="">
                    <a
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="group flex items-start gap-1.5 text-left text-xs leading-relaxed transition-colors border-l-2 pl-3 py-1 border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    >
                        <span>{resource.label}</span>
                        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
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
                          <nav className="fixed bottom-24 left-5 z-50 w-64 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-background/95 backdrop-blur p-3 shadow-xl">
                              <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-2">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  Resources
                              </p>
                              {items}
                          </nav>
                      )}

                      <button
                          type="button"
                          onClick={() => setOpen((v) => !v)}
                          aria-label={open ? "Close resources" : "Open resources"}
                          aria-expanded={open}
                          className="fixed bottom-6 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-transform active:scale-95"
                      >
                          {open ? <X className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                      </button>
                  </div>,
                  document.body
              )
            : null;

    return (
        <>
            {floating}

            {/* Sticky sidebar in the left gutter — shown on wide screens. */}
            <aside className="hidden xl:block absolute right-full inset-y-0 mr-10">
                <nav className="sticky top-28 w-56">
                    <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-3">
                        <BookOpen className="h-3.5 w-3.5" />
                        Resources
                    </p>
                    {items}
                </nav>
            </aside>
        </>
    );
}
