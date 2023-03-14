import express from "express";
import { dbConnect } from "./config/db.js";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";
// import  {dbConnect}  from './config/dbConnect.js';
// import router from './routes/userRoutes.js';

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.Port || 3000;

app.use(express.json());

app.use("/api/users", router);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
