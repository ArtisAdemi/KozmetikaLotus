import React, { useEffect, useState } from 'react'
import InstagramIcon from '../Icons/InstagramIcon'
import FacebookIcon from '../Icons/FacebookIcon'
import TwitterIcon from '../Icons/TwitterIcon'
import LocationIcon from '../Icons/LocationIcon'
import Indicator from '../Icons/Indicator'
import LotusIcon from '../Icons/LotusIcon'
import {useNavigate} from 'react-router-dom';
import CategoryService from '../services/Categories';



const Footer = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    const redirect = (name) => {
        name = name.toString().toLowerCase().replace(/\s+/g, '');
        navigate(`/products/${name}`)
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
    <div className="bg-[#F36EAE] text-white">
        <div className=' pt-4'>
            <div className=' text-3xl font-bold'>
            <LotusIcon/>
            </div>
        </div>
    <div className="md:flex justify-between p-5">
        <div className="space-y-4 p-4">
            <div>
                <h2 className="font-bold text-lg">How Can We Help?</h2>
                <p><a href="/">Home</a></p>
                <p><a href="/about">About Us</a></p>
                <p><a href="/categories">Categories</a></p>
                <p><a href="/contact">Contact Us</a></p>
                
            </div>
        </div>
        <div className="space-y-4 p-4">
            <div>
                {/* <h2 className="font-bold text-lg">Products</h2>
                <p><a href="/women-make-up">Women Make Up</a></p>
                <p><a href="/women-skincare">Women Skincare</a></p>
                <p><a href="/gifts-sets">Gifts & Sets</a></p> */}
                <h2 className='text-lg font-bold mb-3'>Categories</h2>
                <div className='w-full grid grid-cols-3 md:grid-cols-2 gap-3'>
                    <h2 className=' text-lg cursor-pointer' onClick={() => redirect("all")}>All Categories</h2>
                        {categories.map((category, index) => (
                           <h2 className=' text-lg cursor-pointer' key={index} onClick={() => redirect(category.name)}>{category.name}</h2>
                           ))}
                </div>
            </div>
        </div>
        <div className="space-y-4 max-w-[600px] p-4 hidden md:block">
            <h2 className="font-bold text-lg">About Us</h2>
            <p>Ne besojmë në rëndësinë e kujdesit të lëkurës prandaj ofrojmë produkte të specializuara për të mbajtur lëkurën të shëndetshme dhe të freskët.</p>
        </div>
    </div>
    <div className="bg-[#FCE1E7] md:flex justify-between items-center p-5 w-full">
        <div className='flex justify-center w-[50%]'>
            <div className='md:flex justify-around]'>
                <div className='flex items-center'>
                        <LocationIcon/>                    
                    <p className='mr-4 text-[#F36EAE] font-semibold'>Rruga..., Ferizaj </p>
                </div>
                <div className='hidden md:block'>

                    <Indicator/>
                </div>
                <p className='md:ml-4 ml-2 mt-2 md:mt-0 text-[#F36EAE] font-semibold'> 044-233-233</p>
            </div>
        </div>
        <div className='flex md:mr-6 w-[45%] justify-center'>
            <div className='flex '>
                <InstagramIcon />
                <FacebookIcon />
                <TwitterIcon />
            </div>
        </div>
    </div>
    <div className='bg-[#F36EAE] text-center'>
            <span>© 2024 ProSolutions. All Rights Reserved.</span>
    </div>
</div>
  )
}

export default Footer