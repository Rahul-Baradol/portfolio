import { Badge } from "./ui/badge";

export function TechBadge({ redirect_url, image_url, tech, size }: { redirect_url: string, image_url: string, tech: string, size?: number }) {
    return (
        <a href={redirect_url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:scale-[1.025] transition-all duration-500">
            <Badge className="py-1 px-2 bg-cyan-500/20 flex flex-row items-center border-2 border-dashed border-cyan-500/20">
                <img
                    src={image_url}
                    width={size || 15}
                    className="rounded-xl"
                />
                <div className="text-[11px]">{tech}</div>
            </Badge>
        </a>
    )
}