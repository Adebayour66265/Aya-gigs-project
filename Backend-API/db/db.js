// const mongoose = require('mongoose')
// const  MONGODBURI =  process.env.Mongo_url

// module.exports = async () => {
//   mongoose.set("strictQuery", false)
//   const mongooseConnect = await mongoose.connect(MONGODBURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   if (mongooseConnect) {
//     console.log('Connected to Database')
//   } else {
//     console.log('Not Connected to Database')
//   }
// }
import mongoose from "mongoose";

export const connectDB = async () => {
    try{
    mongoose.set("strictQuery",false);
    await mongoose.connect(process.env.Mongo_url);
    console.log("Connection Successful");
    }catch(e){
        console.log(e.message);
        process.exit(1)
    }
}