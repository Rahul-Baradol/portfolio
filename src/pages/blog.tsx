import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, Lightbulb } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { stories } from "@/constants";
import { fetchMediumPost, MediumPostNotFoundError, type MediumPost } from "@/lib/medium";
import { highlightCodeBlocks } from "@/lib/highlight";
import NotFound from "@/components/not-found";

function BlogSkeleton() {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-8 w-3/4 rounded bg-foreground/10" />
            <div className="h-3 w-1/4 rounded bg-muted-foreground/10" />
            <div className="flex flex-col gap-2 pt-4">
                <div className="h-3 w-full rounded bg-muted-foreground/10" />
                <div className="h-3 w-full rounded bg-muted-foreground/10" />
                <div className="h-3 w-5/6 rounded bg-muted-foreground/10" />
                <div className="h-3 w-full rounded bg-muted-foreground/10" />
                <div className="h-3 w-4/6 rounded bg-muted-foreground/10" />
            </div>
        </div>
    );
}

export function BlogPage() {
    const { slug } = useParams<{ slug: string }>();
    const story = stories.find((s) => s.slug === slug);

    const [post, setPost] = useState<MediumPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorKind, setErrorKind] = useState<"not-found" | "unavailable" | null>(null);
    const articleRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (!post || !articleRef.current) return;
        highlightCodeBlocks(articleRef.current).catch(() => {});
    }, [post]);

    useEffect(() => {
        if (!story) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setPost(null);
        setErrorKind(null);

        const load = async () => {
            try {
                const result = await fetchMediumPost(story.mediumUsername, story.slug);
                if (!cancelled) {
                    setPost(result);
                }
            } catch (error) {
                if (!cancelled) {
                    setErrorKind(error instanceof MediumPostNotFoundError ? "not-found" : "unavailable");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [story]);

    if (!story) {
        return <NotFound />;
    }

    return (
        <div className="animate-fade-up z-10 w-[90vw] lg:w-[50vw] flex flex-col gap-6">
            <Link
                to="/"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
                <ArrowLeft className="h-3 w-3" />
                Back
            </Link>

            <div className="flex flex-row items-center gap-2 text-muted-foreground italic">
                <Lightbulb className="h-4 w-4" />
                Story
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground italic">
                    {story.title}
                </h1>
                <div className="flex flex-row items-center gap-2 text-[10px] text-muted-foreground italic flex-wrap">
                    <span>{story.date}</span>
                    {story.tags && story.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex flex-row gap-1 flex-wrap">
                                {story.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 rounded-md border border-foreground/15 dark:border-cyan-600/20 dark:bg-cyan-600/10 text-foreground/60 dark:text-cyan-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <a
                    href={story.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
                >
                    <span>View on Medium</span>
                    <ExternalLink className="h-3 w-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>

            {loading ? (
                <BlogSkeleton />
            ) : errorKind !== null ? (
                <div className="flex flex-col gap-3 py-8 text-sm text-muted-foreground italic">
                    <span>
                        {errorKind === "not-found"
                            ? "this post is no longer in the medium feed."
                            : "couldn't load the post right now."}
                    </span>
                    <a
                        href={story.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs hover:text-foreground transition-colors underline underline-offset-2 self-start"
                    >
                        read it on medium →
                    </a>
                </div>
            ) : post ? (
                <article
                    ref={articleRef}
                    className="medium-content text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            ) : null}
        </div>
    );
}
