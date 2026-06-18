export interface PR {
    id: number;
    title: string;
    repo: string;
    url: string;
    createdAt: string;
    state: "open" | "closed";
}

export interface TocEntry {
    id: string;
    label: string;
}

export interface ResourceLink {
    label: string;
    href: string;
}

export interface Experiment {
    slug: string;
    title: string;
    description: string;
    date: string;
    isoDate?: string;
    tags?: string[];
    source?: string;
    toc?: TocEntry[];
    resources?: ResourceLink[];
}