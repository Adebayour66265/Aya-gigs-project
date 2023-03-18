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


app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  return res.send('OK');
});
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
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/cartPurchase', cartPurchaseRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/discussions', discussion);
app.use('/api/v1/comments', comments);

// app.use('/discussion', Discussion)
// app.use('/comment', Comment)
// app.use('/user', UserRoutes)

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
