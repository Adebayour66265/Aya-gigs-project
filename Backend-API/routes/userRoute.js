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
  unBlockUser,
  adminBlockUserController,
  adminUnBlockUserController
} from "../controller/userController.js";
import {
  adminMiddleware,
  authenticateToken
} from "../middleware/authenticateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

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
router.get("/", getAllUsers);

// Get a single user by ID
router.get("/profile/", authenticateToken, getUserById);

// Update a user by ID
router.put("/:id", updateUserById);

// Delete a user by ID
router.delete("/delete/", authenticateToken, deleteUserById);
// Block user
router.get("/blocked/:id", adminMiddleware, authenticateToken, blockUser);
//unblocked user
router.get("/unblocked/:id", authenticateToken, unBlockUser);

//Admin block user
router.get(
  "/admin-block/:id",
  isAdmin,
  authenticateToken,
  adminBlockUserController
);

//Admin block user
router.get(
  "/admin-unblock/:id",
  isAdmin,
  authenticateToken,
  adminUnBlockUserController
);
export default router;
