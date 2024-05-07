const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware")
const userController = require('../controllers/users');
const wishlistController = require('../controllers/wishlist');
const orderController = require('../controllers/orders');

// Routes

// Get all users
router.get('/', userController.getUsers);

// Get UserById
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', authMiddleware.validateToken, userController.updateUser);


// Protected Routes
// Get user's wishlist
router.get("/:userId/wishlist",authMiddleware.validateToken, wishlistController.getWishlist)

router.get("/:userId/wishlist/:productId",authMiddleware.validateToken, wishlistController.checkIfProductIsInWishlist)

// Add to wishlist
router.post("/:userId/wishlist",authMiddleware.validateToken, wishlistController.addToWishlist)

// Remove from wishlist
router.delete("/:userId/wishlist/:productId",authMiddleware.validateToken, wishlistController.removeFromWishlist)


                                    //Detected validateToken bug while trying these user-order api routes 
// User's orders
// User create an order
router.post("/orders", authMiddleware.validateToken, orderController.registerOrder)

//Delete an order
router.delete("/orders/:orderId", authMiddleware.validateToken, orderController.deleteOrder)

// Get a User's orders
router.get("/orders", authMiddleware.validateToken, orderController.getUserOrders)



module.exports = router;