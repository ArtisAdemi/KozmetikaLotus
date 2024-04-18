import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/Products';
import LikeProduct from "./LikeProduct";
import { useDispatch } from 'react-redux';
import { addToCart } from '../state';

const ProductListItem = ({title, shortDescription, price, category, id, isAdmin }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [images, setImages] = useState([])
  const dispatch = useDispatch();

  const handleLike = () => {
    setIsLiked(!isLiked);
  }
  
  const fetchImages = async () => {
    const fetchedImages = await ProductService.getProductImages(id);
    setImages(fetchedImages);
  };

  useEffect(() => {
      fetchImages();
  }, [id]);

  const imagePath = images.length > 0 ? `/uploads/${images[0].fileName}` : '';
  const img = process.env.PUBLIC_URL + imagePath;

  const handleAddToCart = () => {
    const product = {
        title,
        category,
        shortDescription,
        id,
        price,
        imgUrl: img
    };
    dispatch(addToCart({ product }));
};

    return (
      <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg h-[430px]">
        <div className="flex justify-center items-center w-full h-[300px]" onClick={() => isAdmin ? navigate(`/admin/${id}`) : navigate(`/products/${category}/${id}`)}>
          <img  className="object-cover max-w-[200px]" src={process.env.PUBLIC_URL + imagePath} alt="Image here" />
        </div>
        <div className="p-4">
          <h2 className="text-start text-xl text-[#292929] font-bold">{title}</h2>
          <p className="mt-1 text-start text-[#292929] text-sm">{shortDescription}</p>
          {/* Lower Part */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl text-[#292929] font-bold">€{price}</span>
            <button className='text-center text-[#A3A7FC] font-semibold items-center py-2 ' onClick={handleAddToCart}>Add To Cart</button>
            {/* This works, it changes the outline of the heart icon to red */}
            <LikeProduct productId={id} />
          </div>
        </div>
      </div>
    );
  };

export default ProductListItem