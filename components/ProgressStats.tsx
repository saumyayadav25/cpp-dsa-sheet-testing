'use client';

import { motion } from 'framer-motion';
import { FaChartLine, FaCalendarAlt, FaClock, FaCode } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';

type TopicProgress = {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
};

type StatsType = {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  streakCount: number;
  lastVisited: string;
  topicsProgress: TopicProgress[];
};

type ProgressStatsProps = {
  stats: StatsType;
};

export default function ProgressStats({ stats }: ProgressStatsProps) {
  const totalQuestions = stats.topicsProgress.reduce(
    (sum, topic) => sum + (topic.totalQuestions || 0),
    0
  );
  const percentage =
    totalQuestions > 0 ? Math.round((stats.totalSolved / totalQuestions) * 100) : 0;

  const topicStats =
    stats.topicsProgress.map(topic => ({
      name: topic.topicName,
      percentage:
        topic.totalQuestions > 0
          ? Math.round((topic.solvedCount / topic.totalQuestions) * 100)
          : 0
    })) || [];

  const getCurrentWeekProgress = () => {
    // Placeholder: could use streak or real timestamps later
    return Math.min(stats.streakCount, 7);
  };

  const getAveragePerDay = () => {
    // Placeholder: could be based on totalSolved over last N days
    return Math.round((stats.totalSolved / 30) * 10) / 10;
  };

  const getBestTopic = () => {
    if (topicStats.length === 0) return { name: 'N/A', percentage: 0 };
    return topicStats.reduce((best, current) =>
      current.percentage > best.percentage ? current : best
    );
  };

  const weeklyGoalProgress = Math.min(
    Math.round((getCurrentWeekProgress() / 7) * 100),
    100
  );

  const bestTopic = getBestTopic();

  const statCards = [
    {
      icon: FaCalendarAlt,
      title: 'This Week',
      value: getCurrentWeekProgress(),
      subtitle: 'problems solved',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor:
        'from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10',
      borderColor: 'border-blue-500/20 dark:border-blue-500/30'
    },
    {
      icon: BiTrendingUp,
      title: 'Daily Average',
      value: getAveragePerDay(),
      subtitle: 'problems/day (30d)',
      color: 'text-green-600 dark:text-green-400',
      bgColor:
        'from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10',
      borderColor: 'border-green-500/20 dark:border-green-500/30'
    },
    {
      icon: FaCode,
      title: 'Best Topic',
      value: `${bestTopic.percentage}%`,
      subtitle: bestTopic.name,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor:
        'from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10',
      borderColor: 'border-purple-500/20 dark:border-purple-500/30'
    },
    {
      icon: FaClock,
      title: 'Weekly Goal',
      value: `${weeklyGoalProgress}%`,
      subtitle: 'of 7 problems',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor:
        'from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/10',
      borderColor: 'border-orange-500/20 dark:border-orange-500/30'
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaChartLine className="text-xl text-green-600 dark:text-green-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Performance Stats
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${card.bgColor} rounded-lg p-4 border ${card.borderColor} hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`text-lg ${card.color}`} />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {card.title}
              </span>
            </div>

            <div className="space-y-1">
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {card.subtitle}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Insights */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Quick Insights
        </h4>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
            <span>You've solved {percentage}% of all available problems</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
            <span>
              Easy: {stats.easySolved} | Medium: {stats.mediumSolved} | Hard:{' '}
              {stats.hardSolved}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
            <span>Strongest in {bestTopic.name} topic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
