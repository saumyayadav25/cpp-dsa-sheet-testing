'use client';

import { useQuestionContext } from '@/contexts/QuestionContext';
import { TrendingUp, Target, Star, CheckCircle } from 'lucide-react';

export default function CompanyProgressSummary() {
  const { getProgressStats } = useQuestionContext();
  const stats = getProgressStats();

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Questions</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Solved</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.solvedQuestions}</p>
          </div>
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">For Revision</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.markedForRevision}</p>
          </div>
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.progressPercentage.toFixed(1)}%
            </p>
          </div>
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
