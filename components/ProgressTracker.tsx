
import React from 'react';

interface ProgressTrackerProps {
  totalQuestions: number;
  solvedQuestions: number;
  topicName: string;
  isCompleted: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalQuestions,
  solvedQuestions,
  topicName,
  isCompleted,
}) => {
  const percent = (solvedQuestions / totalQuestions) * 100;

  // Celebration side-effects moved to SheetContent to avoid firing on every page visit.

  return (
    <div className="mt-4">
      {/* Progress text */}
      <div className="flex justify-between items-center mb-2">
        {!isCompleted ? (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            ✅ {solvedQuestions} / {totalQuestions} solved
          </span>
        ) : (
          <>
            <span className="text-yellow-400 animate-bounce font-semibold">🎉</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">
              {solvedQuestions} / {totalQuestions} Completed
            </span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-green-500 h-2.5 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
