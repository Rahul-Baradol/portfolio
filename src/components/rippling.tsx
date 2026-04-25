import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

export default function RippleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<any[]>([]);
    const sizeRef = useRef({ width: window.innerWidth, height: window.innerHeight });
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

        function addRipple(x: number, y: number) {
            ripples.push({ x, y, radius: 0, alpha: 1 });
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
                if (!isVisibleRef.current) {
                    return;
                }
                addRipple(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                );
            }, 750);
        }

        startSpawnInterval();

        let rippleId = 0;
        function handleMouse(e: MouseEvent) {
            rippleId = (rippleId + 1) % 100;
            if (rippleId % 20 === 0) {
                const rect = canvas.getBoundingClientRect();
                addRipple(e.clientX - rect.left, e.clientY - rect.top);
            }
        }

        canvas.addEventListener("mousemove", handleMouse);

        function animate() {
            if (!isVisibleRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = themeRef.current === "dark";

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
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

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(spawnInterval);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            canvas.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed w-screen h-screen top-0 left-0" />;
}
