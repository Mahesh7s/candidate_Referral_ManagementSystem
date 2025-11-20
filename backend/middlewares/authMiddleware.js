// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
  const tokenFromHeader = req.headers?.authorization?.split(" ")[1];
    const tokenFromQuery = req.query.token;
    
    const token = tokenFromHeader || tokenFromQuery;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Session expired, please log in",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      // Store user & role for later use
      req.user = decoded.userId;
      req.role = decoded.role;

      // Role checking
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized operation",
        });
      }

      next(); 
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

module.exports = authMiddleware;
