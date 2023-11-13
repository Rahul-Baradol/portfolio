import React, { useEffect, useState } from 'react'
import { projects } from '../../constants/constants'
import dynamic from 'next/dynamic';

require('dotenv').config({ path: '.env.local' });

const Work = (props) => {
  const [WorkRecipe, setWorkRecipe] = useState(null);

  useEffect(() => {
    setWorkRecipe(() => {
      return dynamic(() => import('../components/WorkRecipe'), {
        ssr: false,
        loading: () => <h1>Loading...</h1>
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