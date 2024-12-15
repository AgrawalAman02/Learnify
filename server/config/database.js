import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    await mongoose.connect(MONGO_URI);
};

export default connectDb;