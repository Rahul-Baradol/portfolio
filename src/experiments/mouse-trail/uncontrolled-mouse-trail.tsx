import { useEffect, useRef, useState } from "react"
import { FRAME_DURATION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INSTRUMENTED_FRAME_COUNT, SPAWN_THROTTLE_MS } from "./constants";
import { calculatePerFrameMetrics } from "./utils";
import { useInstrumentorContext } from "@/lib/use-instrumentor";
import { toast } from "sonner";
import type { UncontrolledImage } from "./types";
import { stepImage } from "./physics";

export function UncontrolledMouseTrail() {
    const RECORD_KEY = "Uncontrolled";

    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
    const paintElementRef = useRef<HTMLDivElement>(null);
    const images = useRef<UncontrolledImage[]>([]);
    const nextDomId = useRef<number>(0);
    const lastSpawnTime = useRef<number>(0);

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const animationFrameIdRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number | null>(null);
    const frameTimesRef = useRef<number[]>([]);
    const startObserving = useRef<boolean>(false);

    const isIntersectingRef = useRef<boolean>(false);
    const isVisibleRef = useRef<boolean>(true);

    const { recordFrameTime, hasRecord } = useInstrumentorContext();

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!paintElementRef.current || prefersReducedMotion) {
            return;
        }

        const paintElement = paintElementRef.current;

        if (!hasRecord(RECORD_KEY)) {
            startObserving.current = true;
        }

        const rect = paintElement.getBoundingClientRect();
        const curX = event.clientX - rect.left;
        const curY = event.clientY - rect.top;

        const now = performance.now();
        if (now - lastSpawnTime.current < SPAWN_THROTTLE_MS) {
            return;
        }

        lastSpawnTime.current = now;

        const randomImageIndex = Math.floor(Math.random() * imageLinks.length);

        const newImage: UncontrolledImage = {
            x: curX - (IMAGE_SIZE_PIXELS / 2),
            y: curY - (IMAGE_SIZE_PIXELS / 2),
            domId: nextDomId.current++,
            src: imageLinks[randomImageIndex].src,
            stage: 'initial-bounce-up',
            dx: (Math.random() * HORIZONTAL_SPREAD * 2) - HORIZONTAL_SPREAD,
            dy: INITIAL_BOUNCE_UP_SPEED,
            insertedInDom: false,
            shouldBeDeleted: false,
        };

        images.current.push(newImage);
    }

    useEffect(() => {
        const paintElement = paintElementRef.current;
        if (!paintElement) {
            return;
        }

        setIsTouch(window.matchMedia("(pointer: coarse)").matches);

        const renderLoop = () => {
            console.log(RECORD_KEY);
            const now = performance.now();
            if (startObserving.current &&
                lastFrameTimeRef.current !== null &&
                frameTimesRef.current.length < INSTRUMENTED_FRAME_COUNT
            ) {
                frameTimesRef.current.push(now - lastFrameTimeRef.current);
            }
            lastFrameTimeRef.current = now;

            const floor = paintElement.clientHeight;

            images.current.forEach((image) => {
                stepImage(image, floor);

                if (image.insertedInDom === false) {
                    const domImage = document.createElement('img');
                    domImage.id = `image-${image.domId}`;
                    domImage.src = image.src;
                    domImage.style.position = 'absolute';
                    domImage.style.width = `${IMAGE_SIZE_PIXELS}px`;
                    domImage.style.height = `${IMAGE_SIZE_PIXELS}px`;
                    domImage.style.left = `0px`;
                    domImage.style.top = `0px`;
                    domImage.style.transform = `translate(${image.x}px, ${image.y}px)`;
                    paintElement.appendChild(domImage);

                    imageCache.current.set(image.domId, domImage);

                    image.insertedInDom = true;
                } else if (image.y < floor) {
                    const domImage = imageCache.current.get(image.domId);
                    if (domImage) {
                        domImage.style.transform = `translate(${image.x}px, ${image.y}px)`;
                    }
                } else {
                    const domImage = imageCache.current.get(image.domId);
                    if (domImage) {
                        paintElement.removeChild(domImage);
                        imageCache.current.delete(image.domId);
                        image.shouldBeDeleted = true;
                    }
                }
            });

            images.current = images.current.filter(image => !image.shouldBeDeleted);

            animationFrameIdRef.current = requestAnimationFrame(renderLoop);

            if (frameTimesRef.current.length >= INSTRUMENTED_FRAME_COUNT) {
                const { averageFrameTime, jankedFrameCount, worstFrameTime } = calculatePerFrameMetrics(frameTimesRef.current, FRAME_DURATION);
                frameTimesRef.current = [];
                startObserving.current = false;
                recordFrameTime({
                    key: RECORD_KEY, averageFrameTime, jankedFrameCount, worstFrameTime
                });

                toast.success(`Frame metrics recorded for uncontrolled component approach`, {
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

        observer.observe(paintElement);

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

    return <div ref={paintElementRef} onPointerMove={handleMouseMove} className="touch-none relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
        {
            !prefersReducedMotion ? <div className="flex flex-col items-center z-10 text-center">
                {
                    isTouch ? <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your finger to spawn</span> :
                        <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
                }
                <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
            </div> : <span>Animation disabled for reduced motion preference.</span>
        }
    </div>;
}