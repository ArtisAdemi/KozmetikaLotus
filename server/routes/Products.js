const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const {validateToken} = require('../middleware/AuthMiddleware');
const fileUpload = require("../helpers/fileUpload");

// Routes

// Register Product
router.post('/', validateToken, fileUpload, productsController.registerProduct);

// Update Product
router.put('/:id', productsController.updateProduct)

// Get Product by ID
router.get('/productPerCategory', productsController.getUniqueProductPerCategory)

// Get Products
router.get("/", productsController.getProducts)

// Get Product by ID
router.get('/:id', productsController.getProductById)

// Delete Product
router.delete('/:id', productsController.deleteProduct)

// Get product images
router.get('/:id/images', productsController.getProductImages)

// Update product
router.put('/:id', validateToken, productsController.updateProduct)

// Delete product
router.delete('/:id', validateToken, productsController.deleteProduct)

module.exports = router;