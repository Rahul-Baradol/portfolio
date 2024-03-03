import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { motion, useAnimation, useInView } from 'framer-motion';
import { Code } from "@nextui-org/react";
import { TypeAnimation } from 'react-type-animation';

function WorkRecipe(props) {
    const projectRef = useRef(null);
    const inViewProject = useInView(projectRef, { once: true });
    const mainControlsProject = useAnimation();

    const profileRefLeetcode = useRef(null);
    const inViewLeetcode = useInView(profileRefLeetcode, { once: true });
    const mainControlsLeetcode = useAnimation();

    const profileRefCodeChef = useRef(null);
    const inViewCodeChef = useInView(profileRefCodeChef, { once: true });
    const mainControlsCodeChef = useAnimation();

    useEffect(() => {
        if (inViewProject) {
            mainControlsProject.start("visible");
        }

        if (inViewLeetcode) {
            mainControlsLeetcode.start("visible");
        }

        if (inViewCodeChef) {
            mainControlsCodeChef.start("visible");
        }
    }, [inViewProject, inViewLeetcode, inViewCodeChef, mainControlsProject, mainControlsCodeChef, mainControlsLeetcode])

    return (
        <>
            <main className="mb-32 flex flex-col items-center h-fit w-[100vw] ">
                <div className='flex flex-col p-6 items-center m-2'>
                    <div className='text-3xl font-thin mt-1 mb-4 text-white'>
                        <TypeAnimation
                            sequence={[
                                'Experience'
                            ]}
                            cursor={false}
                            speed={10}
                        />
                    </div>
                    <div className="w-[100vw] items-center md:justify-center h-fit flex md:flex-row flex-col gap-4">
                        <motion.div
                            ref={profileRefLeetcode}
                            variants={{
                                hidden: { opacity: 0, x: -40 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            animate={mainControlsLeetcode}
                            transition={{ duration: 1 }}
                        >
                            <Card className="dark w-[85vw] md:w-[40vw]">
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-md">Software Development Intern</p>
                                        <p className="text-small text-default-500">@CognitiveLab</p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <p>If you are like me who loves to sit late night, grinding those problems, then do connect with me on Leetcode where I am very active!</p>
                                </CardBody>
                                <CardFooter>
                                    <Link
                                        isExternal
                                        href="https://leetcode.com/rahul_baradol/"
                                    >
                                        Leetcode
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                <Divider className="my-2 w-[70%] bg-slate-800" />

                <div className="flex flex-col items-center p-2 m-2">
                    <div className='flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white'>
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