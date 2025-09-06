import { Schema, model, models, Document } from "mongoose";

interface IRound {
  round: number;
  type: string;
  duration: number;
  questions: string[];
  experience: string;
}

interface IInterviewExperience extends Document {
  company: string;
  position: string;
  author: string;
  date: string;
  duration: number;
  rounds: number;
  level: "easy" | "medium" | "hard";
  result: "selected" | "rejected" | "pending";
  tags?: string[];
  likes: number;
  comments: number;
  preview: string;
  interview: {
    rounds: IRound[];
    overallExperience: string;
    tips: string[];
    finalOutcome: string;
  };
}

const InterviewExperienceSchema = new Schema<IInterviewExperience>({
  company: { type: String, required: true },
  position: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  rounds: { type: Number, required: true },
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
  result: { type: String, enum: ["selected", "rejected", "pending"], required: true },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  preview: { type: String, required: true },
  interview: {
  rounds: {
    type: [
      {
        round: { type: Number, required: true },
        type: { type: String, required: true },
        duration: { type: Number, required: true },
        questions: [{ type: String }],
        experience: { type: String, required: true },
      },
    ],
    required: true,
  },
  overallExperience: { type: String, required: true },
  tips: [{ type: String }],
  finalOutcome: { type: String, required: true },
},

});

const InterviewExperience =
  models.InterviewExperience ||
  model<IInterviewExperience>("InterviewExperience", InterviewExperienceSchema);

export default InterviewExperience;
