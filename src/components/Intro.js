import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const DockerIntro = ({ setIntro }) => {
  return (
    <>
        <div className='p-4'>
            <div className='flex flex-col justify-start gap-2'>
                <TypeAnimation
                    preRenderFirstString={false}
                    sequence={[
                        'Welcome to my portfolio!',
                        1000,
                        '>> Booting things up...\n',
                        500,
                        '>> Booting things up...\n>> Initializing Fancy Stuff...\n',
                        500,
                        '>> Booting things up...\n>> Initializing Fancy Stuff...\nAnd here we go.........!',
                        750,
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
                    deletionSpeed={80}
                    cursor={true}
                />
            </div>
        </div>
    </>
  )
}

export default DockerIntro