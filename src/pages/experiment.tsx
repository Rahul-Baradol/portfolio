import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowLeft, FlaskConical, Code2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { experiments } from "@/constants";
import { highlightCodeBlocks } from "@/lib/highlight";
import NotFound from "@/components/not-found";
import { InstrumentorProvider } from "@/lib/use-instrumentor";
import { ExperimentToc } from "@/components/experiment-toc";
import { ExperimentResources } from "@/components/experiment-resources";

// Compile-time map of every experiment's MDX content, keyed by its folder slug.
// Each value is a lazy importer, so an experiment's bundle (and the components
// it embeds) is only fetched when that experiment is opened.
const experimentModules = import.meta.glob<{ default: ComponentType }>(
    "../experiments/*/index.mdx"
);

function modulePathForSlug(slug: string): string {
    return `../experiments/${slug}/index.mdx`;
}

function ExperimentSkeleton() {
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

export function ExperimentPage() {
    const { slug } = useParams<{ slug: string }>();
    const experiment = experiments.find((e) => e.slug === slug);

    const [Content, setContent] = useState<ComponentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [errored, setErrored] = useState(false);
    const articleRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (Content === null || !articleRef.current) return;
        highlightCodeBlocks(articleRef.current).catch(() => {});
    }, [Content]);

    useEffect(() => {
        if (!experiment) {
            setLoading(false);
            return;
        }

        const loader = experimentModules[modulePathForSlug(experiment.slug)];
        if (!loader) {
            setErrored(true);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setContent(null);
        setErrored(false);

        loader()
            .then((mod) => {
                if (!cancelled) setContent(() => mod.default);
            })
            .catch(() => {
                if (!cancelled) setErrored(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [experiment]);

    if (!experiment) {
        return <NotFound />;
    }

    return (
        <div className="animate-fade-up z-10 w-[90vw] lg:w-[50vw] flex flex-col gap-6 relative">
            <Link
                to="/"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
                <ArrowLeft className="h-3 w-3" />
                Back
            </Link>

            <div className="flex flex-row items-center gap-2 text-muted-foreground italic">
                <FlaskConical className="h-4 w-4" />
                Experiment
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground italic">
                    {experiment.title}
                </h1>
                <div className="flex flex-row items-center gap-2 text-[11px] text-muted-foreground italic flex-wrap">
                    <span>{experiment.date}</span>
                    {experiment.tags && experiment.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex flex-row gap-1 flex-wrap">
                                {experiment.tags.map((tag, idx) => (
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
                    {experiment.source && (
                        <>
                            <span>•</span>
                            <a
                                href={experiment.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors not-italic"
                            >
                                <Code2 className="h-3 w-3" />
                                Source
                            </a>
                        </>
                    )}
                </div>
            </div>

            {loading ? (
                <ExperimentSkeleton />
            ) : errored ? (
                <div className="py-8 text-sm text-muted-foreground italic">
                    couldn&apos;t load this experiment right now.
                </div>
            ) : Content !== null ? (
                <>
                    {experiment.toc && experiment.toc.length > 0 && (
                        <ExperimentToc toc={experiment.toc} />
                    )}
                    {experiment.resources && experiment.resources.length > 0 && (
                        <ExperimentResources resources={experiment.resources} />
                    )}
                    <article ref={articleRef} className="medium-content text-foreground/90">
                        <InstrumentorProvider>
                            <Content />
                        </InstrumentorProvider>
                    </article>
                </>
            ) : null}
        </div>
    );
}
