import { useEffect, useRef, useState } from "react"
import { GRAVITY, HORIZONTAL_FRICTION, HORIZONTAL_SPREAD, IMAGE_SIZE_PIXELS, imageLinks, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED, SPAWN_THROTTLE_MS } from "./constants";

interface Image {
    x: number,
    y: number,
    dx: number,
    dy: number,
    id: number,
    src: string,
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
}

export function NaiveMouseTrail() {
    const [images, setImages] = useState<Image[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastSpawnTime = useRef<number>(0);

    const handleMouseMove = (event: React.MouseEvent) => {
        const container = containerRef.current;
        if (!container) {
            return;
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
            id: imageLinks[randomImageIndex].id,
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
        let animationFrameId: number;
        const renderLoop = () => {
            const floor = containerRef.current?.clientHeight ?? 0;

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

            animationFrameId = requestAnimationFrame(renderLoop);
        }

        animationFrameId = requestAnimationFrame(renderLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return <div ref={containerRef} onMouseMove={handleMouseMove} className="relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
        <div className="flex flex-col items-center z-10 text-center px-4">
            <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
            <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
        </div>
        {images.map((image, index) => (
            <img
                key={index}
                src={image.src}
                alt={`Falling image ${index}`}
                className="absolute pointer-events-none"
                style={{
                    top: `${image.y}px`,
                    left: `${image.x}px`,
                    width: `${IMAGE_SIZE_PIXELS}px`,
                    height: `${IMAGE_SIZE_PIXELS}px`,
                }}
            />
        ))}
    </div>;
}
