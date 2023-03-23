import express from 'express'
import authenticateToken from '../middleware/jwt.js'
import {createNotification,getParticularNotification,getAllNotifications,deleteParticularNotification,clearNotifications} from '../controller/Notifications/userNotification.js'

const notifyRoute = express.Router();

notifyRoute.post('/',createNotification)
notifyRoute.get('/allNotifications',authenticateToken,getAllNotifications)
notifyRoute.get('/viewOne/:id',getParticularNotification)
notifyRoute.delete('/deleteOne',authenticateToken,deleteParticularNotification)
notifyRoute.delete('/clearNotifications',authenticateToken,clearNotifications)

export default notifyRoute