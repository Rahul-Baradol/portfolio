import { Link, useLocation, useNavigate, type LinkProps } from "react-router-dom";
import { isSingleLine, withViewTransition } from "@/lib/view-transition";
import { saveScrollPosition } from "@/lib/scroll-memory";

interface TransitionLinkProps extends LinkProps {
    // Remember this page's scroll position so returning to it lands at the same
    // spot. Off for Back links: the page being left isn't one to come back to.
    rememberScroll?: boolean;
}

// Drop-in replacement for <Link> that animates the route change with a View
// Transition. Modified clicks (new tab, etc.) keep the browser's default.
export function TransitionLink({ to, onClick, rememberScroll = true, ...props }: TransitionLinkProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
            props.target === "_blank"
        ) {
            return;
        }

        event.preventDefault();
        if (rememberScroll) {
            saveScrollPosition(location.pathname, window.scrollY);
        }

        // The title that morphs: the clicked card's title going forward, or the
        // page heading (the only titled element on a story/experiment page)
        // going back. Names are set only for the duration of the transition so
        // the other cards just fade with the page.
        const titled = document.querySelectorAll<HTMLElement>("[data-vt-title]");
        const source =
            event.currentTarget.querySelector<HTMLElement>("[data-vt-title]") ??
            (titled.length === 1 ? titled[0] : null);
        const name = source?.dataset.vtTitle;
        // Measured now: once the route changes the source leaves the DOM.
        const sourceSingleLine = source ? isSingleLine(source) : false;
        let target: HTMLElement | null = null;

        if (source && name) {
            source.style.viewTransitionName = name;
        }

        const transition = withViewTransition(
            () => navigate(to),
            () => {
                if (!source || !name) return;
                target = document.querySelector<HTMLElement>(`[data-vt-title="${name}"]`);
                if (target && sourceSingleLine && isSingleLine(target)) {
                    target.style.viewTransitionName = name;
                }
            },
        );

        transition?.finished.finally(() => {
            source?.style.removeProperty("view-transition-name");
            target?.style.removeProperty("view-transition-name");
        });
    };

    return <Link to={to} onClick={handleClick} {...props} />;
}
