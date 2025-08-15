'use client';

import { motion } from 'framer-motion';
import { FaLayerGroup, FaCheckCircle } from 'react-icons/fa';

type TopicStat = {
  name: string;
  solved: number;
  percentage?: number; // optional because we'll calculate it
};

type TopicProgressProps = {
  topicStats: TopicStat[];
};

export default function TopicProgress({ topicStats }: TopicProgressProps) {
  console.log("Raw topicStats:", topicStats);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Default total questions per topic to 5
  const TOTAL_PER_TOPIC = 5;

  // Calculate percentage
  const topicsWithPercentage = topicStats.map(t => ({
    ...t,
    total: TOTAL_PER_TOPIC,
    percentage: t.percentage !== undefined
      ? t.percentage
      : Math.round((t.solved / TOTAL_PER_TOPIC) * 100)
  }));

  console.log("Topics with percentage:", topicsWithPercentage);

  const sortedTopics = [...topicsWithPercentage].sort((a, b) => b.percentage - a.percentage);
  console.log("Sorted topics:", sortedTopics);

  const completedCount = sortedTopics.filter(t => t.percentage === 100).length;
  const averageProgress = sortedTopics.length > 0
    ? Math.round(sortedTopics.reduce((sum, t) => sum + (t.percentage ?? 0), 0) / sortedTopics.length)
    : 0;

  console.log("Completed topics:", completedCount);
  console.log("Average progress:", averageProgress);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaLayerGroup className="text-xl text-purple-600 dark:text-purple-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Progress</h3>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-400">
        {sortedTopics.map((topic, index) => (
          <motion.div
             key={`${topic.name}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md p-1 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {topic.percentage === 100 && (
                  <FaCheckCircle className="text-green-600 dark:text-green-400 text-sm" />
                )}
                <span
                  className="text-gray-700 dark:text-gray-300 font-medium text-sm truncate"
                  title={topic.name}
                >
                  {topic.name}
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`font-bold text-sm ${getProgressTextColor(topic.percentage)}`}>
                  {topic.solved}/{topic.total}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                  ({topic.percentage}%)
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor(topic.percentage)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {completedCount}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Completed Topics</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {averageProgress}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Average Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}
