import { Outlet } from "react-router-dom";
import RippleCanvas from "./components/rippling";
import { ThemeToggle } from "./components/theme-toggle";
import Footer from "./components/footer";

export function Layout() {
    return (
        <div className="p-10 relative w-screen min-h-screen flex flex-col gap-10 items-center text-foreground">
            <RippleCanvas />
            <ThemeToggle />
            <Outlet />
            <Footer />
        </div>
    )
}
