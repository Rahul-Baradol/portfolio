"use client"

import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import ReactMarkdown from 'react-markdown'

const poppins = Poppins({
    weight: '100',
    subsets: ['latin'],
})

export default function Custom404({ setIntro }) {
    const [content, setContent] = useState();

    useEffect(() => {
        fetch("/blogContent/notfound.md").then(responseContent => responseContent.text())
            .then(content => {
                setContent(content);
            })
    }, [])

    useEffect(() => {
        setIntro(false)
    }, [setIntro])

    return (
        <div className='mt-24 pb-5 flex flex-col items-center'>

            <main className='h-fit w-[90vw] lg:w-[50vw] flex flex-col '>
                <div className={`${poppins.className} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
                    404
                </div>

                <div className='p-2 pb-10 prose prose-invert'>
                    <ReactMarkdown
                        components={{
                            a: ({ node, ...props }) => (
                                <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </main>
        </div>
    )
}