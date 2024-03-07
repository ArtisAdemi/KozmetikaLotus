import React, { useEffect, useState } from 'react'
import ProductListItem from './ProductListItem'
import ProductService from '../services/Products'


const ProductList = (category) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
       fetchProducts();
    }, []);

    const filterModel = {
        category: category.category,
        name: null,
      }
    
    const fetchProducts = async () => {
        let result;
        try{
            if(filterModel.category){
                result = await ProductService.getProductsByFilter(filterModel);
                setProducts(result);
            }
        } catch (err) {
            console.log("err", err)
        }
    }

    return (
    <div className='w-full pb-10 flex justify-center'>
        <div className='grid w-[80%] grid-cols-4 gap-5'>
            {products.length > 0 && products.map((product, index) => (
                <ProductListItem key={index} title={product.title} description={product.description} price={product.price} category={category}/>
            ))}
        </div>
    </div>
  )
}

export default ProductList