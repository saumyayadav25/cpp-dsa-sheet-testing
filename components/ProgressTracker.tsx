import React from 'react';
import confetti from 'canvas-confetti';

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
      confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.6 },
      });
      const toast = document.createElement('div');
      toast.className = 'toast fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50';
      toast.textContent = `Congrats! You've completed "${topicName}" 🎉`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  }, [isCompleted, topicName]);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Completed: ✅ {solvedQuestions}/{totalQuestions}
        </span>
        {isCompleted && <span className="text-yellow-400 animate-bounce">🎉</span>}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;