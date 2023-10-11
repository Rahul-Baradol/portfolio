import React, { useEffect } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";
import {Code} from "@nextui-org/react";

const Work = (props) => {
  useEffect(()=>{
    props.setNonHeroVisible(1);
    props.setNonHeroToggled(1);
    props.setIntro1("I am...");
    props.setIntro2("Rahul Baradol");
    props.setDesign1("text-sm");
    props.setDesign2("text-violet-800");
  }, [props])

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
          <div className="w-[100vw] items-center md:justify-center h-fit flex md:flex-row flex-col gap-4">
            <Card className="dark w-[85vw] md:w-[40vw]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">LeetCode</p>
                    <p className="text-small text-default-500">@rahul_baradol</p>
                  </div>
                </CardHeader>
                <Divider/>
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

            <Card className="dark w-[85vw] md:w-[40vw]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">CodeChef</p>
                  <p className="text-small text-default-500">@rahul227</p>
                </div>
              </CardHeader>
            <Divider/>
            <CardBody>
              <p>Love solving those ad-hoc problems? Then do connect with me on CodeChef discuss!</p>
            </CardBody>
            <CardFooter>
              <Link
                isExternal
                href="https://www.codechef.com/users/rahul227"
              >
                CodeChef
              </Link>
              
            </CardFooter>
          </Card>
          </div>
        </div>
          
        <Divider className="my-2 w-[70%] bg-slate-800" />

        <div className="flex flex-col items-center p-2 m-2">
          <div className='text-3xl font-thin mt-1 mb-4'>Projects</div>
          <div className={`w-[90vw] m-10 relative top-3 grid grid-cols-1 md:grid-cols-2 gap-10`}>
            {
              props.projects.map((project, projectId) => {
                return <Card key={projectId} className="w-[90vw] md:w-[45vw] dark ">
                          <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                              <p className="text-md">{project.title}</p>
                              <div className='flex flex-row justify-between w-[83vw] md:w-[42vw]'>
                                <a href={`${project.siteLink}`} target='_blank' className="text-small text-default-500">{project.siteLinkDesc}</a>
                                <Code color="primary">{project.personal ? "Personal" : "Team"}</Code>
                              </div>
                            </div>
                          </CardHeader>
                          <Divider/>
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
                            <div className='flex gap-2'>
                              {
                                project.technologies.map((value, index)=>{
                                  return <Code key={index} color={value[1]}>{value[0]}</Code>
                                })
                              }
                            </div>
                          </CardFooter>
                    </Card>
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  let resProjects = await fetch('https://rahulbaradol.vercel.app/api/projects');
  let projectsDb = await resProjects.json();
  let projects = projectsDb.projects;
  return {
    props: { projects }
  }
}

export default Work