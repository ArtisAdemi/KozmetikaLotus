import {React, useState, useEffect} from 'react';
import Slider from 'react-slick';
import ProductService from '../services/Products';

// Import the slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';

const truncateDescription = (description, maxLength) => {
  if(description.length <= maxLength) {
    return description;
  }
  const truncated = description.split(' ').slice(0, maxLength).join(' ');
  return truncated + '...';
}

const ProductSlider = ({ category, uniqueCategories }) => {
  const [products, setProducts] = useState([])
  


  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    vertical: false,
    horizontal: true,
    slidesToShow: products.length > 0 ? Math.min(products.length, 4) : 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    // Add any other settings you need
  };


  useEffect(() => {
    fetchProducts();
  }, [])
  
  const filterModel = {
    category: category,
  }

  const fetchProducts = async () => {
    let result;
    try{
      if(uniqueCategories){
        result = await ProductService.getUniqueCategory();
        if (result.data) {
          setProducts(result.data);
        }
      } else {
        if (filterModel.category) {
          result = await ProductService.getProductsByFilter(filterModel);
          if (result) {
            setProducts(result.products);
          }
        }
        else {
          result = await ProductService.getProducts();
          if (result) {
            setProducts(result);
          }
        }
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }


  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[80%]'>
        <Slider {...settings}>
        {products.length > 0 && products.map((product, index) => (
          <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg" key={index}>
          <div className="flex justify-center items-center w-full">
            <img className="object-cover w-full" src={require('../images/Product3Home.png')} alt={product.title} />
          </div>
          <div className="p-4">
            {uniqueCategories ? <h3 className="text-start text-xl text-[#A10550] font-bold">{product.Categories[0].name}</h3> : <h3 className="text-start text-xl text-[#A10550] font-bold">{product.title}</h3>}
            {uniqueCategories ? null : <p className="mt-1 text-start text-gray-600 text-sm">{truncateDescription(product.shortDescription, 10)}</p>}
            <div className="flex justify-start items-start mt-4">
              <span className="text-xl text-gray-700 font-bold">
              {uniqueCategories ? null : <span className="text-xl text-gray-700 font-bold">€{product.price}</span>}</span>
            </div>
          </div>
        </div>
        ))}
        </Slider>
      </div>
    </div>
  );
};
          // <div key={index}>
          //   <img src={require('../images/Product1Home.png')} alt={product.title} />
          //   <div>
          //     {uniqueCategories ? <h3>{product.Categories[0].name}</h3> : <h3>{product.title}</h3>}
          //     {uniqueCategories ? null : <p>{truncateDescription(product.shortDescription, 10)}</p>}
          //     {uniqueCategories ? null : <span>€{product.price}</span>}
          //   </div>
          // </div>

export default ProductSlider;
