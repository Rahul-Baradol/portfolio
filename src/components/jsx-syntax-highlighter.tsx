import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export default function VscodeCodeBlock({
    code,
    language = "tsx",
}: {
    code: string;
    language?: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl border border-border bg-black/5 dark:bg-black/30 backdrop-blur-sm overflow-hidden shadow-lg w-full"
        >
            <Tooltip>
                <TooltipTrigger asChild className="absolute top-2 right-2 z-20">
                    <Button className="bg-black/5 dark:bg-black/30" onClick={handleCopy}>
                        {
                            (copied == false) ? <Copy className="h-4 w-4 text-foreground/70" /> : <Check className="h-4 w-4 text-foreground/70" />
                        }
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {copied ? "Copied!" : "Copy to clipboard"}
                </TooltipContent>
            </Tooltip>

            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                wrapLines
                PreTag="div"
                className="p-4 rounded-xl text-sm"
                customStyle={{
                    background: "transparent",
                    fontSize: "0.85rem",
                    zIndex: 10,
                }}
                codeTagProps={{
                    style: { background: "transparent" },
                }}
            >
                {code}
            </SyntaxHighlighter>
        </motion.div>
    );
}
