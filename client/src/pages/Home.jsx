import React from 'react'
import { Navbar, ProductSlider } from '../components'
import Star from '../socialsLogo/Star'
import Divider from '../socialsLogo/Divider'

const Home = () => {
  return (
    <div>
      <div className='bg-[#F6CBD2] w-full'>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='flex justify-center'>
          <img src={require('../images/HomePage1.png')} alt="IMAGE 1" />
        </div>
        <div className='flex w-full justify-center'>
          <div className='flex justify-center w-[80%]'>
            <div className='flex w-1/3'>
              <div>
                <Star />
              </div>
              <div>
                <p className='w-[60%]'>
                  Gjeni në internet produkte për kujdesin natyral të lëkurës, për trupin, për kujdesin e flokëve dhe kozmetikë.
                </p>
              </div>
            </div>
            <div className='w-1/3 flex items-center'>
              <Divider />
            </div>
            <div className='w-1/3 flex items-center'>
              <a href="/">Eksploroni te gjitha Produktet -></a>
            </div>
          </div>
        </div>
      </div>
        <ProductSlider category={"lipstick"}/>
    </div>
  )
}

export default Home