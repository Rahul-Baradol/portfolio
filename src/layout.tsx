import { Outlet, useLocation } from "react-router-dom";
import RippleCanvas from "./components/rippling";
import { ThemeToggle } from "./components/setting-toggle";
import Footer from "./components/footer";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Toaster } from "./components/ui/sonner";
import ScrollProgress from "./components/scroll-progress";
import { LenisContext } from "./lib/lenis";
import { takeScrollPosition } from "./lib/scroll-memory";

export function Layout() {
    const location = useLocation();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.1 });
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // New pages start at the top; a page the user left through a TransitionLink
    // comes back where they left it.
    useEffect(() => {
        const lenis = lenisRef.current;
        const saved = takeScrollPosition(location.pathname);
        // Cancel any smooth-scroll glide still running from the previous page;
        // otherwise it carries on into the new page once its content loads.
        lenis?.stop();
        lenis?.start();
        lenis?.resize();
        lenis?.scrollTo(saved ?? 0, {
            immediate: true,
            force: true,
        });
    }, [location.pathname, lenisRef])

    return (
        <div className="pb-5 relative w-screen min-h-screen flex flex-col gap-10 items-center text-foreground">
            <RippleCanvas />
            <Toaster />
            <ThemeToggle />
            <LenisContext.Provider value={lenisRef}>
                <ScrollProgress />
                <Outlet />
            </LenisContext.Provider>
            <Footer />
        </div>
    )
}
