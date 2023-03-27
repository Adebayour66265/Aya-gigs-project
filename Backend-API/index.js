import express from 'express'
import cors from 'cors'


import * as dotenv from 'dotenv' 
// import { dbConnection } from './db/db';
import { dbConnect } from './config/db.js';
import router from './routes/userRoute.js';

import adminRouter from './routes/adminRoute.js';


dotenv.config()
// const debug = require('debug')('app')
const PORT = process.env.PORT || 5432
const app = express();

dbConnect();
// dbConnection();

process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use("/api/users", router);
app.use("/admins", adminRouter);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
