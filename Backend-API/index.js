import express from 'express'
import cors from 'cors'

import * as dotenv from 'dotenv' 
import { dbConnection } from './db/db';
import Discussion from './routes/Discussion'
import Comment from './routes/Comment'
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

app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/cartPurchase', cartPurchaseRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/discussions', Discussion);
app.use('/api/v1/comments', Comment);

// app.use('/discussion', Discussion)
// app.use('/comment', Comment)
// app.use('/user', UserRoutes)

//listen server
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`)); 
