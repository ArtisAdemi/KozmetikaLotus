import axios from "axios";

const USER_ROUTES = 'http://localhost:3001/api/users/orders';
const ORDER_ROUTES = 'http://localhost:3001/api/orders';

const axiosWithAuth = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const OrderService = {
    getOrders: async () => {
        try {
            const response = await axios.get(ORDER_ROUTES);
            return response.data;
        } catch (err) {
            console.error("Error fetching orders", err);
            throw err;
        }
    },

    getOrdersByUser: async () => {
        try {
            const response = await axiosWithAuth.get(ORDER_ROUTES);
            return response.data;
        } catch (err) {
            console.error("Error fetching orders", err);
            throw err;
        }
    },

    deleteOrder: async (orderId) => {
        try{
            const response = await axiosWithAuth.delete(`${USER_ROUTES}/${orderId}`);
            return response.data;
        } catch (err) {
            console.error("Error deleting order", err);
            throw err;
        }
    },

    getOrderById: async (id) => {
        try {
            const response = await axios.get(`${ORDER_ROUTES}/${id}`);
            return response.data;
        } catch (err) {
            console.error("Error fetching order by ID", err);
            throw err;
        }
    },

    registerOrder: async (data) => {
        let endpoint = `${USER_ROUTES}`
        try {
            const response = await axiosWithAuth.post(endpoint, data);
            return response.data;
        } catch (err) {
            console.error("Error registering order", err);
            throw err;
        }
    },


    updateOrder: async (orderId, data) => {
        try {
            const response = await axiosWithAuth.put(`${ORDER_ROUTES}/${orderId}`, data);
            return response.data;
        } catch (err) {
            console.error('Error updating order:', err);
            return null;
        }
    },
}

export default OrderService;