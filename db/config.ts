import { DB_NAME } from "@/constant/dbName";
import mongoose from "mongoose";

export const connect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\nMongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed", error);
        process.exit(1);
    }
}