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

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

function addCopyButton(pre: HTMLPreElement, text: string): void {
    // Wrap the <pre> so the button can be positioned relative to it without
    // scrolling away with the block's horizontal overflow.
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-block__copy";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.innerHTML = COPY_ICON;

    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    button.addEventListener("click", () => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                button.innerHTML = CHECK_ICON;
                button.classList.add("code-block__copy--copied");
                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => {
                    button.innerHTML = COPY_ICON;
                    button.classList.remove("code-block__copy--copied");
                }, 2000);
            })
            .catch(() => {});
    });

    wrapper.appendChild(button);
}

export async function highlightCodeBlocks(root: HTMLElement): Promise<void> {
    const blocks = Array.from(root.querySelectorAll("pre"));
    if (blocks.length === 0) return;

    const hljs = await loadHljs();

    for (const pre of blocks) {
        // Guard against re-processing if this runs more than once on the same DOM.
        if (pre.parentElement?.classList.contains("code-block")) continue;

        const decoded = document.createElement("div");
        decoded.innerHTML = pre.innerHTML.replace(/<br\s*\/?>/gi, "\n");
        const text = decoded.textContent ?? "";

        pre.textContent = "";
        const code = document.createElement("code");
        code.textContent = text;
        pre.appendChild(code);

        hljs.highlightElement(code);

        addCopyButton(pre, text);
    }
}
