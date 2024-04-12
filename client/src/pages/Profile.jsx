import React, {useState, useEffect} from 'react';
import { Navbar } from '../components';
import AuthService from '../services/AuthService';
import UserForm from '../components/UserForm';

const Profile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

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

      const handleEditProfile = () => {
        setIsEditing(true);
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

                            <h1 className='text-[#212121] font-semibold text-3xl'>My Profile</h1>

                            <div className='flex w-full'>

                                <div className='flex w-[20%] flex-col mr-36'>
                                    <div className='flex flex-col mb-8 justify-start items-start'>
                                        <h2 className='mr-3 w-full'>First Name: </h2>
                                        <h2 className='rounded-md w-full p-3  md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.firstName}</h2>
                                    </div>

                                    <div className='flex flex-col justify-start items-start'>
                                        <h2 className='mr-3 w-full'>Email: </h2>
                                        <h2 className='rounded-md w-full p-3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.email}</h2>
                                    </div>
                                </div>

                                <div className=' w-[20%] flex flex-col'>
                                    <div className='flex flex-col mb-8 justify-start items-start'>
                                        <h2 className='mr-3 w-full'>Last Name: </h2>
                                        <h2 className='rounded-md w-full p-3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.lastName}</h2>
                                    </div>

                                    <div className='flex flex-col justify-start items-start'>
                                        <h2 className='mr-3 w-full'>Phone: </h2>
                                        <h2 className='rounded-md w-full p-3 md:p-4 border bg-[#FBFCFDF0] border-transparent'>{user.phoneNumber}</h2>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleEditProfile} className='border-[#A3A7FC] bg-[#A3A7FC] rounded-md border-2 p-3 md:p-4 w-[20%]  text-[#FFFFFF] shadow-xl hover:opacity-80'>
                                Edit Profile
                            </button>

                        </div>
                    </div>

                    
          
                </div>
            </div>

                <div className='orders-container flex justify-center w-full my-12'>
                    <div className='orders-content w-[80%] flex flex-col'>
                        <div className='flex items-center p-2 w-full border border-b-[#BDBDBD] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-2xl text-[#212121] font-semibold'>Recent Orders</h2>
                            <h2 className='text-[#828282] ml-5 cursor-pointer'>View All</h2>
                        </div>
                        <div className='flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Order #</h2>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Date</h2>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Ship To</h2>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Order Total</h2>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Status</h2>
                            <h2 className='text-[#333333] text-lg font-semibold w-[16.6%]'>Action</h2>
                        </div>

                        {/* STATIC ORDER DATA */}
                        <div className='flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>0001</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>5/21/19</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Veronica Costello</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>$96.60</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Finished</h2>
                            <h2 className='text-[#828282] text-lg w-[16.6%] cursor-pointer'>View Order</h2>
                        </div>
                        <div className='flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>0001</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>5/21/19</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Veronica Costello</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>$96.60</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Finished</h2>
                            <h2 className='text-[#828282] text-lg w-[16.6%] cursor-pointer'>View Order</h2>
                        </div>
                        <div className='flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>0001</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>5/21/19</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Veronica Costello</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>$96.60</h2>
                            <h2 className='text-[#333333] text-lg w-[16.6%]'>Finished</h2>
                            <h2 className='text-[#828282] text-lg w-[16.6%] cursor-pointer'>View Order</h2>
                        </div>
                    </div>        
                </div>
                {isEditing && <UserForm closeModal={() => setIsEditing(false)} user={user}/>}
        </div>

    )
}

export default Profile

