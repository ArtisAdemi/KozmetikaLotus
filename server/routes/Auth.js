const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const userController = require('../controllers/users');

// Register new User
router.post('/register', userController.registerUser);

module.exports = router;