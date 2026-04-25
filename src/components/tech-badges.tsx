export function TechBadge({ redirect_url, image_url, tech, size }: { redirect_url: string, image_url: string, tech: string, size?: number }) {
    return (
        <a
            href={redirect_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-[1.03] transition-transform duration-300"
        >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-foreground/15 dark:border-cyan-500/25 bg-transparent dark:bg-cyan-500/10 text-foreground/70 dark:text-foreground/85">
                <img src={image_url} width={size || 13} className="rounded-sm shrink-0" />
                <span className="text-[11px] font-normal leading-none">{tech}</span>
            </span>
        </a>
    )
}
