import { Card, CardBody, CardFooter, CardHeader, Code, Divider } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import Link from "next/link";
import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const poppins = Poppins({
   weight: '100',
   subsets: ['latin'],
})

function Projects(props) {
   return (
      <div className="flex flex-col items-center p-2">
         <div className={`${poppins.className} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
            <TypeAnimation
               sequence={[
                  'Projects for FUN'
               ]}
               cursor={false}
               speed={10}
            />
         </div>
         <div className={`w-fit m-1 relative grid grid-cols-1 md:grid-cols-2 gap-8`}>
            {
               props.projects.map((project, projectId) => {
                  return <motion.div
                     key={projectId}
                     initial={{
                        opacity: 0,
                        x: projectId % 2 == 0 ? -50 : 50
                     }}

                     whileInView={{
                        opacity: 1,
                        x: 0
                     }}

                     viewport={{ once: true }}
                     transition={{ duration: 1 }}
                     className='h-[full]'
                  >
                     <Card className="w-[90vw] md:w-[45vw] dark h-full">
                        <CardHeader className="flex gap-3">
                           <div className="flex flex-col">
                              <p className="text-md">{project.title}</p>
                              <div className='flex flex-row justify-between w-[83vw] md:w-[42vw]'>
                                 <Link 
                                    scroll={true}
                                    href={`${project.siteLink}`} 
                                    target={project.tabTarget}
                                    className="text-small text-default-500"
                                 >
                                    {project.siteLinkDesc}
                                 </Link>
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
                              scroll={true}
                              href={`${project.githubLink}`}
                              target='_blank'
                              className='text-[#0070ef]'
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