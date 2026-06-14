import { useEffect, useRef, useState } from "react"
import { GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, SPAWN_THROTTLE_MS } from "./constants";

interface FallingImage {
    x: number,
    y: number,
    dx: number;
    dy: number;
    id: number,
    src: string,
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
}

export function CanvasWithFrameRateIndependentMouseTrail() {
    const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const images = useRef<FallingImage[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTime = useRef<number | null>(null);
    const lastSpawnTime = useRef<number>(0);
    const FRAME_DURATION = 1000 / 60;

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!containerRef.current || prefersReducedMotion) {
            return;
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
        const now = performance.now();
        let frameFactor = lastFrameTime.current ? (now - lastFrameTime.current) / FRAME_DURATION : 1;
        frameFactor = Math.min(frameFactor, 2);
        lastFrameTime.current = now;

        let updatedImages = images.current.map(image => {
            if (image.stage === 'initial-bounce-up') {
                image.y -= image.dy * frameFactor;
                image.x += image.dx * frameFactor;

                image.dx *= Math.pow(HORIZONTAL_FRICTION, frameFactor);
                image.dy -= GRAVITY * frameFactor;

                if (image.dy <= 0) {
                    image.stage = 'free-fall';
                    image.dy = INITIAL_FALL_SPEED;
                }
            } else if (image.stage === 'free-fall') {
                image.y += image.dy * frameFactor;
                image.dy += GRAVITY * frameFactor;

                if (image.y >= (window.innerHeight - 100)) {
                    image.stage = 'bounce-up';
                    image.dy = INITIAL_BOUNCE_UP_SPEED;
                }
            } else if (image.stage === 'bounce-up') {
                image.y -= image.dy * frameFactor;
                image.dy -= GRAVITY * frameFactor;

                if (image.dy <= 0) {
                    image.stage = 'bounce-down';
                    image.dy = INITIAL_FALL_SPEED;
                }
            } else if (image.stage === 'bounce-down') {
                image.y += image.dy * frameFactor;
                image.dy += GRAVITY * frameFactor;
            }

            return image;
        });

        updatedImages = updatedImages.filter(image => image.y < window.innerHeight);

        images.current = updatedImages;

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updatedImages.forEach(image => {
            const img = imageCache.current.get(image.src);
            if (img) {
                ctx.drawImage(img, image.x, image.y, IMAGE_SIZE_PIXELS, IMAGE_SIZE_PIXELS);
            }
        });

        animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);

        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) {
            return;
        }

        imageLinks.forEach(link => {
            if (!imageCache.current.has(link.src)) {
                const img = new Image();
                img.src = link.src;
                imageCache.current.set(link.src, img);
            }
        });

        const handleWindowResize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;

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

        if (!prefersReduced) {
            animationFrameRef.current = requestAnimationFrame(renderLoop);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            window.removeEventListener("resize", handleWindowResize);
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