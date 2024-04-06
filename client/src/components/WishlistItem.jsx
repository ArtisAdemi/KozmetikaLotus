import React from 'react'

const WishlistItem = (product) => {
  const {title, price} = product.product;
  const productImg = product.product.Images[0].fileName;
  return (
    <div className='md:flex md:px-3 md:py-2'>
        <div><img src={`/uploads/${productImg}`} alt="ASD" /></div>
        <div className='md:flex md:flex-col md:justify-between md:ml-10'>
        <div>
            <h2 className='text-sm font-semibold'>{title}</h2>
        </div>
        <div>
            <p className='text-md'>{price}€</p>
        </div>
        </div>
    </div>
  )
}

export default WishlistItem