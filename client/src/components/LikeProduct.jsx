import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa';
import WishlistService from '../services/Wishlist';
import AuthService from '../services/AuthService';

const LikeProduct = ({productId}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(0)
    const token = localStorage.getItem("token")


  
  const getUserData = async () => {
    let res;
    try{
      res = await AuthService.decodeUser();
      setUser(res);
      return res.id
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  const handleLike = () => {
    if(isLiked){
        removeFromWishlist();
        setIsLiked(!isLiked);
    } else {
        addToWishlist();
        setIsLiked(!isLiked);
    }
  }

  const addToWishlist = async () => {
    let res;
    try{
        res = await WishlistService.addToWishlist(userId, productId);
    } catch (err) {
        console.error(err)
    }
  }

  const removeFromWishlist = async () => {
    let res;
    try{
        res = await WishlistService.removeFromWishlist(userId, productId);
    } catch (err) {
        console.error(err)
    }
  }

  const loadData = async () => {
    const userId = await getUserData();
    if(userId){
        setUserId(userId);
        try{
            let res = await WishlistService.checkIfProductIsInWishlist(userId, productId);
            setIsLiked(res.data)
        } catch (err) {
            console.error(err)
        }
    }
  }

  useEffect(() => {
    if (token){
      loadData();
    }
  }, [])

  return (
    <div className='cursor-pointer'>
        <FaRegHeart size={25} color={isLiked ? 'red' : 'black'} onClick={handleLike} />
    </div>
  )
}

export default LikeProduct