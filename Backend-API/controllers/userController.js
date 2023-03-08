const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const { JWT_SECRET } = process.env;

const UserController = {
  // Register a new user
  async register(req, res) {
    try {
      const { firstname, lastname,email, phoneNumber,companyName,address, password, role } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ firstname, lastname, email, phoneNumber,companyName,address, password: hashedPassword, role });
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to register user.' });
    }
  },

  // Login a user
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to login.' });
    }
  },

  // Get the current authenticated user
  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to get current user.' });
    }
  },

  // Get all users (requires admin role)
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to get all users.' });
    }
  },

  // Get a single user by ID (requires admin role)
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to get user by ID.' });
    }
  },

  // Update a user by ID (requires admin role)
  async updateUserById(req, res) {
    try {
      const { username, password, role } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.findByIdAndUpdate(req.params.id, { username, password: hashedPassword, role }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to update user by ID.' });
    }
  }
}


export default UserController;