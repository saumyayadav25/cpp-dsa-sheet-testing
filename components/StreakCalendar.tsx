'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFire } from 'react-icons/fa';
import { useState, useEffect } from 'react';

type StreakCalendarProps = {
  progress: {
    [id: string]: { 
      isSolved: boolean; 
      isMarkedForRevision: boolean; 
      note?: string;
      solvedAt?: string;
    };
  };
};

export default function StreakCalendar({ progress }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get the activity data for the calendar
  const getActivityData = () => {
    const activityMap: { [date: string]: number } = {};
    
    Object.values(progress).forEach(item => {
      if (item.solvedAt) {
        const date = new Date(item.solvedAt).toDateString();
        activityMap[date] = (activityMap[date] || 0) + 1;
      }
    });
    
    return activityMap;
  };

  const activityData = getActivityData();

  // Generate calendar grid (last 12 weeks)
  const generateCalendarData = () => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (12 * 7 - 1)); // 12 weeks ago
    
    for (let week = 0; week < 12; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + (week * 7) + day);
        
        const dateStr = currentDay.toDateString();
        const activity = activityData[dateStr] || 0;
        
        weekDays.push({
          date: currentDay,
          activity,
          isToday: currentDay.toDateString() === today.toDateString(),
          isFuture: currentDay > today
        });
      }
      weeks.push(weekDays);
    }
    
    return weeks;
  };

  const weeks = generateCalendarData();

  const getActivityColor = (activity: number) => {
    if (activity === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (activity === 1) return 'bg-green-200 dark:bg-green-700';
    if (activity === 2) return 'bg-green-400 dark:bg-green-600';
    if (activity >= 3) return 'bg-green-600 dark:bg-green-500';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  const getActivityLevel = (activity: number) => {
    if (activity === 0) return 'No activity';
    if (activity === 1) return '1 problem solved';
    return `${activity} problems solved`;
  };

  // Calculate current streak
  const calculateCurrentStreak = () => {
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      if (activityData[dateStr] > 0) {
        streak++;
      } else if (i > 0) { // Don't break on today if no activity yet
        break;
      }
    }
    
    return streak;
  };

  const currentStreak = calculateCurrentStreak();

  // Get total activity in the visible period
  const totalActivity = Object.values(activityData).reduce((sum, count) => sum + count, 0);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-xl text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Activity Calendar</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <FaFire className="text-orange-600 dark:text-orange-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{currentStreak}</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Day streak</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalActivity}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total solved</div>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="mb-4">
        {/* Month labels */}
        <div className="flex justify-between mb-2 text-xs text-gray-600 dark:text-gray-400">
          {weeks[0] && weeks.length >= 4 && (
            <>
              <span>{monthNames[weeks[0][0].date.getMonth()]}</span>
              <span>{monthNames[weeks[4][0].date.getMonth()]}</span>
              <span>{monthNames[weeks[8][0].date.getMonth()]}</span>
              <span>{monthNames[weeks[11][6].date.getMonth()]}</span>
            </>
          )}
        </div>
        
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                  className={`
                    w-3 h-3 rounded-sm cursor-pointer transition-all duration-200
                    ${getActivityColor(day.activity)}
                    ${day.isToday ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''}
                    ${day.isFuture ? 'opacity-30' : 'hover:ring-1 hover:ring-gray-400 dark:hover:ring-white/50'}
                  `}
                  title={`${day.date.toDateString()}: ${getActivityLevel(day.activity)}`}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Day labels */}
        <div className="flex flex-col gap-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Fri</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Sun</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 dark:bg-green-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
        
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Last 12 weeks
        </div>
      </div>
    </div>
  );
}
