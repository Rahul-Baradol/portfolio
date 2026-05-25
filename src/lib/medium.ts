export interface MediumPost {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    content: string;
    thumbnail?: string;
    categories?: string[];
}

export class MediumPostNotFoundError extends Error {}

interface RssItem {
    title?: string;
    link?: string;
    guid?: string;
    pubDate?: string;
    author?: string;
    content?: string;
    thumbnail?: string;
    categories?: string[];
}

interface RssResponse {
    status: string;
    message?: string;
    items?: RssItem[];
}

export async function fetchMediumPost(username: string, slug: string): Promise<MediumPost> {
    const feedUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`rss2json error: ${res.status}`);

    const data = (await res.json()) as RssResponse;
    if (data.status !== "ok") throw new Error(`rss2json error: ${data.message ?? "unknown"}`);

    const match = (data.items ?? []).find(
        (item) => item.link?.includes(slug) || item.guid?.includes(slug)
    );

    if (!match) throw new MediumPostNotFoundError(`post not found: ${slug}`);

    return {
        title: match.title ?? "",
        link: match.link ?? "",
        pubDate: match.pubDate ?? "",
        author: match.author ?? "",
        content: match.content ?? "",
        thumbnail: match.thumbnail,
        categories: match.categories,
    };
}
