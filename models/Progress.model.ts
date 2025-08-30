import mongoose, { Schema, Document, Model } from "mongoose";

export interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
}

export interface ProgressType extends Document {
  userId: string;
  lastVisited?: Date;
  streakCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  topicsProgress: TopicProgress[];
  topicsCompleted: string[];
}

const TopicProgressSchema = new Schema<TopicProgress>({
  topicName: { type: String, required: true },
  solvedCount: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
});

const ProgressSchema = new Schema<ProgressType>({
  userId: { type: String, required: true, unique: true },
  lastVisited: { type: Date, default: null },
  streakCount: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
  totalSolved: { type: Number, default: 0 },
  topicsProgress: { type: [TopicProgressSchema], default: [] },
  topicsCompleted: { type: [String], default: [] }, 
});

export const Progress: Model<ProgressType> =
  mongoose.models.Progress || mongoose.model<ProgressType>("Progress", ProgressSchema);
