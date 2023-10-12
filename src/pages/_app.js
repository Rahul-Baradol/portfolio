import {NextUIProvider} from "@nextui-org/react";
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {

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
            margin-right: -20px; 
            padding-right: 20px;
            overflow-x: hidden;
            overflow-y: scroll;
          }
        `}
      </style>

      <NextUIProvider>
        <div className="parent">
          <div className="child">
            <div className="relative z-0">
              <Navbar />
              <Component {...pageProps} />
            </div>  
          </div>
        </div>
      </NextUIProvider>
    </>
  )
}