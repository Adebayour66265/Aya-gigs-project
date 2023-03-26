import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb+srv://testhenz:tested@cluster0.1rpxskq.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false); 

export const connectDB = async () => {
  try {
    const mongooseConnect = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to Database');
  } catch (error) {
    console.log('Not Connected to Database');
  }
};
