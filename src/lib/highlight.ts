import type { HLJSApi } from "highlight.js";

let hljsPromise: Promise<HLJSApi> | null = null;

function loadHljs(): Promise<HLJSApi> {
    if (hljsPromise) return hljsPromise;

    hljsPromise = (async () => {
        const [
            { default: hljs },
            { default: javascript },
            { default: typescript },
            { default: python },
            { default: java },
            { default: go },
            { default: bash },
            { default: json },
            { default: xml },
            { default: css },
            { default: sql },
        ] = await Promise.all([
            import("highlight.js/lib/core"),
            import("highlight.js/lib/languages/javascript"),
            import("highlight.js/lib/languages/typescript"),
            import("highlight.js/lib/languages/python"),
            import("highlight.js/lib/languages/java"),
            import("highlight.js/lib/languages/go"),
            import("highlight.js/lib/languages/bash"),
            import("highlight.js/lib/languages/json"),
            import("highlight.js/lib/languages/xml"),
            import("highlight.js/lib/languages/css"),
            import("highlight.js/lib/languages/sql"),
        ]);

        hljs.registerLanguage("javascript", javascript);
        hljs.registerLanguage("typescript", typescript);
        hljs.registerLanguage("python", python);
        hljs.registerLanguage("java", java);
        hljs.registerLanguage("go", go);
        hljs.registerLanguage("bash", bash);
        hljs.registerLanguage("shell", bash);
        hljs.registerLanguage("json", json);
        hljs.registerLanguage("xml", xml);
        hljs.registerLanguage("html", xml);
        hljs.registerLanguage("css", css);
        hljs.registerLanguage("sql", sql);

        return hljs;
    })();

    return hljsPromise;
}

export async function highlightCodeBlocks(root: HTMLElement): Promise<void> {
    const blocks = Array.from(root.querySelectorAll("pre"));
    if (blocks.length === 0) return;

    const hljs = await loadHljs();

    for (const pre of blocks) {
        const decoded = document.createElement("div");
        decoded.innerHTML = pre.innerHTML.replace(/<br\s*\/?>/gi, "\n");
        const text = decoded.textContent ?? "";

        pre.textContent = "";
        const code = document.createElement("code");
        code.textContent = text;
        pre.appendChild(code);

        hljs.highlightElement(code);
    }
}
