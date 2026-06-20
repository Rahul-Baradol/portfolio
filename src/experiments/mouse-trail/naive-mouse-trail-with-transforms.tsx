import { useEffect, useRef, useState } from "react"
import { FRAME_DURATION, GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, INSTRUMENTED_FRAME_COUNT, SPAWN_THROTTLE_MS } from "./constants";
import { calculatePerFrameMetrics } from "./utils";
import { useInstrumentorContext } from "../../lib/use-instrumentor";
import { toast } from "sonner";
import type { NaiveImage } from "./types";
import { stepImage } from "./physics";

export function NaiveMouseTrailWithTransforms() {
    const RECORD_KEY = "Naive + Transforms";

    const [images, setImages] = useState<NaiveImage[]>([]);
    const nextId = useRef<number>(0);
    const animationFrameIdRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastSpawnTime = useRef<number>(0);

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const lastFrameTimeRef = useRef<number | null>(null);
    const frameTimesRef = useRef<number[]>([]);
    const startObserving = useRef<boolean>(false);
    const isIntersectingRef = useRef<boolean>(false);
    const isVisibleRef = useRef<boolean>(true);

    const { recordFrameTime, hasRecord } = useInstrumentorContext();

    const handleMouseMove = (event: React.MouseEvent) => {
        const container = containerRef.current;
        if (!container || prefersReducedMotion) {
            return;
        }

        if (!hasRecord(RECORD_KEY)) {
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

        const newImage: NaiveImage = {
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

                    stepImage(newImage, floor);

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

                toast.success(`Frame metrics recorded for the naive approach, with transforms`, {
                    position: "top-center"
                });
            }
        }

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setPrefersReducedMotion(prefersReduced);

        const startOrStopAnimation = () => {
            const shouldAnimate = isVisibleRef.current && 
                                    isIntersectingRef.current &&
                                    !prefersReduced;

            if (shouldAnimate && !animationFrameIdRef.current) {
                console.log("Starting RAF");
                animationFrameIdRef.current = requestAnimationFrame(renderLoop);
            }

            if (!shouldAnimate && animationFrameIdRef.current) {
                console.log("Stopping RAF");
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        };

        const observer = new IntersectionObserver(([entry]) => {
            isIntersectingRef.current = entry.isIntersecting;
            startOrStopAnimation();
        });

        observer.observe(container);

        const handleVisibilityChange = () => {
            isVisibleRef.current = document.visibilityState === "visible";
            startOrStopAnimation();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (!prefersReduced && animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
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
                            top: '0px',
                            left: '0px',
                            transform: `translate(${image.x}px, ${image.y}px)`,
                            willChange: 'transform',
                            width: `${IMAGE_SIZE_PIXELS}px`,
                            height: `${IMAGE_SIZE_PIXELS}px`,
                        }}
                    />
                ))}
            </> : <span>Animation disabled for reduced motion preference.</span>
        }
    </div>;
}
