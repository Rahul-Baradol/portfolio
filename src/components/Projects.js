import { Card, CardBody, CardFooter, CardHeader, Code, Divider } from '@nextui-org/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { Link } from "@nextui-org/react";
import React, { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation';

const poppins = Poppins({
   weight: '100',
   subsets: ['latin'],
})

function Projects(props) {
   const projectRef = useRef(null);
   const inViewProject = useInView(projectRef, { once: true });
   const mainControlsProject = useAnimation();

   useEffect(() => {
      if (inViewProject) {
         mainControlsProject.start("visible");
      }
   }, [inViewProject, mainControlsProject])

   return (
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
   )
}

export default Projects