const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware")
const userController = require('../controllers/users');
const wishlistController = require('../controllers/wishlist');

// Routes

// Get all users
router.get('/', userController.getUsers);

// Get UserById
router.get('/:id', userController.getUserById);


// Protected Routes
// Get user's wishlist
router.get("/:userId/wishlist",authMiddleware.validateToken, wishlistController.getWishlist)

// Add to wishlist
router.post("/:userId/wishlist",authMiddleware.validateToken, wishlistController.addToWishlist)

// Remove from wishlist
router.delete("/:userId/wishlist",authMiddleware.validateToken, wishlistController.removeFromWishlist)




module.exports = router;