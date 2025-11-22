import { SnipSnapContainer } from "@/components/snip-snap";
import { motion } from "motion/react";

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
                className="text-lg md:text-xl text-muted-foreground"
            >
                {/* <blockquote className="text-sm md:text-base italic text-gray-400"> */}
                "crafting fast, reliable, and scalable web apps"
                {/* </blockquote> */}
            </motion.div>

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