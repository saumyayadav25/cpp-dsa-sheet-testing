"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Flashcard } from "@/data/flashcards";

interface FlashcardComponentProps {
  flashcard: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardComponent({ 
  flashcard, 
  isFlipped, 
  onFlip 
}: FlashcardComponentProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic':
        return 'from-green-500 to-emerald-500';
      case 'Intermediate':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Time Complexity':
        return '⏱️';
      case 'Graph Traversals':
        return '🕸️';
      case 'Sorting':
        return '📊';
      case 'Data Structures':
        return '🏗️';
      case 'Recursion':
        return '🔄';
      default:
        return '💡';
    }
  };

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto">
      <motion.div
        className="relative w-full h-80 cursor-pointer preserve-3d"
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
          damping: 30
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background with gradient and effects */}
          <div className="relative w-full h-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(flashcard.difficulty)} opacity-0`}
              animate={{
                opacity: isHovered ? 0.1 : 0,
                backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
              }}
              transition={{ duration: 0.6 }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
                  : "0 0 0 1px rgba(229, 231, 235, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "200%" : "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getDifficultyColor(flashcard.difficulty)} flex items-center justify-center text-2xl shadow-lg`}>
                    {getCategoryIcon(flashcard.category)}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(flashcard.difficulty)} text-white`}>
                      {flashcard.difficulty}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {flashcard.category}
                    </div>
                  </div>
                </div>
                
                {/* Flip indicator */}
                <motion.div
                  className="text-gray-400 dark:text-gray-500"
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </motion.div>
              </div>

              {/* Term */}
              <div className="flex-1 flex items-center justify-center text-center">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
                  animate={{
                    color: isHovered ? "#3B82F6" : undefined
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {flashcard.term}
                </motion.h2>
              </div>

              {/* Footer */}
              <div className="text-center">
                <motion.p
                  className="text-gray-500 dark:text-gray-400 text-sm"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  Click to reveal explanation
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Background */}
          <div className="relative w-full h-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(flashcard.difficulty)} opacity-0`}
              animate={{
                opacity: isHovered ? 0.1 : 0,
                backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
              }}
              transition={{ duration: 0.6 }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 0 0 2px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)"
                  : "0 0 0 1px rgba(229, 231, 235, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getDifficultyColor(flashcard.difficulty)} flex items-center justify-center text-lg shadow-lg`}>
                    💡
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Explanation
                  </div>
                </div>
                
                {/* Back indicator */}
                <motion.div
                  className="text-gray-400 dark:text-gray-500"
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </motion.div>
              </div>

              {/* Explanation */}
              <div className="flex-1 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {flashcard.explanation}
                  </p>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6">
                <motion.p
                  className="text-gray-500 dark:text-gray-400 text-sm"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  Click to flip back
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
