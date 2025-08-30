import { DB_NAME } from "@/constant/dbName";
import mongoose from "mongoose";

export const connect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.log("MongoDB Connection failed - MONGO_URI environment variable is not set");
            // Don't throw error during build process, just log and return
            if (process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build') {
                return;
            }
            throw new Error("MONGO_URI environment variable is required");
        }

        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed - service will continue without database");
        // Don't throw error during build process
        if (process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build') {
            return;
        }
        throw error;
    }
}
