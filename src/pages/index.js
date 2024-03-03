import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { projects, otherData } from '../../constants/constants'
import { Spinner } from '@nextui-org/react';

require('dotenv').config({ path: '.env.local' });

export default function Home(props) {
   const [HomeCompo, setHomeCompo] = useState(null);
   const [WorkRecipe, setWorkRecipe] = useState(null);

   useEffect(() => {
      setHomeCompo(() => {
         return dynamic(() => import('../components/HomeRecipe'), {
            ssr: false,
            loading: () => <div className='w-screen h-screen flex justify-center items-center'>
               <Spinner color="secondary" />
            </div>
         });
      })
   }, [setHomeCompo]);

   useEffect(() => {
      setWorkRecipe(() => {
         return dynamic(() => import('../components/WorkRecipe'), {
            ssr: false,
            loading: () => <div className='w-screen h-screen flex justify-center items-center'>
               <Spinner color="secondary" />
            </div>
         })
      })
   }, [setWorkRecipe])

   return (
      <>
         {
            HomeCompo ? <HomeCompo aboutme={props.otherData.aboutme} /> : <></>
         }

         {
            WorkRecipe ? <WorkRecipe projects={props.projects} /> : <></>
         }
      </>
   )
}

export async function getStaticProps() {
   return { props: { otherData, projects } }
}