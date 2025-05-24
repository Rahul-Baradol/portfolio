import React from 'react'
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Poppins } from 'next/font/google';
import { blogContent } from '../../constants/constants';
import BlogCard from '@/components/BlogCard';

const poppins = Poppins({
   weight: '100',
   subsets: ['latin'],
})

export default function Blog() {
   return (
      <main className='h-fit w-screen flex flex-col items-center'>
         <div className="flex flex-col items-center p-2 m-24">
            <div className={`${poppins.className} flex flex-col items-center justify-center text-3xl font-thin mt-1 mb-4 text-white`}>
               <TypeAnimation
                  sequence={[
                     'Blog'
                  ]}
                  cursor={false}
                  speed={10}
               />
            </div>
            <div className={`w-fit m-1 relative flex flex-col gap-6 justify-center`}>
               {
                  blogContent.map(blog => {
                     return <motion.div
                        key={blog.id}
                        initial={{
                           opacity: 0,
                           x: blog.id % 2 == 0 ? -50 : 50
                        }}

                        whileInView={{
                           opacity: 1,
                           x: 0
                        }}

                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                           scale: 1.015
                        }}
                        className='h-[full] w-fit'
                     >
                        <BlogCard 
                           title={blog.title} 
                           description={blog.description} 
                           contentPath={`/blog/${blog.id}`} 
                        />
                     </motion.div>
                  })
               }
            </div>
         </div>
      </main>
   )
}