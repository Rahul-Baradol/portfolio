import React from 'react'
import { servicesOffered, projects, otherData } from '../../constants/constants'
import Footer from '@/components/Footer';
import HomeRecipe from '../components/HomeRecipe';
import WorkRecipe from '../components/WorkRecipe';

export default function Home(props) {
   return (
      <>
         <HomeRecipe aboutme={props.otherData.aboutme} />
         <WorkRecipe servicesOffered={props.servicesOffered} projects={props.projects} />

         <Footer />
      </>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects, servicesOffered } }
}