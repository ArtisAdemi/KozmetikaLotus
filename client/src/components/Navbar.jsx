import React from 'react'
import LotusLogo from '../Icons/LotusLogo'

const Navbar = () => {
  return (
    <div className='navbar-container flex justify-between bg-transparent w-[80%] border-b-[2px] border-[#ABABAB] p-4'>
        <div>
            <div className='absolute'>
                <LotusLogo />
            </div>
        </div>
        <div className='flex justify-between items-center mr-16'>
            <div className='m-2'>
                <p><a href="/">Home</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/products/abc">Products</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/about">About Us</a></p>
            </div>
        </div>
        <div className='navbar-right flex border-[2px] border-[#0C0C0C] px-5 items-center justify-center text-center'>
            <button className='text-center items-center'><a href="/contact" className='text-center items-center'>Contact Us</a></button>
        </div>
    </div>
  )
}

export default Navbar