import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductListItem = ({ imageUrl, title, description, price, category, id }) => {
  const navigate = useNavigate();
    return (
      <div className="max-w-[250px] w-auto mx-auto bg-white shadow-lg" onClick={() => navigate(`/products/${category}/${id}`)}>
        <div className="flex justify-center items-center w-full">
          <img className="object-cover w-full" src={require('../images/Product3Home.png')} alt="asd" />
        </div>
        <div className="p-4">
          <h2 className="text-start text-xl text-[#A10550] font-bold">{title}</h2>
          <p className="mt-1 text-start text-gray-600 text-sm">{description}</p>
          <div className="flex justify-start items-start mt-4">
            <span className="text-xl text-gray-700 font-bold">€
{price}</span>
          </div>
        </div>
      </div>
    );
  };

export default ProductListItem