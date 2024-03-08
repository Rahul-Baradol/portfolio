import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Avatar, Card, CardBody } from '@nextui-org/react';
import { motion, useAnimation, useInView } from 'framer-motion'
import { skillsDesc, techIcons } from '../../constants/constants';
import styles from '../styles/background.module.css'
import dynamic from 'next/dynamic';
import TextTransition, { presets } from 'react-text-transition';
import { github, linkedin, leetcode } from '../../public/assets';
import Image from 'next/image';

function generateRandomNumber(a, b) {
   // Check if a and b are valid numbers
   if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input. Both arguments must be numbers.');
   }

   // Check if a is greater than or equal to b
   if (a >= b) {
      throw new Error('Invalid input. The first argument must be less than the second argument.');
   }

   // Generate random number between a and b (inclusive)
   return Math.floor(Math.random() * (b - a + 1)) + a;
}

function HomeRecipe(props) {
   const hero = useRef(null);
   const animeRef = useRef(null);
   const isInView = useInView(animeRef, { once: false });
   const mainControls = useAnimation();

   const [Me, setMe] = useState(null);

   const [skillNo, setSkillNo] = useState(-1);
   const [lock, setLock] = useState(false);

   const [offsetsX, setOffsetsX] = useState([]);
   const [offsetsY, setOffsetsY] = useState([]);

   let blurEffect = {
      top: '45vh'
   };

   function loop() {
      setSkillNo(ele => (ele + 1) % skillsDesc.length);

      let X = [];
      let Y = [];
      for (let i = 0; i < techIcons.length; i++) {
         X.push(generateRandomNumber(-10, 10));
         Y.push(generateRandomNumber(-10, 10));
      }

      setOffsetsX(X);
      setOffsetsY(Y);
   }

   useEffect(() => {
      if (lock) {
         loop();

         setInterval(async () => {
            loop();
         }, 4000);
      }
   }, [lock])

   useEffect(() => {
      if (skillsDesc && skillNo !== undefined) {
         setLock(true);
      }
   }, [])

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

                    .spoiler {
                        color: rgb(91 33 182);
                        background-position: right;
                        background-size: 0% 200%;
                        background-image: linear-gradient(rgb(91, 33, 182), rgb(91, 33, 182));
                        display: inline;
                        background-repeat: no-repeat;
                        transition: all 500ms ease-in-out;
                        animation: reveal 1s ease-in 1;
                    }

                    @keyframes reveal {
                        0% {
                            background-size: 100% 200%;
                            color: transparent;
                        }

                        100% {
                            background-size: 0% 200%;
                            color: rgb(91 33 182);
                        }
                    }
                `}
         </style>

         <div className={`z-0 h-full bg-cover bg-no-repeat ${styles.heroOuter}`}>
            <div ref={hero} className='relative flex flex-col items-center justify-between w-screen h-screen'>
               <div className={`px-3 relative flex flex-col items-center gap-28`} style={blurEffect}>
                  <div className='w-fit h-fit flex flex-col justify-center items-center gap-2'>
                     <div className={`text-4xl text-violet-800 opacity-100`}>
                        <span className='px-1 enableOpacity select-none spoiler'>Rahul Baradol</span>
                     </div>

                     <TextTransition direction='down' className='select-none text-lg lg:text-xl w-[270px] h-[40px] flex justify-center' springConfig={presets.molasses} delay={1000}>{skillsDesc[skillNo]}</TextTransition>
                  </div>
               </div>

               <div className='relative bottom-5 flex flex-row justify-around items-center w-[70vw] sm:w-[20vw] h-[10vh]'>
                  <a href="https://github.com/Rahul-Baradol" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
                     <Image
                        width={35}
                        height={35}
                        src={github}
                        alt=""
                     />
                  </a>

                  <a href="https://www.linkedin.com/in/rahul-baradol-22723b289/" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
                     <Image
                        width={35}
                        height={35}
                        src={linkedin}
                        alt=""
                     />
                  </a>

                  <a href="https://leetcode.com/rahul_baradol/" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
                     <Image
                        width={35}
                        height={35}
                        src={leetcode}
                        alt=""
                     />
                  </a>
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
                        <div className='spoiler2 text-xl text-white'>
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
               <Card className='dark w-[90vw] '>
                  <CardBody className='border-violet-800 border-r-2 border-b-2 p-8 flex flex-col gap-7'>
                     <div className='mt-6 md:mt-2 grid grid-cols-3 lg:grid-cols-7 gap-10 justify-items-center place-items-center'>
                        {
                           offsetsX.length > 0 && offsetsY.length > 0 && techIcons.map((value, key) => {
                              return <motion.div
                                 key={key}
                                 className='w-fit aspect-square'
                                 animate={{
                                    x: [0, offsetsX[key], 0],
                                    y: [0, offsetsY[key], 0]
                                 }}
                                 transition={{
                                    duration: 4,
                                    ease: "easeIn",
                                    times: [0, 1],
                                    repeat: Infinity,
                                    repeatDelay: 0
                                 }}
                              >
                                 <Image
                                    src={value.src}
                                    alt=""
                                    className={`w-[50px] aspect-auto`}
                                 />
                              </motion.div>
                           })
                        }
                     </div>
                     <div className="text-2xl text-violet-800 flex flex-row justify-end">...Tech</div>
                  </CardBody>
               </Card>
            </motion.div>
         </div>
      </Suspense>
   );
}

export default HomeRecipe;