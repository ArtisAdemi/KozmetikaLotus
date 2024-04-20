import React, { useEffect, useState } from 'react';
import ClientDetails from './ClientDetails';

const Clients = () => {
    const [clientDetails, setClientDetails] = useState(false);

    const handleClientDetails = () => {
        setClientDetails(true);
      }

  return (
    <div>
       <div className='orders-container flex justify-center w-full my-16'>
                    {
                        !clientDetails &&
                    <div className='orders-content w-[80%] flex flex-col'>
                        <div className='flex items-center p-2 w-full justify-between md:justify-normal border border-b-[#BDBDBD] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-xl md:text-2xl text-[#212121] font-semibold'>Clients</h2>
                        </div>
                        <div className='hidden md:flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>ID #</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Full Name</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Phone Number</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Action</h2>
                        </div>

                        {/* STATIC ORDER DATA */}
                        <div className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg w-[10%] md:w-[16.6%]'>1</h2>                           
                            <h2 className='text-[#333333] md:text-lg w-[16.6%]'>Florian Berisha</h2>
                            <h2 className='hidden md:block text-[#333333] text-end md:text-start md:text-lg w-[16.6%]'>045555555</h2>
                            <h2 onClick={handleClientDetails} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View Client</h2>
                        </div>
                        <div className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg w-[10%] md:w-[16.6%]'>2</h2>                           
                            <h2 className='text-[#333333] md:text-lg w-[16.6%]'>Florian Berisha</h2>
                            <h2 className='hidden md:block text-[#333333] text-end md:text-start md:text-lg w-[16.6%]'>045555555</h2>
                            <h2 onClick={handleClientDetails} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View Client</h2>
                        </div>
                        <div className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg w-[10%] md:w-[16.6%]'>3</h2>                           
                            <h2 className='text-[#333333] md:text-lg w-[16.6%]'>Florian Berisha</h2>
                            <h2 className='hidden md:block text-[#333333] text-end md:text-start md:text-lg w-[16.6%]'>045555555</h2>
                            <h2 onClick={handleClientDetails} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View Client</h2>
                        </div>
                    </div>        
                }</div>
                    
                {clientDetails && <ClientDetails closeClientDetails={() => setClientDetails(false)} />}
    </div>
  );
}

export default Clients;