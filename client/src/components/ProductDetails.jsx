import React from 'react'

const ProductDetails = ({imageUrl, title, category, description, id, price}) => {
  return (
    <div>
        <h1>Details</h1>
        {description}
        {price}
    </div>
  )
}

export default ProductDetails;