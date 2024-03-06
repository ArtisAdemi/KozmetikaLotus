import React from 'react'
import LotusIcon from '../socialsLogo/LotusIcon'

const Navbar = () => {
  return (
    <div className='navbar-container flex justify-between bg-[#faf9f5] w-[80%] border-b-[2px] border-[#ABABAB] p-4'>
        <div className='text-3xl font-bold font-[Poppins]'>
        <LotusIcon className=''/>
        </div>
        <div className='flex justify-between'>
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
        <div className='navbar-right border-[2px] border-[#0C0C0C] px-5 py-2'>
            <button><a href="/contact">Contact Us</a></button>
        </div>
    </div>
  )
}

export default Navbar