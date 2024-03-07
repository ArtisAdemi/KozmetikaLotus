import React from 'react'

const ProductListItem = ({ imageUrl, title, description, price }) => {
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-center items-center w-full h-64">
          <img className="object-cover" src={require('../images/Product3Home.png')} alt="asd" />
        </div>
        <div className="p-4">
          <h2 className="text-center text-2xl text-gray-900 font-bold">Lorem ipsum dolor sit amet.</h2>
          <p className="mt-1 text-center text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores quod quas eaque consequatur sapiente corrupti.</p>
          <div className="flex justify-center items-center mt-4">
            <span className="text-xl text-gray-700 font-bold">10.99</span>
          </div>
        </div>
      </div>
    );
  };

export default ProductListItem