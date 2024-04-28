import {React, useState, useEffect} from 'react';
import LotusLogo from '../Icons/LotusLogo'
import CategoryService from '../services/Categories';
import {useNavigate} from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import Logout from "../helpers/Logout"
import UserService from '../services/Users';
import AuthService from '../services/AuthService';
import { setIsCartOpen } from '../state';
import { useDispatch, useSelector } from 'react-redux';


const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [nav, setNav] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [user, setUser] = useState({});
    const { logout } = Logout();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen)

    const handleNav = () => {
        setNav(!nav);
    };

   
    const redirect = (name) => {
        name = name.toString().toLowerCase().replace(/\s+/g, '-');
        navigate(`/products/${name}`);
        handleNav(); // addition to remove navbar after navigating to categories..
    }

    const navProfile = () => {
        navigate('/profile');
    }
    const navWishList = () => {
        navigate('/wishlist');
    }

    const isLoggedIn = async () => {
        const user = await UserService.validateToken();
        if(user){
            setCurrentUser(true);
        }
    }
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
        if (token) {
            getUserData();
        }
        isLoggedIn();
        fetchCategories();
      }, [])

      useEffect(() => {
        // When the navbar is open, prevent scrolling on the body
        if (nav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [nav]);


      const fetchCategories = async () => {
        let result;
      
        try{
              result = await CategoryService.getCategories();
              if (result) {
                setCategories(result);
              }

        } catch (err) {
          console.error("Error:", err)
        }
      }


  return (
    <div className='test-big-div flex flex-col w-[100%]'>

    <div className='navbar-container flex justify-between bg-[#FFFFFF] pr-10 md:px-[9%] w-[100%]  p-4 pb-8'>
        <div>
            <div className='absolute top-2 md:top-4 cursor-pointer' onClick={() => navigate("/")}>
                <LotusLogo />
            </div>
        </div>
        <div className='justify-between items-center gap-x-5 mt-1 -mb-3 hidden md:flex'> 
            <div className='m-2 ml-32'>
                <p><a href="/">Home</a></p>
            </div>
            <div className='m-2 relative'
                 onMouseEnter={() => setModal(true)} // Open modal on hover
                 onMouseLeave={() => setModal(false)} // Close modal when not hovering
            >
                <p className='cursor-pointer'>Products</p>
                {modal &&
                    <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[600px] px-8'
                    onMouseEnter={() => setModal(true)} // Open modal on hover
                    onMouseLeave={() => setModal(false)} // Close modal when not hovering
                    style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} // Center modal directly below the Products text
                    >
                        <div className='w-full flex justify-center'>
                            <div className='w-[90%] justify-center'>
                                <div className='test flex justify-center py-4 px-5 flex-col items-center'>
                                <div className='mt-5 text-start items-start align-middle w-full pb-4'>
                                    <h2 className='text-[#3D021E] text-md font-semibold'>Categories</h2>
                                </div>
                                    <div className='modal-content w-full grid grid-cols-2 gap-8 items-center'>
                                        <h2 className='text-[#111B29] font-semibold text-lg cursor-pointer' onClick={() => redirect("all")}>All Categories</h2>
                                        {categories.map((category, index) => (
                                            <h2 className='text-[#111B29] font-semibold cursor-pointer text-lg' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='m-2'>
                <p><a href="/about">About Us</a></p>
            </div>
            <div className='m-2'>
                <p><a href="/contact">Contact Us</a></p>
            </div>
            {
            (user.role === 'admin') &&
                (<div className='m-2'>
                    <p><a href="/admin">Admin</a></p>
                </div>) 
        
            }
        </div>
        <div className='w-[100px] hidden md:flex mt-1 -mb-3 justify-between items-center' >
            {/* Wishlist Icon*/}
            {currentUser && 
                <div onClick={navWishList} className='wishlist flex items-center pr-3 -ml-6 cursor-pointer'>
                    <FaRegHeart size={20}/>
                </div>
            }

            {/* Shopping cart icon */}
            <div onClick={() => dispatch(setIsCartOpen({}))} className="relative p-2 pr-4 hover:cursor-pointer">
                <IoCartOutline size={25}/>
                <span className="text-xs absolute top-0 right-[0] transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full p-1">{cart.length > 0 ? cart.length: "0"}</span>
            </div>

            <div className='m-2 relative'
                 onMouseEnter={() => setProfileModal(true)} // Open profile modal on hover
                 onMouseLeave={() => setProfileModal(false)} // Close profile modal when not hovering
            >   
            {/* User Profile Icon */}
                <FaRegUser size={20} className='hover:cursor-pointer mr-2'/>
                {profileModal &&
                    <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[300px] px-4'
                    onMouseEnter={() => setProfileModal(true)} // Open modal on hover
                    onMouseLeave={() => setProfileModal(false)} // Close modal when not hovering
                    style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} // Center modal directly below the Profile Icon
                    >
                        <div className='w-full flex justify-center'>
                            <div className='w-[90%] justify-center'>
                                <div className='test flex justify-center flex-col items-center'>
                                <div className='mt-4 text-start items-start align-middle w-full pb-4'>
                                    {currentUser  ? (
                                    <div>

                                        <h2 className='text-[#101817] text-lg font-semibold mb-1'>My Profile</h2>                     
                                        <div onClick={navProfile} className='profile flex items-center border rounded-lg p-2 mb-1 cursor-pointer border-[#A2A2A2]'>
                                            <FaRegUserCircle size={20}/>
                                            <h2 className='ml-3 text-[#101817] w-[100%] text-sm font-semibold '>Account Information</h2>
                                        </div>
                                        <p className='text-red-700 text-sm ml-1'><a href="/login" onClick={logout}>Log Out</a></p> 
                                    </div>
                                    ) : (
                                        <div onClick={() => navigate('/login')} className='profile flex items-center border rounded-lg p-2 cursor-pointer border-[#A2A2A2]'>
                                            <FaRegUserCircle size={20}/>
                                            <h2 className='ml-3 text-[#101817] w-[100%] text-sm font-semibold '>Log In</h2>
                                        </div>                                          
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            
        </div>     
        
        <div onClick={handleNav} className='block md:hidden mt-1 -mb-3 cursor-pointer'>
            {nav ? <AiOutlineClose size={25} color='#292929'/> : <AiOutlineMenu size={25} color='#292929'/>}    
        </div>
        
        <div className={nav ? 'z-50 fixed overflow-auto  left-0 top-0 w-[100%] block md:hidden border-r h-full bg-[#FFFFFF] ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <div className='flex items-center border-b border-[#DFDFDF]'>
                <div className='cursor-pointer' onClick={handleNav}>
                    <AiOutlineClose size={25} color='#292929'/>
                </div>
                <div className='flex justify-center items-center mx-auto'>
                    <LotusLogo />
                </div>
            </div>
            <div>
                <ul className='p-4'>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/">Home</a></li>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/about">About Us</a></li>
                    <li className='p-4 font-semibold text-[#292929] border-b border-[#DFDFDF]'><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
            <div className='categories mt-3 ml-3 overflow-auto'>
                <h1 className='text-[#292929] text-sm font-semibold p-4 w-[95%] border-b border-[#DFDFDF]'>Categories</h1>
                <div>
                <h2 className='text-[#292929] ml-2 font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]' onClick={() => redirect("all")}>All Categories</h2>
                    {categories.map((category, index) => (
                        <h2 className='text-[#292929] ml-2 font-semibold w-[94%] cursor-pointer p-4 border-b border-[#DFDFDF]' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                        ))}
                </div>
            </div>
            <div className='profile mt-10 ml-3'>
                <h1 className='text-[#292929] text-sm font-semibold p-4 w-[95%] border-b border-[#DFDFDF]'>Profile</h1>
                <ul className='p-4'>    
                {currentUser ? (
                    <div>
                        <div onClick={navProfile} className='profile flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                        <FaRegUserCircle size={20}/>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Account Information</h2>
                    </div>
                    {/* Shopping cart icon */}
                    <div onClick={() => {dispatch(setIsCartOpen({})); handleNav()}} className="cart flex items-center p-1 mb-2 border-b border-[#DFDFDF]">
                        <IoCartOutline size={25}/>
                        <span className="text-xs top-0 mb-5 right-[0] transform translate-x-50% -translate-y-50% text-white bg-red-700 font-semibold rounded-full p-1">{cart.length > 0 ? cart.length: "0"}</span>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Shopping Cart</h2>
                    </div>
                    <div onClick={navWishList} className='wishlist flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                        <FaRegHeart size={20}/>
                        <h2 className=' ml-3 text-[#101817] w-[100%] text-md font-semibold '>My Wishlist</h2>
                    </div>
                    {
                    (user.role === 'admin') &&
                        (<div onClick={() => navigate('/admin')} className='wishlist flex items-center p-3 mb-2 border-b border-[#DFDFDF]'>
                            <h2 className='text-[#101817] w-[100%] text-md font-semibold'>Admin</h2>
                        </div>) 
                    }
                    <li className='p-3 font-semibold text-red-700 border-b border-[#DFDFDF]' onClick={logout}><a href="/">Log out</a></li>
                    </div>
                ) : (
                    <div onClick={() => navigate('/login')} className='profile flex items-center p-3 mb-2 cursor-pointer border-b border-[#DFDFDF]'>
                        <FaRegUserCircle size={20}/>
                        <h2 className='ml-3 text-[#101817] w-[100%] text-md font-semibold '>Log In</h2>
                    </div>
                    )         
                }           
                    
                </ul>
            </div>
        </div>

    </div>
    <div className='bg-[#292929] w-full hidden md:flex'>
        <div className='modal-content w-[80%] mx-auto flex justify-between py-5 items-center'>
            <h2 className='text-[#FFFFFF]  text-lg cursor-pointer' onClick={() => redirect("all")}>All</h2>
            {categories.map((category, index) => (
                <h2 className='text-[#FFFFFF]  cursor-pointer text-lg' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                ))}
        </div>
    </div>
    </div>

  )
}

export default Navbar