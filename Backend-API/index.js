import express from 'express'
import cors from 'cors'
import router from './routes/userRoute.js';
import discussion from './routes/Discussion.js';
import comments from './routes/Comment.js';


import { config } from 'dotenv';
config();
import { dbConnection } from './db/db.js';
// const debug = require('debug')('app')
const PORT = process.env.PORT
const app = express();


dbConnection();

process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use("/api/users", router);
app.use("/api/discussion", discussion);
app.use("/api/comments", comments);




app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
