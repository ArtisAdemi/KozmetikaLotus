import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products/';

const ProductService = {
    getProducts: async () => {
        try{

            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null
        }
    }
};

export default ProductService;