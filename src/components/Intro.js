import React, { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion, useAnimation, useInView } from 'framer-motion'

const DockerIntro = ({ setIntro }) => {
    const [pullerDiv, setPullerDiv] = useState(false);
    const [runType, setRunType] = useState(false);

    const mainControls = useAnimation();

    useEffect(() => {
        mainControls.start("visible");
    }, [])

    return (
        <>
            <div className='p-4 flex justify-center items-center w-screen h-[95vh]'>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, x: 50 },
                        visible: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -50 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 1.5 }}
                    className='text-center'
                >
                    <TypeAnimation
                        preRenderFirstString={false}
                        sequence={[
                            'Hey!',
                            1500,
                            () => {
                                mainControls.start("exit");
                            },
                            '',
                            1500,
                            () => {
                                mainControls.start("visible")
                            },
                            "Welcome to my portfolio!",
                            1500,
                            "Welcome to my portfolio! \n I am...",
                            1500,
                            () => {
                                mainControls.start("exit")
                                setIntro(false)
                            },
                        ]}
                        speed={70}
                        style={{
                            whiteSpace: 'pre-line',
                            fontSize: '1.2em',
                            color: 'white'
                        }}
                        deletionSpeed={40}
                        cursor={false}
                    />
                </motion.div>

                {/* {pullerDiv ? <div style={{
                    fontSize: '1.2em',
                    color: 'white'
                }}>
                    Using default tag: latest <br /> latest: pulling from server <br />
                </div> : <></>} */}

                {/* {runType ? <TypeAnimation 
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
                /> : <></>} */}
            </div>
        </>
    )
}

export default DockerIntro