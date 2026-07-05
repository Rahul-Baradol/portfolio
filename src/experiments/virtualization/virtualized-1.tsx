import { useCallback, useEffect, useRef, useState } from "react";
import { CONTAINER_HEIGHT, generateMessages, MessageCountOption, ROW_HEIGHT } from "./constants";
import { ArrowUp } from "lucide-react";

interface MessageProps {
    content: string;
    alignRight?: boolean;
    translateY: number;
    height: number;
}

export function FirstVirtualized() {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [messageCountOption, setMessageCountOption] = useState<MessageCountOption>(MessageCountOption.TEN);
    const [messagesToRender, setMessagesToRender] = useState<MessageProps[]>([]);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        const messages = generateMessages(Number(messageCountOption));

        setContainerHeight(messages.length * ROW_HEIGHT);
        
        const numberOfRows = Math.floor(CONTAINER_HEIGHT / ROW_HEIGHT) * 2;
        const startIndex = Math.floor(container.scrollTop / ROW_HEIGHT);
        const endIndex = Math.min(startIndex + numberOfRows, messages.length);

        console.log(startIndex, endIndex)

        const visibleMessages = messages.slice(startIndex, endIndex).map((message, index) => ({
            content: message.content,
            alignRight: (startIndex + index) % 2 === 0,
            translateY: (startIndex + index) * ROW_HEIGHT,
            height: ROW_HEIGHT
        }));

        setMessagesToRender(visibleMessages);
    }, [messageCountOption])

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        container?.addEventListener("scroll", handleScroll);
        return () => {
            container?.removeEventListener("scroll", handleScroll);
        };
    }, [messageCountOption]);

    useEffect(() => {
        handleScroll();
    }, [])

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-full h-100 border-2 border-foreground/10 rounded-md flex flex-col">
                <div 
                    data-lenis-prevent 
                    ref={scrollContainerRef} 
                    className="relative w-full border-foreground/10 overflow-scroll rounded-md overscroll-contain"
                    style={{
                        height: `${CONTAINER_HEIGHT}px`
                    }}
                >
                    <div style={{
                        height: `${containerHeight}px`
                    }} className="relative"></div>
                    {messagesToRender.map((message, index) => (
                        <Message 
                            key={index} 
                            content={message.content} 
                            alignRight={message.alignRight}
                            translateY={message.translateY}    
                            height={ROW_HEIGHT}
                        />
                    ))}
                </div>

                <button onClick={() => {
                    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                }} className={"absolute right-4 bottom-4 flex flex-row items-center border-2 rounded-lg px-4 py-1.5 cursor-pointer bg-background hover:scale-105 transition-transform duration-250"}>
                    <ArrowUp className="h-4 w-4 text-foreground/75" />
                </button>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <span className="text-sm text-foreground/30">Number of messages</span>
                <div className="flex flex-row items-center gap-2">
                    <button className={`w-20 p-2 border rounded-lg text-foreground/75 cursor-pointer ${messageCountOption === MessageCountOption.TEN ? "bg-foreground/20" : "self-end"}`} onClick={() => setMessageCountOption(MessageCountOption.TEN)}>10</button>
                    <button className={`w-20 p-2 border rounded-lg text-foreground/75 cursor-pointer ${messageCountOption === MessageCountOption.HUNDRED ? "bg-foreground/20" : "self-end"}`} onClick={() => setMessageCountOption(MessageCountOption.HUNDRED)}>100</button>
                    <button className={`w-20 p-2 border rounded-lg text-foreground/75 cursor-pointer ${messageCountOption === MessageCountOption.THOUSAND ? "bg-foreground/20" : "self-end"}`} onClick={() => setMessageCountOption(MessageCountOption.THOUSAND)}>1000</button>
                    <button className={`w-20 p-2 border rounded-lg text-foreground/75 cursor-pointer ${messageCountOption === MessageCountOption.TEN_THOUSAND ? "bg-foreground/20" : "self-end"}`} onClick={() => setMessageCountOption(MessageCountOption.TEN_THOUSAND)}>10000</button>
                </div>
            </div>
        </div>
    )
}

function Message({ content, alignRight, translateY, height }: MessageProps) {
    return (
        <div 
            className={`absolute top-0 left-0 w-full py-2.5 border-b border-foreground/10 ${alignRight ? "text-end pr-4.5" : "pl-4"}`}
            style={{
                transform: `translateY(${translateY}px)`,
                height: `${height}px`,
            }}
        >
            <p>{content}</p>
        </div>
    )
}