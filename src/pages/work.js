import GitHubCard from '@/components/GitHub'
import React, { useEffect } from 'react'
import { flowpuzzlesolver, github, nodejs, reactjs } from '@/assets'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import Image from 'next/image'
import styles from '../styles/ProfileCard.module.css'
import { leetCodeIcon, codeChefIcon } from '@/assets'

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
        <div className='text-3xl font-thin mt-1 mb-4'>Projects</div>
        <GitHubCard title="GitHub" 
                      description="Checkout my GitHub profile to know more about my work" 
                      link="https://github.com/Rahul-Baradol" 
                      logo={github}/>

        <div className={`w-[90vw] m-10 relative top-3 grid grid-cols-1 md:grid-cols-2 gap-3`}>
          <ProjectCard  title="Flow Puzzle Solver" 

                        description="You must have played the game Flow Free on Mobile! Well this app solves the puzzles 
                        from the game Flow Free!"

                        technologies={[[reactjs, "React JS"], [nodejs, "Node JS"]]}
                        
                        projectLinks={[["https://flowpuzzlesolver.vercel.app/", flowpuzzlesolver, "F"], 
                                        ["https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React", github, "GitHub"]]}
                        />
        </div>
        
        <div className='text-3xl font-thin mt-1 mb-4'>Profiles</div>
        <div className="w-fit h-fit flex md:flex-row flex-col">
          <div className={`${styles.card} flex md:flex-row flex-col justify-between items-center p-6 border-2 w-[80vw] md:w-[60vw] h-fit gap-10 rounded-3xl`}>
              <div className="desc w-[60vw] md:w-[40vw] h-fit flex items-center font-light">
                  If you have participated in a contest, you would be knowing that feeling of AC.
                  And if you are also like me who enjoys solving those problems late night, grinding 
                  for the AC, then you can checkout my profiles where I am very active! 
              </div>
              <div className="links flex md:flex-col flex-row items-center gap-6">
                <a href="https://leetcode.com/rahul_baradol/" target='_blank'>
                  <Image  src={leetCodeIcon}
                          className='sm:w-[3vw] h-auto'
                          alt={"LC"}
                  />
                </a>

                <a href="https://www.codechef.com/users/rahul227" target='_blank'>
                  <Image  src={codeChefIcon}
                          className='sm:w-[10vw] h-auto'
                          alt={"CC"}
                  />
                </a>

              </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default work