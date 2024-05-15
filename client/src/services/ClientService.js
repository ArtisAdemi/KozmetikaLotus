import axios from 'axios';
const API_URL = 'http://localhost:3001/api/clients';

const ClientsService = {
    getClients: async () => {
        try{

            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            return null
        }
    },



    
};

export default ClientsService;