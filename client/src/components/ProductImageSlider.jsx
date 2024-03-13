import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Import the slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductImageSlider = ({ images }) => {
  // Settings for the vertical slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    horizontalSwipe:false,
    verticalSwiping: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: function(currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function(currentSlide) {
      console.log("after change", currentSlide);
    }
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", backgroundColor: "#ABABAB", borderRadius: "100%" }}
        onClick={onClick}
      />
    );
  } 

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",  background: "#ABABAB", borderRadius: "100%" }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className='max-h-[200px] max-w-[600px]'>
      <Slider {...settings}>
        {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center h-[100px] max-w-[100px] rounded-md">
                <img src={image.url} alt={`Product Image ${index + 1}`} className="object-cover"/>
            </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageSlider;