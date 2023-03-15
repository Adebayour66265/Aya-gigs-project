import express from "express";

import {
  register,
  registerInstructor,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginInstructor,
  blockUser,
  unBlockUser
} from "../controller/userController.js";
import {
  adminMiddleware,
  authenticateToken,
  authorizeRole
} from "../middleware/authenticateToken.js";
import authMiddleware from "../middleware/authMiddleWare.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

//Register a new instuctor
router.post("/registerInstructor", registerInstructor);

// Login a user
router.post("/login", login);

// LOgin Instructor
router.post("/loginInstructor", loginInstructor);

// Get all users (requires admin role)
router.get("/", authenticateToken,  getAllUsers);

// Get a single user by ID
router.get("/profile/", authenticateToken, getUserById);

// Update a user by ID
router.put("/:id",authenticateToken, updateUserById);

// Delete a user by ID
router.delete("/delete/", authenticateToken, deleteUserById);
// Block user
router.get("/blocked/:id", authenticateToken, blockUser);
//unblocked user
router.get("/unblocked/:id", authenticateToken, unBlockUser);

export default router;
