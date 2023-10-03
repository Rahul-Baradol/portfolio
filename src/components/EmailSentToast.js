import React, { useEffect, useState } from 'react'
import styles from '../styles/contact.module.css'

const EmailSentToast = (props) => {
  return (
    <>
        <style jsx>
            {`
                .toast {
                    transition: opacity 1s;
                    width: max(20vw, 200px);
                }
            `}
        </style>

        <div className={`toast ${styles.emailSent} ${props.opacity} fixed bottom-0 p-4 h-fit border-2 flex justify-center items-center rounded-3xl`}>
            {props.message}
        </div>
    </>
  )
}

export default EmailSentToast