import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import ProductService from '../services/Products';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0); // Track total number of products
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Track total number of pages
    const limit = 12; // Assuming each page shows 12 products
    const navigate = useNavigate();

    useEffect(() => {
       fetchProducts();
    }, [page, category]);

    const fetchProducts = async () => {
        try {
            const filterModel = {
                category: category !== 'all' ? category : null,
                name: null,
                page: page,
                limit: limit
            };

            const result = await ProductService.getProductsByFilter(filterModel);
            if (result) {
                setProducts(result.products); // Assuming the result has a 'products' array
                setTotalProducts(result.totalProducts); // Assuming the result includes the 'total' number of products
                setTotalPages(result.totalPages); // Calculate total pages
            }
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page changes
        setPage(newPage);
    };

        
    return (
        <div className='w-full pb-10 flex justify-center'>
            <div>
                <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer'>
                {products.length > 0 && products.map((product, index) => (
                    <ProductListItem key={index} title={product.title} description={product.description} price={product.price} id={product.id} category={category}/>
                ))}
                </div> 
                {totalPages !== 1 && (

                    <div className='w-full flex justify-center'>
                    {/* Pagination component to handle page changes */} 
                    <div className='m-3 text-[#A10550] mt-5 font-semibold text-xl align-text-bottom px-3 py-1'>
                        {page}
                    </div>
                    <div className='m-3 shadow-md px-3 py-1 rounded-md text-[#A10550] items-baseline text-lg font-semibold' style={{display: page === 1 ? 'none' : 'block'}}>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className='align-text-bottom'>Previous</button>
                    </div>
                    <div className='m-3 shadow-md px-3 py-1 rounded-md text-[#A10550] align-text-bottom text-lg font-semibold' style={{display: page >= totalPages ? 'none' : 'block'}}>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} >Next</button>
                    </div>
                </div>
                    )}
            </div>
        </div>
    );
};

export default ProductList;
