import React from 'react'
import { servicesOffered, projects, otherData } from '../../constants/constants'
import Footer from '@/components/Footer';
import HomeRecipe from '../components/HomeRecipe';
import Experience from '@/components/Experience';
import OpenSourceOrganizations from '@/components/OpenSourceOrganizations';
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
                  <HomeRecipe aboutme={props.otherData.aboutme} tagline={props.otherData.tagline} />

                  <div className="py-8">
                     <Experience />
                  </div>

                  <Divider className="my-8 w-[70%] bg-slate-800" />
                  
                  <div className="py-8">
                     <OpenSourceOrganizations />
                  </div>

                  <Divider className="my-8 w-[70%] bg-slate-800" />
                  
                  <div className="py-8">
                     <Projects projects={props.projects} />
                  </div>

                  <Divider className="my-8 w-[70%] bg-slate-800" />
                  
                  <div className="py-8">
                     <Services servicesOffered={props.servicesOffered} />
                  </div>

                  <Footer />
               </>
         }

      </main>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects, servicesOffered } }
}