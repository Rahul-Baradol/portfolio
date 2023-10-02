import ProfileCard from '@/components/ProfileCard'
import React, { useEffect } from 'react'
import { flowpuzzlesolver, github, nodejs, reactjs } from '@/assets'
import ProjectCard from '@/components/ProjectCard'

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
      <main className="flex flex-col items-center h-[90vh] w-[100vw] relative top-[15vh]">
        <div className='text-3xl font-thin mt-1 mb-4'>Projects</div>
        <ProfileCard title="GitHub" 
                      description="Checkout my GitHub profile to know more about my work" 
                      link="https://github.com/Rahul-Baradol" 
                      logo={github}/>

        <div className={`w-[90vw] relative top-3 grid grid-cols-1 md:grid-cols-2 gap-3`}>
          <ProjectCard  title="Flow Puzzle Solver" 

                        description="You must have played the game Flow Free on Mobile! Well this app solves the puzzles 
                        from the game Flow Free!"

                        technologies={[[reactjs, "React JS"], [nodejs, "Node JS"]]}
                        
                        projectLinks={[["https://flowpuzzlesolver.vercel.app/", flowpuzzlesolver, "F"], 
                                        ["https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React", github, "GitHub"]]}
                        />
        </div>
      </main>
    </>
  )
}

export default work