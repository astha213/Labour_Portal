const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./mongo'); // Import your User model
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Store user info in request
        next();
    });
};

// Route to fetch user details
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Fetch user by ID from token
        if (!user) return res.sendStatus(404); // Not found
        res.json(user); // Send user details
    } catch (error) {
        console.error('Error fetching user:', error);
        res.sendStatus(500); // Internal server error
    }
});

module.exports = router;
