import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const UserForm = ({ closeModal, user }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    closeModal();
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

          <input type="text" name="email" onChange={handleInputChange} placeholder="Email" required className="input input-bordered w-full" value={formData.email} />
          <input name="firstName" onChange={handleInputChange} placeholder="First Name" required className="textarea textarea-bordered w-full" value={formData.firstName}/>
          <input name="lastName" onChange={handleInputChange} placeholder="Last Name" required className="textarea textarea-bordered w-full" value={formData.lastName}/>
          <input type="text" name="phoneNumber" onChange={handleInputChange} placeholder="Phone" required className="input input-bordered w-full" value={formData.phoneNumber} />
          
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="btn btn-outline btn-accent">Cancel</button>
            <button type="submit" className="btn btn-primary">Edit</button>
          </div>
            {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default UserForm;