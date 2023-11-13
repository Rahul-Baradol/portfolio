"use client"

import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic'
import { React, useEffect, useState } from 'react'

const Contact = () => {
  const [ContactRecipe, setContactRecipe] = useState(null);

  useEffect(() => {
    setContactRecipe(() => {
      return dynamic(() => import('../components/ContactRecipe'), {
        ssr: false,
        loading: () => <div className='w-screen h-screen flex justify-center items-center'>
                          <Spinner color="secondary" />
                        </div>
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