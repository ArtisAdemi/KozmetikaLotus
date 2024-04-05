import axios from "axios";

const USERS_API_URL = 'http://localhost:3001/api/users';
const AUTH_API_URL = 'http://localhost:3001/api/auth';
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
                throw new Error("No token provided");
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

    validateIsLoggedIn: () => {
        return localStorage.getItem('token')
    }
}

export default UserService;