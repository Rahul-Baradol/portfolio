// import { DevTipsCard } from "@/components/dev-tips-card";
import { ExperienceContainer } from "@/components/experience";
import { ProjectsContainer } from "@/components/projects";
import { SkillsContainer } from "@/components/skills";
import { StoriesContainer } from "@/components/stories";
import { ExperimentsContainer } from "@/components/experiments";
import { OpenPRsContainer } from "@/components/open-prs";
import { EducationContainer } from "@/components/education";
import { useEffect } from "react";
import { BioCard } from "@/components/bio-card";
import EmailContact from "@/components/email-contact";
import { Dot, Download } from "lucide-react";
import { sections } from "@/constants";
import { SectionNav } from "@/components/section-nav";

const NAV_SECTIONS = [
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "stories", label: "Stories" },
    { id: "experiments", label: "Experiments" },
    { id: "open-source", label: "Open Source" },
    { id: "projects", label: "Built for fun" },
    { id: "education", label: "Education" },
];

export function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="z-10 w-[90vw] lg:w-[50vw] xl:w-[min(94vw,1320px)] 2xl:w-[min(90vw,1640px)] flex flex-col gap-10 xl:grid xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-16 2xl:grid-cols-[440px_minmax(0,1fr)] 2xl:gap-24 xl:items-start">
            <aside
                className="flex flex-col gap-10 xl:gap-8 xl:sticky xl:top-14 xl:h-[calc(100vh-5.5rem)]"
            >
                <div className="z-10 w-full flex flex-col items-center xl:items-start gap-4 xl:gap-6">
                    <div className="text-3xl md:text-4xl font-bold select-none">
                        Rahul Baradol
                    </div>

                    {/* <div className="text-sm md:text-base px-4 text-center text-muted-foreground flex flex-row flex-wrap items-center justify-center gap-1 select-none">
                        <span>I&apos;m a software</span> <WobbleText>engineer</WobbleText> <span>— frontend, backend, open source, and a fingerstyle</span> <WobbleText>guitarist</WobbleText>
                    </div> */}

                    <div className="flex mt-2 md:mt-0 px-4.5 xl:px-0 flex-row flex-wrap items-center justify-center xl:justify-start gap-1 xl:gap-x-6 xl:gap-y-3">
                        <a
                            href="https://www.linkedin.com/in/rahul-baradol/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <img src="/linkedin.webp" alt="LinkedIn" className="h-3.5 w-3.5 object-contain" />
                            LinkedIn
                        </a>
                        <Dot className="opacity-25 w-5 h-5 xl:hidden" />
                        <a
                            href="https://github.com/Rahul-Baradol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <img src="/github.webp" alt="GitHub" className="h-3.5 w-3.5 object-contain rounded-full" />
                            GitHub
                        </a>
                        <Dot className="opacity-25 w-5 h-5 xl:hidden" />
                        <a
                            href="https://x.com/rahulbaradol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <img src="/x.webp" alt="X" className="h-3.5 w-3.5 object-contain rounded-full" />
                            Twitter
                        </a>
                        <Dot className="opacity-25 w-5 h-5 xl:hidden" />
                        <a
                            href="/Rahul-Baradol.pdf"
                            download
                            className="inline-flex items-center gap-1.5 text-xs rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                        >
                            <Download className="h-3.5 w-3.5" />
                            CV
                        </a>
                        <Dot className="opacity-25 w-5 h-5 xl:hidden" />
                        <EmailContact />
                    </div>
                </div>

                <BioCard />

            </aside>

            <SectionNav sections={NAV_SECTIONS} />

            <main className="min-w-0 flex flex-col gap-10 xl:gap-14">
                <section id="experience">
                    <ExperienceContainer
                        snaps={sections}
                    />
                </section>

                <section id="skills">
                    <SkillsContainer />
                </section>

                <div className="flex flex-col gap-10 2xl:grid 2xl:grid-cols-2 2xl:gap-8 2xl:items-start">
                    <section id="stories">
                        <StoriesContainer />
                    </section>

                    <section id="experiments">
                        <ExperimentsContainer />
                    </section>
                </div>

                {/* <DevTipsCard /> */}

                <section id="open-source">
                    <OpenPRsContainer />
                </section>

                <section id="projects">
                    <ProjectsContainer
                        projects={[
                            {
                                title: "Signature",
                                videoDemoUrl: "/signature.mp4",
                                posterUrl: "/signature-poster.webp",
                                story: "A platform to visualize and create music.",
                                websiteUrl: "https://signature.rahulbaradol.in/",
                                githubUrl: "https://github.com/Rahul-Baradol/signature",
                                linkedinUrl: "https://www.linkedin.com/posts/rahul-baradol_so-i-listen-to-songs-a-lot-and-thought-activity-7376004232765722624-hx_M?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEX65n8BwCmiX146yfLfYwDy_g61M6mYJ8I",
                                blogUrl: "/blog/breaking-down-signature-28e9b0d2904e"
                            },
                            {
                                title: "Resonance",
                                videoDemoUrl: "/resonance.mov",
                                posterUrl: "/resonance-poster.webp",
                                websiteUrl: "https://resonating.vercel.app/",
                                story: "What if I lose all my spotify songs? Need a backup system for it, which periodically saves my songs and playlists.",
                                githubUrl: "https://github.com/Rahul-Baradol/resonance"
                            },
                            // {
                            //     title: "Flow Puzzle Solver",
                            //     videoDemoUrl: "/flow-puzzle-solver.mov",
                            //     posterUrl: "/flow-poster.webp",
                            //     websiteUrl: "https://flowpuzzlesolver.vercel.app/",
                            //     story: "Have you played flow-free mobile before? They offer a set of interesting puzzles to solve... But for me? It felt tedious... So I built a solver for me :)",
                            //     githubUrl: "https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React",
                            // },
                        ]}
                    />
                </section>

                <section id="education">
                    <EducationContainer
                        institution="PES University"
                        degree="B.Tech in Computer Science"
                        timeline="2022 - 2026"
                    />
                </section>
            </main>
        </div>
    )
}