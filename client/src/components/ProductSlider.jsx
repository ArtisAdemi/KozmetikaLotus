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

const ProductSlider = ({ category, uniqueCategories }) => {
  const [products, setProducts] = useState([])
  


  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    slidesToShow: products.length < 4 ? products.length : 4,
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
    category: category
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
            setProducts(result);
          }
        }
        else {
          result = await ProductService.getProducts();
          if (result) {
            setProducts(result);
          }
        }
      }
      // if (result) {
      //   setProducts(result);
      // }
      console.log("Products", products)
    } catch (err) {
      console.error("Error:", err)
    }
  }


  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[80%]'>
        <Slider {...settings}>
        {products.length > 0 && products.map((product, index) => (
          <div key={index}>
            <img src={require('../images/Product1Home.png')} alt={product.title} />
            <div>
              {uniqueCategories ? <h3>{product.Categories[0].name}</h3> : <h3>{product.title}</h3>}
              {uniqueCategories ? null : <p>{truncateDescription(product.description, 10)}</p>}
              {uniqueCategories ? null : <h4>€{product.price}</h4>}
            </div>
          </div>
        ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
