'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaCalendarCheck, FaFire, FaTrophy, FaBullseye, FaBolt, FaCode, FaClock } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import ProgressChart from '@/components/ProgressChart';
import ProgressStats from '@/components/ProgressStats';
import TopicProgress from '@/components/TopicProgress';
import RecentActivity from '@/components/RecentActivity';
import StreakCalendar from '@/components/StreakCalendar';
import axios from 'axios';
import { set } from 'mongoose';

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}
export default function ProgressPage() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [streak, setStreak] = useState(0);
  const [prostats, setprostats] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("/api/check-auth");
          if (res.status === 200) {
            setIsLoggedIn(true);
            setUser(res.data?.user);
          }
        } catch (err) {
          console.error("Auth check failed:", err);
        }
      };
      checkAuth();
    }, []);
  useEffect(() => {
    if (!user?._id) return;

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`/api/progress/${user._id}`);
        const data = res.data;

        // Transform API response to match existing `stats` structure
        const progress = data.progress;
        console.log(progress);
        setprostats(progress);

        setStats({
          totalQuestions: progress.topicsProgress.reduce((sum: number, t: any) => sum + t.total, 0),
          solvedQuestions: progress.topicsProgress.reduce((sum: number, t: any) => sum + t.solved, 0),
          markedForRevision: progress.markedForRevision || 0,
          percentage: Math.round(
            (progress.topicsProgress.reduce((sum: number, t: any) => sum + t.solved, 0) /
              progress.topicsProgress.reduce((sum: number, t: any) => sum + t.total, 0)) * 100
          ),
          difficultyStats: {
            easy: { total: progress.easyTotal || 0, solved: progress.easySolved || 0 },
            medium: { total: progress.mediumTotal || 0, solved: progress.mediumSolved || 0 },
            hard: { total: progress.hardTotal || 0, solved: progress.hardSolved || 0 }
          },
          topicStats: progress.topicsProgress.map((t: any) => ({
            name: t.name,
            total: t.total,
            solved: t.solved,
            percentage: Math.round((t.solved / t.total) * 100)
          })),
          recentActivity: progress.recentActivity || []
        });
        // console.log(prostats)

        setStreak(progress.streakCount || 0);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user?._id]);
 console.log(prostats)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading progress...
      </main>
    );
  }

  return (
    <>
      <Navbar streak={streak} />
      <main className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Track Your Progress
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Monitor your DSA journey with detailed analytics, track your solving patterns, 
            and celebrate your achievements along the way.
          </p>
        </motion.div>

        {/* Progress Overview Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Solved Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <FaTrophy className="text-2xl text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-700 dark:text-green-300">Total Solved</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.difficultyStats.easy.solved+stats.difficultyStats.medium.solved+stats.difficultyStats.hard.solved}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">out of 104 questions</div>
            <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Current Streak Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <FaFire className="text-2xl text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-orange-700 dark:text-orange-300">Current Streak</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{streak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">days in a row</div>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <FaBullseye className="text-2xl text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">Completion Rate</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{((stats.difficultyStats.easy.solved+stats.difficultyStats.medium.solved+stats.difficultyStats.hard.solved)/104)*100}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">overall progress</div>
          </div>

          {/* For Review Card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <FaBolt className="text-2xl text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-yellow-700 dark:text-yellow-300">For Review</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.markedForRevision}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">questions marked</div>
          </div>
        </motion.div>

        {/* Progress Chart and Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
          >
            <ProgressChart difficultyStats={stats.difficultyStats} />
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
          >
            <ProgressStats stats={prostats} />
          </motion.div>
        </div>
          {/* Topic Progress and Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeInUp}
          >
            <TopicProgress topicStats={stats.topicStats} />
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeInUp}
          >
            <RecentActivity recentActivity={stats.recentActivity} progress={stats} />
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeInUp}
        >
          <StreakCalendar progress={stats} />
        </motion.div>
      </main>
    </>
  );
}



      