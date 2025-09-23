'use client';

import { motion } from 'framer-motion';
import { FaTable, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
  percentage: number;
  category: 'Strong' | 'Moderate' | 'Weak';
}

type TopicTableProps = {
  topicProgress: TopicProgress[];
};

export default function TopicTable({ topicProgress }: TopicTableProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strong':
        return <FaCheckCircle className="text-green-600 dark:text-green-400" />;
      case 'Moderate':
        return <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400" />;
      case 'Weak':
        return <FaTimesCircle className="text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strong':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'Moderate':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Weak':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Sort topics by percentage descending
  const sortedTopics = [...topicProgress].sort((a, b) => b.percentage - a.percentage);

  // Calculate category counts
  const categoryCounts = topicProgress.reduce((acc, topic) => {
    acc[topic.category] = (acc[topic.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaTable className="text-xl text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Performance Table</h3>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {categoryCounts.Strong || 0}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Strong Topics</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {categoryCounts.Moderate || 0}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Moderate Topics</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {categoryCounts.Weak || 0}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">Weak Topics</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">Topic</th>
              <th className="text-center py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">Progress</th>
              <th className="text-center py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">Solved</th>
              <th className="text-center py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">Category</th>
            </tr>
          </thead>
          <tbody>
            {sortedTopics.map((topic, index) => (
              <motion.tr
                key={topic.topicName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(topic.category)}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {topic.topicName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full ${getProgressBarColor(topic.percentage)} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${topic.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[3rem] text-right">
                      {topic.percentage}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    {topic.solvedCount}/{topic.totalQuestions}
                  </span>
                </td>
                <td className="py-4 px-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(topic.category)}`}>
                    {topic.category}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {topicProgress.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No topic data available
        </div>
      )}
    </div>
  );
}