import { DB_NAME } from "@/constant/dbName";
import mongoose from "mongoose";

export const connect = async () => {
    if (process.env.MONGO_URI === "dummy") {
        console.log("⚠️ Skipping MongoDB connection (dummy mode)");
        return;
    }

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n✅ MongoDB Connected! DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection failed", error);
        process.exit(1);
    }
};
