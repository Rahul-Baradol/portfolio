"use client"

import dynamic from 'next/dynamic'
import { React, useEffect, useState } from 'react'

const Contact = () => {
  const [ContactRecipe, setContactRecipe] = useState(null);

  useEffect(() => {
    setContactRecipe(() => {
      return dynamic(() => import('../components/ContactRecipe'), {
        ssr: false,
        loading: () => <h1>Loading...</h1>
      });
    })
  }, [setContactRecipe]);

  return (
    <>
      {
        ContactRecipe ? <ContactRecipe /> : <></>
      }
    </>
  )
}

export default Contact