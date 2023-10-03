import React from 'react'
import styles from '../styles/contact.module.css'

const ProfileCard = (props) => {
  return (
    <>
      <a href={props.link} target="_blank"> 
        <div className={`profileCard ${styles.boxShadowBorder} mb-4 w-[80vw] md:w-[38vw] h-[31vh] flex flex-col items-center justify-center rounded-3xl`}>
          <div className='text-2xl'>{props.title}</div>
          <div className='text-xl'>{props.desc}</div>
        </div>
      </a>
    </>
  )
}

export default ProfileCard