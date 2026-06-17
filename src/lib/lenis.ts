import { createContext, useContext, type RefObject } from "react";
import type Lenis from "lenis";

// The Lenis instance is created in the Layout and shared through this context so
// that descendants (e.g. the experiment table of contents) can drive smooth
// scrolling through Lenis instead of fighting it with native scrollIntoView.
export const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenis() {
    return useContext(LenisContext);
}
