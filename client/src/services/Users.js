import axios from "axios";

const USERS_API_URL = 'http://localhost:3001/api/users';
const AUTH_API_URL = 'http://localhost:3001/api/auth';

const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const UserService = {
    getUsers: async () => {
        try {
            const response = await axios.get(USERS_API_URL);
            return response.data;
        } catch (err) {
            console.error("Error fetching users", err);
            throw err;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axios.get(`${USERS_API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error("Error fetching user by ID", err);
            throw err;
        }
    },

    registerUser: async (userData) => {
        let endpoint = `${AUTH_API_URL}/register`
        try {
            const response = await axios.post(endpoint, userData);
            return response.data;
        } catch (err) {
            console.error("Error registering user", err);
            throw err;
        }
    },

    loginUser: async (credentials) => {
        let endpoint = `${AUTH_API_URL}/login`
        try {
            const response = await axios.post(endpoint, credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("firstName", response.data.user.firstName);
            localStorage.setItem("lastName", response.data.user.lastName);
            localStorage.setItem("phoneNumber", response.data.user.phoneNumber);
            return response.data;
        } catch (err) {
            console.error("Error logging in", err);
            throw err;
        }
    },

    validateToken: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return false;
            }
            const response = await axios.get(`${AUTH_API_URL}/validateToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error validating token", err);
            throw err;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await axiosInstance.put(`${USERS_API_URL}/${userId}`, userData);
            return response.data;
        } catch (err) {
            console.error('Error updating user:', err);
            return null;
        }
    },

    // getUsersWishlist: async (userId) => {
    //     let endpoint = `${USERS_API_URL}/${userId}/wishlist`
    //     try{
    //         const result = await axiosInstance.get(endpoint);
    //         return result.data;
    //     } catch (err) {
    //         console.error("Error getting wishlist", err);
    //         throw err;
    //     }
    // },
}

export default UserService;