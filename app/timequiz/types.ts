export type Question = {
  question: string;
  topic: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string; // add this if you use explanation
};