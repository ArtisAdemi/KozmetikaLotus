const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const userController = require('../controllers/users');

// Routes

// Register new User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

module.exports = router;