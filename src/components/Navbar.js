import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { navLinks } from '../contants'
import { menu, close, logoBlackR } from '../assets'

const Navbar = (props) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <style jsx>
        {`
          .transtionOpacity {
            transition: opacity 3s;
          }

          .menuImg {
            width: auto;
            height: auto;
          }
        `}
      </style>

      <nav className={`sm:px-16 px-6 w-full flex items-center 
                      py-5 fixed top-0 z-20 bg-primary justify-between transtionOpacity bg-opacity-50`} style={{opacity: `${props.nonHeroVisible}`}} >

        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className='flex items-center gap-2'
                    onClick={()=>{
                        setActive('');  
                        window.scrollTo(0, 0);
                    }}>

                <Image
                  src={logoBlackR}
                  className="w-12 h-auto"
                  alt="Picture of the author"
                  priority
                />
          </Link>

          <ul className='list-none hidden sm:flex flex-row gap-10'>
              {
                navLinks.map((link) => {
                  return <li key={link.id}
                      className={`${active === link.title ? "text-white" : "text-secondary"} font-medium cursor-pointer`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      
                    <Link href={`/${link.id}`}>{link.title}</Link>
                  </li>
                })
              }
            </ul>

            <div className="sm:hidden flex justify-end items-center">
              <Image
                  src={toggle ? close : menu}
                  alt="menu"
                  className='w-8 h-auto object-contain cursor-pointer menuImg'
                  onClick={() => {
                    setToggle(!toggle)
                  }}
              />

              <div className={`${!toggle ? "hidden" : "flex"} p-6 absolute top-20 right mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                    <ul className='list-none flex justify-end flex-col gap-4'>
                        {
                          navLinks.map((link) => {
                            return <li key={link.id}
                                className={`${active === link.title ? "text-white" : "text-secondary"} font-poppins font-medium cursor-pointer`}
                                onClick={() => {
                                  setToggle(!toggle)
                                  setActive(link.title);
                                }}
                              >
                                
                              <Link href={`/${link.id}`}>{link.title}</Link>
                            </li>
                          })
                        }
                    </ul>
              </div>
            </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar