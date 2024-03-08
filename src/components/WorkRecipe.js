import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { motion, useAnimation, useInView } from 'framer-motion';
import { Code } from "@nextui-org/react";
import { TypeAnimation } from 'react-type-animation';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    weight: '100',
    subsets: ['latin'],
})

function WorkRecipe(props) {
    const projectRef = useRef(null);
    const inViewProject = useInView(projectRef, { once: true });
    const mainControlsProject = useAnimation();

    useEffect(() => {
        if (inViewProject) {
            mainControlsProject.start("visible");
        }
    }, [inViewProject, mainControlsProject])

    return (
        <>
            <main className="mb-10 flex flex-col items-center h-fit w-[100vw] ">
                <div className='flex flex-col p-6 items-center m-2'>
                    <div className={`${poppins.className} text-3xl font-thin mt-1 mb-4 text-white`}>
                        <TypeAnimation
                            sequence={[
                                'Experience'
                            ]}
                            cursor={false}
                            speed={10}
                        />
                    </div>
                    <div className="w-[100vw] items-center md:justify-center h-fit flex md:flex-row flex-col gap-4 bg-[rgb(24 24 27)] text-white border-0">
                        <VerticalTimeline lineColor="white">
                            <VerticalTimelineElement
                                contentStyle={{
                                    background: "transparent",
                                    color: "#fff",
                                    border: "2px solid #2d2c34",
                                    borderRadius: "20px",
                                    boxShadow: "0 0 18px 1px rgb(91 33 182)",
                                }}
                                contentArrowStyle={{ borderRight: "7px solid  #1d1836" }}
                                date="January - February"
                                iconStyle={{ background: 'black' }}
                                icon={<>
                                    <div className="w-full h-full bg-violet-800 border-2 rounded-full"></div>
                                </>}
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className='text-white text-[14px] md:text-[20px] font-bold'>Software Development Intern @ CognitiveLab</h3>
                                    <div className="flex flex-row flex-wrap gap-2">
                                        <Code color="primary">Python</Code>
                                        <Code color="primary">SvelteKit</Code>
                                        <Code color="primary">Selenium</Code>
                                        <Code color="primary">Azure</Code>
                                    </div>
                                    <p
                                        className='text-white text-[16px] font-semibold pt-2'
                                        style={{ margin: 0 }}
                                    >
                                        Implemented Authentication System using Auth.js by using
                                        HuggingFaceChatUI as the template, and also wrote a bunch of Web Scrapers
                                        using Selenium and Beautiful Soup to gather images in an attempt to train a
                                        vision model
                                    </p>

                                    <Link className="mt-2" showAnchorIcon target="_blank" href="/assets/Certificates/CognitiveLab.png" color="primary">
                                        Show Certificate
                                    </Link>
                                </div>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </div>
                </div>

                <Divider className="my-2 w-[70%] bg-slate-800" />

                <div className="flex flex-col items-center p-2 m-2">
                    <div className={`${[poppins.className]} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
                        <TypeAnimation
                            sequence={[
                                'Services Offered'
                            ]}
                            cursor={false}
                            speed={10}
                        />
                    </div>
                    <div ref={projectRef} className={`w-fit m-1 relative grid grid-cols-1 md:grid-cols-2 gap-8`}>
                        {
                            props.servicesOffered.map((project, projectId) => {
                                return <motion.div
                                    key={projectId}
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    initial="hidden"
                                    animate={mainControlsProject}
                                    transition={{ duration: 1 }}
                                    className='h-[full]'
                                >
                                    <Card className="w-[90vw] md:w-[45vw] dark h-full">
                                        <CardHeader className="flex gap-3">
                                            <div className="flex flex-col">
                                                <p className="text-md">{project.title}</p>
                                                <div className='flex flex-row justify-between w-[83vw] md:w-[42vw]'>
                                                    <a href={`${project.siteLink}`} target='_blank' className="text-small text-default-500">{project.siteLinkDesc}</a>
                                                    {/* <Code className='customCode flex justify-center items-center w-fit' color="primary">{project.personal ? "Personal" : "Team"}</Code> */}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <p>{project.description}</p>
                                        </CardBody>
                                        <CardFooter className='flex flex-row justify-between'>
                                            <Link
                                                isExternal
                                                href={`${project.githubLink}`}
                                            >
                                                Go to GitHub
                                            </Link>
                                            <div className='flex gap-2 scrollbar-hide min-w-[100px] overflow-scroll '>
                                                {
                                                    project.technologies.map((value, index) => {
                                                        return <Code className='ml-auto' key={index} color={value[1]}>{value[0]}</Code>
                                                    })
                                                }
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            })
                        }
                    </div>
                </div>

                <Divider className="my-2 w-[70%] bg-slate-800" />

                <div className="flex flex-col items-center p-2 m-2">
                    <div className={`${poppins.className} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
                        <TypeAnimation
                            sequence={[
                                'Projects'
                            ]}
                            cursor={false}
                            speed={10}
                        />
                    </div>
                    <div ref={projectRef} className={`w-fit m-1 relative grid grid-cols-1 md:grid-cols-2 gap-8`}>
                        {
                            props.projects.map((project, projectId) => {
                                return <motion.div
                                    key={projectId}
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    initial="hidden"
                                    animate={mainControlsProject}
                                    transition={{ duration: 1 }}
                                    className='h-[full]'
                                >
                                    <Card className="w-[90vw] md:w-[45vw] dark h-full">
                                        <CardHeader className="flex gap-3">
                                            <div className="flex flex-col">
                                                <p className="text-md">{project.title}</p>
                                                <div className='flex flex-row justify-between w-[83vw] md:w-[42vw]'>
                                                    <a href={`${project.siteLink}`} target='_blank' className="text-small text-default-500">{project.siteLinkDesc}</a>
                                                    {/* <Code className='customCode flex justify-center items-center w-fit' color="primary">{project.personal ? "Personal" : "Team"}</Code> */}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <p>{project.description}</p>
                                        </CardBody>
                                        <CardFooter className='flex flex-row justify-between'>
                                            <Link
                                                isExternal
                                                href={`${project.githubLink}`}
                                            >
                                                Go to GitHub
                                            </Link>
                                            <div className='flex gap-2 scrollbar-hide min-w-[100px] overflow-scroll '>
                                                {
                                                    project.technologies.map((value, index) => {
                                                        return <Code className='ml-auto' key={index} color={value[1]}>{value[0]}</Code>
                                                    })
                                                }
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default WorkRecipe;