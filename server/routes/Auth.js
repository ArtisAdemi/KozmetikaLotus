const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const userController = require('../controllers/users');
const { validateToken } = require('../middleware/AuthMiddleware');

// Routes

// Register new User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

router.get('/validateToken', validateToken, (req, res) => {
    // If the middleware passes, the token is valid, and req.user is available
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;