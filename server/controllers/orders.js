const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Orders = db.Orders;
const Products = db.Products;
const Users = db.Users;
const validateToken = require('../middleware/AuthMiddleware')
 
// Controller functions

// Get orders
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// Get OrderById
const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try{
        const order = await Orders.findByPk(orderId, {
            include: [{
                model: Products,
                through: 'Order_Products'
            }]
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found"})
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const registerOrder = async (req, res) => {
    try {
        const { userId, products } = req.body; // Assuming userId and products are sent in the request body
        const order = await Orders.create({ status: 'pending', address: req.body.address, UserId: userId }); // Create the order
        await order.addProducts(products); // Add products to the order
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// export controller functions
module.exports = {
    getOrders,
    getOrderById,
    registerOrder
};