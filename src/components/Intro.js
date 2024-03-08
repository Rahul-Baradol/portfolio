import React, { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion, useAnimation } from 'framer-motion'
import { devQuotes } from '../../constants/constants';

const DockerIntro = ({ setIntro, quoteId }) => {
    const mainControls = useAnimation();

    useEffect(() => {
        mainControls.start("visible");
    }, [])

    return (
        <>
            <div className='p-4 flex justify-center items-center w-screen h-[95vh]'>
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                        exit: { opacity: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 1.5 }}
                    className='text-center'
                >
                    <TypeAnimation
                        preRenderFirstString={false}
                        sequence={[
                            `"${devQuotes[quoteId].quote}" \n - ${devQuotes[quoteId].author}`,
                            1500,
                            () => {
                                mainControls.start("exit");
                            },
                            '',
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
                        deletionSpeed={80}
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