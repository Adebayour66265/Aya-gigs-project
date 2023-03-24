import express from 'express'
import authenticateToken from '../middleware/jwt.js'
import {sendNewMaterialNotification,getParticularNotification,getAllNotifications,deleteParticularNotification,clearNotifications} from '../controller/Notifications/userNotification.js'

const notifyRoute = express.Router();

notifyRoute.post('/',sendNewMaterialNotification)
notifyRoute.get('/allNotifications',authenticateToken,getAllNotifications)
notifyRoute.get('/viewOne/:id',getParticularNotification)
notifyRoute.delete('/deleteOne',authenticateToken,deleteParticularNotification)
notifyRoute.delete('/clearNotifications',authenticateToken,clearNotifications)

export default notifyRoute