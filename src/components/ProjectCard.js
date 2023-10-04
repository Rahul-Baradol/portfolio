import React from 'react'
import Image from 'next/image'

const ProjectCard = (props) => {
    // props.technologies takes an array of [logo, alt for the logo]
    // props.projectLinks takes an array of [link, logo, alt for the logo]

  return (
    <>
        <style jsx>
            {`
                .card {
                    border-left: 2px solid white;
                    border-top: 2px solid white;
                    background-image: linear-gradient(rgb(17, 16, 16), rgb(46, 45, 45));
                }
            `}
        </style>

        <div className={`card p-4 px-6 pb-10 w-[90vw] md:w-[45vw] h-auto flex flex-col items-start justify-start gap-4 rounded-3xl`}>
            <div className={`text-3xl`}> {props.title} </div>
            <div className={`flex flex-row justify-between w-[78vw] md:w-[40vw]`}>
                <div className='flex gap-2'>
                    {
                        props.technologies.map((value, index)=>{
                            return <Image key={index}  src={value[0]}
                                            width={20}
                                            height={20}
                                            alt={value[1]}
                            />
                        }) 
                    }
                </div>
                <div className='flex gap-2'>
                    {
                        props.projectLinks.map((value, index)=>{
                            return <a key={index} href={value[0]} className='w-5 h-auto rounded-xl' target='_blank'>
                                <Image  src={value[1]}
                                        width={20}
                                        height={20}
                                        alt={value[2]}
                                />
                            </a>
                        })
                    }
                </div>
            </div>
            <div>
                {props.description}
            </div>
        </div>
    </>
  )
}

export default ProjectCard