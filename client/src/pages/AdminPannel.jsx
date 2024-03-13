import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import UserService from '../services/Users';

const AdminPannel = () => {
  const navigate = useNavigate();
  
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
        <ProductForm />
    </div>
  );
}

export default AdminPannel;
