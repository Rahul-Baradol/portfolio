import React from 'react'
import styles from '../styles/Divider.module.css'

const Divider = () => {
  return (
    <>
        <div className={`${styles.hdivider}`}>
            <div className={`${styles.shadow}`}></div>
        </div>
    </>
  )
}

export default Divider