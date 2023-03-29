import express from 'express'
import cors from 'cors'
import router from './routes/userRoute.js';
import discussion from './routes/Discussion.js';
import comments from './routes/Comment.js';
import courseRoutes from './routes/CourseRoutes.js'
import cartPurchaseRoutes from './routes/CartPurchaseRoutes.js'
import userRoutes from './routes/UserRoutes.js';
import adminRouter from './routes/adminRoute.js';

import dotenv from 'dotenv';
import {dbConnect}  from './config/db.js';
import { config } from 'dotenv';
config();
// import { dbConnection } from './db/db.js';

// const debug = require('debug')('app')
const PORT = process.env.PORT || 5432
const app = express();

dotenv.config();
// app.use(cors({ origin: '*' }));
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('OK');
});
// dbConnection();
dbConnect();
process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use("/api/users", router);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/cartPurchase', cartPurchaseRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/discussions', discussion);
app.use('/api/v1/comments', comments);
app.use('/admins', adminRouter);

// app.use('/discussion', Discussion)
// app.use('/comment', Comment)
// app.use('/user', UserRoutes)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
