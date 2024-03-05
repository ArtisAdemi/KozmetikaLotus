import React from 'react'
import { Navbar, ProductSlider } from '../components'
import Star from '../Icons/Star'
import ArrowLeft from '../Icons/ArrowLeft'
import Divider from '../Icons/Divider'

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
                <a className='font-semibold ml-4 flex' href="/">Eksploroni te gjitha Produktet <ArrowLeft /></a>
              </div>
            </div>
          </div>
        </div>
        {/* Second Part of container with pink bg */}
         {/* Middle section with testimonials and products */}
      <div className='flex justify-center items-center my-12 pb-16 px-6 bg-transparent'>
        {/* Testimonial Section */}
        <div className='flex flex-col items-center border-2 border-black rounded-lg p-12 m-4 w-1/3 bg-transparent'>

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
          <div className='flex items-center justify-between bg-transparent p-4 rounded-lg mb-3'>
            <div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product1Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold'>Rosemary Face Grow Serum</p>
                  <p className='text-sm'>$25.00</p>
                </div>
              </div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product2Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold'>Rosemary Face Grow Serum</p>
                  <p className='text-sm'>$25.00</p>
                </div>
              </div>
            </div>
          </div>
            
        </div>

          {/* Additional Section */}
          <div className='w-1/3 m-4'>
            <div>
              <h4 className='font-bold text-sm mb-4'>PRODUKTET TONA ME TE SHITURA</h4>
            </div>
            <div>
             <img className='w-64 h-64' src={require('../images/Product3Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
            </div>
          </div>
        </div>
      </div>
      {/* About us section */}
      <div className='flex justify-center px-12 py-16'>
        <div className='w-[80%] mr-12 max-w-[500px] text-center'>
          {/* Text Section */}
          <div>
            <h1 className='text-3xl font-bold text-center'>Rreth Nesh</h1>
          </div>
          <div>
            <p className='text-center'>Ju faleminderit që vizitoni website-in tonë. Shpresojmë që të gjeni produktet e duhura për të arritur qëllimet tuaja për kujdesin e lëkurës. Ne jemi këtu për të ndihmuar në rrugën tuaj drejt një lëkure të shëndetshme dhe të bukur. Urojme që të keni një eksperiencë të mrekullueshme me produktet e Kozmetika Lotus</p>
          </div>
          <div className='mt-4'>
            <a className='text-center underline font-semibold' href="/about">Lexo me shume</a>
          </div>
        {/* Image */}
        </div>
          <div className='max-w-[500px]'>
            <img src={require('../images/HomePage1AboutUs.png')} alt="" />
          </div>
      </div>
          <ProductSlider/>
    </div>
  )
}

export default Home;