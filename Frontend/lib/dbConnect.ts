import mongoose from 'mongoose';

let isConnected = false;
console.log('Connecting to MongoDB...');
console.log('MONGO_URI:', process.env.MONGO_URI);
const dbConnect = async (): Promise<void> => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
  }
};

export default dbConnect;
