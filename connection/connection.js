import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    const connect = await mongoose.connect(url);
    console.log('MongoDB successfully connected', connect.connection.host);
  } catch (error) {
    console.log('error :', error.message);
  }
};

export default connectDB;
