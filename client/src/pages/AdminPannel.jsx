import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import UserService from '../services/Users';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';
import ProductFormModal from '../components/ProductForm';

const AdminPannel = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const checkAdminRole = async () => {
        try {
            const userInfo = await UserService.validateToken();
            if (userInfo.user.role !== 'admin') {
                navigate('/');
            }
        } catch (error) {
            if (error.message === "No token provided") {
                console.error("No token provided. Redirecting to homepage");
                navigate('/');
            } else {
                console.error("Error validating user role", error);
                navigate('/');
            }
        }
    };

  useEffect(() => {
    checkAdminRole();
  }, [navigate]);

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
                className='mr-3 border border-[#A10550] text-[#A10550] p-1 px-6 font-semibold' 
                onClick={() => setIsModalOpen(true)}
                >
                    Add New Product
                </button>
                <input className='border border-1 border-[#0C0C0C4F] p-1 px-6' style={{color: 'black'}} type="text"  placeholder='Kerko...'/>
            </div>
          </div>
        </div>
        <div>
          <ProductList isAdmin={true}/>
        </div>
        {isModalOpen && <ProductFormModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default AdminPannel;
