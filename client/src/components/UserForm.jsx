import React, { useEffect, useState } from 'react';
import UserService from '../services/Users';

const UserForm = ({ closeModal, user }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    currentPassword: user?.currentPassword || '', // Initialize currentPassword
    password: user?.password || '', // Initialize newPassword

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!user?.id) {
      throw new Error("User ID is undefined");
    }

    // Construct the data object to send only modified fields
    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    });

    // Add currentPassword and password only if they are provided
    if (formData.currentPassword && formData.password) {
      updatedFields.currentPassword = formData.currentPassword;
      updatedFields.password = formData.password;
    }

    const res = await UserService.updateUser(user.id, updatedFields);
    console.log(res);
  } catch (err) {
    console.error("Error updating user", err);
  }
  closeModal();
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //           // Construct the data object to send only modified fields
  //           // const userData = Object.keys(formData).reduce((acc, key) => {
  //           //   if (formData[key] && formData[key] !== user[key]) {
  //           //     acc[key] = formData[key];
  //           //   }
  //           //   return acc;
  //           // }, {});
  //   const userData = {};
  // Object.keys(formData).forEach(key => {
  //   if (formData[key] !== user[key]) {
  //     userData[key] = formData[key];
  //   }
  // });

  //   if (formData.newPassword) { // Check if newPassword is provided
  //     userData.password = formData.newPassword;
  //     userData.currentPassword = formData.currentPassword;
  //   }
    
  //   try {
  //     const response = await UserService.updateUser(user.id, userData);
  //     console.log(response);
  //     closeModal();
  //   } catch (error) {
  //     console.error('Failed to update user:', error);
  //   }
  // };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

            <div className='flex'>
                <h2 className='mr-3 w-1/3'>Email: </h2>
                <input type="text" name="email" onChange={handleInputChange} placeholder="Email" required className="input input-bordered w-full" value={formData.email} />
            </div>

            <div className='flex'>
                <h2 className='mr-3 w-1/3'>First Name: </h2>
                <input name="firstName" onChange={handleInputChange} placeholder="First Name" required className="textarea textarea-bordered w-full" value={formData.firstName}/>
            </div>

            <div className='flex'>
                <h2 className='mr-3 w-1/3'>Last Name: </h2>
                <input name="lastName" onChange={handleInputChange} placeholder="Last Name" required className="textarea textarea-bordered w-full" value={formData.lastName}/>
            </div>

            <div className='flex'>
             <h2 className='mr-3 w-1/3'>Phone: </h2>
             <input type="text" name="phoneNumber" onChange={handleInputChange} placeholder="Phone" required className="input input-bordered w-full" value={formData.phoneNumber} />
            </div>

            <div className='flex'>
             <h2 className='mr-3 w-1/3'>Current Password: </h2>
             <input type="password" name="currentPassword" onChange={handleInputChange}  className="input input-bordered w-full" value={formData.currentPassword} />
            </div>
            <div className='flex'>
             <h2 className='mr-3 w-1/3'>New Password: </h2>
             <input type="password" name="password" onChange={handleInputChange}  className="input input-bordered w-full" value={formData.password} disabled={!formData.currentPassword}/>
            </div>
             
            <div className="flex justify-end space-x-2">

              <button type="button" onClick={closeModal} className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80">
                Cancel
              </button>

              <button type="submit" className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80">
                Edit
              </button>
              
            </div>
              {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default UserForm;