// Remembers where a page was scrolled to when the user navigated away from it,
// so coming back (Back link or browser back) lands at the same spot instead of
// the top. Each saved position is used once.
const positions = new Map<string, number>();

export function saveScrollPosition(pathname: string, y: number) {
    positions.set(pathname, y);
}

export function takeScrollPosition(pathname: string) {
    const y = positions.get(pathname);
    positions.delete(pathname);
    return y;
}
