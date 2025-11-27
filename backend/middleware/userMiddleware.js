const jwt = require('jsonwebtoken');

// Middleware to check if user is logged in
const userMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // Continue to the next function
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = userMiddleware;