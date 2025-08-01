'use client';

import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaCode } from 'react-icons/fa';
import { type Question } from '@/data/questions';

type RecentActivityProps = {
  recentActivity: Question[];
  progress: {
    [id: string]: { 
      isSolved: boolean; 
      isMarkedForRevision: boolean; 
      note?: string;
      solvedAt?: string;
    };
  };
};

export default function RecentActivity({ recentActivity, progress }: RecentActivityProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-500/20';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-500/20';
      case 'hard': return 'text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-500/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-500/10 dark:bg-gray-500/20';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  // If no recent activity, show some mock recent activity for demo
  const displayActivity = recentActivity.length > 0 ? recentActivity : [
    // Mock data for demonstration - in real app this would be empty or actual data
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaClock className="text-xl text-orange-600 dark:text-orange-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      </div>
      
      {displayActivity.length === 0 ? (
        <div className="text-center py-8">
          <FaCode className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <div className="text-gray-600 dark:text-gray-400 mb-2">No recent activity</div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            Start solving problems to see your activity here!
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {displayActivity.map((question, index) => {
            const questionProgress = progress[question.id];
            const solvedAt = questionProgress?.solvedAt;
            
            return (
              <motion.div
                key={`${question.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-sm" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {question.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0">
                        {solvedAt ? formatTimeAgo(solvedAt) : 'Recently'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      
                      {questionProgress?.isMarkedForRevision && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium">
                          For Review
                        </span>
                      )}
                    </div>
                    
                    {questionProgress?.note && (
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 rounded p-2">
                        {questionProgress.note}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      {displayActivity.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {displayActivity.filter(q => q.difficulty === 'easy').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Easy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {displayActivity.filter(q => q.difficulty === 'medium').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Medium</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {displayActivity.filter(q => q.difficulty === 'hard').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Hard</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(229 231 235);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(55 65 81);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(156 163 175);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(75 85 99);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(156 163 175);
        }
      `}</style>
    </div>
  );
}
