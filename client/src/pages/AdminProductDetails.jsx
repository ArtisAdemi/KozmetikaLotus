import React, { useEffect, useState } from 'react'
import { Navbar } from '../components'
import {ProductDetails} from '../components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import ProductService from '../services/Products'
import ProductFormModal from '../components/ProductForm'
import { useNavigate } from 'react-router-dom'


const SingleProduct = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate();

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

  const handleDeleteProduct = async () => {
    // Show a confirmation dialog to the user
  const isConfirmed = window.confirm("Are you sure you want to delete this product?");

  // If the user clicks "OK", proceed with the deletion
  if (isConfirmed) {
    try {
      // Assuming ProductService.deleteProduct is an async function
      // and productName is the ID or unique identifier for the product
      const res = await ProductService.deleteProduct(productName);
      if (res) {
        navigate(`/admin`)
      }
    } catch (err) {
      console.error("Error deleting product in AdminProductDetails", err);
    }
  } else {
    // If the user clicks "Cancel", you can optionally handle this case
    console.log("Product deletion was canceled.");
  }
  }

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
                    <button className='mr-3 border border-[#A10550] text-[#A10550] p-1 px-6 font-semibold' onClick={handleDeleteProduct}>
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