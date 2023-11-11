"use client"

import { React } from 'react'
import { Card, CardBody, Link } from '@nextui-org/react';
import Email from '@/components/Email';

const Contact = (props) => {

  return (
    <>
      <div className='mx-auto relative top-[15vh] h-fit w-[80vw]
                      flex flex-col md:items-center md:justify-around
                      items-center gap-5'>
        {/* <Email /> */}

        <div className='w-[80vw] flex flex-col items-center md:flex-row md:justify-around gap-10'>
          <Card className='dark w-[78vw] md:w-[39vw] h-[45vh] md:mb-10'>
            <CardBody className='flex justify-center items-center'>
                GitHub
                <Link isExternal href="https://www.github.com/Rahul-Baradol" size="lg">@Rahul-Baradol</Link>
            </CardBody>
          </Card>

          <Card className='dark w-[78vw] md:w-[39vw] h-[45vh] md:mb-10'>
            <CardBody className='flex justify-center items-center'>
                LinkedIn
                <Link isExternal href="https://www.linkedin.com/in/rahul-baradol-22723b289/" size="lg">Rahul Baradol</Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Contact