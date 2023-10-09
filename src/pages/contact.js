import Email from '@/components/Email';
import ProfileCard from '@/components/ProfileCard';
import {React, useEffect} from 'react'
import { contactInfo } from '../../constants/constants';
import { Card, CardBody, Link } from '@nextui-org/react';

const contact = (props) => {
  useEffect(()=>{
    props.setNonHeroVisible(1);
    props.setNonHeroToggled(1);
    props.setIntro1("I am...");
    props.setIntro2("Rahul Baradol");
    props.setDesign1("text-sm");
    props.setDesign2("text-violet-800");
  })

  return (
    <>
      <div className='mx-auto relative top-[15vh] h-fit w-[80vw]
                      flex flex-col md:items-center md:justify-around
                      items-center gap-5'>
        <Email />
        <div className='w-[80vw] flex flex-col items-center md:flex-row md:justify-around gap-10'>
          <Card className='dark w-[78vw] md:w-[39vw] h-[25vh] md:mb-10'>
            <CardBody className='flex justify-center items-center'>
                GitHub
                <Link isExternal href="https://www.github.com/Rahul-Baradol" size="lg">@Rahul-Baradol</Link>
            </CardBody>
          </Card>

          <Card className='dark w-[78vw] md:w-[39vw] h-[25vh] md:mb-10'>
            <CardBody className='flex justify-center items-center'>
                LinkedIn
                <Link isExternal href="https://www.github.com/Rahul-Baradol" size="lg">Rahul Baradol</Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default contact