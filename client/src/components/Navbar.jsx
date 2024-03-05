import React from 'react'
import LotusLogo from '../socialsLogo/LotusLogo'

const Navbar = () => {
  return (
    <div className='navbar-container flex justify-between bg-transparent w-[80%] border-b-[2px] border-[#ABABAB] p-4'>
        <div className='w-1/3'>
            <LotusLogo />
        </div>
        <div className='flex justify-between w-1/3 items-center'>
            <div className='m-2'>
                <p><a href="/">Home</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/products">Products</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/about">About Us</a></p>
            </div>
        </div>
        <div className='navbar-right border-[2px] border-[#0C0C0C] px-5 py-2 items-center'>
            <button><a href="/contact">Contact Us</a></button>
        </div>
    </div>
  )
}

export default Navbar