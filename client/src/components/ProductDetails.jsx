import React, { useEffect, useState } from 'react'
import ProductService from '../services/Products';
import ProductImageSlider from './ProductImageSlider';
import Product1Home from '../images/Product1Home.png'
import Product2Home from '../images/Product2Home.png'
import Product3Home from '../images/Product3Home.png'
import CardGiftcard from '../Icons/CardGiftcard';
import Discount from '../Icons/Discount';
import QAndA from '../Icons/Q&A';
import ProductSlider from './ProductSlider';



const ProductDetails = ({imageUrl, title, category, shortDescription, longDescription, id, price, isAdmin}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
        const fetchedImages = await ProductService.getProductImages(id);
        setImages(fetchedImages);
    };
    fetchImages();
  }, [id]);

  const staticImages = [
    { url: Product1Home },
    { url: Product2Home },
    { url: Product3Home },
  ];

  return (
    <div>
       <div className='w-full bg-red flex justify-center'>
        <div className='block w-[80%]'>

          <div className='grid grid-cols-2 pb-10 gap-10'>
            <div className='items-center flex justify-center'>
              <img src={Product3Home} alt="img" className='object-cover w-full max-h-[400px]'/>
            </div>
            <div className='w-[70%]'>
              <div className='mb-3'>
               <h2 className='text-[#292929#292929] text-2xl font-bold'>{title}</h2>
              </div>
              <div className='mb-4'>
                <p className='text-sm'>{shortDescription}</p>
              </div>
              <div className='w-full border border-t-0 border-r-0 border-l-0 border-b-[#606060]'>
              <p className='w-full text-end'>
                €{price}
              </p>
              </div>
              <div className='navbar-right mt-3 border-[2px] border-[#292929] px-5 items-center justify-center text-center hidden md:flex'>
                <button className='text-center items-center py-2'><a href="/contact" className='text-center items-center text-[#292929]'>Contact Us</a></button>
              </div>
              <div className='text-xs mt-6 bg-[#A3A7FC] p-8 text-[#FFFFFF] font-sans font-semibold'>
                <div className='flex mb-3'>
                  <div>
                    <CardGiftcard />
                  </div>
                  <p className='ml-3 mt-1'>Transporti Falas Per Porosite Mbi 50$</p>
                </div>
                <div className='flex mb-3'>
                  <div>
                    <Discount />
                  </div>
                  <p className='ml-3'>+10 Vite Eksperience</p>
                </div>
                <div className='flex mb-3'>
                  <div>
                    <QAndA />
                  </div>
                  <p className='ml-3'>Faleminderit Qe Na Zgjodhet</p>
                </div>
              </div>
            </div>
          </div>
            <div className='w-full'>
              <ProductImageSlider images={staticImages}/>
            </div>
        </div>
       </div>
        <div className='py-12 w-full flex justify-center pb-64'>
          <div className='w-[80%] bg-[#FFFFFF] border border-1 py-5 px-6'>
            <h1 className='text-[#292929] font-semibold'>Detajet e Produktit</h1>
            <p className='mt-2'>{longDescription}</p>
          </div>
        </div>
        <div className='bg-[#C6D0BC] w-full flex justify-center'>
          <div className='w-[80%] text-center p-6'>
            <h1 className='font-bold text-xl'>You May Also Like</h1>
            <div className='mt-10 pb-10'>
              <ProductSlider category={category}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetails;