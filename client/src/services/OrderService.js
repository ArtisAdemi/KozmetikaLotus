import axios from "axios";
import buildUrl from "../helpers/BuildParam";

const USER_ROUTES = 'http://localhost:3001/api/users/orders';
const ORDER_ROUTES = 'http://localhost:3001/api/orders';

const axiosWithAuth = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const OrderService = {
    getOrders: async (limit) => {
        let endpoint = `${ORDER_ROUTES}?`
        try {
            let params = {}
            if (limit) {
                params["limit"] = limit
            }
            endpoint += buildUrl(params)
            const response = await axios.get(endpoint);
            return response.data;
        } catch (err) {
            console.error("Error fetching orders", err);
            throw err;
        }
    },

    getOrdersByUser: async (userId, limit) => {
        let endpoint = `${USER_ROUTES}?`
        try {
            let params = {}
            if (userId) {
                params["userId"] = userId
            }
            if (limit) {
                params["limit"] = limit
            }
            endpoint += buildUrl(params)
            const response = await axiosWithAuth.get(endpoint);
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
            console.log(data)
            const response = await axiosWithAuth.put(`${ORDER_ROUTES}/${orderId}`, {
                status: data
            });
            return response.data;
        } catch (err) {
            console.error('Error updating order:', err);
            return null;
        }
    },
}

export default OrderService;