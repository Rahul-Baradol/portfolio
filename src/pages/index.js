import React from 'react'
import { servicesOffered, projects, otherData } from '../../constants/constants'
import Footer from '@/components/Footer';
import HomeRecipe from '../components/HomeRecipe';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import { Divider } from '@nextui-org/react';

export default function Home(props) {
   return (
      <main className='h-fit w-screen flex flex-col items-center'>
         <HomeRecipe aboutme={props.otherData.aboutme} />

         <Experience />

         <Divider className="my-2 w-[70%] bg-slate-800" />
         <Projects projects={props.projects} />

         <Divider className="my-2 w-[70%] bg-slate-800" />
         <Services servicesOffered={props.servicesOffered} />

         <Footer />
      </main>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects, servicesOffered } }
}