'use client';

import { motion } from 'framer-motion';
import { FaChartPie } from 'react-icons/fa';

type DifficultyStats = {
  easy: { total: number; solved: number };
  medium: { total: number; solved: number };
  hard: { total: number; solved: number };
};

type ProgressChartProps = {
  difficultyStats: DifficultyStats;
};

export default function ProgressChart({ difficultyStats }: ProgressChartProps) {
  const getPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  const difficulties = [
    {
      name: 'Easy',
      color: 'bg-green-500',
      borderColor: 'border-green-400',
      textColor: 'text-green-600 dark:text-green-400',
      stats: difficultyStats.easy,
      percentage: getPercentage(difficultyStats.easy.solved, difficultyStats.easy.total)
    },
    {
      name: 'Medium',
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      stats: difficultyStats.medium,
      percentage: getPercentage(difficultyStats.medium.solved, difficultyStats.medium.total)
    },
    {
      name: 'Hard',
      color: 'bg-red-500',
      borderColor: 'border-red-400',
      textColor: 'text-red-600 dark:text-red-400',
      stats: difficultyStats.hard,
      percentage: getPercentage(difficultyStats.hard.solved, difficultyStats.hard.total)
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaChartPie className="text-xl text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Difficulty Breakdown</h3>
      </div>
      
      <div className="space-y-6">
        {difficulties.map((difficulty, index) => (
          <motion.div
            key={difficulty.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${difficulty.color}`}></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{difficulty.name}</span>
              </div>
              <div className="text-right">
                <span className={`font-bold ${difficulty.textColor} text-2xl`}>
                  {difficulty.stats.solved}
                </span>
                {/* <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  ({difficulty.percentage}%)
                </span> */}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full ${difficulty.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((difficulty.stats.solved)/34)*100}%` }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {difficultyStats.easy.solved + difficultyStats.medium.solved + difficultyStats.hard.solved}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total problems solved across all difficulties
          </div>
        </div>
      </div>
    </div>
  );
}
