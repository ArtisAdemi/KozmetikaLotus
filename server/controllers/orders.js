const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Orders = db.Orders;
const Products = db.Products;
const Users = db.Users;
const Images = db.Images;
const validateToken = require('../middleware/AuthMiddleware');
const { createClient } = require('./clients');
 
// Controller functions

// Get orders
const getOrders = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    try {
        const {count, rows} = await Orders.findAndCountAll({
            limit: limit,
            distinct: true,
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

        const totalPages = Math.ceil(count / limit);

        if(!rows){
            return res.status(404).json({ message: "Orders not found"})
        }
        res.status(200).json({
            orders: rows,
            totalOrders: count,
            totalPages: totalPages,
        });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// Get A User's Orders  -   needs fix
const getUserOrders = async (req, res) => {
    let userId = 0;
    const limit = parseInt(req.query.limit) || 10;
    if (req.query.userId){
         userId = req.query.userId
    } else {
         userId = req.user.id
    }
    try {
        const {count, rows} = await Orders.findAndCountAll({
            limit: limit,
            distinct: true,
            where: { UserId: userId }, // Filter orders by UserId (associated with the authenticated user)
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

        const totalPages = Math.ceil(count / limit);

        if (!rows || rows.length === 0) {
            return res.status(200).json({
                orders: [],
                totalOrders: 0,
                totalPages: 0,
            });
        }

        res.status(200).json({
            orders: rows,
            totalOrders: count,
            totalPages: totalPages,
        });;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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

                        //fixed
    const registerOrder = async (req, res) => {
        const userId = req.user.id; 
        try {
            const { products, address } = req.body; // Assuming products are sent in the request body
            
            // Create or find the client associated with the user
            const client = await createClient(userId);
            
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


        // Delete Order -   fixed
        const deleteOrder = async (req, res) => {
            const userId = req.user.id;
            const orderId = req.params.id;
        
            try {
                // Get order from database including associated user
                const order = await Orders.findByPk(orderId, {
                    include: {
                        model: Users,
                        where: { id: userId } // Ensure that the order belongs to the requesting user
                    }
                });
        
                if (!order) {
                    return res.status(404).json({ message: "Order not found or not owned by the user" });
                }
        
                // Delete order
                await order.destroy();
                res.status(200).json({ message: "Order deleted successfully" });
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
    updateOrder,
    getUserOrders
};