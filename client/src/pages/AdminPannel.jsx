import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import UserService from '../services/Users';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';
import ProductFormModal from '../components/ProductForm';
import Orders from '../components/Orders';
import AdminProducts from '../components/AdminProducts';
import Clients from '../components/Clients';

const AdminPannel = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [selectedTab, setSelectedTab] = useState(getInitialTab());
  
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
  console.log(selectedTab);

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  }

  useEffect(() => {
    checkAdminRole();
  }, [navigate]);


  //By default kjo o "Products", kur ndrrohet me onClick perdoret useEffect poshte, edhe masanej ndrrohet savedTab
  function getInitialTab() {
    // getting stored tabs
    const tabData = localStorage.getItem('ADMIN_TAB');
    const savedTab = JSON.parse(tabData);
    return savedTab || "Products";  
  }

  useEffect(() => {
    // storing tabs
    const tabData = JSON.stringify(selectedTab);
    localStorage.setItem('ADMIN_TAB', tabData);
  }, [selectedTab]);
  

  return (
   <div className='w-full justify-center'>
    
     {/* Test shit   bg-[#202630] text-[#FFFFFF] */}
     <div className='tab-selector bg-[#F1F1F1] flex rounded-md mt-10 w-[17%] mx-auto justify-center'>
       <div className=''>
        {selectedTab === 'Products' ? (
          <button onClick={() => setSelectedTab("Products")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Products</button>
        ) : (
          <button onClick={() => setSelectedTab("Products")} className='font-semibold rounded-md py-4 px-6'>Products</button>
        )}         
       </div>
       <div className=''>
       {selectedTab === 'Orders' ? (
          <button onClick={() => setSelectedTab("Orders")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Orders</button>
        ) : (
          <button onClick={() => setSelectedTab("Orders")} className='font-semibold rounded-md py-4 px-6'>Orders</button>
        )}
       </div>
       <div className=''>
       {selectedTab === 'Clients' ? (
          <button onClick={() => setSelectedTab("Clients")} className='font-semibold bg-[#202630] text-[#FFFFFF] rounded-md py-4 px-6'>Clients</button>
        ) : (
          <button onClick={() => setSelectedTab("Clients")} className='font-semibold rounded-md py-4 px-6'>Clients</button>
        )}
       </div>
     </div>
     {selectedTab === 'Orders' && <Orders/>}
     {selectedTab === 'Products' && <AdminProducts/>}
     {selectedTab === 'Clients' && <Clients/>}

   </div>

              

  );
}

export default AdminPannel;
