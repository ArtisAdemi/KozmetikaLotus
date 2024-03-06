import React from 'react'
import about1 from "../images/about1.png"
import carissa from "../images/carissa.png"
import overlap from "../images/overlap.png"

const AboutUs = () => {
  return (
    <div className=''>
      <div className='text-2xl mx-48 my-8 flex'>
        <p className='font-semibold'>Rreth nesh</p>
      </div>

      <div className='bg-[#3D021E] flex items-center flex-col'>
        <div className='w-[80%] flex flex-col justify-center'>
          <p className='text-[#FFFFFF] text-3xl font-sans pt-10 pb-6'>Marka Jonë</p>

          <img src={about1} alt="blla" className="" />

          <div className='pt-6 pb-10'>
            <p className='text-[#FFFFFF] text-lg font-sans'>Mireserdhe në Kozmetika Lotus! Ne jemi një biznes kozmetike i themeluar që nga viti 2015, me një pasion për kujdesin</p>
            <p className='text-[#FFFFFF] text-lg font-sans'>E lëkurës. Ne ofrojmë produkte të cilësisë së lartë.</p>
          </div>
        </div>
      </div>

      <div className='mt-10 flex justify-center '>

        <div className='w-[80%] flex gap-80'>

        <div className='w-[496px] h-[362px]'>
          <h2 className='font-sans text-2xl font-bold mb-2 text-[#292929]'>Trashegimia</h2>
          <p className='text-lg text-[#292929]'>Ne jemi një E-Commerce i përkushtuar që ofron produkte cilësore për kujdesin e lëkurës, flokëve, trupit, makeup dhe shumë produkte të tjera. Qëllimi ynë është të sjellim trendet më të fundit dhe të ofrojmë dërgesa në të gjithë Europën. Klientët tanë janë shumë të kënaqur me shërbimin tonë dhe cilësinë e produkteve tona. Ne jemi këtu për t’ju ndihmuar dhe për të siguruar që ju të keni një përvojë të mrekullueshme. Faleminderit për mbështetjen tuaj!</p>
        </div>
        <div className='mt-8'>
        <img src={carissa} alt="blla" className="" />
        </div>
        </div>

      </div>

      {/* characteristics */}
      
      <div className='flex items-center flex-col mt-8'>
        <div className='w-[80%] flex flex-col justify-center'>

        <div className='mb-3 w-[70%]'>
          <h2 className='text-2xl font-bold'>Ethical And Sustainable Beauty:</h2>
          <p className='text-lg text-[#292929]'>At Beautya cosmetic company , we believe that beauty should never come at the expense of animals, the environment, or our customers' health. That's why we've made sure that our products are vegan, curl-free, gluten-free, and packaged in recycled materials</p>
        </div>
        <div className='mb-3 w-[70%]'>
          <h2 className='font-bold text-xl'>Vegan, Curl-Free</h2>
          <p className='text-lg text-[#292929]'>When we say our products are vegan, we mean that we never use any animal-derived ingredients or byproducts in our formulations. We believe that cruelty-free beauty is the way of the future, and we're proud to be a part of that movement.</p>
        </div>
        <div className='mb-3 w-[70%]'>
          <h2 className='font-bold text-xl'>Gluten-Free Products</h2>
          <p className='text-lg text-[#292929]'>For those with sensitivities or allergies to gluten, we've made sure that our products are 100% gluten-free. You can use our products with confidence, knowing that they are safe and gentle on your skin.</p>
        </div>
        <div className='w-[70%]'>
          <h2 className='font-bold text-xl'>Recycled Packaging</h2>
          <p className='text-lg text-[#292929]'>Finally, we're committed to doing our part for the environment, which is why we've packaged our products in recycled materials. By choosing our products, you're making a positive impact on the planet and reducing your environmental footprint.
We're dedicated to providing you with high-quality, ethically-sourced beauty solutions that you can feel good about using. </p>
        </div>
        </div>
      </div>


      {/* overlapping images */}
      <div className='mt-12'>
        

        <div className='bg-[#3D021E] w-[100%] h-52'>

        </div>

        <div className='flex justify-center'> 
          <div className='w-[80%] flex gap-10'>

          <div className='-mt-28'>
            <img src={overlap} alt="blla" className="w-[777px] " />
          </div>
          <div className='w-96 h-48'>
            <h2 className='font-bold text-2xl text-[#292929] mb-5'>Diversity Equity & Inclusion</h2>
            <p className='text-lg'>We believe that beauty is a form of self-expression and should be inclusive of all cultures and traditions, which is why we offer products that are inspired by diverse beauty rituals from around the world."</p>
          </div>
          </div>
        </div>

        <div className='w-[60%] flex flex-col mb-5'>
          <h2 className='text-2xl text-[#292929] font-bold mb-5 mt-7'>Our Commitments</h2>
          <p className='text-lg text-[#292929]'>We believe that everyone deserves access to safe, effective, and ethical cosmetic products, regardless of their lifestyle or dietary restrictions. Our commitment to these values extends beyond our product offerings to include sustainable and eco-friendly manufacturing processes, ethical sourcing of ingredients, and giving back to the communities we serve. At Beautya , we are proud to be a leader in the ethical and sustainable beauty industry, and we look forward to continuing to innovate and push boundaries in our commitment to providing our customers with the best products and experiences possible</p>
        </div>

      </div>

    </div>
  )
}

export default AboutUs