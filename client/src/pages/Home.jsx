import React from 'react'
import { Navbar, ProductSlider } from '../components'
import Star from '../Icons/Star'
import ArrowLeft from '../Icons/ArrowLeft'
import Divider from '../Icons/Divider'

const Home = () => {
  return (
    <div>
      {/* Full Container */}
      <div className='bg-[#F36EAE] w-full'>
        {/* Nav and picture */}
        <div>
          <div className='flex w-full justify-center text-[#FFFFFF]'>
            <Navbar />
          </div>
          <div className='flex justify-center'>
            <img src={require('../images/HomePage1.png')} alt="IMAGE 1" />
          </div>
          <div className='flex w-full justify-center'>
            <div className='md:flex justify-center w-[80%]'>
              <div className='flex items-center md:w-1/2'>
                <div>
                  <Star />
                </div>
                <div>
                  <p className='md:w-[60%] mt-5 text-[#FFFFFF]'>
                    Gjeni në internet produkte për kujdesin natyral të lëkurës, për trupin, për kujdesin e flokëve dhe kozmetikë.
                  </p>
                </div>
              </div>
              <div className='flex items-center mt-5'>
                <div className='flex w-1/2'>
                  <Divider/>
                </div>
                <div className='flex w-1/2'>
                  <a className='font-semibold ml-4 flex items-center text-[#FFFFFF]' href="/">Eksploroni te gjitha Produktet <ArrowLeft /></a>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Second Part of container with pink bg */}
         {/* Middle section with testimonials and products */}
      <div className='flex justify-center w-full items-center my-12 pb-16 px-6 bg-transparent'>
        <div className='test w-[80%] justify-center md:flex '>

        {/* Testimonial Section */}
        <div className='flex flex-col items-center border-2 border-[#FFFFFF] rounded-lg p-12 w-[30%] m-4 bg-transparent hidden md:block'>

          <p className='text-lg font-semibold mb-2 text-[#FFFFFF]'>Your Love For Oh that! Natural</p>
          <p className='text-[#FFFFFF]'>Oh that! Natural is dedicated to providing a healthy skincare product that is free from artificial, synthetic.</p>
          {/* Testimonial Author */}
          <div className='flex items-center mt-4'>
            <img className='w-12 h-12 rounded-full mr-2' src={require('../images/HomeUserIcon.png')} alt='Emine Avci' /> {/* Adjust the path as necessary */}
            <div>
              <p className='font-semibold text-[#FFFFFF]'>Emine Avci</p>
              <p className='text-sm text-[#FFFFFF]'>Specialist, USA</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className='flex flex-col m-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-[#FFFFFF]'>Produktet e reja</h2>
            <Divider /> {/* Your divider component */}
          </div>
          {/* Product Item */}
          <div className='flex items-center justify-between bg-transparent p-4 rounded-lg mb-3'>
            <div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product1Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold text-[#FFFFFF]'>Rosemary Face Grow Serum</p>
                  <p className='text-sm text-[#FFFFFF]'>$25.00</p>
                </div>
              </div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product2Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold text-[#FFFFFF]'>Rosemary Face Grow Serum</p>
                  <p className='text-sm text-[#FFFFFF]'>$25.00</p>
                </div>
              </div>
            </div>
          </div>
            
        </div>

          {/* Additional Section */}
          <div className='flex flex-col m-4'>
            <div>
              <h4 className='font-bold text-sm mb-4 text-[#FFFFFF]'>PRODUKTET TONA ME TE SHITURA</h4>
            </div>
            <div>
             <img className='w-64 h-64' src={require('../images/Product3Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
            </div>
          </div>
        </div>
        </div>
      </div>
      {/* About us section */}
      <div className='md:flex justify-center px-12 py-16'>
        <div className='w-[80%] mr-12 max-w-[500px] text-center'>
          {/* Text Section */}
          <div>
            <h1 className='text-3xl font-bold text-center text-[#A10550]'>Rreth Nesh</h1>
          </div>
          <div>
            <p className='text-center text-[#A10550]'>Ju faleminderit që vizitoni website-in tonë. Shpresojmë që të gjeni produktet e duhura për të arritur qëllimet tuaja për kujdesin e lëkurës. Ne jemi këtu për të ndihmuar në rrugën tuaj drejt një lëkure të shëndetshme dhe të bukur. Urojme që të keni një eksperiencë të mrekullueshme me produktet e Kozmetika Lotus</p>
          </div>
          <div className='mt-4'>
            <a className='text-center underline font-semibold text-[#A10550]' href="/about">Lexo me shume</a>
          </div>
        {/* Image */}
        </div>
          <div className='max-w-[500px]'>
            <img src={require('../images/HomePage1AboutUs.png')} alt="" />
          </div>
      </div>

      {/* Kategorite Section */}

      {/* Parent Container with bg color */}
      <div className='w-full bg-[#E9E9D7] flex justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl font-semibold text-center text-[#A10550]'>Kategoritë</h1>
          </div>
        </div>
      </div>
          {/* Slider */}
      <div className='bg-[#E9E9D7] pb-20'>
          <ProductSlider uniqueCategories={true}/>
      </div>
      
      {/* Best Seller slider */}
      <div className='w-full bg-[#FAF9F5] justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl font-semibold text-center text-[#A10550]'>Produktet me te shitura</h1>
          </div>
        </div>
      <div className='bg-[#FAF9F5] pb-20 mt-10 w-full'>
        <ProductSlider category={"lipstick"}/>
      </div>
      </div>
    </div>
  )
}

export default Home;