import Email from '@/components/Email';
import ProfileCard from '@/components/ProfileCard';
import {React, useEffect} from 'react'
import { contactInfo } from '@/contants/contants';

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
          <ProfileCard link={contactInfo.github.link} title={contactInfo.github.title} desc={contactInfo.github.description} />
          <ProfileCard link={contactInfo.linkedIn.link} title={contactInfo.linkedIn.title} />
        </div>
      </div>
    </>
  )
}

export default contact