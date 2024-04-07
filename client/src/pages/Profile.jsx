import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';

const Profile = () => {
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

            <div className='contact-container flex justify-center w-full my-12'>
                <div className='contact-content w-[50%] shadow-2xl justify-center md:flex'>
                    
                    <div className='w-[100%] flex bg-[#FBEFF2] '>
                        <div className='w-[100%] flex flex-col gap-10 justify-center my-12'>

                            <h1 className='text-[#A10550] font-semibold text-3xl text-center'>My Profile</h1>

                            <div className='flex w-[40%] mx-auto justify-start items-center'>
                                <h2 className='mr-3 w-1/3'>Email: </h2>
                                <h2 className='rounded-md p-3 w-2/3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.email}</h2>
                            </div>

                            <div className='flex w-[40%] mx-auto justify-start items-center'>
                                <h2 className='mr-3 w-1/3'>First Name: </h2>
                                <h2 className='rounded-md p-3 w-2/3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.firstName}</h2>
                            </div>

                            <div className='flex w-[40%] mx-auto justify-start items-center'>
                                <h2 className='mr-3 w-1/3'>Last Name: </h2>
                                <h2 className='rounded-md p-3 w-2/3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.lastName}</h2>
                            </div>

                            <div className='flex w-[40%] mx-auto justify-start items-center'>
                                <h2 className='mr-3 w-1/3'>Phone: </h2>
                                <h2 className='rounded-md p-3 w-2/3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.phoneNumber}</h2>
                            </div>

                            <button type="submit" className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-[40%] mx-auto text-[#FFFFFF] shadow-xl hover:opacity-80'>Update Information</button>

                        </div>
                    </div>

                    
          
                </div>
            </div>
        </div>
    )
}

export default Profile

