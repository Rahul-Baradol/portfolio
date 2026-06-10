import { useCallback, useEffect, useRef } from "react"
import { imageLinks } from "./constants";

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

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!containerRef.current) {
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const curX = event.clientX - rect.left;
        const curY = event.clientY - rect.top;

        const now = performance.now();
        if (now - lastSpawnTime.current < 100) {
            return;
        }

        lastSpawnTime.current = now;

        const randomImageIndex = Math.floor(Math.random() * imageLinks.length);

        const newImage: FallingImage = {
            x: curX - 50,
            y: curY - 50,
            id: imageLinks[randomImageIndex].id,
            src: imageLinks[randomImageIndex].src,
            dx: (Math.random() * 10) - 5,
            dy: 10,
            stage: 'initial-bounce-up'
        };

        images.current.push(newImage);
    }

    const renderLoop = () => {
        const now = performance.now();
        let frameFactor = lastFrameTime.current ? (now - lastFrameTime.current) / 16.666 : 1;
        frameFactor = Math.min(frameFactor, 2);
        lastFrameTime.current = now;

        let updatedImages = images.current.map(image => {
            let newImage = { ...image };

            if (newImage.stage === 'initial-bounce-up') {
                newImage.y -= newImage.dy * frameFactor;
                newImage.x += newImage.dx * frameFactor;

                newImage.dx *= Math.pow(0.98, frameFactor);
                newImage.dy -= 1 * frameFactor;

                if (newImage.dy <= 0) {
                    newImage.stage = 'free-fall';
                    newImage.dy = 5;
                }
            } else if (newImage.stage === 'free-fall') {
                newImage.y += newImage.dy * frameFactor;
                newImage.dy += 1 * frameFactor;

                if (newImage.y >= (window.innerHeight - 100)) {
                    newImage.stage = 'bounce-up';
                    newImage.dy = 10;
                }
            } else if (newImage.stage === 'bounce-up') {
                newImage.y -= newImage.dy * frameFactor;
                newImage.dy -= 1 * frameFactor;

                if (newImage.dy <= 0) {
                    newImage.stage = 'bounce-down';
                    newImage.dy = 5;
                }
            } else if (newImage.stage === 'bounce-down') {
                newImage.y += newImage.dy * frameFactor;
                newImage.dy += 1 * frameFactor;
            }

            return newImage;
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
                ctx.drawImage(img, image.x, image.y, 100, 100);
            }
        });

        animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    useEffect(() => {
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

            console.log("adjusted canvas size.")
        }

        handleWindowResize();

        animationFrameRef.current = requestAnimationFrame(renderLoop);

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
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                className="absolute top-0 left-0 h-125 w-full bg-black"
            >
            </canvas>

            <div className="absolute flex flex-col items-center">
                <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
                <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
            </div>
        </div>
    );
}