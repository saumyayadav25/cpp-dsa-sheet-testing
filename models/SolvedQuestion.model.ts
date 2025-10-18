import { Schema, model, models, Document } from "mongoose";

export interface ISolvedQuestion extends Document {
  userId: string;
  questionId: string; // Using questionId to match the API route
  language: string;
  solutionCode: string;
}

const SolvedQuestionSchema = new Schema<ISolvedQuestion>(
  {
    userId: { type: String, required: true, index: true },
    questionId: { type: String, required: true },
    language: { type: String, required: true },
    solutionCode: { type: String, required: true },
  },
  { timestamps: true }
);

export const SolvedQuestion =
  models.SolvedQuestion ||
  model<ISolvedQuestion>("SolvedQuestion", SolvedQuestionSchema);
