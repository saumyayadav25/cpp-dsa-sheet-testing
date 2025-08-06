"use client";

import { useState } from "react";

interface Question {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
}

const questions: Question[] = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum",
  },
  {
    title: "Add Two Numbers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/add-two-numbers",
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays",
  },
  // Add more questions as needed
];

export default function RandomQuestionDisplay() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const pickRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {currentQuestion ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
          <p
            className={`font-medium ${getDifficultyColor(
              currentQuestion.difficulty
            )}`}
          >
            {currentQuestion.difficulty}
          </p>
          <a
            href={currentQuestion.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline block"
          >
            Solve on LeetCode
          </a>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
          Click the button to get a random question
        </p>
      )}
      <button
        onClick={pickRandomQuestion}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Pick Random Question
      </button>
    </div>
  );
}
