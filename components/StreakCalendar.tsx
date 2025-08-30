'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFire } from 'react-icons/fa';
import { useState } from 'react';

type Progress = {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  streakCount: number;
  lastVisited: string;
  topicsCompleted: string[];
  topicsProgress: any[];
};

type StreakCalendarProps = {
  progress: Progress;
};

export default function StreakCalendar({ progress }: StreakCalendarProps) {
  const [today] = useState(new Date());

  // Activity map: only lastVisited matters
  const activityData: { [date: string]: boolean } = {};
  const lastVisitedDate = new Date(progress.lastVisited).toDateString();
  activityData[lastVisitedDate] = true;

  // Generate last 12 weeks calendar
  const generateCalendarData = () => {
    const weeks: { date: Date; isActive: boolean; isToday: boolean; isFuture: boolean }[][] = [];
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (12 * 7 - 1));

    for (let week = 0; week < 12; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + week * 7 + day);
        const dateStr = currentDay.toDateString();

        weekDays.push({
          date: currentDay,
          isActive: !!activityData[dateStr],
          isToday: currentDay.toDateString() === today.toDateString(),
          isFuture: currentDay > today,
        });
      }
      weeks.push(weekDays);
    }

    return weeks;
  };

  const weeks = generateCalendarData();

  const getActivityColor = (isActive: boolean) => {
    return isActive ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-200 dark:bg-gray-700';
  };

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
              <span className="text-lg font-bold text-gray-900 dark:text-white">{progress.streakCount}</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Day streak</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{progress.totalSolved}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total solved</div>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="mb-4">
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
                    ${getActivityColor(day.isActive)}
                    ${day.isToday ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''}
                    ${day.isFuture ? 'opacity-30' : 'hover:ring-1 hover:ring-gray-400 dark:hover:ring-white/50'}
                  `}
                  title={day.isActive ? 'Visited today' : 'No activity'}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span>Not Solved</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
          </div>
          <span>Solved</span>
        </div>
        
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Last 12 weeks
        </div>
      </div>
    </div>
  );
}
