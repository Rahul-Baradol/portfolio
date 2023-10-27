import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

const DockerIntro = ({ setIntro }) => {
    const [pullerDiv, setPullerDiv] = useState(false);
    const [runType, setRunType] = useState(false);
    
  return (
    <>
        <div className='p-4'>
            <div className='flex flex-col justify-start gap-2'>
                <TypeAnimation
                    preRenderFirstString={false}
                    sequence={[
                        'Welcome to my portfolio!\nLet\'s fire up the container for you!',
                        1000,
                        'root@client:/# docker run portfolio',
                        500,
                        'root@client:/# docker pull portfolio\n',
                        1400,
                        () => {
                            setTimeout(()=>{
                                setPullerDiv(true);
                                setTimeout(()=>{
                                    setRunType(true);
                                }, 2000)
                            }, 1000)
                        }
                    ]}
                    speed={60}
                    style={{ 
                        whiteSpace: 'pre-line',
                        fontSize: '1.2em' ,
                        color: 'white'
                    }}
                    deletionSpeed={80}
                    cursor={false}
                />
                {pullerDiv ? <div style={{
                    fontSize: '1.2em',
                    color: 'white'
                }}>
                    Using default tag: latest <br /> latest: pulling from server <br />
                </div> : <></>}

                {runType ? <TypeAnimation 
                    sequence={[
                        'root@client:/# docker run portfolio\n',
                        1000,
                        () => {
                            setIntro(false);
                        }
                    ]}
                    speed={60}
                    style={{ 
                        whiteSpace: 'pre-line',
                        fontSize: '1.2em' ,
                        color: 'white'
                    }}
                    cursor={false}
                /> : <></>}
            </div>
        </div>
    </>
  )
}

export default DockerIntro