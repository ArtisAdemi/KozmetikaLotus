import React, { useEffect, useState } from 'react';


const StatusModal = ({ closeStatusModal }) => {


 

  const handleSubmit = async (e) => {
  e.preventDefault();
  closeStatusModal();
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

            <div className='flex items-center'>
                <h2 className='mr-3 w-2/3'>Status: </h2>
                <select name="status" id="" className='w-full p-3'>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Finished">Finished</option>
                </select>
            </div>

             
            <div className="flex justify-end space-x-2">

              <button type="button" onClick={closeStatusModal} className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80">
                Cancel
              </button>

              <button type="submit" className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80">
                Edit Status
              </button>
              
            </div>
              {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default StatusModal;