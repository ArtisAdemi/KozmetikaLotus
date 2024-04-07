import React, { useEffect, useState } from 'react'
import XIcon from '../Icons/XIcon';
import AuthService from '../services/AuthService';
import WishlistService from '../services/Wishlist';
import { useNavigate } from 'react-router-dom';

const WishlistItem = (product) => {
  const {title, price, id} = product.product;
  const productImg = product.product.Images[0].fileName;
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0)
  const navigate = useNavigate();


  
  const getUserData = async () => {
    let res;
    try{
      res = await AuthService.decodeUser();
      setUser(res.data);
      return res.data.id
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  const redirect = () => {
    navigate(`/products/all/${id}`)
  }
  
  const removeFromWishlist = async () => {
    let res;
    try{
        res = await WishlistService.removeFromWishlist(user.id, id);
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className='md:flex md:px-3 md:py-2 md:h-150px md:w-1/2 cursor-pointer'>
        <div onClick={redirect}>
          <img src={`/uploads/${productImg}`} className='md:w-[160px] md:h-[130px] object-contain' alt="ASD" />
        </div>
        <div onClick={redirect} className='md:flex md:flex-col md:justify-between md:ml-10'>
          <div className='md:pl-6 md:pt-6'>
              <h2 className='text-sm underline'>{title}</h2>
          </div>
          <div className='md:pl-6 md:pb-6'>
              <p className='text-md font-semibold'>{price}€</p>
          </div>
        </div>
        <div className='md:pl-6 md:pt-6'>
          <div className='cursor-pointer' onClick={removeFromWishlist}>
            <XIcon />
          </div>
        </div>
    </div>
  )
}

export default WishlistItem