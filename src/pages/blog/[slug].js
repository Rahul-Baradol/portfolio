import React, { useEffect } from 'react'
import { Poppins } from 'next/font/google';
import { blogContent } from '../../../constants/constants';
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const poppins = Poppins({
    weight: '100',
    subsets: ['latin'],
})

export default function Page({ setIntro, content, blogMetadata }) {

    useEffect(() => {
        setIntro(false)
    }, [setIntro])

    return (
        <div className='pt-24 pb-5 flex flex-col items-center overflow-hidden '>
            <main className='h-fit w-[90vw] lg:w-[50vw] flex flex-col '>
                <div className={`${poppins.className} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
                    {blogMetadata.title}
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

                <div className='flex w-screen h-fit p-6'>
                    {
                        blogMetadata.previous ?
                            <Link href={`/blog/${blogMetadata.previous}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link> : <></>
                    }

                    {
                        blogMetadata.next ?
                            <Link className='ml-auto' href={`/blog/${blogMetadata.next}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link> : <></>
                    }
                </div>
            </main>

        </div>
    )
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    const blogMetadata = blogContent.find(document => document.id == slug);

    try {
        if (!blogMetadata) {
            return {
                notFound: true
            }
        }
        
        const filePath = path.join(process.cwd(), 'public', blogMetadata.contentPath);
        const content = fs.readFileSync(filePath, 'utf8');

        return { props: { content, blogMetadata } }
    } catch {
        return {
            notFound: true
        }
    }
}

export const getStaticPaths = async () => {
    const paths = blogContent.map(blogPost => ({
        params: { slug: blogPost.id },
    }))

    return {
        paths,
        fallback: false
    }
}