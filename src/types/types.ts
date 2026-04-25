export interface PR {
    id: number;
    title: string;
    repo: string;
    url: string;
    createdAt: string;
    state: "open" | "closed";
}