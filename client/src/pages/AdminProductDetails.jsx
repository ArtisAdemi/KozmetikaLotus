import React, { useEffect, useState } from 'react'
import { Navbar } from '../components'
import {ProductDetails} from '../components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import ProductService from '../services/Products'
import ProductFormModal from '../components/ProductForm'


const SingleProduct = () => {
  const { categoryName, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProductById(productName);
  }, [productName])

  const fetchProductById = async (id) => {
    let result;
    try {
      result = await ProductService.getProductById(id);
      setProduct(result);
    }catch (err) {
      console.log("Error fetchin product by id", err);
    }
    return result;
  }

  // Handler for Edit button, toggles the edit state
  const handleEditProduct = () => {
    setIsEditing(true);
  };


  return (
    <div>
        <div className='w-full flex justify-center'>
          <div className='w-[80%] flex justify-between p-10'>
            <div className='flex'>
              <div>
                <h2 className='text-2xl font-bold'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className='mt-1 ml-2'>
                <span>{product ? product.title : 'loading'}</span>
              </div>
            </div>
            <div className='flex'>
                <div>
                    <button className='mr-3 border border-[#A10550] text-[#A10550] p-1 px-6 font-semibold' onClick={handleEditProduct}>
                        Edit Product
                    </button>
                </div>
                <div>
                    <button className='mr-3 border border-[#A10550] text-[#A10550] p-1 px-6 font-semibold'>
                        Delete Product
                    </button>
                </div>
            </div>
          </div>
        </div>
          {product && (
            <div>
              <ProductDetails title={product.title} shortDescription={product.shortDescription} longDescription={product.longDescription} category={product.Categories[0].name} price={product.price} id={product.id}/>
            </div>
          )}

          {isEditing && <ProductFormModal closeModal={() => setIsEditing(false)} product={product}/>}
    </div>
  )
}

export default SingleProduct