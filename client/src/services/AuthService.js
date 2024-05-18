import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3001/api/auth';

const axiosInstance = axios.create();

const AuthService = {
    setAuthToken: () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    },

    decodeUser: async () => {
        try {
            AuthService.setAuthToken(); // Set the Authorization header
            const response = await axiosInstance.get(`${AUTH_API_URL}/getUserData`);
            return response.data;
        } catch (err) {
            console.error("Error fetching users", err);
            throw err;
        }
    }
}

export default AuthService;