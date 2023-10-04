import React, { useEffect } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import Image from 'next/image'
import styles from '../styles/ProfileCard.module.css'
import Divider from '@/components/Divider'
import { workInfo } from '@/contants/contants'

const work = (props) => {
  useEffect(()=>{
    props.setNonHeroVisible(1);
    props.setNonHeroToggled(1);
    props.setIntro1("I am...");
    props.setIntro2("Rahul Baradol");
    props.setDesign1("text-sm");
    props.setDesign2("text-violet-800");
  })

  return (
    <>
      <style jsx>
        {`
            .desc {
              font-size: max(1vw, 12px);
            }
        `}
      </style>

      <main className="mb-32 flex flex-col items-center h-fit w-[100vw] relative top-[15vh]">
        <div className='flex flex-col p-6 items-center m-2'>
          <div className='text-3xl font-thin mt-1 mb-4'>Profiles</div>
          <div className="w-fit h-fit flex md:flex-row flex-col gap-4">
            <div className={`${styles.card} flex md:flex-row flex-col justify-between items-center p-14 border-2 w-[80vw] md:w-[40vw] h-fit gap-10 rounded-3xl`}>
                <div className="links flex md:flex-col flex-row items-center gap-6">
                  <a href={workInfo.profile.github.link} target='_blank'>
                    <Image  src={workInfo.profile.github.logo}
                            className={`${styles.githubLogo}`}
                            alt={"GitHub"}
                    />
                  </a>
                </div>
                <div className="desc w-[60vw] md:w-[40vw] h-fit flex items-center font-light">
                    {workInfo.profile.github.description}
                </div>
            </div>
            
            <div className={`${styles.card} flex md:flex-row flex-col justify-between items-center p-10 border-2 w-[80vw] md:w-[40vw] h-fit gap-10 rounded-3xl`}>
                <div className="desc w-[60vw] md:w-[40vw] h-fit flex items-center font-light">
                    {workInfo.profile.cpProfile.description}
                </div>
                <div className="links flex md:flex-col flex-row items-center gap-6">
                  <a href={workInfo.profile.cpProfile.leetcode.link} target='_blank'>
                    <Image  src={workInfo.profile.cpProfile.leetcode.logo}
                            className='sm:w-[3vw] h-auto'
                            alt={"LC"}
                    />
                  </a>

                  <a href={workInfo.profile.cpProfile.codechef.link} target='_blank'>
                    <Image  src={workInfo.profile.cpProfile.codechef.logo}
                            className='sm:w-[10vw] h-auto'
                            alt={"CC"}
                    />
                  </a>

                </div>
            </div>
          </div>
        </div>

        <Divider />
          
        <div className="flex flex-col items-center p-2 m-2">
          <div className='text-3xl font-thin mt-1 mb-4'>Projects</div>
          <div className={`w-[90vw] m-10 relative top-3 grid grid-cols-1 md:grid-cols-2 gap-10`}>
            {
              workInfo.projects.map((project, projectId) => {
                return <ProjectCard 
                      key={projectId}
                      title={project.title}
                      description={project.description}
                      technologies={project.technologies}
                      projectLinks={project.projectLinks}
                />
              })
            }
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default work