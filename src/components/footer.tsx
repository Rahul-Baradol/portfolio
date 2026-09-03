import { Dot } from "lucide-react";
import { useState, useEffect } from "react";
import { FALLBACK_SONG } from "@/constants";

function useRecentSong() {
    const [song, setSong] = useState<{ songName: string; artists: string[]; imageUrl: string } | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(`${import.meta.env.VITE_RESONANCE_API}/api/recent-song-played`, { signal: controller.signal })
            .then(r => { if (!r.ok) throw new Error(); return r.json(); })
            .then(setSong)
            .catch(() => setSong(FALLBACK_SONG));

        return () => controller.abort();
    }, []);

    return song;
}

export default function Footer() {
    const [visible, setVisible] = useState(true);
    const song = useRecentSong();

    useEffect(() => {
        const id = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setVisible(true);
            }, 350);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className="mt-auto z-10 flex flex-col items-center gap-3 py-4 select-none">
            <div className="text-[11px] text-foreground/75 hover:text-foreground transition-all duration-300">
                Also i love to fingerstyle guitar :) 
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