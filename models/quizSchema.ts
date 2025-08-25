import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    quizType: {
      type: String,
      enum: ["MCQ", "Coding", "TrueFalse", "Other"],
      default: "MCQ",
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.QuizResult ||
  mongoose.model("QuizResult", quizResultSchema);
