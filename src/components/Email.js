import React, { useState } from 'react'
import styles from '../styles/contact.module.css'
import emailjs from '@emailjs/browser'
import EmailSentToast from './EmailSentToast';
import { emailInfo } from '../../constants/constants';
import { Button, Card, Input, Textarea } from '@nextui-org/react';

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
        <Card className={`${styles.email} ${styles.boxShadowBorder} dark flex flex-col items-center gap-4 rounded-3xl p-6`}>
            <div className='text-3xl'>Contact</div>
            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-3'>
                    <Input name="name" type="text" onChange={handleOnChange}  className='w-[40vw]' variant="underlined" label="Name" />
                    <Input name="email" type="email" className='w-[40vw]' onChange={handleOnChange}  variant="underlined" label="Email" />
                    <Input name="message" type="text" className='w-[40vw]' onChange={handleOnChange}  variant="underlined" label="Message" />
                </div>
                <Button
                onClick={submit}
                isLoading={loading}
                color="primary"
                className='w-[30vw] h-[10vh]'
                spinner={
                    <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                    />
                    </svg>
                }
                >
                Send
                </Button>
            </div>
            <EmailSentToast opacity={toastOpacity} message={toastMessage} />
        </Card>
    </>
  )
}

export default Email