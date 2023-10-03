import React from 'react'

const Footer = (props) => {
  return (
    <>  
      {
        <footer className="relative bottom-0 mt-10 flex items-center justify-end p-6 h-20 text-sm font-thin italic">  
          <a href="https://iconscout.com/icons/leetcode" className="text-underline font-size-sm" target="_blank">Free Leetcode  Icon</a> 
          &nbsp; by &nbsp;
          <a href="https://iconscout.com/contributors/icon-54" className="text-underline font-size-sm" target="_blank">Icon 54</a>
        </footer>
      }
    </>
  )
}

export default Footer