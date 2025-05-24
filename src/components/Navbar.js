import React, { Suspense, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { navLinks } from '../../constants/constants'
import { menu, close, logoBlackR } from '../../public/assets'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <>
      <Suspense>
        <style jsx>
          {`
          .transtionOpacity {
            transition: opacity 3s;
          }

          .menuImg {
            width: auto;
            height: auto;
          }
          
          .navBar {
            opacity: 1;
            animation-name: bringIn;
            animation-duration: 1s;
            animation-iteration-count: 1;
            background-color: rgb(5 8 22 / var(--tw-bg-opacity));
          }

          .navMenu {
            background-image: linear-gradient(#222222, black, #222222);
          }

          @keyframes bringIn {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}
        </style>
        <nav className="sm:px-16 px-6 w-full flex items-center 
                            py-5 fixed top-0 z-20 justify-between transtionOpacity bg-opacity-50 navBar backdrop-blur-sm">

          <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
            <Link href="/" className='flex items-center gap-2'
              onClick={() => {
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
                    className={`text-white font-medium cursor-pointer`}
                  >

                    <Link href={`/${link.id}`}>{link.title}</Link>
                  </li>
                })
              }
            </ul>

            <div className="sm:hidden flex justify-end items-center">
              <Image
                src={!showMenu ? close : menu}
                alt="menu"
                className='w-8 h-auto object-contain cursor-pointer menuImg'
                onClick={() => {
                  setShowMenu(!showMenu)
                }}
              />

              <div className={`${showMenu ? "hidden" : "flex"} p-6 absolute top-20 right mx-4 my-2 min-w-[140px] z-10 rounded-xl navMenu`}>
                <ul className='list-none flex justify-end flex-col gap-4'>
                  {
                    navLinks.map((link) => {
                      return <li key={link.id}
                        className={`text-white font-poppins font-medium cursor-pointer`}
                        onClick={() => {
                          setShowMenu(!showMenu)
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
      </Suspense>
    </>
  )
}

export default Navbar