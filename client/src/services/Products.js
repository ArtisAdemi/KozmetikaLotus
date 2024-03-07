import axios from 'axios';
import buildUrl from '../middleware/BuildParam';
const API_URL = 'http://localhost:3001/api/products';

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
    // }

    getProductsByFilter: async(filterModel, page, limit) => {
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
    }
};

export default ProductService;