import React from 'react'
import { Navbar, ProductSlider } from '../components'
import Star from '../Icons/Star'
import ArrowLeft from '../Icons/ArrowLeft'
import Divider from '../Icons/Divider'
import overlap from "../images/overlap.png"
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Full Container */}
      <div className='bg-[#F7CEE7] w-full'>
        {/* Nav and picture */}
        <div>
          <div className='flex w-full justify-center'>
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
                  <p className='md:w-[60%] mt-5 text-[#292929]'>
                    Gjeni në internet produkte për kujdesin natyral të lëkurës, për trupin, për kujdesin e flokëve dhe kozmetikë.
                  </p>
                </div>
              </div>
              <div className='flex items-center mt-5'>
                <div className='flex w-1/2'>
                  <Divider/>
                </div>
                <div className='flex w-1/2'>
                  <a className='font-semibold ml-4 flex items-center text-[#292929]' href="/">Eksploroni te gjitha Produktet <ArrowLeft /></a>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Second Part of container with pink bg */}
         {/* Middle section with testimonials and products */}
      <div className='flex justify-center w-full items-center  pb-16 px-6 bg-transparent'>
        <div className='test w-[80%] justify-center md:flex '>

        {/* Testimonial Section */}
        <div className='flex flex-col items-center border-2 border-[#292929] rounded-lg p-12 w-[30%] m-4 bg-transparent hidden md:block'>

          <p className='text-lg font-semibold mb-2 text-[#292929]'>Your Love For Oh that! Natural</p>
          <p className='text-[#292929]'>Oh that! Natural is dedicated to providing a healthy skincare product that is free from artificial, synthetic.</p>
          {/* Testimonial Author */}
          <div className='flex items-center mt-4'>
            <img className='w-12 h-12 rounded-full mr-2' src={require('../images/HomeUserIcon.png')} alt='Emine Avci' /> {/* Adjust the path as necessary */}
            <div>
              <p className='font-semibold text-[#292929]'>Emine Avci</p>
              <p className='text-sm text-[#292929]'>Specialist, USA</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className='flex flex-col m-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-[#292929]'>Produktet e reja</h2>
            <Divider /> {/* Your divider component */}
          </div>
          {/* Product Item */}
          <div className='flex items-center justify-between bg-transparent p-4 rounded-lg mb-3'>
            <div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product1Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold text-[#292929]'>Rosemary Face Grow Serum</p>
                  <p className='text-lg font-bold text-[#292929]'>$25.00</p>
                </div>
              </div>
              <div>
                <img className='w-32 h-16' src={require('../images/Product2Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
                <div>
                  <p className='font-semibold text-[#292929]'>Rosemary Face Grow Serum</p>
                  <p className='text-lg font-bold text-[#292929]'>$25.00</p>
                </div>
              </div>
            </div>
          </div>
            
        </div>

          {/* Additional Section */}
          <div className='flex flex-col m-4'>
            <div>
              <h4 className='font-bold text-sm mb-4 text-[#292929]'>PRODUKTET TONA ME TE SHITURA</h4>
            </div>
            <div>
             <img className='w-64 h-64' src={require('../images/Product3Home.png')} alt='Rosemary Face Grow Serum' /> {/* Adjust the path as necessary */}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Kategorite Section */}

      {/* Parent Container with bg color */}
      <div className='w-full bg-[#FFFFFF] flex justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl md:text-5xl font-semibold font-eb-garamond text-center text-[#292929]'>Kategoritë</h1>
          </div>
        </div>
      </div>
          {/* Slider */}
      <div className='bg-[#FFFFFF] pb-20'>
          <ProductSlider uniqueCategories={true}/>
      </div>
      
      {/* Best Seller slider */}
      <div className='w-full bg-[#F2E2DA] justify-center overflow-hidden py-12'>
        {/* Content Container */}
        <div className='w-[80%] mx-auto grid justify-center'>
          {/* Header */}
          <div className='items-center text-center'>
            <h1 className='text-3xl md:text-5xl font-eb-garamond font-semibold text-center text-[#292929]'>Produktet me te shitura</h1>
          </div>
        </div>
      <div className='bg-[#F2E2DA] pb-20 mt-10 w-full'>
        <ProductSlider subCategory={"tonic"}/>
      </div>
      </div>
      {/* About us section */}
      <div className='md:flex justify-center bg-[#FAFAFA] px-12 py-16'>
        <div className='w-[100%] mr-12 max-w-[500px] text-center'>
          {/* Text Section */}
          <div>
            <h1 className='text-3xl font-bold text-center text-[#292929]'>Rreth Nesh</h1>
          </div>
          <div>
            <p className='text-center text-[#292929]'>Ju faleminderit që vizitoni website-in tonë. Shpresojmë që të gjeni produktet e duhura për të arritur qëllimet tuaja për kujdesin e lëkurës. Ne jemi këtu për të ndihmuar në rrugën tuaj drejt një lëkure të shëndetshme dhe të bukur. Urojme që të keni një eksperiencë të mrekullueshme me produktet e Kozmetika Lotus</p>
          </div>
          <div className='mt-4'>
            <a className='text-center underline font-semibold text-[#292929]' href="/about">Lexo me shume</a>
          </div>
        {/* Image */}
        </div>
          <div className='md:max-w-[500px]'>
            <img src={require('../images/HomePage1AboutUs.png')} alt="" />
          </div>
      </div>

        {/* Marka Jone (Big Screen)*/}
        <div className='hidden md:flex bg-[#FFFFFF]  items-center flex-col'>
          <div className='w-[80%] flex my-20 flex-col md:flex-row justify-center'>
            <div className='bg-[#292929] justify-center items-center mx-auto md:pl-24 pt-10'>
              <h2 className='text-[#FFFFFF] mb-3 text-2xl'>Marka Jonë</h2>
              <p className='text-[#FFFFFF] mb-3'>Klientët tanë janë të rëndësishëm për ne, prandaj ofrojmë këshilla të personalizuara dhe ndihmë për të zgjedhur produktet e duhura për nevojat e tyre. Nëse keni pyetje ose nevojë për këshillë, jemi këtu për t’ju ndihmuar.</p>
              <button className='text-[#FFFFFF] border w-full md:w-[20%] px-8 py-2' onClick={() => navigate('/contact')}>Na Kontaktoni</button>
            </div>
            <div className=''>
              <img src={overlap} alt="" />
            </div>
         </div>
        </div>

        {/* overlapping images */}
      <div className='bg-[#FBEFF2] md:hidden mb-5'>
        

        <div className='bg-[#292929] w-[100%] h-52 pt-12'>

        </div>

        <div className='w-full flex justify-center'> 
          <div className='w-[80%] lg:flex gap-10'>

            <div className='-mt-28'>
              <img src={overlap} alt="blla" className="w-[777px] " />
            </div>
            <div className='mt-3 lg:w-96 lg:h-48'>
              <h2 className='text-[#292929] mb-3 text-2xl'>Marka Jonë</h2>
              <p className='text-[#292929] mb-3'>Klientët tanë janë të rëndësishëm për ne, prandaj ofrojmë këshilla të personalizuara dhe ndihmë për të zgjedhur produktet e duhura për nevojat e tyre. Nëse keni pyetje ose nevojë për këshillë, jemi këtu për t’ju ndihmuar.</p>
              <button className='text-[#292929] border border-[#292929] w-full md:w-[20%] px-8 py-2' onClick={() => navigate('/contact')}>Na Kontaktoni</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;