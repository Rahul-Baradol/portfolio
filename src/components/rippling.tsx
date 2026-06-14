import { useCallback, useEffect, useRef } from "react";
import { useSettings } from "@/lib/theme";

function isLowEndDevice() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;

    // Respect users who ask for reduced motion.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;

    // Coarse pointer + narrow viewport is a decent proxy for low-end phones.
    const smallScreen = window.innerWidth < 640;

    // Few logical cores → likely a weak CPU.
    const lowCores =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

    // Low RAM (Chromium-only API; undefined elsewhere).
    const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
    const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;

    return lowMemory || (lowCores && smallScreen);
}

export default function RippleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<any[]>([]);
    const sizeRef = useRef({ width: 0, height: 0 });
    const { theme, areRipplesEnabled } = useSettings();
    const themeRef = useRef(theme);
    const disabledRef = useRef(isLowEndDevice());
    const rippleId = useRef<number>(0);
    const spawnInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    const isVisibleRef = useRef(true);
    const lastFrameTime = useRef<number | null>(null);

    const FRAME_DURATION = 1000 / 60;

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    const addRipple = (x: number, y: number, withPluck = false) => {
        ripplesRef.current.push({
            x, y, radius: 0, alpha: 1,
            pluckAge: withPluck ? 2 : undefined,
            pluckLen: withPluck ? 50 + Math.random() * 20 : undefined,
        });
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!areRipplesEnabled) {
            return;
        }

        rippleId.current = (rippleId.current + 1) % 100;
        if (rippleId.current % 20 === 0) {
            addRipple(e.clientX, e.clientY);
        }
    }, [areRipplesEnabled]);

    const startSpawnInterval = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas || !areRipplesEnabled) {
            return;
        }

        spawnInterval.current = setInterval(() => {
            if (!isVisibleRef.current) {
                return;
            }

            addRipple(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() < 0.4
            );
        }, 750);
    }, [areRipplesEnabled, canvasRef.current]);

    useEffect(() => {
        if (!areRipplesEnabled) {
            return;
        }

        startSpawnInterval();
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (spawnInterval.current) {
                clearInterval(spawnInterval.current);
            }
        };
    }, [areRipplesEnabled, canvasRef.current]);

    useEffect(() => {
        if (disabledRef.current) {
            return;
        }

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animationFrameId: number;

        function resize() {
            sizeRef.current = { width: window.innerWidth, height: window.innerHeight };
            canvas.width = sizeRef.current.width;
            canvas.height = sizeRef.current.height;
        }

        resize();
        window.addEventListener("resize", resize);

        const ripples = ripplesRef.current;
        const notes: { x: number; y: number; vy: number; alpha: number; char: string; size: number }[] = [];
        const NOTE_CHARS = ["♪", "♫", "♩"];

        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;

            if (document.hidden) {
                if (spawnInterval.current) {
                    clearInterval(spawnInterval.current);
                }
            } else {
                startSpawnInterval();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        function animate() {
            if (!isVisibleRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const now = performance.now();
            let frameFactor = (lastFrameTime.current ? (now - lastFrameTime.current) / FRAME_DURATION : 1);
            frameFactor = Math.min(frameFactor, 2);
            lastFrameTime.current = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = themeRef.current === "dark";

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];

                if (r.pluckAge !== undefined) {
                    // vibrating string phase: damped sine wave, then releases into a ripple
                    const PLUCK_FRAMES = 30;
                    const t = r.pluckAge / PLUCK_FRAMES;
                    const amp = 7 * (1 - t);
                    const len = r.pluckLen!;

                    ctx.beginPath();
                    ctx.moveTo(r.x - len / 2, r.y);
                    for (let px = -len / 2; px <= len / 2; px += 2) {
                        const wave = Math.sin((px / len) * Math.PI * 4 + r.pluckAge * 0.85) * amp;
                        ctx.lineTo(r.x + px, r.y + wave);
                    }
                    ctx.strokeStyle = isDark
                        ? `rgba(0, 200, 255, 0.55)`
                        : `rgba(0, 0, 0, 0.22)`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    r.pluckAge++;
                    if (r.pluckAge >= PLUCK_FRAMES) {
                        r.pluckAge = undefined;
                        notes.push({
                            x: r.x + (Math.random() - 0.5) * 10,
                            y: r.y,
                            vy: -0.6 - Math.random() * 0.4,
                            alpha: 0.65,
                            char: NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
                            size: 24 + Math.floor(Math.random() * 4),
                        });
                    }
                    continue;
                }

                r.radius += 1.6 * frameFactor;
                r.alpha -= 0.009 * frameFactor;

                if (r.alpha <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = isDark
                    ? `rgba(0, 200, 255, ${r.alpha})`
                    : `rgba(0, 0, 0, ${r.alpha * 0.55})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            for (let i = notes.length - 1; i >= 0; i--) {
                const n = notes[i];
                n.y += n.vy;
                n.alpha -= 0.005;
                if (n.alpha <= 0) {
                    notes.splice(i, 1);
                    continue;
                }

                ctx.font = `${n.size}px serif`;
                ctx.fillStyle = isDark
                    ? `rgba(0, 200, 255, ${n.alpha})`
                    : `rgba(0, 0, 0, ${n.alpha * 0.6})`;

                ctx.fillText(n.char, n.x, n.y);
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (disabledRef.current) {
        return null;
    }

    return <canvas ref={canvasRef} className="fixed w-screen h-screen top-0 left-0 -z-10 pointer-events-none" />;
}
