import React, { useState, useEffect } from 'react';
import LotusLogo from '../Icons/LotusLogo';
import CategoryService from '../services/Categories';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the X (close) icon

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCategoriesModal = () => {
    setIsCategoriesModalOpen(!isCategoriesModalOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const redirect = (name) => {
    name = name.toString().toLowerCase().replace(/\s+/g, '');
    navigate(`/products/${name}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let result;

    try {
      result = await CategoryService.getCategories();
      if (result) {
        setCategories(result);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='navbar-container relative flex justify-between bg-transparent w-full md:w-[80%] border-b-[2px] border-[#ABABAB] p-4 pb-12'>
      <div>
        <LotusLogo />
      </div>
      <div className='hidden md:flex justify-between items-center mr-16'>
        {/* Your existing desktop navbar goes here */}
      </div>
      <button onClick={toggleMobileMenu} className='md:hidden'>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className='text-2xl' />
      </button>
      {isMobileMenuOpen && (
        <div className='fixed top-0 left-0 h-full w-full bg-white z-50 p-5'>
          {/* Your mobile menu content goes here */}
          <a href="/" className='block p-2'>Home</a>
          {/* Other menu items */}
        </div>
      )}
      <div className='hidden md:flex'>
        {/* Your existing contact us button */}
      </div>
    </div>
  );
};

export default Navbar;

// import {React, useState, useEffect} from 'react';
// import LotusLogo from '../Icons/LotusLogo'
// import CategoryService from '../services/Categories';
// import {useNavigate} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const [categories, setCategories] = useState([]);
//     const [modal, setModal] = useState(false);
//     const navigate = useNavigate();

//     const toggleCategoriesModal = () => {
//         setModal(!modal);
//     };
   
//     const redirect = (name) => {
//         name = name.toString().toLowerCase().replace(/\s+/g, '');
//         navigate(`/products/${name}`)
//     }


//     useEffect(() => {
//         fetchCategories();
//       }, [])


//       const fetchCategories = async () => {
//         let result;
      
//         try{
//               result = await CategoryService.getCategories();
//               if (result) {
//                 setCategories(result);
//               }

//         } catch (err) {
//           console.error("Error:", err)
//         }
//       }


//   return (
//     <div className='navbar-container flex justify-between bg-transparent w-[80%] border-b-[2px] border-[#ABABAB] p-4 pb-12'>
//         <div>
//             <div className='absolute top-1'>
//                 <LotusLogo />
//             </div>
//         </div>
//         <div className='justify-between items-center mr-16 hidden md:flex'>
//             <div className='m-2'>
//                 <p><a href="/">Home</a></p>
//             </div>
//             <div className='m-2 relative'
//                  onMouseEnter={() => setModal(true)} // Open modal on hover
//                  onMouseLeave={() => setModal(false)} // Close modal when not hovering
//             >
//                 <p className='cursor-pointer'>Products</p>
//                 {modal &&
//                     <div className='modal rounded-2xl absolute top-20 left-50 right-50 bg-[#FAF9F5] w-[600px] px-8'
//                     onMouseEnter={() => setModal(true)} // Open modal on hover
//                     onMouseLeave={() => setModal(false)} // Close modal when not hovering
//                     style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} // Center modal directly below the Products text
//                     >
//                         <div className='w-full flex justify-center'>
//                             <div className='w-[90%] justify-center'>
//                                 <div className='test flex justify-center py-4 px-5 flex-col items-center'>
//                                 <div className='mt-5 text-start items-start align-middle w-full pb-4'>
//                                     <h2 className='text-[#3D021E] text-lg font-semibold'>Categories</h2>
//                                 </div>
//                                     <div className='modal-content w-full grid grid-cols-2 gap-8 items-center'>
//                                         <h2 className='text-[#111B29] font-semibold cursor-pointer' onClick={() => redirect("all")}>All Categories</h2>
//                                         {categories.map((category, index) => (
//                                             <h2 className='text-[#111B29] font-semibold cursor-pointer text-md' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
//                                             ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 }
//             </div>
//             <div className='m-2'>
//                 <p><a href="/about">About Us</a></p>

//             </div>
//         </div>
//             <div className='md:hidden flex'>
//                 <FontAwesomeIcon icon={faBars} className='mt-2'/>
//             </div>
//         <div className='navbar-right border-[2px] border-[#A10550] px-5 items-center justify-center text-center hidden md:flex'>
//             <button className='text-center items-center'><a href="/contact" className='text-center items-center text-[#A10550]'>Contact Us</a></button>
//         </div>

//     </div>
//   )
// }

// export default Navbar