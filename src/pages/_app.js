import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import Head from "next/head";

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

      <NextUIProvider>
        <LoadingBar
          color="#2d2159"
          waitingTime={800}
          height={4}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        {/* {intro ? <DockerIntro quoteId={generateRandomNumber(0, devQuotes.length - 1)} setIntro={setIntro} />
                : <>
                  <Navbar />
                  <Component {...pageProps} />
                </>
              } */}

        <Navbar 
          intro={intro}
        />
        <Component
          {...pageProps}
          intro={intro}
          setIntro={setIntro}
        />
      </NextUIProvider>
    </>
  )
}