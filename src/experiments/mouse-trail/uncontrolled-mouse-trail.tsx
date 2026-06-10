import { useEffect, useRef } from "react"
import { imageLinks } from "./constants";

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
    const lastSpawnTime = useRef<number>(0);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!paintElement.current) {
            return;
        }
        const rect = paintElement.current.getBoundingClientRect();
        const curX = event.clientX - rect.left;
        const curY = event.clientY - rect.top;

        const now = performance.now();
        if (now - lastSpawnTime.current < 100) {
            return;
        }

        lastSpawnTime.current = now;

        const randomImageIndex = Math.floor(Math.random() * imageLinks.length); 

        const newImage: Image = {
            x: curX - 50,
            y: curY - 50,
            id: imageLinks[randomImageIndex].id,
            domId: Math.floor(Math.random() * 10000), 
            src: imageLinks[randomImageIndex].src,
            stage: 'initial-bounce-up',
            dx: (Math.random() * 10) - 5,
            dy: 10,
            insertedInDom: false,
            shouldBeDeleted: false,
        };

        images.current.push(newImage);
    }

    useEffect(() => {
        if (paintElement.current) {
            let animationFrameId: number;
            const renderLoop = () => {    
                images.current.forEach((image) => {    
                    if (image.stage === 'initial-bounce-up') {
                        image.y -= image.dy;
                        image.x += image.dx;

                        image.dy -= 1;
                        image.dx *= 0.98;
                        if (image.dy <= 0) {
                            image.stage = 'free-fall';
                            image.dy = 5;
                        }
                    } else if (image.stage === 'free-fall') {
                        image.y += image.dy;
                        image.dy += 1;

                        if (image.y >= (window.innerHeight - 100)) {
                            image.stage = 'bounce-up';
                            image.dy = 10;
                        }
                    } else if (image.stage === 'bounce-up') {
                        image.y -= image.dy;
                        image.dy -= 1;
                        if (image.dy <= 0) {
                            image.stage = 'bounce-down';
                            image.dy = 5;
                        }
                    } else if (image.stage === 'bounce-down') {
                        image.y += image.dy;
                        image.dy += 1;
                    }
    
                    if (image.insertedInDom === false) {
                        const domImage = document.createElement('img');
                        domImage.id = `image-${image.domId}`;
                        domImage.src = image.src;
                        domImage.style.position = 'absolute';
                        domImage.style.width = '100px';
                        domImage.style.height = '100px';
                        domImage.style.left = `${image.x}px`;
                        domImage.style.top = `${image.y}px`;
                        paintElement.current!.appendChild(domImage);

                        imageCache.current.set(image.domId, domImage);

                        image.insertedInDom = true;
                    } else if (image.y < window.innerHeight) {
                        const domImage = imageCache.current.get(image.domId);
                        if (domImage) {
                            domImage.style.left = `${image.x}px`;
                            domImage.style.top = `${image.y}px`;
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
    
            animationFrameId = requestAnimationFrame(renderLoop);
    
            return () => {
                cancelAnimationFrame(animationFrameId);
            }
        }
    }, [paintElement]);

    return <div ref={paintElement} onMouseMove={handleMouseMove} className="relative flex justify-center items-center w-full h-125 overflow-hidden bg-black">
        <div className="flex flex-col items-center z-10 text-center">
            <span className="text-white text-2xl md:text-3xl select-none opacity-90">Move your cursor to spawn</span>
            <span className="text-white text-2xl md:text-3xl select-none opacity-75">bouncy images!</span>
        </div>
    </div>;
}