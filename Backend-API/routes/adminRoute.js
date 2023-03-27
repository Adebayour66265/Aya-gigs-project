import express from 'express';
import { adminRegister, changePassword, login } from '../controller/adminController.js';
import { adminMiddleware } from '../middleware/authenticateToken.js';



const adminRouter = express.Router();

adminRouter.post("/register", adminRegister )
adminRouter.post("/login", login)

// change admin password
adminRouter.put("/adminpassword/:username", changePassword)
// // Get all users (requires admin role)
// adminRouter.get('/',  getAllUsers);


export default adminRouter;