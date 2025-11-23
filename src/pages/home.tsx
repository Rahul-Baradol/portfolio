import { SnipSnapContainer } from "@/components/snip-snap";
import { SpotifyCard } from "@/components/spotify-card";
import { motion } from "motion/react";
import { TechBadge } from "@/components/tech-badges";
import { ExperienceContainer } from "@/components/experience-card";

export function Home() {
    return (
        <div className="p-10 relative w-screen min-h-screen flex flex-col gap-5 items-center bg-black text-white">
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
                    <div className="text-xs sm:text-sm">crafting fast, reliable, and scalable web apps — using</div>

                    <TechBadge redirect_url="https://www.typescriptlang.org/" image_url="/ts.png" tech="Typescript" />
                    <TechBadge redirect_url="https://reactjs.org/" image_url="/react.png" tech="React" />
                    <TechBadge redirect_url="https://nextjs.org/" image_url="/nextjs.jpeg" tech="Next.js" />
                    <TechBadge redirect_url="https://fastapi.tiangolo.com/" image_url="/fastapi.png" tech="FastAPI" />
                    <TechBadge redirect_url="https://golang.org/" image_url="/go.png" tech="Go" size={16} /> <div>and</div>
                    <TechBadge redirect_url="https://nodejs.org/" image_url="/node.png" tech="Node.js" size={20} />
                    {/* <div className="text-xs sm:text-sm">"</div> */}
                </blockquote>
            </motion.div>

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
                            { redirect_url: "https://fastapi.tiangolo.com/", image_url: "/fastapi.png", tech: "FastAPI" }
                        ],
                        bulletPoints: [
                            "Developed and maintained scalable web applications using TypeScript, React, and FastAPI, enhancing user experience and performance.",
                            "Collaborated with cross-functional teams to design and implement new features, resulting in a 20% increase in user engagement.",
                            "Optimized backend services for improved response times, reducing latency by 30% through efficient database queries and caching strategies."
                        ],
                        role: "Full stack",
                        active: true
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
                            "Improved performance by identifying and eliminating redundant database writes, reducing write IOPS by 87% (from 1600 to 200 ops/sec) and lowering CPU utilization from 70% to 20%.",
                            "Revived a critical data ingestion pipeline for a major bank, achieving 99.9% user coverage",
                            "Diagnosed a bug and restored a bank's data extraction funnel, fixing 300K workflows."
                        ],
                        role: "Backend Developer Intern",
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
                            { redirect_url: "https://fastapi.tiangolo.com/", image_url: "/fastapi.png", tech: "FastAPI" }
                        ],
                        bulletPoints: [
                            "Owned end-to-end development of the chat platform, designed to handle medical science queries",
                            "Led the development of user-facing web application using Nextjs, Tailwind CSS and ShadCN, ensuring responsive and accessible UI",
                            "Built the FastAPI-based backend, enabling structured query handling and real-time responses."
                        ],
                        role: "Full stack",
                        active: false
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