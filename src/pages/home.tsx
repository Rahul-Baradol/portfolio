import { DevTipsCard } from "@/components/dev-tips-card";
import { motion } from "motion/react";
import { ExperienceContainer } from "@/components/experience";
import { ProjectsContainer } from "@/components/projects";
import { StoriesContainer } from "@/components/stories";
import { OpenPRsContainer } from "@/components/open-prs";
import { EducationContainer } from "@/components/education";
import { useEffect } from "react";
import { BioCard } from "@/components/bio-card";
import { WobbleText } from "@/components/wobble-text";
import EmailContact from "@/components/email-contact";
import { Dot, Download } from "lucide-react";

export function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="z-10 w-screen flex flex-col items-center gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-3xl md:text-4xl font-bold select-none"
                >
                    Rahul Baradol
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-sm md:text-base px-4 text-center text-muted-foreground flex flex-row flex-wrap items-center justify-center gap-1 select-none"
                >
                    <span>I&apos;m a software</span> <WobbleText>engineer</WobbleText> <span>— frontend, backend, open source, and a fingerstyle</span> <WobbleText>guitarist</WobbleText>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex px-4 flex-row flex-wrap items-center justify-center gap-1"
                >
                    <a
                        href="https://www.linkedin.com/in/rahul-baradol/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <img src="/linkedin.png" alt="LinkedIn" className="h-3.5 w-3.5 object-contain" />
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
                        <img src="/x.png" alt="X" className="h-3.5 w-3.5 object-contain rounded-full" />
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
                </motion.div>
            </div>

            <BioCard />

            <StoriesContainer />

            <DevTipsCard />

            <ExperienceContainer
                snaps={[
                    {
                        companyName: "Alaiy",
                        companyLogo: "/alaiy.png",
                        websiteUrl: "https://alaiy.com",
                        timeline: "July 2025 - Present",
                        linkedinUrl: "https://www.linkedin.com/company/alaiy/posts/?feedView=all",
                        techBadges: [
                            { redirect_url: "https://www.typescriptlang.org/", image_url: "/ts.png", tech: "Typescript" },
                            { redirect_url: "https://reactjs.org/", image_url: "/react.png", tech: "React" },
                            { redirect_url: "https://www.python.org/", image_url: "/python.png", tech: "Python" },
                            { redirect_url: "https://fastapi.tiangolo.com/", image_url: "/fastapi.png", tech: "FastAPI" }
                        ],
                        bulletPoints: [
                            "Enhanced accessibility and reduced client bandwidth usage by 95%.",
                            "Improved UX by reducing page load from 8-10s to under 1s",
                            "Built a high-traffic campaigning site for a leading Indian movie-production house, handling peaks of 8,300 users/min for a blockbuster movie launch",
                        ],
                        role: "full stack / intern",
                        active: true,
                        expanded: true,
                    },
                    {
                        companyName: "CRED",
                        companyLogo: "/cred.jpg",
                        websiteUrl: "https://cred.club",
                        timeline: "July 2024 - June 2025",
                        linkedinUrl: "https://www.linkedin.com/company/credapp/",
                        techBadges: [
                            { redirect_url: "https://www.java.com/en/", image_url: "/java.png", tech: "Java" },
                            { redirect_url: "https://spring.io/projects/spring-boot/", image_url: "/springboot.png", tech: "Spring Boot" },
                            { redirect_url: "https://www.python.org/", image_url: "/python.png", tech: "Python" },
                            { redirect_url: "https://golang.org/", image_url: "/go.png", tech: "Go", size: 17 },
                            { redirect_url: "https://www.mysql.com/", image_url: "/mysql.png", tech: "MySQL" },
                        ],
                        bulletPoints: [
                            "Optimized database performance, reducing system load by eliminating redundant writes and cutting CPU usage from 70% to 20%",
                            "Restored a key bank data pipeline, ensuring 99.9% of users were served reliably.",
                            "Fixed a critical bug in a bank's data extraction funnel, restoring 300K workflows."
                        ],
                        role: "backend developer / intern",
                        active: false,
                        expanded: true,
                    },
                    {
                        companyName: "CognitiveLab",
                        companyLogo: "/cognitivelab.png",
                        websiteUrl: "https://www.cognitivelab.in/",
                        timeline: "April 2024 - May 2024",
                        linkedinUrl: "https://www.linkedin.com/company/cognitivelabai/",
                        techBadges: [
                            { redirect_url: "https://www.typescriptlang.org/", image_url: "/ts.png", tech: "Typescript" },
                            { redirect_url: "https://reactjs.org/", image_url: "/react.png", tech: "React" },
                            { redirect_url: "https://nextjs.org/", image_url: "/nextjs.jpeg", tech: "Next.js" },
                            { redirect_url: "https://www.python.org/", image_url: "/python.png", tech: "Python" },
                            { redirect_url: "https://fastapi.tiangolo.com/", image_url: "/fastapi.png", tech: "FastAPI" }
                        ],
                        bulletPoints: [
                            "Owned end-to-end development of the chat platform, designed to handle medical science queries",
                            "Led the development of user-facing web application, ensuring responsive and accessible UI",
                            "Developed a FastAPI backend that supports structured queries and delivers real-time responses."
                        ],
                        role: "full stack / intern",
                        active: false,
                        expanded: true,
                    }
                ]}
            />

            <OpenPRsContainer />

            <EducationContainer
                institution="PES University"
                degree="B.Tech in Computer Science"
                timeline="2022 - 2026"
            />

            <ProjectsContainer
                projects={[
                    {
                        title: "Timesignature",
                        videoDemoUrl: "/signature.mp4",
                        posterUrl: "/signature-poster.jpg",
                        story: "A realtime music visualiser that reacts to beat signatures and tempo.",
                        websiteUrl: "https://timesignature.in",
                        githubUrl: "https://github.com/Rahul-Baradol/signature",
                        linkedinUrl: "https://www.linkedin.com/posts/rahul-baradol_so-i-listen-to-songs-a-lot-and-thought-activity-7376004232765722624-hx_M?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEX65n8BwCmiX146yfLfYwDy_g61M6mYJ8I"
                    },
                    {
                        title: "Flow Puzzle Solver",
                        videoDemoUrl: "/flow-puzzle-solver.mov",
                        posterUrl: "/flow-poster.jpg",
                        websiteUrl: "https://flowpuzzlesolver.vercel.app/",
                        story: "Have you played flow-free mobile before? They offer a set of interesting puzzles to solve... But for me? It felt tedious... So I built a solver for me :)",
                        githubUrl: "https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React",
                    },
                    {
                        title: "Resonance",
                        videoDemoUrl: "/resonance.mov",
                        posterUrl: "/resonance-poster.jpg",
                        websiteUrl: "https://resonating.vercel.app/",
                        story: "What if I lose all my spotify songs? Need a backup system for it, which periodically saves my songs and playlists.",
                        githubUrl: "https://github.com/Rahul-Baradol/resonance"
                    }
                ]}
            />

        </>
    )
}