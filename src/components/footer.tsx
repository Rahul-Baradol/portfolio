import { Dot } from "lucide-react";
import { useState, useEffect } from "react";
import { FALLBACK_SONG } from "@/constants";

const TAGLINES = [
    "built to the sound of fingerpicking",
    "powered by minor chords",
    "shipped at 2am, debugged at 3am",
    "handcrafted, pixel by pixel",
];

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
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);
    const song = useRecentSong();

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

            {song ? (
                <a
                    href="https://resonating.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors px-6 text-center"
                >
                    <span className="opacity-60 italic">while listening to</span>
                    <span className="flex items-center gap-1.5">
                        <img src={song.imageUrl} className="w-4 h-4 rounded-sm object-cover shrink-0" />
                        <span>{song.songName}</span>
                        <span className="opacity-60">—</span>
                        <span className="opacity-60">{song.artists[0]}</span>
                        <img src="/spotify-no-bg.png" className="w-3 h-3 opacity-60 shrink-0" />
                    </span>
                </a>
            ) : (
                <div className="h-4 w-48 rounded bg-muted-foreground/10 animate-pulse" />
            )}

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