import axios from 'axios';

const AUTH_API_URL = 'http://localhost:3001/api/auth';

const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const AuthService = {
    decodeUser: async () => {
        try {
            const response = await axiosInstance.get(`${AUTH_API_URL}/getUserData`);
            return response.data;
        } catch (err) {
            console.error("Error fetching users", err);
            throw err;
        }
    }
}

export default AuthService