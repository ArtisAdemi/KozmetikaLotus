import axios from 'axios';
import buildUrl from '../middleware/BuildParam';
const API_URL = 'http://localhost:3001/api/products';

// Create an axios instance for authenticated requests
const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const ProductService = {
    getProducts: async () => {
        try{

            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null
        }
    },

    getProductById: async(id) => {
        try{
            const response = await axios.get(`${API_URL}/${id}`)
            return response.data
        } catch (err){
            console.error('Error fetching products:', err);
            return null
        }
    },



    // Shembull qysh me kriju modelin per me perdore funksionin ma poshte
    // const filterModel = {
    //     category: 'example',
    //     name: 'example'
    //     page: 1,
    //     limit: 12,
    // }

    getProductsByFilter: async(filterModel) => {
        let endpoint = `${API_URL}?`;
        try {
            let params = {};
            if (filterModel.category) {
                params['category'] = filterModel.category;
            }
            if (filterModel.name) {
                params['productName'] = filterModel.name;
            }
            if (filterModel.page) {
                params['page'] = filterModel.page;
            }
            if (filterModel.limit) {
                params['limit'] = filterModel.limit;
            }
            endpoint += buildUrl(params);
    
            const response = await axios.get(endpoint);
            return response.data;
        } catch (err) {
            console.error('Error fetching products: ', err);
            return null;
        }
    },

    // Get 1 product per Category
    
    getUniqueCategory: async () => {
        try{
            const response = await axios.get(`${API_URL}/productPerCategory`);
            return response;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null
        }
    },

    // Product images
    getProductImages: async (productId) => {
        try{
            const res = await axios.get(`${API_URL}/${productId}/images`);
            return res.data;
        } catch (err) {
            console.error('Error fetching images', err);
            return [];
        }
    },
    
    registerProduct: async (productData) => {
        // Use axiosInstance for authenticated requests
        try {
            const response = await axiosInstance.post(`${API_URL}`, productData);
            return response.data;
        } catch (err) {
            console.error('Error registering product:', err);
            return null;
        }
    },

    updateProduct: async (productId, productData) => {
        try {
            const response = await axiosInstance.put(`${API_URL}/${productId}`, productData);
            return response.data;
        } catch (err) {
            console.error('Error updating product:', err);
            return null;
        }
    }

};

export default ProductService;