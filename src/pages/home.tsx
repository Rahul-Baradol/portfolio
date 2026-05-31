// import { DevTipsCard } from "@/components/dev-tips-card";
import { ExperienceContainer } from "@/components/experience";
import { ProjectsContainer } from "@/components/projects";
import { StoriesContainer } from "@/components/stories";
import { OpenPRsContainer } from "@/components/open-prs";
import { EducationContainer } from "@/components/education";
import { useEffect } from "react";
import { BioCard } from "@/components/bio-card";
import EmailContact from "@/components/email-contact";
import { Dot, Download } from "lucide-react";
import { sections } from "@/constants";

export function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="z-10 w-screen flex flex-col items-center gap-4">
                <div className="text-3xl md:text-4xl font-bold select-none">
                    Rahul Baradol
                </div>

                {/* <div className="text-sm md:text-base px-4 text-center text-muted-foreground flex flex-row flex-wrap items-center justify-center gap-1 select-none">
                    <span>I&apos;m a software</span> <WobbleText>engineer</WobbleText> <span>— frontend, backend, open source, and a fingerstyle</span> <WobbleText>guitarist</WobbleText>
                </div> */}

                <div className="flex px-4 flex-row flex-wrap items-center justify-center gap-1">
                    <a
                        href="https://www.linkedin.com/in/rahul-baradol/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <img src="/linkedin.webp" alt="LinkedIn" className="h-3.5 w-3.5 object-contain" />
                        LinkedIn
                    </a>
                    <Dot className="opacity-25 w-5 h-5" />
                    <a
                        href="https://github.com/Rahul-Baradol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <img src="/github.webp" alt="GitHub" className="h-3.5 w-3.5 object-contain rounded-full" />
                        GitHub
                    </a>
                    <Dot className="opacity-25 w-5 h-5" />
                    <a
                        href="https://x.com/rahulbaradol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <img src="/x.webp" alt="X" className="h-3.5 w-3.5 object-contain rounded-full" />
                        Twitter
                    </a>
                    <Dot className="opacity-25 w-5 h-5" />
                    <a
                        href="/Rahul-Baradol.pdf"
                        download
                        className="inline-flex items-center gap-1.5 text-xs rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                        <Download className="h-3.5 w-3.5" />
                        Resume
                    </a>
                    <Dot className="opacity-25 w-5 h-5" />
                    <EmailContact />
                </div>
            </div>

            <BioCard />

            <ExperienceContainer
                snaps={sections}
            />

            <StoriesContainer />

            {/* <DevTipsCard /> */}

            <OpenPRsContainer />

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
                        blogUrl: "https://medium.com/@rahul.baradol.14/breaking-down-signature-28e9b0d2904e"
                    },
                    {
                        title: "Resonance",
                        videoDemoUrl: "/resonance.mov",
                        posterUrl: "/resonance-poster.webp",
                        websiteUrl: "https://resonating.vercel.app/",
                        story: "What if I lose all my spotify songs? Need a backup system for it, which periodically saves my songs and playlists.",
                        githubUrl: "https://github.com/Rahul-Baradol/resonance"
                    },
                    {
                        title: "Flow Puzzle Solver",
                        videoDemoUrl: "/flow-puzzle-solver.mov",
                        posterUrl: "/flow-poster.webp",
                        websiteUrl: "https://flowpuzzlesolver.vercel.app/",
                        story: "Have you played flow-free mobile before? They offer a set of interesting puzzles to solve... But for me? It felt tedious... So I built a solver for me :)",
                        githubUrl: "https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React",
                    },
                ]}
            />

            <EducationContainer
                institution="PES University"
                degree="B.Tech in Computer Science"
                timeline="2022 - 2026"
            />

        </>
    )
}