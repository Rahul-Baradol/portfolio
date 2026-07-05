export const MAX_MESSAGES_IN_DOM = 8;
export const CONTAINER_HEIGHT = 400;
export const ROW_HEIGHT = 50;

export const dummyMessages = [
    "Hello, how are you?",
    "I'm fine, thank you!",
    "What are you up to today?",
    "Just working on some projects.",
    "That sounds interesting!"
]

interface Message {
    agent: "me" | "friend";
    content: string;
}

export function generateMessages(length: MessageCountOption): Message[] {
    return  Array.from({ length: length }, (_, index) => ({
        agent: index % 2 === 0 ? "me" : "friend",
        content: `${index + 1}. ${dummyMessages[index % dummyMessages.length]}`
    }))
}

export enum MessageCountOption {
    "TEN" = 10,
    "HUNDRED" = 100,
    "THOUSAND" = 1000,
    "TEN_THOUSAND" = 10000
}