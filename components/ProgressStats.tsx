'use client';

import { motion } from 'framer-motion';
import { FaChartLine, FaCalendarAlt, FaClock, FaCode } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';

type StatsType = {
  totalQuestions: number;
  solvedQuestions: number;
  markedForRevision: number;
  percentage: number;
  difficultyStats: any;
  topicStats: any[];
  recentActivity: any[];
};

type ProgressStatsProps = {
  stats: StatsType;
};

export default function ProgressStats({ stats }: ProgressStatsProps) {
  const getCurrentWeekProgress = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekActivity = stats.recentActivity.filter(activity => {
      // This is a simplified version - in a real app you'd track this properly
      return true; // For demo purposes
    });
    return Math.min(weekActivity.length, 7);
  };

  const getAveragePerDay = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return Math.round(stats.recentActivity.length / 30 * 10) / 10;
  };

  const getBestTopic = () => {
    if (stats.topicStats.length === 0) return { name: 'N/A', percentage: 0 };
    
    const bestTopic = stats.topicStats.reduce((best, current) => {
      return current.percentage > best.percentage ? current : best;
    }, stats.topicStats[0]);
    
    return bestTopic;
  };

  const getWeeklyGoalProgress = () => {
    const weeklyGoal = 7; // 1 problem per day
    const weekProgress = getCurrentWeekProgress();
    return Math.min(Math.round((weekProgress / weeklyGoal) * 100), 100);
  };

  const bestTopic = getBestTopic();
  const weeklyGoalProgress = getWeeklyGoalProgress();

  const statCards = [
    {
      icon: FaCalendarAlt,
      title: 'This Week',
      value: getCurrentWeekProgress(),
      subtitle: 'problems solved',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: BiTrendingUp,
      title: 'Daily Average',
      value: getAveragePerDay(),
      subtitle: 'problems/day (30d)',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: FaCode,
      title: 'Best Topic',
      value: `${bestTopic.percentage}%`,
      subtitle: bestTopic.name,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: FaClock,
      title: 'Weekly Goal',
      value: `${weeklyGoalProgress}%`,
      subtitle: 'of 7 problems',
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <FaChartLine className="text-xl text-green-400" />
        <h3 className="text-xl font-semibold text-white">Performance Stats</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${card.bgColor} rounded-lg p-4 border ${card.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`text-lg ${card.color}`} />
              <span className="text-xs text-gray-400">{card.title}</span>
            </div>
            
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <div className="text-xs text-gray-400">
                {card.subtitle}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Insights */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Insights</h4>
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span>
              You've solved {stats.percentage}% of all available problems
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <span>
              {stats.markedForRevision} problems marked for revision
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <span>
              Strongest in {bestTopic.name} topic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
