import express from 'express'
import cors from 'cors'

import * as dotenv from 'dotenv' 
import { dbConnection } from './db/db';
dotenv.config()
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

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
