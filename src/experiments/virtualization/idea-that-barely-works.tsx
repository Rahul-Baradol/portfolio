import { useEffect, useRef, useState } from "react";
import { generateMessages, MAX_MESSAGES_IN_DOM, MessageCountOption } from "./constants";
import { ArrowUp } from "lucide-react";

export function IdeaThatBarelyWorks() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const startYRef = useRef<number | null>(null);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [messageCountOption, setMessageCountOption] = useState<MessageCountOption>(MessageCountOption.TEN);

    useEffect(() => {
        console.log(scrollPosition);
    }, [scrollPosition])

    useEffect(() => {
        const messages = generateMessages(messageCountOption);

        const start = Math.floor(scrollPosition / 10);
        const end = Math.min(start + MAX_MESSAGES_IN_DOM, messages.length);
        const visibleMessages = messages.slice(start, end);

        containerRef.current!.innerHTML = visibleMessages.map((message, index) => {
            let style = `width: 100%; padding: 10px 0px; border-color: color-mix(in oklab, var(--foreground) 10%, transparent);`;
            if (index < visibleMessages.length - 1) {
                style += "border-bottom-width: 1px; border-bottom-style: var(--tw-border-style);";
            }
            if (message.agent == "me") {
                style += "text-align: end; padding-right: 18px;";
            } else {
                style += "text-align: start; padding-left: 16px;";
            }

            return `<div key=${index} style="${style}">${message.content}</div>`;
        }).join("");
    }, [scrollPosition, messageCountOption])

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handleWheel = (e: WheelEvent) => {
            if (!container) {
                return;
            }

            if (e.deltaY > 0) {
                setScrollPosition(ele => ele + 1);
            } else {
                setScrollPosition(ele => Math.max(ele - 1, 0));
            }
        };

        const handlePointerDown = (e: PointerEvent) => {
            startYRef.current = e.clientY;
            container.setPointerCapture(e.pointerId);
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (startYRef.current === null) {
                return;
            }

            const deltaY = startYRef.current - e.clientY;

            container.releasePointerCapture(e.pointerId);
            startYRef.current = null;

            if (deltaY > 0) {
                setScrollPosition((p) => p + 10);
            } else {
                setScrollPosition((p) => Math.max(p - 10, 0));
            }
        };

        const handlePointerCancel = (e: PointerEvent) => {
            container.releasePointerCapture(e.pointerId);
            startYRef.current = null;
        };

        containerRef.current?.addEventListener("wheel", handleWheel);
        container.addEventListener("pointerdown", handlePointerDown);
        container.addEventListener("pointerup", handlePointerUp);
        container.addEventListener("pointercancel", handlePointerCancel);
        return () => {
            containerRef.current?.removeEventListener("wheel", handleWheel);
            container.removeEventListener("pointerdown", handlePointerDown);
            container.removeEventListener("pointerup", handlePointerUp);
            container.removeEventListener("pointercancel", handlePointerCancel);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-full h-100 overflow-auto border-2 border-foreground/10 rounded-md flex flex-col overscroll-contain">
                <div data-lenis-prevent ref={containerRef} className="w-full h-full touch-none"></div>
                <button onClick={() => {
                    setScrollPosition(0);
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