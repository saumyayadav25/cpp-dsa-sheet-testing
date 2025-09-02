
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

  React.useEffect(() => {
    if (isCompleted) {
      // Dynamically import so it's only loaded in browser (fixes Vercel SSR issue)
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 300,
          spread: 100,
          origin: { y: 0.6 },
        });
      });

      // Toast message
      const toast = document.createElement('div');
      toast.className =
        'toast fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50';
      toast.textContent = `Congrats! You've completed "${topicName}" 🎉`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  }, [isCompleted, topicName]);

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
