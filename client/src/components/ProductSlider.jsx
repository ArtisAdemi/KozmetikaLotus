import {React, useState, useEffect} from 'react';
import Slider from 'react-slick';

// Import the slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductService from '../services/Products';

const ProductSlider = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts();
  }, [])
  
  const fetchProducts = async () => {
    try{
      const result = await ProductService.getProducts();
      if (result) {
        setProducts(result);
        console.log(products, "Products")
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>
          4
        </h3>
      </div>
    </Slider>
  );
};

export default ProductSlider;
