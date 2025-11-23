import { SnipSnapContainer } from "@/components/snip-snap";
import { SpotifyCard } from "@/components/spotify-card";
import { motion } from "motion/react";
import { TechBadge } from "@/components/tech-badges";
import { ExperienceContainer } from "@/components/experience";
import { ProjectsContainer } from "@/components/projects";

export function Home() {
    return (
        <div className="p-10 relative w-screen min-h-screen flex flex-col gap-10 items-center bg-black text-white">
            <div className="w-screen flex flex-col items-center gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Rahul Baradol
                </motion.div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className=" w-[90vw] lg:w-[50vw] text-lg md:text-xl text-muted-foreground flex flex-col gap-1 items-center"
                >
                    <blockquote className="text-sm md:text-base italic text-gray-400 flex flex-row flex-wrap items-center justify-center gap-2">
                        <div className="text-xs sm:text-sm">building fast, reliable, and scalable web apps — using</div>

                        <TechBadge redirect_url="https://www.typescriptlang.org/" image_url="/ts.png" tech="Typescript" />
                        <TechBadge redirect_url="https://reactjs.org/" image_url="/react.png" tech="React" />
                        <TechBadge redirect_url="https://nextjs.org/" image_url="/nextjs.jpeg" tech="Next.js" />
                        <TechBadge redirect_url="https://fastapi.tiangolo.com/" image_url="/fastapi.png" tech="FastAPI" />
                        <TechBadge redirect_url="https://golang.org/" image_url="/go.png" tech="Go" size={16} /> <div>and</div>
                        <TechBadge redirect_url="https://nodejs.org/" image_url="/node.png" tech="Node.js" size={20} />
                    </blockquote>
                </motion.div>
            </div>

            <SpotifyCard />

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
                        expanded: true
                    },
                    {
                        companyName: "CRED",
                        companyLogo: "/cred.png",
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
                        active: false
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
                        active: false
                    }
                ]}
            />

            <ProjectsContainer 
                projects={[
                    {
                        title: "Timesignature",
                        videoDemoUrl: "/signature.mp4",
                        story: "A realtime music visualiser that reacts to beat signatures and tempo.",
                        websiteUrl: "https://timesignature.in",
                        githubUrl: "https://github.com/Rahul-Baradol/signature",
                        linkedinUrl: "https://www.linkedin.com/posts/rahul-baradol_so-i-listen-to-songs-a-lot-and-thought-activity-7376004232765722624-hx_M?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEX65n8BwCmiX146yfLfYwDy_g61M6mYJ8I"
                    },
                    {
                        title: "Flow Puzzle Solver",
                        videoDemoUrl: "/flow-puzzle-solver.mov",
                        websiteUrl: "https://flowpuzzlesolver.vercel.app/",
                        story: "Have you played flow-free mobile before? They offer a set of interesting puzzles to solve... But for me? It felt tedious... So I built a solver for me :)",
                        githubUrl: "https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React",
                    }
                ]}
            />

            <SnipSnapContainer
                snaps={[
                    {
                        title: "Building a High-Performance E-Commerce Platform: A Deep Dive into Scalability and Speed",
                        description: "Explore the journey of developing a high-performance e-commerce platform, focusing on scalability, speed optimization, and enhancing user experience through cutting-edge web technologies.",
                        href: "/snips/high-performance-ecommerce"
                    },
                    {
                        title: "Implementing Real-Time Features in Web Applications",
                        description: "Learn how to integrate real-time functionalities into your web applications using WebSockets and other modern technologies.",
                        href: "/snips/real-time-features"
                    },
                    {
                        title: "A Comprehensive Guide to Progressive Web Apps",
                        description: "Discover the key principles of Progressive Web Apps (PWAs) and how to implement them in your projects.",
                        href: "/snips/progressive-web-apps"
                    }
                ]}
            />
        </div>
    )
}