import { useMemo, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { generateMessages, MessageCountOption } from "./constants";

export function NaiveMessageContainer() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [messageCountOption, setMessageCountOption] = useState<MessageCountOption>(MessageCountOption.TEN);

    const messages = useMemo(() => generateMessages(messageCountOption), [messageCountOption])

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-full h-full">
                <div data-lenis-prevent ref={containerRef} className="w-full h-100 overflow-auto border-2 border-foreground/10 rounded-md flex flex-col overscroll-contain">
                    {messages.map((message, index) => (
                        <div key={index} className={`py-2.5 w-full ${index < (messages.length - 1) ? 'border-b' : ''} border-foreground/10 ${message.agent == "me" ? "text-end pr-4.5" : "pl-4"}`}>{message.content}</div>
                    )) }
                </div>

                <button onClick={() => {
                    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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