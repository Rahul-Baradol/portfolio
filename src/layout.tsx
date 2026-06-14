import { Outlet, useLocation } from "react-router-dom";
import RippleCanvas from "./components/rippling";
import { ThemeToggle } from "./components/setting-toggle";
import Footer from "./components/footer";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Toaster } from "./components/ui/sonner";

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

    useEffect(() => {
        lenisRef.current?.scrollTo(0, {
            immediate: true
        });
    }, [location.pathname, lenisRef])

    return (
        <div className="p-10 relative w-screen min-h-screen flex flex-col gap-10 items-center text-foreground">
            <RippleCanvas />
            <Toaster />
            <ThemeToggle />
            <Outlet />
            <Footer />
        </div>
    )
}
