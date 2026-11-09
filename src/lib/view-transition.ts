import { flushSync } from "react-dom";

// Runs a DOM-changing update (usually a route change) inside a View Transition
// so the browser can animate between the old and new page. `afterUpdate` runs
// once the new page is in the DOM but before the browser snapshots it. Falls
// back to a plain update where the API is missing or the user prefers reduced
// motion.
export function withViewTransition(update: () => void, afterUpdate?: () => void) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
        update();
        return null;
    }

    // flushSync makes React commit the new route before the browser snapshots it.
    return document.startViewTransition(() => {
        flushSync(update);
        afterUpdate?.();
    });
}

// Shared-element name linking a card's title to the heading on its page, so
// the title morphs into place. view-transition-name must be a valid ident.
export function titleTransitionName(kind: "story" | "experiment", slug: string) {
    return `${kind}-${slug.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

// Morphing only reads well between two single-line titles; a one-line card
// title stretched into a wrapped heading (common on phones) smears sideways.
export function isSingleLine(el: HTMLElement) {
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    return Number.isNaN(lineHeight) || el.getBoundingClientRect().height < lineHeight * 1.5;
}
