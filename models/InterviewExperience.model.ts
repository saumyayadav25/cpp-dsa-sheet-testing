import { Schema, model, models, Document } from "mongoose";

interface IInterviewExperience extends Document {
  company: string;
  position: string;
  author: string;
  tags?: string[];
  content: string;
  roundes: number;
  result: "selected" | "not selected";
  level: "easy" | "medium" | "hard";
}

enum Level {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

enum Result {
  SELECTED = "selected",
  NOT_SELECTED = "not selected",
}

const InterviewExperienceSchema = new Schema<IInterviewExperience>({
  company: { type: String, required: true },
  position: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  content: { type: String, required: true },
  roundes: { type: Number, required: true },
  level: {
    type: String,
    enum: Object.values(Level),
    required: true,
  },
  result: {
    type: String,
    enum: Object.values(Result),
    required: true,
  },
});

const InterviewExperience =
  models.InterviewExperience ||
  model<IInterviewExperience>("InterviewExperience", InterviewExperienceSchema);

export default InterviewExperience;
