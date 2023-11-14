import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Card, CardBody } from '@nextui-org/react';
import { motion, useAnimation, useInView } from 'framer-motion'
import styles from '../styles/background.module.css'
import dynamic from 'next/dynamic';

function HomeRecipe(props) {
    const hero = useRef(null);
    const animeRef = useRef(null);
    const isInView = useInView(animeRef, { once: false });
    const mainControls = useAnimation();

    const [Me, setMe] = useState(null);

    let blurEffect = {
        top: '45vh'
    };

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls])

    useEffect(() => {
        setMe(() => {
            return dynamic(() => import('./MeCompo'), {
                ssr: false,
                loading: () => <h1>Loading...</h1>
            })
        })
    }, [setMe])

    return (
        <Suspense>
            <style jsx>
                {`
                    .transitionBefore1 {
                        transform: translateX(0);
                        animation: slideOver 1.2s ease-in 1;
                    }
                    
                    .transitionBefore2 {
                        transform: translateX(0);
                        animation: slideOver 0.9s ease-in 1;
                    }
                    
                    .animation {
                        animation: scrollerAnimation 1.5s ease infinite;
                    }
                    
                    .transitionBeforeScroll {
                        opacity: 1;
                        animation: transitionBeforeScroll 2s ease 1;
                    }
                    
                    @keyframes transitionBeforeScroll {
                        0% {
                            opacity: 0;
                        }
                    
                        50% {
                            opacity: 0.5;
                        }
                    
                        100% {
                            opacity: 1;
                        }
                    }
                    
                    @keyframes scrollerAnimation {
                        0% {
                            top: 0;
                        }
                    
                        50% {
                            top: 1rem;
                        }
                    
                        100% {
                            top: 0;
                        }
                    }
                    
                    @keyframes slideOver {
                        0% {
                            filter: blur(24px)
                        }
                    
                        90% {
                            filter: blur(5px)
                        }
                    
                        100% {
                            filter: blur(0px)
                        }
                    }

                    .customStyle {
                    font-family: 'Poppins', sans-serif;
                    }

                    .transitionFilter {
                    transition: filter 0.2s;
                    }
                `}
            </style>

            <div className={`z-0 h-full bg-cover bg-no-repeat ${styles.heroOuter}`}>
                <div ref={hero} className='relative flex flex-col items-center justify-between w-screen h-screen'>
                    <div className={`text-4xl px-3 relative transitionFilter`} style={blurEffect}>
                        <div className={`transitionBefore1 text-sm text-white`}>I am...</div>
                        <div className={`transitionBefore2 text-violet-800`}>Rahul Baradol</div>
                    </div>

                    <div className="transitionBeforeScroll p-1 flex justify-center h-10 w-5 rounded-2xl border-2 border-white-100 relative bottom-5 -translate-x-3">
                        <div className="relative rounded-full bg-white w-2 h-2 animation"></div>
                    </div>
                </div>
            </div>

            <div ref={animeRef} className="my-4 mb-12 flex font-mono sm:justify-around md:flex-row p-5 gap-8 h-fit flex-col items-center w-screen customStyle">
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 1 }}
                >
                    <Card className='dark w-[90vw]'>
                        <CardBody className='border-violet-800 border-t-2 border-l-2 p-8'>
                            <div className="text-2xl text-violet-800">Hello there...</div>
                            <div className='mt-6 md:mt-2 flex gap-10 flex-col-reverse md:flex-row justify-between items-center'>
                                <div className='text-xl text-white'>
                                    {props.aboutme}
                                </div>

                                {
                                    Me ? <Me /> : <></>
                                }
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </Suspense>
    );
}

export default HomeRecipe;