import { useEffect, useRef, useState } from "react"
import { FRAME_DURATION, GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, INSTRUMENTED_FRAME_COUNT, SPAWN_THROTTLE_MS } from "./constants";
import { calculatePerFrameMetrics } from "./utils";
import { useInstrumentorContext } from "../../lib/use-instrumentor";
import { toast } from "sonner";

interface Image {
    x: number,
    y: number,
    dx: number,
    dy: number,
    imageId: number,
    id: number,
    src: string,
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
}

export function NaiveMouseTrail() {
    const RECORD_KEY = "Naive";

    const [images, setImages] = useState<Image[]>([]);
    const nextId = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastSpawnTime = useRef<number>(0);
    const lastFrameTimeRef = useRef<number | null>(null);
    const frameTimesRef = useRef<number[]>([]);
    const animationFrameIdRef = useRef<number | null>(null);
    const startObserving = useRef<boolean>(false);

    const { recordFrameTime, hasRecord } = useInstrumentorContext();

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const handleMouseMove = (event: React.MouseEvent) => {
        const container = containerRef.current;
        if (!container || prefersReducedMotion) {
            return;
        }

        if (!hasRecord(RECORD_KEY) && !startObserving.current) {
            startObserving.current = true;
        }

        const rect = container.getBoundingClientRect();
        const curX = event.clientX - rect.left;
        const curY = event.clientY - rect.top;

        const now = performance.now();
        if (now - lastSpawnTime.current < SPAWN_THROTTLE_MS) {
            return;
        }

        lastSpawnTime.current = now;

        const randomImageIndex = Math.floor(Math.random() * imageLinks.length);

        const newImage: Image = {
            x: curX - (IMAGE_SIZE_PIXELS / 2),
            y: curY - (IMAGE_SIZE_PIXELS / 2),
            imageId: imageLinks[randomImageIndex].id,
            id: nextId.current++,
            src: imageLinks[randomImageIndex].src,
            stage: 'initial-bounce-up',
            dx: (Math.random() * HORIZONTAL_SPREAD * 2) - HORIZONTAL_SPREAD,
            dy: INITIAL_BOUNCE_UP_SPEED
        };

        setImages(prevImages => {
            return [...prevImages, newImage];
        });
    }

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        setIsTouch(window.matchMedia("(pointer: coarse)").matches);

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setPrefersReducedMotion(prefersReduced);

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

            const floor = container.clientHeight ?? 0;

            setImages(prevImages => {
                if (prevImages.length === 0) {
                    return [];
                }

                let updatedImages = prevImages.map(image => {
                    const newImage = {
                        ...image,
                    }

                    if (image.stage === 'initial-bounce-up') {
                        newImage.y -= newImage.dy;
                        newImage.x += newImage.dx;

                        newImage.dy -= GRAVITY;
                        newImage.dx *= HORIZONTAL_FRICTION;
                        if (newImage.dy <= 0) {
                            newImage.stage = 'free-fall';
                            newImage.dy = INITIAL_FALL_SPEED;
                        }
                    } else if (image.stage === 'free-fall') {
                        newImage.y += newImage.dy;
                        newImage.dy += GRAVITY;

                        if (newImage.y >= (floor - 100)) {
                            newImage.stage = 'bounce-up';
                            newImage.dy = INITIAL_BOUNCE_UP_SPEED;
                        }
                    } else if (image.stage === 'bounce-up') {
                        newImage.y -= newImage.dy;
                        newImage.dy -= GRAVITY;
                        if (newImage.dy <= 0) {
                            newImage.stage = 'bounce-down';
                            newImage.dy = INITIAL_FALL_SPEED;
                        }
                    } else if (image.stage === 'bounce-down') {
                        newImage.y += newImage.dy;
                        newImage.dy += GRAVITY;
                    }

                    return newImage;
                });

                updatedImages = updatedImages.filter(image => image.y < floor);

                return updatedImages;
            });

            animationFrameIdRef.current = requestAnimationFrame(renderLoop);

            if (frameTimesRef.current.length >= INSTRUMENTED_FRAME_COUNT) {
                const { averageFrameTime, jankedFrameCount, worstFrameTime } = calculatePerFrameMetrics(frameTimesRef.current, FRAME_DURATION);
                frameTimesRef.current = [];
                startObserving.current = false;
                recordFrameTime({
                    key: RECORD_KEY, averageFrameTime, jankedFrameCount, worstFrameTime
                });

                toast.success(`Frame metrics recorded for the naive approach`, {
                    position: "top-center"
                });
            }
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !animationFrameIdRef.current && !prefersReduced) {
                animationFrameIdRef.current = requestAnimationFrame(renderLoop);
            } else if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        });

        observer.observe(container);

        return () => {
            if (!prefersReduced && animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            observer.disconnect();
        }
    }, []);

    return <div ref={containerRef} onPointerMove={handleMouseMove} className="touch-none relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
        {
            !prefersReducedMotion ? <>
                <div className="flex flex-col items-center z-10 text-center px-4">
                    {
                        isTouch ? <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your finger to spawn</span> :
                            <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
                    }
                    <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
                </div>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={`Falling image ${image.id}`}
                        className="absolute pointer-events-none"
                        style={{
                            top: `${image.y}px`,
                            left: `${image.x}px`,
                            width: `${IMAGE_SIZE_PIXELS}px`,
                            height: `${IMAGE_SIZE_PIXELS}px`,
                        }}
                    />
                ))}
            </> : <span>Animation disabled for reduced motion preference.</span>
        }
    </div>;
}
