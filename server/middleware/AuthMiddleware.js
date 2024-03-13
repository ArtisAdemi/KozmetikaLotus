const jwt = require('jsonwebtoken');

// This function could be used later on when admin will be able to post products
const validateToken = (req, res, next) => {
    // Get token from headers of request
    const token = req.header('accessToken');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    try {
        // Decode jwt token into user model
        const decoded = jwt.verify(token, 'Thisisveryverysecret');
        // Assign a new field named user into request with decoded information from jwt token
        req.user = decoded;
        // when this func is used somewhere. Next() makes it possible to continue with the function from where this was called
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};