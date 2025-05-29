import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head';
import DockerIntro from "@/components/Intro";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { devQuotes } from "../../constants/constants";

export default function App({ Component, pageProps }) {
  const [intro, setIntro] = useState(true);
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    })

    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    })
  }, [router.query, router.events])

  return (
    <>
      <Head>
        <title>Rahul Baradol | CSE Student</title>
        <meta
          name="description"
          content="Corner of the internet where I proudly showcase my projects, achievements and ideas!"
        />
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
            margin-right: -20px; 
            padding-right: 20px;
            overflow-x: hidden;
            overflow-y: scroll;
          }
        `}
      </style>

      <NextUIProvider>
        <LoadingBar 
          color="#2d2159"
          waitingTime={800}
          height={4}
          progress={progress} 
          onLoaderFinished={() => setProgress(0)} 
        />
        <div className="parent">
          <div className="child">
            <div className="relative z-0">
              {/* {intro ? <DockerIntro quoteId={generateRandomNumber(0, devQuotes.length - 1)} setIntro={setIntro} />
                : <>
                  <Navbar />
                  <Component {...pageProps} />
                </>
              } */}
              <Navbar 
                intro={intro}
                setIntro={setIntro}
              />
              <Component 
                {...pageProps} 
                intro={intro}
                setIntro={setIntro}
              />
            </div>
          </div>
        </div>
      </NextUIProvider>
    </>
  )
}