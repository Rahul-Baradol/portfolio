import { useEffect, useRef, useState } from "react"
import { GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, SPAWN_THROTTLE_MS } from "./constants";

interface Image {
    x: number,
    y: number,
    dx: number,
    dy: number,
    id: number,
    domId: number,
    src: string,
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
    insertedInDom: boolean;
    shouldBeDeleted: boolean;
}

export function UncontrolledMouseTrail() {
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
    const paintElement = useRef<HTMLDivElement>(null);
    const images = useRef<Image[]>([]);
    const nextDomId = useRef<number>(0);
    const lastSpawnTime = useRef<number>(0);

    const [isTouch, setIsTouch] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!paintElement.current || prefersReducedMotion) {
            return;
        }
        const rect = paintElement.current.getBoundingClientRect();
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
            id: imageLinks[randomImageIndex].id,
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
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);

        if (paintElement.current) {
            let animationFrameId: number;
            const renderLoop = () => {
                images.current.forEach((image) => {
                    if (image.stage === 'initial-bounce-up') {
                        image.y -= image.dy;
                        image.x += image.dx;

                        image.dy -= GRAVITY;
                        image.dx *= HORIZONTAL_FRICTION;
                        if (image.dy <= 0) {
                            image.stage = 'free-fall';
                            image.dy = INITIAL_FALL_SPEED;
                        }
                    } else if (image.stage === 'free-fall') {
                        image.y += image.dy;
                        image.dy += GRAVITY;

                        if (image.y >= (window.innerHeight - 100)) {
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
                        paintElement.current!.appendChild(domImage);

                        imageCache.current.set(image.domId, domImage);

                        image.insertedInDom = true;
                    } else if (image.y < window.innerHeight) {
                        const domImage = imageCache.current.get(image.domId);
                        if (domImage) {
                            domImage.style.transform = `translate(${image.x}px, ${image.y}px)`;
                        }
                    } else {
                        const domImage = imageCache.current.get(image.domId);
                        if (domImage) {
                            paintElement.current!.removeChild(domImage);
                            imageCache.current.delete(image.domId);
                            image.shouldBeDeleted = true;
                        }
                    }
                });

                images.current = images.current.filter(image => !image.shouldBeDeleted);

                animationFrameId = requestAnimationFrame(renderLoop);
            }

            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setPrefersReducedMotion(prefersReduced);

            if (!prefersReduced) {
                animationFrameId = requestAnimationFrame(renderLoop);
            }

            return () => {
                if (!prefersReduced) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        }
    }, []);

    return <div ref={paintElement} onPointerMove={handleMouseMove} className="touch-none relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
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