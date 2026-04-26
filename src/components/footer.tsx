import { Dot } from "lucide-react";
import { useState, useEffect } from "react";

const TAGLINES = [
    "built to the sound of fingerpicking",
    "code by day, chords by night",
    "powered by minor chords",
    "shipped at 2am, debugged at 3am",
    "handcrafted, pixel by pixel",
];

export default function Footer() {
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIdx(i => (i + 1) % TAGLINES.length);
                setVisible(true);
            }, 350);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className="mt-auto z-10 flex flex-col items-center gap-3 py-4 select-none">
            <span
                className="text-[11px] text-center px-4 text-muted-foreground/75 italic transition-opacity duration-300"
                style={{ opacity: visible ? 1 : 0 }}
            >
                {TAGLINES[idx]}
            </span>

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