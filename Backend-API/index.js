// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()
// const debug = require('debug')('app')
// const PORT = process.env.PORT
import express from 'express'
import cors from 'cors'
import router from './routes/userRoute.js';
import discussion from './routes/Discussion.js';
import comments from './routes/Comment.js';
import courseRoutes from './routes/CourseRoutes.js'
import cartPurchaseRoutes from './routes/CartPurchaseRoutes.js'
import userRoutes from './routes/UserRoutes.js';


import { config } from 'dotenv';
config();
import { dbConnection } from './db/db.js';
// const debug = require('debug')('app')
const PORT = process.env.PORT
const app = express();


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
app.use('/', user)

app.listen(PORT, () => {
  debug(`Web server is running ${PORT}`)
})