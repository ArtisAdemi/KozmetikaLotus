import {React, useState, useEffect} from 'react';
import Slider from 'react-slick';
import ProductService from '../services/Products';

// Import the slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';

const truncateDescription = (description, maxLength) => {
  if(description.length <= maxLength) {
    return description;
  }
  const truncated = description.split(' ').slice(0, maxLength).join(' ');
  return truncated + '...';
}

const ProductSlider = () => {
  const [products, setProducts] = useState([])
  


  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    slidesToShow: 4,
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
  
  const fetchProducts = async () => {
    try{
      const result = await ProductService.getProducts();
      if (result) {
        setProducts(result);
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }


  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[80%]'>
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index}>
                <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>{truncateDescription(product.description, 10)}</p>
                <h4>€{product.price}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
