import React from 'react'
import { github, linkedin, logoBlackR, logoWhiteR } from '../../public/assets'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { Link } from '@nextui-org/react'

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
         <footer className={`flex gap-2 sm:gap-0 sm:flex-row items-center justify-center flex-col-reverse sm:justify-around w-full h-[130px] bg-gray-950 border-violet-600 text-gray-500 text-md`}>
            <div className='flex flex-col items-center justify-center gap-1'>
               <Link href='https://www.rahulbaradol.in/' className={`${poppins400.className} w-fit h-fit text-slate-500`}>rahulbaradol.in</Link>
            </div>

            <a href="https://github.com/Rahul-Baradol/portfolio" target='_blank' className='border-1 opacity-50 hover:opacity-100 transition-opacity w-fit h-fit rounded-full overflow-hidden'>
               <Image
                  width={35}
                  height={35}
                  src={logoWhiteR}
                  alt=""
               />
            </a>
         </footer>
      </>
   )
}

export default Footer