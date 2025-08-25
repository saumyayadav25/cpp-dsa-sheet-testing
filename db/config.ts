import { DB_NAME } from "@/constant/dbName";
import mongoose from "mongoose";

export const connect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI!, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed - service will continue without database");
        throw error;
    }
}
