import jwt from "jsonwebtoken";

export const authMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header("Authorization").replace("Bearer ", "");

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Check if user has required role
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Set user object in request
      req.user = decoded;

      // Call next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authMiddleware;
