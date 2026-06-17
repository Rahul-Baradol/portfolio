import { useEffect, useRef, useState } from "react"
import { FRAME_DURATION, GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, INSTRUMENTED_FRAME_COUNT, SPAWN_THROTTLE_MS } from "./constants";
import { calculatePerFrameMetrics } from "./utils";
import { useInstrumentorContext } from "@/lib/use-instrumentor";
import { toast } from "sonner";

interface FallingImage {
    x: number,
    y: number,
    dx: number;
    dy: number;
    id: number,
    src: string,
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
}

export function CanvasMouseTrail() {
    const RECORD_KEY = "Canvas Refresh Rate Dependent";

    const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const images = useRef<FallingImage[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastSpawnTime = useRef<number>(0);

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const lastFrameTimeRef = useRef<number | null>(null);
    const frameTimesRef = useRef<number[]>([]);
    const startObserving = useRef<boolean>(false);

    const { recordFrameTime, hasRecord } = useInstrumentorContext();

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!containerRef.current || prefersReducedMotion) {
            return;
        }

        if (!hasRecord(RECORD_KEY)) {
            startObserving.current = true;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const curX = event.clientX - rect.left;
        const curY = event.clientY - rect.top;

        const now = performance.now();
        if (now - lastSpawnTime.current < SPAWN_THROTTLE_MS) {
            return;
        }

        lastSpawnTime.current = now;

        const randomImageIndex = Math.floor(Math.random() * imageLinks.length);

        const newImage: FallingImage = {
            x: curX - (IMAGE_SIZE_PIXELS / 2),
            y: curY - (IMAGE_SIZE_PIXELS / 2),
            id: imageLinks[randomImageIndex].id,
            src: imageLinks[randomImageIndex].src,
            dx: (Math.random() * HORIZONTAL_SPREAD * 2) - HORIZONTAL_SPREAD,
            dy: INITIAL_BOUNCE_UP_SPEED,
            stage: 'initial-bounce-up'
        };

        images.current.push(newImage);
    }

    const renderLoop = () => {
        console.log(RECORD_KEY)
        const now = performance.now();
        if (startObserving.current &&
            lastFrameTimeRef.current !== null &&
            frameTimesRef.current.length < INSTRUMENTED_FRAME_COUNT
        ) {
            frameTimesRef.current.push(now - lastFrameTimeRef.current);
        }
        lastFrameTimeRef.current = now;

        const floor = containerRef.current!.clientHeight;

        images.current.forEach(image => {
            if (image.stage === 'initial-bounce-up') {
                image.y -= image.dy;
                image.x += image.dx;

                image.dx *= HORIZONTAL_FRICTION;
                image.dy -= GRAVITY;

                if (image.dy <= 0) {
                    image.stage = 'free-fall';
                    image.dy = INITIAL_FALL_SPEED;
                }
            } else if (image.stage === 'free-fall') {
                image.y += image.dy;
                image.dy += GRAVITY;

                if (image.y >= (floor - 100)) {
                    image.stage = 'bounce-up';
                    image.dy = INITIAL_BOUNCE_UP_SPEED;
                }
            } else if (image.stage === 'bounce-up') {
                image.y -= image.dy;
                image.dy -= GRAVITY;

                if (image.dy <= 0) {
                    image.stage = 'bounce-down';
                    image.dy = INITIAL_FALL_SPEED;
                }
            } else if (image.stage === 'bounce-down') {
                image.y += image.dy;
                image.dy += GRAVITY;
            }

            return image;
        });

        images.current = images.current.filter(image => image.y < floor);

        const canvas = canvasRef.current;
        const ctx = canvasContextRef.current;
        if (!canvas || !ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.current.forEach(image => {
            const img = imageCache.current.get(image.src);
            if (img) {
                ctx.drawImage(img, image.x, image.y, IMAGE_SIZE_PIXELS, IMAGE_SIZE_PIXELS);
            }
        });

        animationFrameRef.current = requestAnimationFrame(renderLoop);

        if (frameTimesRef.current.length >= INSTRUMENTED_FRAME_COUNT) {
            const { averageFrameTime, jankedFrameCount, worstFrameTime } = calculatePerFrameMetrics(frameTimesRef.current, FRAME_DURATION);
            frameTimesRef.current = [];
            startObserving.current = false;
            recordFrameTime({
                key: RECORD_KEY, averageFrameTime, jankedFrameCount, worstFrameTime
            });

            toast.success(`Frame metrics recorded for the canvas approach, which is refresh-rate dependent`, {
                position: "top-center"
            });
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container) {
            return;
        }

        setIsTouch(window.matchMedia("(pointer: coarse)").matches);

        canvasContextRef.current = canvas.getContext("2d");

        imageLinks.forEach(link => {
            if (!imageCache.current.has(link.src)) {
                const img = new Image();
                img.src = link.src;
                imageCache.current.set(link.src, img);
            }
        });

        const handleWindowResize = () => {
            if (!canvas || !container) {
                return;
            }

            const dpr = window.devicePixelRatio || 1;

            const width = container.clientWidth;
            const height = container.clientHeight;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                console.error("Failed to get canvas context");
                return;
            }

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        handleWindowResize();

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setPrefersReducedMotion(prefersReduced);

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !animationFrameRef.current && !prefersReduced) {
                animationFrameRef.current = requestAnimationFrame(renderLoop);
            } else if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        });

        observer.observe(canvas);

        window.addEventListener("resize", handleWindowResize);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            imageCache.current.clear();
            window.removeEventListener("resize", handleWindowResize);
            observer.disconnect();
        }
    }, []);

    return (
        <div ref={containerRef} className="relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
            {
                !prefersReducedMotion ? <>
                    <canvas
                        ref={canvasRef}
                        onPointerMove={handleMouseMove}
                        className="touch-none absolute top-0 left-0 h-125 w-full bg-black"
                    >
                    </canvas>

                    <div className="absolute flex flex-col items-center">
                        {
                            isTouch ? <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your finger to spawn</span> :
                                <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
                        }
                        <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
                    </div>
                </> : <span>Animation disabled for reduced motion preference.</span>
            }
        </div>
    );
}