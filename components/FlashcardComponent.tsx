"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Flashcard } from "@/data/flashcards";

interface FlashcardComponentProps {
  flashcard: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardComponent({
  flashcard,
  isFlipped,
  onFlip,
}: FlashcardComponentProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize color and icon calculations to prevent unnecessary re-renders
  const difficultyColor = useMemo(() => {
    switch (flashcard?.difficulty) {
      case "Basic":
        return "from-green-500 to-emerald-500";
      case "Intermediate":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  }, [flashcard?.difficulty]);

  const categoryIcon = useMemo(() => {
    switch (flashcard?.category) {
      case "Time Complexity":
        return "⏱️";
      case "Graph Traversals":
        return "🕸️";
      case "Sorting":
        return "📊";
      case "Data Structures":
        return "🏗️";
      case "Recursion":
        return "🔄";
      default:
        return "💡";
    }
  }, [flashcard?.category]);

  // Robust null checks to prevent rendering corrupted data
  if (
    !flashcard ||
    typeof flashcard !== "object" ||
    !flashcard.term ||
    !flashcard.explanation
  ) {
    return (
      <div className="w-full max-w-2xl mx-auto h-80 flex items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
            Data Error
          </h3>
          <p className="text-red-600 dark:text-red-400">
            Flashcard data is corrupted or missing. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="perspective-1000 w-full flex justify-center items-center">
      <motion.div
        className="relative w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] overflow-auto cursor-pointer"
        onClick={onFlip}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of card - Question Side */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden ${isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <div className="relative w-full h-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${difficultyColor} opacity-0`}
              animate={{
                opacity: isHovered ? 0.05 : 0,
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${difficultyColor} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categoryIcon}
                  </motion.div>
                  <div>
                    <div
                      className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColor} text-white shadow-sm`}
                    >
                      {flashcard.difficulty}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                      {flashcard.category}
                    </div>
                  </div>
                </div>

                {/* Flip indicator */}
                <motion.div
                  className="text-gray-400 dark:text-gray-500"
                  animate={{ rotate: isHovered ? 15 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                </motion.div>
              </div>

              {/* Term - Main Content */}
              <div className="flex-1 flex items-center justify-center text-center px-2 sm:px-4">
                <div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight break-words">
                    {flashcard.term}
                  </h2>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Tap or click to reveal explanation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card - Answer Side */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <div className="relative w-full h-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${difficultyColor} opacity-0`}
              animate={{
                opacity: isHovered ? 0.05 : 0,
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${difficultyColor} flex items-center justify-center text-base sm:text-lg shadow-lg`}
                  >
                    💡
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Explanation
                  </div>
                </div>

                {/* Back indicator */}
                <motion.div
                  className="text-gray-400 dark:text-gray-500"
                  animate={{ rotate: isHovered ? -15 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                </motion.div>
              </div>

              {/* Explanation Content */}
              <div className="flex-1 flex items-center">
                <div className="w-full">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-base md:text-lg break-words">
                      {flashcard.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-4 sm:mt-6">
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Tap or click to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
