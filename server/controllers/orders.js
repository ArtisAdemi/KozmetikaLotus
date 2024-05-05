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
        const order = await Orders.findByPk(orderId);
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
    const { status, address, userId, productId} = req.body;

    try {
        const newOrder = await Orders.create({
            status: status,
            address: address,
            UserId: userId,
            productId: productId,
        })
        res.status(201).json({message: "Order Created successfully",newOrder});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


// export controller functions
module.exports = {
    getOrders,
    getOrderById,
    registerOrder
};