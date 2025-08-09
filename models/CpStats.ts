// //C:\Users\Administrator\cpp-dsa-sheet-testing\models\CpStats.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface ICpStats extends Document {
//   userId: string;
//   leetcodeUsername?: string;
//   codeforcesHandle?: string;
//   gfgUsername?: string;
//   hackerrankUsername?: string;
//   codechefUsername?: string;
//   hackerearthUsername?: string;
//   stats: any; // You can type this further later
// }

// const CpStatsSchema: Schema = new Schema({
//   userId: { type: String, required: true, unique: true },
//   leetcodeUsername: String,
//   codeforcesHandle: String,
//   gfgUsername: String,
//   hackerrankUsername: String,
//   codechefUsername: String,
//   hackerearthUsername: String,
//   stats: { type: Object, required: true },
// });

// export default mongoose.models.CpStats ||
//   mongoose.model<ICpStats>("CpStats", CpStatsSchema);


// models/CPStats.ts
import { Schema, model, models, Document, Types } from "mongoose";
import { IUser } from "./User.model"; // Import the IUser type if needed

export interface ICpStats extends Document {
  userId: Types.ObjectId | IUser;
  leetcode: any;
  gfg: any;
  codeforces: any;
  codechef: any;
  hackerrank: any;
  hackerearth: any;
}

const CpStatsSchema = new Schema<ICpStats>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", //matches the model name exported in User.model.ts
      required: true,
      unique: true,
    },
    leetcode: { type: Object, default: {} },
    gfg: { type: Object, default: {} },
    codeforces: { type: Object, default: {} },
    codechef: { type: Object, default: {} },
    hackerrank: { type: Object, default: {} },
    hackerearth: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const CpStats = models.CpStats || model<ICpStats>("CpStats", CpStatsSchema);
