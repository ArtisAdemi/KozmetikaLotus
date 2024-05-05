const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Orders = db.Orders;
const Products = db.Products;
const Users = db.Users;
const Images = db.Images;
const validateToken = require('../middleware/AuthMiddleware')
 
// Controller functions

// Get orders
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: [{
                model: Products,
                through: 'Order_Products',
                include: [Images],
            },
            {
                model: Users,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'role'] },
            },
            ],
            attributes: { exclude: ['UserId'] }
        });
        if(!orders){
            return res.status(404).json({ message: "Orders not found"})
        }
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
                    through: 'Order_Products',
                    include: [Images],
                },
                {
                    model: Users,
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'role'] },
                },
                ],
                attributes: { exclude: ['UserId'] }
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
            const { userId, products, address } = req.body; // Assuming userId and products are sent in the request body
            const order = await Orders.create({
                status: 'Pending',
                address: address,
                UserId: userId 
            }); // Create the order
    
            // Loop through each product and add it to the order with the specified quantity
            for (const product of products) {
                await order.addProducts(product.id, {
                     through: { quantity: product.quantity } 
                });
            }
    
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }



    const updateOrder = async (req, res) => {
        const orderId = req.params.id;
        const { status } = req.body;
        
        try {
            // Find Order by id
            const order = await Orders.findByPk(orderId);
            if (!order) {
                return res.status(404).json({message: "Order not found"});
            }
    
            const updatedOrder = {
                status: status || order.status,
                
            };
           // Update the order details
            await order.update(updatedOrder);
    
            res.status(200).json({ message: "Order updated successfully", order });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };


        // Delete Order
    const deleteOrder = async (req, res) => {
        const orderId = req.params.id;

        try {
            // Get order from database 
            const order = await Orders.findByPk(orderId);
            if (!order) { //if no order
                return res.status(404).json({ message: "Order not found" });
            }
            // Delete order
            await order.destroy();
            res.status(200).json({message: "Order deleted successfully"});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };


// export controller functions
module.exports = {
    getOrders,
    getOrderById,
    registerOrder,
    deleteOrder,
    updateOrder
};