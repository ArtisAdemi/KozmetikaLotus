import React from 'react'
import { Navbar, ProductSlider } from '../components'
import Star from '../socialsLogo/Star'
import Divider from '../socialsLogo/Divider'

const Home = () => {
  return (
    <div>
      {/* Full Container */}
      <div className='bg-[#F6CBD2] w-full'>
        {/* Nav and picture */}
        <div>
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
                <a href="/">Eksploroni te gjitha Produktet -</a>
              </div>
            </div>
          </div>
        </div>
        {/* Second Part of container with pink bg */}
         {/* Middle section with testimonials and products */}
      <div className='flex justify-center items-center my-12 px-6 bg-transparent'>
        {/* Testimonial Section */}
        <div className='flex flex-col items-center border-2 border-black rounded-lg p-6 m-4 w-1/3 bg-transparent'>

          <p className='text-lg font-semibold mb-2'>Your Love For Oh that! Natural</p>
          <p>Oh that! Natural is dedicated to providing a healthy skincare product that is free from artificial, synthetic.</p>
          {/* Testimonial Author */}
          <div className='flex items-center mt-4'>
            <img className='w-12 h-12 rounded-full mr-2' src={require('../images/HomeUserIcon.png')} alt='Emine Avci' /> {/* Adjust the path as necessary */}
            <div>
              <p className='font-semibold'>Emine Avci</p>
              <p className='text-sm'>Specialist, USA</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className='flex flex-col w-1/3 m-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Produktet e reja</h2>
            <Divider /> {/* Your divider component */}
          </div>
          {/* Product Item */}
          <div className='flex items-center justify-between bg-transparent p-4 rounded-lg shadow mb-3'>
            <img className='mr-2' src={require('../images/Product1Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
              <div>
                <p className='font-semibold'>Rosemary Face Grow Serum</p>
                <p className='text-sm'>$25.00</p>
              </div>
            <img className='mr-2' src={require('../images/Product1Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
              <div>
                <p className='font-semibold'>Rosemary Face Grow Serum</p>
                <p className='text-sm'>$25.00</p>
              </div>
          </div>
          {/* Repeat for other products */}
          </div>

          {/* Additional Section */}
          <div className='w-1/3 m-4'>
            {/* Placeholder for additional content, e.g., an image or another list of products */}
          </div>
        </div>
      </div>
          <ProductSlider category={"lipstick"}/>
    </div>
  )
}

export default Home;