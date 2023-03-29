import express from 'express';
import { adminRegister, changePassword, forgotPassword, login, resetPassword } from '../controller/adminController.js';
import { adminMiddleware } from '../middleware/authenticateToken.js';



const adminRouter = express.Router();

adminRouter.post("/register", adminRegister )
adminRouter.post("/login", login)

adminRouter.put("/adminpassword/:email", changePassword)

adminRouter.post('/forgot-password', forgotPassword);
adminRouter.post('/reset-password/:token', resetPassword);
// // Get all users (requires admin role)
// adminRouter.get('/',  getAllUsers);


export default adminRouter;