const jwt = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');

// Function to get the decoded user information from the token
const getDecodedUser = (req, res) => {
    try {
        validateToken(req, res, () => {
            const decodedUser = req.user;
            res.json(decodedUser); // Return the decoded user information
        });
    } catch (error) {
        res.status(400).json({ message: 'Error decoding token' });
    }
}

module.exports = {
    getDecodedUser
};