import React from 'react'
import { github, linkedin } from '../../public/assets'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins200 = Poppins({
   weight: "200",
   subsets: ['latin']
})

const poppins400 = Poppins({
   weight: "400",
   subsets: ['latin']
})

function Footer() {
   return (
      <>
         <footer className={`hidden sm:flex flex-row items-center justify-around w-full h-[19vh] bg-gray-950 border-violet-600 text-gray-500 text-md`}>
            <a href="https://github.com/Rahul-Baradol" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
               <Image
                  width={35}
                  height={35}
                  src={github}
                  alt=""
               />
            </a>

            <div className='flex flex-col items-center justify-center'>
               <div className={`${poppins200.className} w-fit h-fit`}>Rahul Baradol</div>
               <div className={`${poppins400.className} w-fit h-fit`}>rahul.baradol.14@gmail.com</div>
            </div>

            <a href="https://www.linkedin.com/in/rahul-baradol-22723b289/" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
               <Image
                  width={35}
                  height={35}
                  src={linkedin}
                  alt=""
               />
            </a>
         </footer>

         <footer className='py-6 flex sm:hidden gap-6 flex-col items-center w-full h-fit bg-gray-950 border-violet-600 text-gray-500 text-md'>
            <div className='flex flex-col items-center justify-center'>
               <div className='w-fit h-fit'>Rahul Baradol</div>
               <div className='w-fit h-fit'>rahul.baradol.14@gmail.com</div>
            </div>

            <div className='w-full h-fit flex flex-row justify-center items-center gap-10'> 
               <a href="https://github.com/Rahul-Baradol" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
                  <Image
                     width={35}
                     height={35}
                     src={github}
                     alt=""
                  />
               </a>

               <a href="https://www.linkedin.com/in/rahul-baradol-22723b289/" target='_blank' className='border-2 border-violet-600 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
                  <Image
                     width={35}
                     height={35}
                     src={linkedin}
                     alt=""
                  />
               </a>
            </div>
         </footer>
      </>
   )
}

export default Footer