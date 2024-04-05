import React from 'react'
import { Navbar } from '../components'

const Wishlist = () => {
  return (
    <div className='bg-[#FEFDFC]'>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='pt-6 w-full flex justify-center'>
            <div className='w-[80%]'>
                <h2 className='font-semibold text-xl py-2'>Wishlist</h2>
            </div>
        </div>
    </div>
  )
}

export default Wishlist