import { DB_NAME } from "@/constant/dbName";
import mongoose from "mongoose";

export const connect = async () => {
    try {
        // Use MONGODB_URI or MONGO_URI environment variable
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoUri) {
            console.log("⚠️  No MongoDB URI found. App will run without database features.");
            return null;
        }
        const connectionInstance = await mongoose.connect(`${mongoUri}/${DB_NAME}`);
        console.log(`\n✅ MongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.log("⚠️  MongoDB Connection failed. App will run without database features.", error instanceof Error ? error.message : String(error));
        // Don't crash the server - just log the error and continue
        return null;
    }
}