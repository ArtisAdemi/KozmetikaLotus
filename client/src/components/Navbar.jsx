import {React, useState, useEffect} from 'react';
import LotusLogo from '../Icons/LotusLogo'
import CategoryService from '../services/Categories';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggleCategoriesModal = () => {
        setModal(!modal);
    };
   
    const redirect = (name) => {
        name = name.toString().toLowerCase().replace(/\s+/g, '');
        navigate(`products/${name}`)
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
    <div className='navbar-container flex justify-between bg-transparent w-[80%] border-b-[2px] border-[#ABABAB] p-4'>
        <div>
            <div className='absolute'>
                <LotusLogo />
            </div>
        </div>
        <div className='flex justify-between items-center mr-16'>
            <div className='m-2'>
                <p><a href="/">Home</a></p>
            </div>
            <div className='m-2 relative'>
                <p className='cursor-pointer' onClick={toggleCategoriesModal}>Products</p>
            </div>
        {modal &&
            <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[600px] '>

                <div className=' w-[70%] mt-5'>
                <h2 className='text-[#3D021E] text-sm font-semibold'>Categories</h2>
                    
                </div>
                <div className='test flex justify-center p-6 flex-col items-center'>

            <div className='modal-content w-[70%] grid grid-cols-2 gap-8 items-center'>
                {categories.map((category, index) => (
                    <h2 className='text-[#111B29] font-semibold cursor-pointer' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                ))}
            </div>
                </div>
            

        </div>
        }
            <div className='m-2'>
                <p><a href="/about">About Us</a></p>
            </div>
        </div>
        <div className='navbar-right flex border-[2px] border-[#0C0C0C] px-5 items-center justify-center text-center'>
            <button className='text-center items-center'><a href="/contact" className='text-center items-center'>Contact Us</a></button>
        </div>

    </div>
  )
}

export default Navbar