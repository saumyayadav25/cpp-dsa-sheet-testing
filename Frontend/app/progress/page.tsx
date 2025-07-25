'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaCalendarCheck, FaFire, FaTrophy, FaBullseye, FaBolt, FaCode, FaClock } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { sampleTopics, type Question, type Topic } from '@/data/questions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgressChart from '@/components/ProgressChart';
import ProgressStats from '@/components/ProgressStats';
import TopicProgress from '@/components/TopicProgress';
import RecentActivity from '@/components/RecentActivity';
import StreakCalendar from '@/components/StreakCalendar';

export default function ProgressPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState<{
    [id: string]: { 
      isSolved: boolean; 
      isMarkedForRevision: boolean; 
      note?: string;
      solvedAt?: string;
    };
  }>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem('dsa-progress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }

    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);
  }, []);

  // Calculate progress statistics
  const calculateStats = () => {
    const allQuestions = sampleTopics.flatMap(topic => topic.questions);
    const totalQuestions = allQuestions.length;
    const solvedQuestions = allQuestions.filter(q => progress[q.id]?.isSolved).length;
    const markedForRevision = allQuestions.filter(q => progress[q.id]?.isMarkedForRevision).length;
    
    const difficultyStats = {
      easy: {
        total: allQuestions.filter(q => q.difficulty === 'easy').length,
        solved: allQuestions.filter(q => q.difficulty === 'easy' && progress[q.id]?.isSolved).length
      },
      medium: {
        total: allQuestions.filter(q => q.difficulty === 'medium').length,
        solved: allQuestions.filter(q => q.difficulty === 'medium' && progress[q.id]?.isSolved).length
      },
      hard: {
        total: allQuestions.filter(q => q.difficulty === 'hard').length,
        solved: allQuestions.filter(q => q.difficulty === 'hard' && progress[q.id]?.isSolved).length
      }
    };

    const topicStats = sampleTopics.map(topic => ({
      name: topic.name,
      total: topic.questions.length,
      solved: topic.questions.filter(q => progress[q.id]?.isSolved).length,
      percentage: Math.round((topic.questions.filter(q => progress[q.id]?.isSolved).length / topic.questions.length) * 100)
    }));

    // Calculate recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentActivity = allQuestions
      .filter(q => {
        const solvedAt = progress[q.id]?.solvedAt;
        return solvedAt && new Date(solvedAt) >= thirtyDaysAgo;
      })
      .sort((a, b) => {
        const dateA = new Date(progress[a.id]?.solvedAt || 0);
        const dateB = new Date(progress[b.id]?.solvedAt || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 10);

    return {
      totalQuestions,
      solvedQuestions,
      markedForRevision,
      percentage: Math.round((solvedQuestions / totalQuestions) * 100),
      difficultyStats,
      topicStats,
      recentActivity
    };
  };

  const stats = calculateStats();

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

  return (
    <>
      <Navbar streak={streak}/>
      <main className="min-h-screen bg-[#131313] text-white px-4 md:px-12 py-24">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Track Your Progress
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
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
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <FaTrophy className="text-2xl text-green-400" />
              <span className="text-sm text-green-300">Total Solved</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.solvedQuestions}</div>
            <div className="text-sm text-gray-400">out of {stats.totalQuestions} questions</div>
            <div className="mt-3 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <FaFire className="text-2xl text-orange-400" />
              <span className="text-sm text-orange-300">Current Streak</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{streak}</div>
            <div className="text-sm text-gray-400">days in a row</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <FaBullseye className="text-2xl text-purple-400" />
              <span className="text-sm text-purple-300">Completion Rate</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.percentage}%</div>
            <div className="text-sm text-gray-400">overall progress</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <FaBolt className="text-2xl text-yellow-400" />
              <span className="text-sm text-yellow-300">For Review</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.markedForRevision}</div>
            <div className="text-sm text-gray-400">questions marked</div>
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
            <ProgressStats stats={stats} />
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
            <RecentActivity recentActivity={stats.recentActivity} progress={progress} />
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeInUp}
        >
          <StreakCalendar progress={progress} />
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
