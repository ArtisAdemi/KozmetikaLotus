import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'


const Checkout = () => {
    const [user, setUser] = useState({});

    const getUserData = async () => {
        let res;
        try{
          res = await AuthService.decodeUser();
          setUser(res.data);
        } catch (err) {
          console.error(err)
          return null;
        }
      }

      useEffect(() => {
        getUserData();
      }, [])
    
    return (
        <div>
            <div className='flex w-full justify-center'>
                <Navbar />
            </div>

            <div className='profile-container flex justify-center w-full my-12'>
                <div className='profile-content w-[80%] justify-center md:flex'>
                    
                    <div className='w-[100%] flex '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center my-12'>

                            <div className='flex w-full'>

                                <div className='flex w-[40%] flex-col'>

                                <form>

                                    <h1 className='text-[#212121] pb-4 mb-8 border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0 font-semibold text-3xl'>
                                        Fatura e Adresimit
                                    </h1>

                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Emri: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Mbiemri: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.lastName}</h2>
                                    </div>

                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>

                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Nr. Telefonit: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.phoneNumber}</h2>
                                    </div>
                                    
                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Qyteti: </h2>
                                        <input className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                         type="text" />
                                    </div>

                                    <div className='flex mb-5 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Adresa: </h2>
                                        <input className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                         type="text"/>
                                    </div>
                                    
                                    <div className='flex justify-start mb-8 items-center'>
                                        <h2 className='w-[20%] font-medium'>Kodi Postal: </h2>
                                        <input className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'
                                         type="text"/>
                                    </div>

                                    <button className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-[50%]  text-[#FFFFFF] shadow-xl hover:opacity-80'>
                                        Porosit
                                    </button>

                                </form>

                                </div>

                            </div>

                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={faChevronLeft} color='#828282'/>
                                <h2 className=' ml-3 text-[#828282]'><a href="/products/all">Back to Products</a></h2>
                            </div>

                        </div>
                    </div>          
                </div>
            </div>
        </div>

    )
}

export default Checkout

