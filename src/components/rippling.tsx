import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

export default function RippleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<any[]>([]);
    const sizeRef = useRef({ width: 0, height: 0 });
    const { theme } = useTheme();
    const themeRef = useRef(theme);

    const isVisibleRef = useRef(true);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animationFrameId: number;
        let spawnInterval: ReturnType<typeof setInterval>;

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

        function addRipple(x: number, y: number, withPluck = false) {
            ripples.push({
                x, y, radius: 0, alpha: 1,
                pluckAge: withPluck ? 2 : undefined,
                pluckLen: withPluck ? 50 + Math.random() * 20 : undefined,
            });
        }

        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;
            
            if (document.hidden) {
                clearInterval(spawnInterval);
            } else {
                startSpawnInterval();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        function startSpawnInterval() {
            spawnInterval = setInterval(() => {
                if (!isVisibleRef.current) return;
                addRipple(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() < 0.4
                );
            }, 750);
        }

        startSpawnInterval();

        let rippleId = 0;
        function handleMouse(e: MouseEvent) {
            rippleId = (rippleId + 1) % 100;
            if (rippleId % 20 === 0) {
                addRipple(e.clientX, e.clientY);
            }
        }

        window.addEventListener("mousemove", handleMouse);

        function animate() {
            if (!isVisibleRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

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

                r.radius += 1.6;
                r.alpha -= 0.009;

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
            clearInterval(spawnInterval);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed w-screen h-screen top-0 left-0 -z-10 pointer-events-none" />;
}
