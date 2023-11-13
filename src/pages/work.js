import React, { useEffect, useState } from 'react'
import { projects } from '../../constants/constants'
import dynamic from 'next/dynamic';
import { Spinner } from '@nextui-org/react';

require('dotenv').config({ path: '.env.local' });

const Work = (props) => {
  const [WorkRecipe, setWorkRecipe] = useState(null);

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
        WorkRecipe ? <WorkRecipe projects={props.projects} /> : <></>
      }
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { projects }
  }
}

export default Work