import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { servicesOffered, projects, otherData } from '../../constants/constants'
import { Divider, Spinner } from '@nextui-org/react';
import Footer from '@/components/Footer';
import HomeRecipe from '../components/HomeRecipe';
import WorkRecipe from '../components/WorkRecipe';

require('dotenv').config({ path: '.env.local' });

export default function Home(props) {
   return (
      <>
         {/* {
            HomeCompo ? <HomeCompo aboutme={props.otherData.aboutme} /> : <></>
         }

         {
            WorkRecipe ? <WorkRecipe servicesOffered={props.servicesOffered} projects={props.projects} /> : <></>
         } */}

         <HomeRecipe aboutme={props.otherData.aboutme} />
         <WorkRecipe servicesOffered={props.servicesOffered} projects={props.projects} />

         <Footer />
      </>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects, servicesOffered } }
}