"use client"

import React, { useState } from 'react'
import { Card, Input } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

require('dotenv').config({ path: '.env.local' })

const Email = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('Type the details to send an email.');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let handleOnChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    let submit = (e) => {
        if (data.name === '' || data.email === '' || data.message === '') {
            onOpen();
            return;
        }
        e.preventDefault();
        setLoading(true);

        fetch(process.env.EMAILDETAILS_URI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.status === "success") {
                setLoading(false);
                setToastMessage('Email Sent!');
                onOpen();
                setData({
                    name: '',
                    email: '',
                    message: ''
                })
            } else {
                setLoading(false);
                setToastMessage("Couldn't send the email due to a technical issue.");
                onOpen();
                setData({
                    name: '',
                    email: '',
                    message: ''
                });
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            setToastMessage("Couldn't connect to the server. Please check your internet connection.");
            onOpen();
            setData({
                name: '',
                email: '',
                message: ''
            });
        })
    }

    return (
        <>
            <Card className={`w-[80vw] dark flex flex-col items-center gap-4 rounded-3xl p-6`}>
                <div className='text-3xl'>Contact</div>
                <form onSubmit={submit} className='flex flex-col items-center gap-8'>
                    <div className='flex flex-col items-center gap-3'>
                        <Input value={data.name} name="name" type="text" onChange={handleOnChange} className='w-[40vw]' variant="underlined" label="Name" />
                        <Input value={data.email} name="email" type="email" className='w-[40vw]' onChange={handleOnChange} variant="underlined" label="Email" />
                        <Input value={data.message} name="message" type="text" className='w-[40vw]' onChange={handleOnChange} variant="underlined" label="Message" />
                    </div>
                    <Button
                        type='submit'
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
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </form>

                <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className='dark'>
                        {(onClose) => (
                            <>
                                <ModalHeader className="dark flex flex-col gap-1 text-white">Email Status</ModalHeader>
                                <ModalBody className='dark'>
                                    <p className='text-white'>
                                        {toastMessage}
                                    </p>
                                </ModalBody>
                                <ModalFooter className='dark'>
                                    <Button color="primary" onPress={() => {
                                        onClose();
                                        setToastMessage('Type the details to send an email.');
                                    }}>
                                        Okay
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </Card>
        </>
    )
}

export default Email 