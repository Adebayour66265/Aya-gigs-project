import mongoose from 'mongoose';
const MONGODBURI = process.env.MONGODBURI

export const dbConnection = async () => {
  mongoose.set('strictQuery', false)
  const mongooseConnect = await mongoose.connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  if (mongooseConnect) {
    console.log('Connected to Database')
  } else {
    console.log('Not Connected to Database')
  }
}
