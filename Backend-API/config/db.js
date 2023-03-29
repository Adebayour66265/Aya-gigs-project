import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.set('strictQuery', false)
  const mongooseConnect = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  if (mongooseConnect) {
    console.log('Connected to Database')
  } else {
    console.log('Not Connected to Database')
  }
}
  
  
  
  

  

//   try {
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log(`Database connected successfully`);
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };
