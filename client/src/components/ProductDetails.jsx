import React, { useEffect, useState } from 'react'
import ProductService from '../services/Products';
import ProductImageSlider from './ProductImageSlider';
import Product1Home from '../images/Product1Home.png'
import Product2Home from '../images/Product2Home.png'
import Product3Home from '../images/Product3Home.png'


const ProductDetails = ({imageUrl, title, category, shortDescription, longDescription, id, price}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log("ID", id)
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
            <div className='w-[50%]'>
              <div className='mb-3'>
               <h2 className='text-[#A10550] text-2xl font-bold'>{title}</h2>
              </div>
              <div className='mb-4'>
                <p className='text-sm'>{shortDescription}</p>
              </div>
              <div className='w-full border border-t-0 border-r-0 border-l-0 border-b-[#606060]'>
              <p className='w-full text-end'>
                €{price}
              </p>
              </div>
              <div className='navbar-right mt-3 border-[2px] border-[#A10550] px-5 items-center justify-center text-center hidden md:flex'>
                <button className='text-center items-center'><a href="/contact" className='text-center items-center text-[#A10550]'>Contact Us</a></button>
              </div>
            </div>
          </div>
            <div className='w-full'>
              <ProductImageSlider images={staticImages}/>
            </div>
        </div>
       </div>
    </div>
  )
}

export default ProductDetails;