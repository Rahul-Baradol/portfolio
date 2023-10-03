import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head';
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [nonHeroVisible, setNonHeroVisible] = useState(0);
  const [nonHeroToggled, setNonHeroToggled] = useState(0);
  const [intro1, setIntro1] = useState('Knock Knock...');
  const [intro2, setIntro2] = useState('Hello there...!');

  const [design1, setDesign1] = useState("text-violet-800");
  const [design2, setDesign2] = useState("");

  const [blurness, setBlurness] = useState(0);

  return (
    <>
      <Head>
        <title>Rahul Baradol | Portfolio</title>
      </Head>
      
      <style jsx>
        {`
          .parent{
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          .child{
            height: 100vh;
            margin-right: -20px; /* maximum width of scrollbar */
            padding-right: 20px; /* maximum width of scrollbar */
            overflow-x: hidden;
            overflow-y: scroll;
          }
        `}
      </style>

      <div className="parent">
        <div className="child">
          <div className="relative z-0 bg-primary">
            <Navbar nonHeroVisible={nonHeroVisible} />
            <Component {...pageProps} nonHeroToggled={nonHeroToggled} 
                                      setNonHeroToggled={setNonHeroToggled} 
                                      nonHeroVisible={nonHeroVisible} 
                                      setNonHeroVisible={setNonHeroVisible}
                                      intro1={intro1}
                                      setIntro1={setIntro1}
                                      intro2={intro2}
                                      setIntro2={setIntro2}
                                      design1={design1}
                                      setDesign1={setDesign1}
                                      design2={design2}
                                      setDesign2={setDesign2} 
                                      blurness={blurness}
                                      setBlurness={setBlurness} />
          </div>  
        </div>
      </div>

    </>
  )
}