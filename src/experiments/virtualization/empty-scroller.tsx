export function EmptyScroller() {
    return (
        <div className="flex flex-col items-center gap-4">
            <div data-lenis-prevent className="w-full h-100 overflow-scroll border-2 border-foreground/10 rounded-md overscroll-contain">
                <div className="h-1000 w-full">Scroll here!</div>
            </div>
        </div>
    )
}