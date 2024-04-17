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
  const [selectedTab, setSelectedTab] = useState("Products");
  
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

  return (
   <div className='w-full justify-center'>
    
     {/* Test shit */}
     <div className='tab-selector flex rounded-md mt-10 w-[20%] mx-auto justify-center'>
       <div className=''>
         <button onClick={() => setSelectedTab("Products")} className='border rounded-md py-2 px-6'>Products</button>
       </div>
       <div className=''>
         <button onClick={() => setSelectedTab("Orders")} className='border rounded-md py-2 px-6'>Orders</button>
       </div>
       <div className=''>
         <button onClick={() => setSelectedTab("Clients")} className='border rounded-md py-2 px-6'>Clients</button>
       </div>
     </div>
     {selectedTab === 'Orders' && <Orders/>}
     {selectedTab === 'Products' && <AdminProducts/>}
     {selectedTab === 'Clients' && <Clients/>}

   </div>

              

  );
}

export default AdminPannel;
