const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', UserController.register);

// Login a user
router.post('/login', UserController.login);

// Get current user
router.get('/me', authMiddleware.authenticateToken, UserController.getCurrentUser);

// Get all users (requires admin role)
router.get('/', authMiddleware.authenticateToken, authMiddleware.authorizeRole('admin'), UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRole('admin'), UserController.getUserById);

// Update a user by ID
router.put('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRole('admin'), UserController.updateUserById);

// Delete a user by ID
router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRole('admin'), UserController.deleteUserById);

export default router;