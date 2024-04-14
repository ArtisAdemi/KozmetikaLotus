import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';

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

                            <h1 className='text-[#212121] font-semibold text-3xl'>Fatura e Porosisë</h1>

                            <div className='flex w-full'>

                                <div className='flex w-[40%] flex-col'>
                                    <div className='flex mb-8 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>First Name: </h2>
                                        <h2 className='rounded-md w-[80%] p-3  md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>

                                    <div className='flex mb-8 justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>First Name: </h2>
                                        <h2 className='rounded-md w-[80%] p-3  md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>
                                    
                                    <div className='flex justify-start items-center'>
                                        <h2 className='w-[20%] font-medium'>Email: </h2>
                                        <h2 className='rounded-md w-[80%] p-3 md:p-4 border bg-[#FBFCFDF0] border-[#E4E7EB]'>{user.email}</h2>
                                    </div>
                                </div>

                            </div>

                            <button className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-[20%]  text-[#FFFFFF] shadow-xl hover:opacity-80'>
                                Edit Profile
                            </button>

                        </div>
                    </div>          
                </div>
            </div>
        </div>

    )
}

export default Checkout

