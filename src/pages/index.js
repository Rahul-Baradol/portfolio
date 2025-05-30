import React from 'react'
import { servicesOffered, projects, otherData } from '../../constants/constants'
import Footer from '@/components/Footer';
import HomeRecipe from '../components/HomeRecipe';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import { Divider } from '@nextui-org/react';
import DockerIntro from "@/components/Intro";
import { devQuotes } from "../../constants/constants";

function generateRandomNumber(a, b) {
   // Generate random number between a and b (inclusive)
   return Math.floor(Math.random() * (b - a + 1)) + a;
}

export default function Home(props) {
   return (
      <main className='h-fit w-screen flex flex-col items-center bg-black overflow-hidden'>
         {
            props.intro ? <DockerIntro quoteId={generateRandomNumber(0, devQuotes.length - 1)} setIntro={props.setIntro} /> :
               <>
                  <HomeRecipe aboutme={props.otherData.aboutme} />

                  <Experience />

                  <Divider className="my-2 w-[70%] bg-slate-800" />
                  <Projects projects={props.projects} />

                  <Divider className="my-2 w-[70%] bg-slate-800" />
                  <Services servicesOffered={props.servicesOffered} />

                  <Footer />
               </>
         }

      </main>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects, servicesOffered } }
}