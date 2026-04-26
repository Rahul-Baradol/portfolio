import type { PR } from "@/types/types";
import { GITHUB_USERNAME } from "@/constants";

export class RateLimitedError extends Error {}

export const GITHUB_PR_PER_PAGE = 10;

const BASE_URL = "https://api.github.com/search/issues";
const OPEN_QUERY = `is:pr+author:${GITHUB_USERNAME}+is:open+-user:${GITHUB_USERNAME}`;
const MERGED_QUERY = `is:pr+author:${GITHUB_USERNAME}+is:merged+-user:${GITHUB_USERNAME}`;

const ownerTypeCache = new Map<string, boolean>();

async function isOrgOwner(owner: string): Promise<boolean> {
    if (ownerTypeCache.has(owner)) return ownerTypeCache.get(owner)!;
    const res = await fetch(`https://api.github.com/users/${owner}`);
    if (res.status === 403) throw new RateLimitedError();
    if (!res.ok) throw new Error(`org check failed: ${res.status}`);
    const data = await res.json();
    const isOrg = data.type === "Organization";
    ownerTypeCache.set(owner, isOrg);
    return isOrg;
}

async function filterOrgPRs(items: any[]): Promise<PR[]> {
    if (items.length === 0) return [];

    const owners = [...new Set<string>(
        items.map((pr: any) =>
            pr.repository_url.replace("https://api.github.com/repos/", "").split("/")[0]
        )
    )];

    const orgFlags = await Promise.all(owners.map(async (owner) => ({
        owner,
        isOrg: await isOrgOwner(owner),
    })));

    const orgOwners = new Set(orgFlags.filter((o) => o.isOrg).map((o) => o.owner));

    return items
        .filter((pr: any) => {
            const owner = pr.repository_url
                .replace("https://api.github.com/repos/", "")
                .split("/")[0];
            return orgOwners.has(owner);
        })
        .map((pr: any): PR => ({
            id: pr.id,
            title: pr.title,
            repo: pr.repository_url.replace("https://api.github.com/repos/", ""),
            url: pr.html_url,
            createdAt: pr.created_at,
            state: pr.state as "open" | "closed",
        }));
}

function checkStatus(res: Response): void {
    if (res.status === 403) throw new RateLimitedError();
    if (!res.ok) throw new Error(`GitHub error: ${res.status}`);
}

export interface HomePRsResult {
    openPRs: PR[];
    mergedPRs: PR[];
}

export async function fetchHomePRs(): Promise<HomePRsResult> {
    const [openRes, mergedRes] = await Promise.all([
        fetch(`${BASE_URL}?q=${OPEN_QUERY}&per_page=2&sort=updated&order=desc`),
        fetch(`${BASE_URL}?q=${MERGED_QUERY}&per_page=3&sort=updated&order=desc`),
    ]);

    checkStatus(openRes);
    checkStatus(mergedRes);

    const [openData, mergedData] = await Promise.all([
        openRes.json(),
        mergedRes.json(),
    ]);

    const [openPRs, mergedPRs] = await Promise.all([
        filterOrgPRs(openData.items || []),
        filterOrgPRs(mergedData.items || []),
    ]);

    return { openPRs, mergedPRs };
}

export interface PagedPRsResult {
    prs: PR[];
    totalCount: number;
}

export async function fetchPagedPRs(tab: "open" | "merged", page: number): Promise<PagedPRsResult> {
    const query = tab === "open" ? OPEN_QUERY : MERGED_QUERY;
    const res = await fetch(
        `${BASE_URL}?q=${query}&per_page=${GITHUB_PR_PER_PAGE}&page=${page}&sort=updated&order=desc`
    );

    checkStatus(res);

    const data = await res.json();
    const prs = await filterOrgPRs(data.items || []);

    return { prs, totalCount: data.total_count || 0 };
}
