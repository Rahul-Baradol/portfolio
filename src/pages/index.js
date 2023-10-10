import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Hero.module.css'
import { Card, CardBody } from '@nextui-org/react';

export default function Home({blurness, setBlurness, nonHeroVisible, setNonHeroVisible, nonHeroToggled, setNonHeroToggled, intro1, setIntro1, intro2, setIntro2, design1, setDesign1, design2, setDesign2, aboutme}) {
  const hero = useRef(null);
  const [blurPointer, setBlurPointer] = useState(0);

  let blurValues = ['blur-none', 'blur-sm', 'blur', 'blur-md', 'blur', 'blur-sm', 'blur-none', 
                    ,'blur-none', 'blur-sm', 'blur', 'blur-md', 'blur', 'blur-sm', 'blur-none'];
  let incrementUpperBound = 15;

  let blurEffect = {
      top: '45vh'
  };

  useEffect(() => {
      setTimeout(()=>{
        if (nonHeroToggled === 0 && hero.current != null) {
          hero.current.addEventListener("wheel", (event) => {
            if (event.deltaY > 0) {
              onWheelDown();
            }
          })
        }
      }, 2000)
    }, [hero])
  
    useEffect(()=>{
      let cur = Math.floor(blurPointer / incrementUpperBound);
      if (cur != blurness) {
        if (cur === 3) {
          setIntro1("Welcome to my...");
          setIntro2("Portfolio");

          setDesign1("");
          setDesign2("text-violet-800");
        } else if (cur === 10) {
          setIntro1("I am...");
          setIntro2("Rahul Baradol");

          setDesign1("text-sm");
          setDesign2("text-violet-800");
        } else if (cur === 15) {
          setNonHeroVisible(1);
          setNonHeroToggled(1);
        }
        setBlurness(cur);
      }
    }, [blurPointer])

    let onWheelDown = () => {
      setBlurPointer(currentValue => currentValue + 1)
    }

    return (
      <>
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
                <div className={`text-4xl px-3 relative ${blurValues[blurness]} transitionFilter`} style={blurEffect}>
                  <div className={`transitionBefore1 ${design1}`}>{intro1}</div>
                  <div className={`transitionBefore2 ${design2}`}>{intro2}</div>
                </div>

                <div className="transitionBeforeScroll p-1 flex justify-center h-10 w-5 rounded-2xl border-2 border-white-100 relative bottom-5 -translate-x-3">
                    <div className="relative rounded-full bg-white w-2 h-2 animation"></div>
                </div>
            </div>
        </div>

        {(nonHeroToggled) | (nonHeroVisible && blurness <= 0) ? 
        <div className="my-4 mb-12 flex font-mono sm:justify-around md:flex-row p-5 gap-8 h-fit flex-col items-center w-screen customStyle">
            <Card className='dark w-[90vw]'>
              <CardBody>
                <div className="text-2xl text-violet-800">Hello there...</div>
                <div className='text-xl'>
                  {aboutme}
                </div>
              </CardBody>
            </Card>
          </div>
      : <></>}
      </>
    )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/other')
  const data = await res.json()
  const otherData = data.otherData;
  const aboutme = otherData[0].aboutme;
  return { props: { aboutme } }
}