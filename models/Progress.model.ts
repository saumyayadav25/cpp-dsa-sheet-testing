import { Schema, model, models, Document, Types } from "mongoose";

export interface ITopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
}

export interface IProgress extends Document {
  userId: Types.ObjectId;
  streakCount: number;
  
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  
  topicsCompleted: string[]; // still keeping old field
  topicsProgress: ITopicProgress[];

  lastVisited: Date;
}

const TopicProgressSchema = new Schema<ITopicProgress>(
  {
    topicName: { type: String, required: true },
    solvedCount: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 }
  },
  { _id: false }
);

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    streakCount: { type: Number, default: 0 },
    
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    totalSolved: { type: Number, default: 0 },
    
    topicsCompleted: [{ type: String }],
    topicsProgress: [TopicProgressSchema],
    
    lastVisited: { type: Date, default: null }
  },
  { timestamps: true }
);

export const Progress = models.Progress || model<IProgress>("Progress", ProgressSchema);
