import {React, useState, useEffect} from 'react';
import LotusLogo from '../Icons/LotusLogo'
import CategoryService from '../services/Categories';
import {useNavigate} from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";



const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const handleNav = () => {
        setNav(!nav);
    };

    const toggleCategoriesModal = () => {
        setModal(!modal);
    };
   
    const redirect = (name) => {
        name = name.toString().toLowerCase().replace(/\s+/g, '');
        navigate(`/products/${name}`);
        handleNav(); // addition to remove navbar after navigating to categories..
    }


    useEffect(() => {
        fetchCategories();
      }, [])


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
    <div className='navbar-container flex justify-between bg-transparent w-[80%] border-b-[1px] border-[#2929299F] p-4 pb-8'>
        <div>
            <div className='absolute top-1'>
                <LotusLogo />
            </div>
        </div>
        <div className='justify-between items-center hidden md:flex'> 
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
        </div>
        <div className='w-[100px] hidden md:flex justify-between items-center' >
            <IoCartOutline size={25} className='hover:cursor-pointer '/>
            <FaRegUser size={20} className='hover:cursor-pointer '/>
        </div>
        
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
            {nav ? <AiOutlineClose size={25} color='#292929'/> : <AiOutlineMenu size={25} color='#292929'/>}    
        </div>
        
        <div className={nav ? 'fixed left-0 top-0 w-[100%] block md:hidden border-r h-full bg-[#FFFFFF] ease-in-out duration-500' : 'fixed left-[-100%]'}>
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
            <div className='categories mt-3 ml-3'>
                <h1 className='text-[#292929] text-sm font-semibold p-4 w-[95%] border-b border-[#DFDFDF]'>Categories</h1>
                <div>
                <h2 className='text-[#292929] ml-2 font-semibold cursor-pointer w-[94%] p-4 border-b border-[#DFDFDF]' onClick={() => redirect("all")}>All Categories</h2>
                    {categories.map((category, index) => (
                        <h2 className='text-[#292929] ml-2 font-semibold w-[94%] cursor-pointer p-4 border-b border-[#DFDFDF]' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                        ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export default Navbar