import React, { useEffect, useState } from 'react'
import ProductListItem from './ProductListItem'
import ProductService from '../services/Products'


const ProductList = (category) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
       fetchProducts();
    }, [page]);

    const filterModel = {
        category: category.category,
        name: null,
        page: page, // 1 is default page
        limit: 12
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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
    <div className='w-full pb-10 flex justify-center'>
        <div>

            <div className='grid w-full grid-cols-4 gap-5'>
            {products.length > 0 && products.map((product, index) => (
                <ProductListItem key={index} title={product.title} description={product.description} price={product.price} category={category}/>
                ))}
            </div> 
            <div>
                {/* Pagination component to handle page changes */} 
                <button onClick={() => handlePageChange(page - 1)}>Previous</button>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default ProductList