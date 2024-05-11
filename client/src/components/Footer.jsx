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
    <div className="bg-[#292929] text-[#FFFFFF]">
        <div className=' pt-4'>
            <div onClick={() => navigate('/')} className=' text-3xl -ml-3 font-bold'>
                <LotusIcon/>
            </div>
        </div>
    <div className="md:flex justify-between p-5">
        <div className="space-y-4 p-4">
            <div>
                <h2 className="font-bold text-lg">How Can We Help?</h2>
                <p className='my-3'><a href="/">Home</a></p>
                <p className='mb-3'><a href="/about">About Us</a></p>
                <p className='mb-3'><a href="/categories">Categories</a></p>
                <p className=''><a href="/contact">Contact Us</a></p>
                
            </div>
        </div>
        <div className="space-y-4 p-4">
            <div>
                <h2 className='text-lg font-bold mb-3'>Categories</h2>
                <div className='w-full grid grid-cols-2 gap-x-12 gap-y-3'>
                    <h2 className=' text-lg cursor-pointer' onClick={() => redirect("all")}>All Categories</h2>
                        {categories.map((category, index) => (
                           <h2 className=' text-lg cursor-pointer' key={index}>{category.name}</h2>
                           ))}
                </div>
            </div>
        </div>
        <div className="space-y-4 max-w-[600px] p-4 hidden md:block">
            <h2 className="font-bold text-lg">About Us</h2>
            <p>Ne besojmë në rëndësinë e kujdesit të lëkurës prandaj ofrojmë produkte të specializuara për të mbajtur lëkurën të shëndetshme dhe të freskët.</p>
        </div>
    </div>
    <div className="bg-[#FAFAFA] md:flex justify-between items-center p-5 w-full">
        <div className='flex justify-center w-[50%]'>
            <div className='md:flex justify-around]'>
                <div className='flex items-center'>
                        <LocationIcon/>                    
                    <p className='mr-4 text-[#292929] font-semibold'>Rruga..., Ferizaj </p>
                </div>
                <div className='hidden md:block'>

                    <Indicator/>
                </div>
                <p className='md:ml-4 ml-2 mt-2 md:mt-0 text-[#292929] font-semibold'> 044-233-233</p>
            </div>
        </div>
        <div className='flex md:mr-6 w-[45%] justify-center'>
            <div className='flex'>
                <div className='cursor-pointer'>
                    <InstagramIcon/>
                </div>
                <div className='cursor-pointer'>
                    <FacebookIcon/>
                </div>
                <div className='cursor-pointer'>
                    <TwitterIcon/>
                </div>
            </div>
        </div>
    </div>
    <div className='bg-[#292929] text-center py-3'>
            <span>© 2024 ProSolutions. All Rights Reserved.</span>
    </div>
</div>
  )
}

export default Footer