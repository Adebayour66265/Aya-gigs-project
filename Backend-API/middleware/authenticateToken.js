import { obtainToken } from "../utilis/obtainTokenFromHeader.js";
import { verifyToken } from "../utilis/verifyToken.js";
import User from "../model/User.js";
import { login, register } from "../controller/userController.js";

// Authenticate JWT token
export const authenticateToken = async (req, res, next) => {
  const token = obtainToken(req);
  const userDecoded = verifyToken(token);

  req.userAuth = userDecoded.id;

  if (!userDecoded) {
    return res.json({
      status: "error",
      message: "kindly login because the token is either expired or invalid",
    });
  } else {
    next();
  }
};

// Authorize user by role
export const authorizeRole = async (role) => {
  return (req, res, next) => {
    User.findById(req.userAuth, (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user || user.role !== role) {
        return res
          .status(403)
          .json({ message: "Access denied. " + role + " role required." });
      }
      next();
    });
  };
};

// Define admin middleware
export const adminMiddleware = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};
