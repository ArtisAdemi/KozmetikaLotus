import axios from 'axios';
import buildUrl from '../helpers/BuildParam';
const API_URL = 'http://localhost:3001/api/categories';

const CategoryService = {
    getCategories: async () => {
        try{

            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            return null
        }
    },

    getSubcategories: async (id) => {
        let endpoint = `${API_URL}/${id}/subcategories`
        try{
            const response = await axios.get(endpoint);
            return response.data
        }
        catch (err) {  
            console.error('Error fetching subcategories:', err);
            return null
        }
    }

    
};

export default CategoryService;