import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import UserService from '../services/Users';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';
import ProductFormModal from '../components/ProductForm';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  
  
  

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  }

  return (
    <div>
        <div className='w-full flex justify-center'>
          <div className='w-[80%] flex justify-between p-10'>
            <div className='flex'>
              <div>
                <h2 className='text-2xl font-bold'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
            <div>
                <button 
                className='mr-3 border border-[#0C0C0C] bg-[#0C0C0C] text-[#FFF] p-1 px-6 font-semibold' 
                onClick={() => setIsModalOpen(true)}
                >
                    Add New Product
                </button>
                <input className='border border-1 border-[#0C0C0C4F] p-1 px-6' style={{color: 'black'}} onChange={handleInputChange} type="text"  placeholder='Kerko...'/>
            </div>
          </div>
        </div>
        <div>
          <ProductList isAdmin={true} productName={productName}/>
        </div>
        {isModalOpen && <ProductFormModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default AdminProducts;