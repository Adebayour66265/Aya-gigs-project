<<<<<<< Updated upstream
const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const debug = require('debug')('app')
const PORT = process.env.PORT

const app = express()
require('./db/db')()

const Discussion = require('./routes/Discussion')
const Comment = require('./routes/Comment')

process.on('unhandledRejection', (err) => {
  debug(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  debug(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use('/discussion', Discussion)
app.use('/comment', Comment)


app.listen(PORT, () => {
  console.log(`Web server is running ${PORT}`)
})
=======
import express from 'express';
import dotenv from 'dotenv';
import  {dbConnect}  from './config/dbConnect.js';
// import router from './routes/userRoutes.js';

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());

// app.use('/api/v1/users', router);


const PORT = process.env.port || 3000;

app.listen(PORT, console.log(`Server is running at ${PORT}` ));
>>>>>>> Stashed changes
