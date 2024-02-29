const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Routes

// Register Product
router.post('/', productsController.registerProduct);

// Update Product
router.put('/:id', productsController.updateProduct)

// Get Products
router.get("/", productsController.getProducts)

// Delete Product
router.delete('/:id', productsController.deleteProduct)

module.exports = router;