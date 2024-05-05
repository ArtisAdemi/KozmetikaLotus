const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware")
const orderController = require('../controllers/orders');

// Routes

// Get all orders
router.get('/', orderController.getOrders);

// Get OrderById
router.get('/:id', orderController.getOrderById);

router.post('/', orderController.registerOrder)





module.exports = router;