import { Dot } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto z-10 flex flex-col items-center gap-3 py-4 select-none">
            <div className="text-[11px] text-foreground/75 hover:text-foreground transition-all duration-300">
                Also i love to play fingerstyle guitar :) 
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 px-4">
                <span className="font-medium text-foreground/70">Rahul Baradol</span>
                <Dot className="hidden sm:block" />
                <a
                    href="https://github.com/Rahul-Baradol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                >
                    GitHub
                </a>
                <Dot className="hidden sm:block" />
                <a
                    href="https://www.linkedin.com/in/rahul-baradol/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                >
                    LinkedIn
                </a>
                <Dot className="hidden sm:block" />
                <a
                    href="https://x.com/rahulbaradol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                >
                    Twitter
                </a>
            </div>

            <div className="flex flex-row items-center gap-1 text-xs text-muted-foreground/50">
                <span>Copyright &copy;</span>
                <span>{new Date().getFullYear()}</span>
            </div>
        </footer>
    );
}