import React, { useState } from 'react'
import styles from '../styles/contact.module.css'
import emailjs from '@emailjs/browser'
import EmailSentToast from './EmailSentToast';
import { emailInfo } from '@/contants/contants';

const Email = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [loadingOpacity, setLoadingOpacity] = useState('opacity-100');
    const [toastOpacity, setToastOpacity] = useState('opacity-0');
    const [toastMessage, setToastMessage] = useState('Type the details to send an email.');

    let handleOnChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    let submit = (e) => {
        if (data.name === '' || data.email === '' || data.message === '') {
            setToastOpacity('opacity-100');

            setTimeout(()=>{
                setToastOpacity('opacity-0');
            },3500)
            return;
        }
        e.preventDefault();
        setLoading(true);
        setLoadingOpacity('opacity-50');
        emailjs.send(
            emailInfo.serviceId,
            emailInfo.templateId,
            {
                from_name: data.name,
                to_name: emailInfo.toName,
                from_email: data.email,
                to_email: emailInfo.toEmail,
                message: data.message
            },
            emailInfo.publicKey
        ).then(()=>{
            setToastMessage('Email Sent!');
            setToastOpacity('opacity-100');
            
            setTimeout(()=>{
                setToastOpacity('opacity-0');
                
                setTimeout(() => {
                    setLoadingOpacity('opacity-100');
                    setLoading(false);
                    setToastMessage('Type the details to send an email.');
                }, 1500);
            },3500)

            setData({
                name: '',
                email: '',
                message: ''
            })
        }, (error) => {
            console.log(error);
            setLoading(false);
            setLoadingOpacity('opacity-100');
            setData({
                name: '',
                email: '',
                message: ''
            });
        }
        )
    }

  return (
    <>
        <div className={`${styles.email} ${styles.boxShadowBorder} flex flex-col items-center gap-4 rounded-3xl p-6`}>
            <div className='text-3xl'>Contact</div>
            <input name="name" onChange={handleOnChange} value={data.name} type="text" className='w-[54vw] h-[8vh] rounded-xl p-3 bg-gray-700' placeholder='Enter your name'/>
            <input name="email" onChange={handleOnChange} value={data.email} type="email" className='w-[54vw] h-[8vh] rounded-xl p-3 bg-gray-700' placeholder='Enter your email'/>
            <textarea name="message" onChange={handleOnChange} value={data.message} className='resize-none w-[54vw] h-[14vh] rounded-xl p-3 bg-gray-700' placeholder='Enter your message'></textarea>
            <button disabled={loading} onClick={submit} className={`${styles.send} ${loadingOpacity} w-[70%] h-[10vh] border-2 border-purple-700 rounded-3xl cursor-pointer`}>
                {!loading ? "Send" : "Sending..."}
            </button>
            <EmailSentToast opacity={toastOpacity} message={toastMessage} />
        </div>
    </>
  )
}

export default Email