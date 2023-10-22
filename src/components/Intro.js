import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

const DockerIntro = ({ setIntro }) => {
  return (
    <>
        <div className='p-4'>
            <div className='flex gap-2'>
                <TypeAnimation
                    preRenderFirstString={false}
                    sequence={[
                        'Welcome to my portfolio!\nLet\'s fire up the container for you!',
                        1000,
                        'root@client:/# docker run portfolio',
                        500,
                        'root@client:/# docker pull portfolio\n',
                        1400,
                        'root@client:/# docker pull portfolio\nUsing default tag: latest\nlatest: pulling from server\n',
                        1000,
                        'root@client:/# docker pull portfolio\nUsing default tag: latest\nlatest: pulling from server\nroot@client:/# docker run portfolio\n',
                        1400,
                        () => {
                            setIntro(false);
                        }
                    ]}
                    speed={60}
                    style={{ 
                        whiteSpace: 'pre-line',
                        fontSize: '1.2em' ,
                    }}
                    deletionSpeed={80}
                />
            </div>
        </div>
    </>
  )
}

export default DockerIntro