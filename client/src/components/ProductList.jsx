import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import ProductService from '../services/Products';

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
       fetchProducts();
    }, [page, category]); // Ensure the effect runs when category changes

    const fetchProducts = async () => {
        let result;
        try {
            // Define the filter model inside the try block to use the latest state
            const filterModel = {
                category: category !== 'all' ? category : null, // If category is 'all', set to null to fetch all products
                name: null,
                page: page,
                limit: 12
            };

            result = await ProductService.getProductsByFilter(filterModel);
            if (result) {
                setProducts(result);
            }
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

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
    );
};

export default ProductList;
