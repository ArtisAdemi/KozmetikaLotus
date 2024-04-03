const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Routes

// Get all users
router.get('/', userController.getUsers);

// Get UserById
router.get('/:id', userController.getUserById);





module.exports = router;