// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    // Get token from header
    // The header key should be 'x-auth-token' or 'Authorization' (e.g., 'Bearer TOKEN')
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    // Assumes this middleware runs AFTER the auth middleware
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Admin resource. Access denied.' });
    }
};