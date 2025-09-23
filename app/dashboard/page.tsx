'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from "react-icons/fa";
import Navbar from '../../components/Navbar';
import TopicTable from '../../components/TopicTable';
import TopicCharts from '../../components/TopicCharts';
import axios from 'axios';

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
  percentage: number;
  category: 'Strong' | 'Moderate' | 'Weak';
}

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [loading, setLoading] = useState(true);
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
        setAuthChecked(true);
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

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`/api/progress/${user._id}`);
        const data = res.data;
        const progress = data.progress;

        // Calculate topic progress with percentages
        const topicsWithPercentages = (progress.topicsProgress || []).map((t: any) => ({
          topicName: t.topicName || "Unnamed Topic",
          solvedCount: t.solvedCount ?? 0,
          totalQuestions: t.totalQuestions ?? 5, // Default to 5 if not provided
          percentage: t.totalQuestions > 0 ? Math.round((t.solvedCount / t.totalQuestions) * 100) : 0,
          category: 'Moderate' as 'Strong' | 'Moderate' | 'Weak' // Will be updated by clustering
        }));

        // Apply clustering to categorize topics
        const categorizedTopics = applyClustering(topicsWithPercentages);
        setTopicProgress(categorizedTopics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user?._id]);

  // Simple clustering function to categorize topics based on percentiles
  const applyClustering = (topics: TopicProgress[]): TopicProgress[] => {
    if (topics.length === 0) return topics;

    // Sort by percentage descending
    const sortedTopics = [...topics].sort((a, b) => b.percentage - a.percentage);

    // Calculate percentiles for more intelligent categorization
    const strongThreshold = Math.max(80, sortedTopics[Math.floor(sortedTopics.length * 0.33)]?.percentage || 80);
    const moderateThreshold = Math.max(60, sortedTopics[Math.floor(sortedTopics.length * 0.67)]?.percentage || 60);

    return sortedTopics.map((topic) => {
      let category: 'Strong' | 'Moderate' | 'Weak';
      if (topic.percentage >= strongThreshold) {
        category = 'Strong';
      } else if (topic.percentage >= moderateThreshold) {
        category = 'Moderate';
      } else {
        category = 'Weak';
      }
      return { ...topic, category };
    });
  };

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
            Please sign in to view your dashboard.
          </p>

          <button
            onClick={() => router.push(`/sign-in?redirect=/dashboard`)}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition-all duration-300"
          >
            Go to Login
          </button>
        </motion.div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading dashboard...
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
            Progress Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get insights into your DSA progress with topic-wise analysis and performance categorization.
          </p>
        </motion.div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Topic Table */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
          >
            <TopicTable topicProgress={topicProgress} />
          </motion.div>

          {/* Charts */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
          >
            <TopicCharts topicProgress={topicProgress} />
          </motion.div>
        </div>
      </main>
    </>
  );
}