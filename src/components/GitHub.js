import React from 'react'
import styles from '../styles/GitHubCard.module.css'
import Image from 'next/image'

const ProfileCard = (props) => {
  
  return (
    <>
        <a href={`${props.link}`} target='_blank'>
            <div className={`${styles.card} border-2 border-white rounded-2xl 
                            flex sm:flex-row gap-2 p-6 card flex-col`}>
              <Image src={props.logo} className={styles.logo} alt="" />
              <div className={`flex flex-col`}>
                <div className={`${styles.title} sm:contents hidden`}> {props.title} </div>
                <div className={styles.desc}>
                    {props.description}
                </div>
              </div>
            </div>
        </a>
    </>
  )
}

export default ProfileCard