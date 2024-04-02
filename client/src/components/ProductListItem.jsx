import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";

const ProductListItem = ({ imageUrl, title, shortDescription, longDescription, price, category, id, isAdmin }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  }

    return (
      <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg" onClick={() => isAdmin ? navigate(`/admin/${id}`) : navigate(`/products/${category}/${id}`)}>
        <div className="flex justify-center items-center w-full">
          <img className="object-cover w-full" src={require('../images/Product3Home.png')} alt="asd" />
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