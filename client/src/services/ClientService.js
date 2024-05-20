import axios from 'axios';
import buildUrl from "../helpers/BuildParam";
const API_URL = 'http://localhost:3001/api/clients';

const ClientsService = {
    getClients: async (limit) => {
        let endpoint = `${API_URL}?`
        try{
            let params = {}
            if (limit) {
                params["limit"] = limit
            }
            endpoint += buildUrl(params)
            const response = await axios.get(endpoint);
            return response.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            return null
        }
    },



    
};

export default ClientsService;