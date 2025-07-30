import { Schema, model, models, Document, Types } from "mongoose";

export interface IProgress extends Document {
  userId: Types.ObjectId;
  streakCount: number;
  totalSolved: number;
  hardSolved: number;
  topicsCompleted: string[];
  lastVisited: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    streakCount: { type: Number, default: 0 },
    totalSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    topicsCompleted: [{ type: String }],
    lastVisited: { type: Date, default: null }
  },
  { timestamps: true }
);

export const Progress = models.Progress || model<IProgress>("Progress", ProgressSchema);
