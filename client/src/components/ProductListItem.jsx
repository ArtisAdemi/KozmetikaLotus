import { FaRegHeart } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/Products';

const ProductListItem = ({title, shortDescription, price, category, id, isAdmin }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [images, setImages] = useState([])

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

    return (
      <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg h-[430px]" onClick={() => isAdmin ? navigate(`/admin/${id}`) : navigate(`/products/${category}/${id}`)}>
        <div className="flex justify-center items-center w-full">
          <img className="object-cover max-w-[200px]" src={process.env.PUBLIC_URL + imagePath} alt="Image here" />
        </div>
        <div className="p-4">
          <h2 className="text-start text-xl text-[#292929] font-bold">{title}</h2>
          <p className="mt-1 text-start text-[#292929] text-sm">{shortDescription}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl text-[#292929] font-bold">€{price}</span>
            {/* This works, it changes the outline of the heart icon to red */}
            <FaRegHeart size={25} color={isLiked ? 'red' : 'black'} onClick={handleLike} />  
          </div>
        </div>
      </div>
    );
  };

export default ProductListItem