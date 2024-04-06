import axios from "axios";

const USERS_API_URL = 'http://localhost:3001/api/users';
const AUTH_API_URL = 'http://localhost:3001/api/auth';

const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const WishlistService = {
    getUsersWishlist: async (userId) => {
        let endpoint = `${USERS_API_URL}/${userId}/wishlist`
        try{
            const result = await axiosInstance.get(endpoint);
            return result.data;
        } catch (err) {
            console.error("Error getting wishlist", err);
            throw err;
        }
    },
}

export default WishlistService;