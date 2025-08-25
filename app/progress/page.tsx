'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from "react-icons/fa";
import { FaChartLine, FaCalendarCheck, FaFire, FaTrophy, FaBullseye, FaBolt, FaCode, FaClock } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import ProgressChart from '@/components/ProgressChart';
import ProgressStats from '@/components/ProgressStats';
import TopicProgress from '@/components/TopicProgress';
import RecentActivity from '@/components/RecentActivity';
import StreakCalendar from '@/components/StreakCalendar';
import axios from 'axios';

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}
export default function ProgressPage() {

  const [streak, setStreak] = useState(0);
  const [prostats, setprostats] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();


  // Check auth once
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 503) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } finally {
      setAuthChecked(true); // auth check done
     }

    };
    checkAuth();
  }, []);

  // If auth check completed and user is not logged in, show popup
  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      setShowPopup(true);
    }
  }, [authChecked, isLoggedIn]);

  // Fetch progress whenever user is set
  useEffect(() => {
    if (!user?._id) return;

// After fetching progress from API
const fetchProgress = async () => {
  try {
    const res = await axios.get(`/api/progress/${user._id}`);
    const data = res.data;
    const progress = data.progress;

    setprostats(progress);

    // Build topicStats with default total = 5
    const topicStats = (progress.topicsProgress || []).map((t: any) => ({
      name: t.topicName || "Unnamed Topic",
      solved: t.solvedCount ?? 0, // default 0
    }));

    interface DifficultyStat {
      total: number;
      solved: number;
    }

    interface TopicStat {
      name: string;
      solved: number;
    }

    interface Stats {
      totalQuestions: number;
      solvedQuestions: number;
      markedForRevision: number;
      percentage: number;
      difficultyStats: {
        easy: DifficultyStat;
        medium: DifficultyStat;
        hard: DifficultyStat;
      };
      topicStats: TopicStat[];
      recentActivity: any[];
    }

    setStats({
      totalQuestions: topicStats.length * 5,
      solvedQuestions: topicStats.reduce((sum: number, t: TopicStat) => sum + t.solved, 0),
      markedForRevision: progress.markedForRevision || 0,
      percentage: topicStats.length
        ? Math.round(topicStats.reduce((sum: number, t: TopicStat) => sum + t.solved, 0) / (topicStats.length * 5) * 100)
        : 0,
      difficultyStats: {
        easy: { total: progress.easyTotal || 0, solved: progress.easySolved || 0 },
        medium: { total: progress.mediumTotal || 0, solved: progress.mediumSolved || 0 },
        hard: { total: progress.hardTotal || 0, solved: progress.hardSolved || 0 }
      },
      topicStats,
      recentActivity: progress.recentActivity || []
    } as Stats);
     setprostats(progress);
     console.log("Fetched progress:", progress);
      setStreak(progress.streakCount || 0);
  } catch (error) {
    console.error('Error fetching progress:', error);
  }
};


    fetchProgress();
  }, [user?._id]);

  // Animation variant for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 }
    })
  };
  // While checking authentication
  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Checking authentication...
      </main>
    );
  }
  // If user is not logged in → show popup
  if (showPopup) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-md border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
        <FaLock className="text-blue-600 dark:text-blue-400 text-2xl" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Login Required
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Please sign in to view your progress and stats.
      </p>

      <button
        onClick={() => router.push(`/sign-in?redirect=/progress`)}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition-all duration-300"
      >
        Go to Login
      </button>

    </motion.div>
  </main>
    );
  }
  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading progress...
      </main>
    );
  }

  return (
    <>
      <Navbar />
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.difficultyStats.easy.solved + stats.difficultyStats.medium.solved + stats.difficultyStats.hard.solved}</div>
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {(((stats.difficultyStats.easy.solved + stats.difficultyStats.medium.solved + stats.difficultyStats.hard.solved) / 104) * 100).toFixed(2)}%
            </div>
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
          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeInUp}>
            <TopicProgress topicStats={stats.topicStats} />
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeInUp}>
            <RecentActivity />
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fadeInUp}>
          <StreakCalendar progress={prostats} />
        </motion.div>
      </main>
    </>
  );
}



