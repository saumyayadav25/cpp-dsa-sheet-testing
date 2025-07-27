'use client';

import { motion } from 'framer-motion';
import { FaLayerGroup, FaCheckCircle } from 'react-icons/fa';

type TopicStat = {
  name: string;
  total: number;
  solved: number;
  percentage: number;
};

type TopicProgressProps = {
  topicStats: TopicStat[];
};

export default function TopicProgress({ topicStats }: TopicProgressProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const sortedTopics = [...topicStats].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <FaLayerGroup className="text-xl text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Topic Progress</h3>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {sortedTopics.map((topic, index) => (
          <motion.div
            key={topic.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {topic.percentage === 100 && (
                  <FaCheckCircle className="text-green-400 text-sm" />
                )}
                <span className="text-gray-300 font-medium text-sm truncate">
                  {topic.name}
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`font-bold text-sm ${getProgressTextColor(topic.percentage)}`}>
                  {topic.solved}/{topic.total}
                </span>
                <span className="text-gray-400 text-xs ml-1">
                  ({topic.percentage}%)
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor(topic.percentage)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.percentage}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">
              {sortedTopics.filter(t => t.percentage === 100).length}
            </div>
            <div className="text-xs text-gray-400">Completed Topics</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {Math.round(sortedTopics.reduce((sum, t) => sum + t.percentage, 0) / sortedTopics.length) || 0}%
            </div>
            <div className="text-xs text-gray-400">Average Progress</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
