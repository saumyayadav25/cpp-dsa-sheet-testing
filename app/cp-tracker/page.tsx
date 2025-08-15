'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the new chart components

import RatingChart from '@/components/charts/RatingChart';
import TagsPieChart from '@/components/charts/TagsPieChart';
import DifficultyBarChart from '@/components/charts/DifficultyBarChart';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const platforms = [
  { key: 'leetcode', label: 'LeetCode', payloadKey: 'leetcodeUsername' },
  { key: 'codeforces', label: 'Codeforces', payloadKey: 'codeforcesHandle' },
  { key: 'hackerearth', label: 'HackerEarth', payloadKey: 'hackerearthUsername' },
];

type PlatformKey = typeof platforms[number]['key'];
type UsernameMap = { [key in PlatformKey]?: string };
type StatsMap = { [key in PlatformKey]?: any };

export default function CPTrackerPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [usernames, setUsernames] = useState<UsernameMap>({});
  const [stats, setStats] = useState<StatsMap>({});
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/check-auth', { credentials: 'include' });
        const data = await res.json();
        if (res.ok && data?.user?._id) {
          setUserId(data.user._id);
        } else {
          console.log('User not logged in');
        }
      } catch (err) {
        console.error('Auth fetch failed', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const localKey = `cp-stats-${userId}`;
    const localData = localStorage.getItem(localKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setStats(parsed.stats || {});
        setUsernames(parsed.usernames || {});
        return;
      } catch (err) {
        console.warn("Failed to parse local CP stats", err);
      }
    }
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/cp-tracker/${userId}`);
        const data = await res.json();
        if (res.ok && data?.stats) {
          const updatedUsernames: UsernameMap = {};
          if (data.leetcodeUsername) updatedUsernames.leetcode = data.leetcodeUsername;
          if (data.codeforcesHandle) updatedUsernames.codeforces = data.codeforcesHandle;
          if (data.hackerearthUsername) updatedUsernames.hackerearth = data.hackerearthUsername;
          setStats(data.stats || {});
          setUsernames(updatedUsernames);
          localStorage.setItem(localKey, JSON.stringify({
            stats: data.stats || {},
            usernames: updatedUsernames
          }));
        } else {
          console.warn("No saved CP stats found");
        }
      } catch (error) {
        console.error("Failed to fetch saved CP stats:", error);
      }
    };
    fetchStats();
  }, [userId]);

  const handleSelect = (platformKey: PlatformKey) => {
    setSelectedPlatform(prev => (prev === platformKey ? null : platformKey));
  };

  const handleChange = (platformKey: PlatformKey, value: string) => {
    setUsernames(prev => ({ ...prev, [platformKey]: value }));
  };

  const handleSubmit = async () => {
    const validHandles = platforms.filter(({ key }) => usernames[key]?.trim());
    if (validHandles.length === 0) {
      toast.error("Please enter a username before fetching.");
      return;
    }
    setLoading(true);
    try {
      const payload: Record<string, string> = { userId: userId! };
      validHandles.forEach(({ key, payloadKey }) => {
        payload[payloadKey] = usernames[key]!;
      });
      const res = await fetch(`/api/cp-tracker/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        const updatedStats: any = { ...stats };
        const updatedUsernames: any = { ...usernames };
        validHandles.forEach(({ key }) => {
          const platformStats = data.data[key];
          if (platformStats) {
            updatedStats[key] = platformStats;
          } else {
            toast.error(`Invalid ${key} username or failed to fetch data.`);
          }
        });
        setStats(updatedStats);
        localStorage.setItem(`cp-stats-${userId}`, JSON.stringify({
          stats: updatedStats,
          usernames: updatedUsernames,
        }));
      } else {
        toast.error(data.message || 'Failed to fetch stats. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  
  const combinedStats = useMemo(() => {
    const initial = { Easy: 0, Medium: 0, Hard: 0, Total: 0, ActiveDays: 0 };
    for (const stat of Object.values(stats)) {
      if (!stat) continue;
      initial.Easy += stat.Easy || 0;
      initial.Medium += stat.Medium || 0;
      initial.Hard += stat.Hard || 0;
      initial.Total += stat.Total || 0;
      initial.ActiveDays = Math.max(initial.ActiveDays || 0, stat.ActiveDays || 0);
    }
    return initial;
  }, [stats]);

  const codeforcesData = stats.codeforces; // Easier access to CF data

  return (
    <>
      <Navbar streak={streak} />
      <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="dark" />

        {/* Heading */}
        <motion.div
          className="text-4xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Competitive Programming Tracker
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            Your all-in-one CP dashboard to monitor growth, visualize achievements, and stay committed to daily problem-solving.
          </p>
        </motion.div>

        {/* Combined Stat Overview Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {/* Cards for Easy, Medium, Hard, ActiveDays */}
          <StatCard color="green" label="Solved Easy" value={combinedStats.Easy} />
          <StatCard color="yellow" label="Solved Medium" value={combinedStats.Medium} />
          <StatCard color="red" label="Solved Hard" value={combinedStats.Hard} />
          <StatCard color="blue" label="Total Active Days" value={combinedStats.ActiveDays} />
        </motion.div>

        {/* Platform Select & Input */}
        <div className="max-w-md mx-auto">
          <motion.div className="flex flex-wrap justify-center gap-4 mb-8">
            {platforms.map(({ key, label }) => (
              <motion.button key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`rounded-full px-6 py-3 text-sm font-semibold border transition-all duration-300 shadow-md hover:shadow-lg
                  ${selectedPlatform === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent ring-2 ring-offset-2 ring-blue-400 ring-offset-background'
                    : 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:border-blue-400'
                  }`}
                onClick={() => handleSelect(key)}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedPlatform && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 flex flex-col items-center"
              >
                <label className="block text-sm font-semibold mb-2 text-center">
                  {platforms.find(p => p.key === selectedPlatform)?.label} Username
                </label>
                <input type="text"
                  value={usernames[selectedPlatform] || ''}
                  onChange={(e) => handleChange(selectedPlatform, e.target.value)}
                  className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mb-16">
            <button onClick={handleSubmit} disabled={loading}
              className={`max-w-xs px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300
                ${loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white shadow-lg hover:shadow-xl`}
            >
              {loading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="4" d="M12 2v2m0 16v2m8.4-18.4l-1.4 1.4M5 19l-1.4 1.4m16.8 0l-1.4-1.4M5 5L3.6 3.6 M22 12h-2M4 12H2"/></svg>}
              {loading ? 'Fetching...' : 'Fetch Stats'}
            </button>
          </div>
        </div>
        
        {/* --- NEW: Codeforces Visualization Section --- */}
        <AnimatePresence>
          {codeforcesData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl text-center font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Codeforces Analysis for {usernames.codeforces}
              </h2>
              {/* New Stats Cards for Rating etc. */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard color="purple" label="Current Rating" value={codeforcesData.rating} />
                  <StatCard color="pink" label="Max Rating" value={codeforcesData.maxRating} />
                  <StatCard color="teal" label="Contests" value={codeforcesData.contestCount} />
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {codeforcesData.ratingHistory && <RatingChart data={codeforcesData.ratingHistory} />}
                  {codeforcesData.problemTags && <TagsPieChart data={codeforcesData.problemTags} />}
                  <DifficultyBarChart data={{ Easy: codeforcesData.Easy, Medium: codeforcesData.Medium, Hard: codeforcesData.Hard }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Platform-Specific Stat Cards */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {Object.entries(stats).map(([platform, stat]) => {
            if (!stat || !usernames[platform as PlatformKey]) return null;
            return (
              <motion.div
                key={platform}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg"
              >
                <h2 className="text-xl font-bold capitalize mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {platform} Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <PlatformStatCard label="Easy" value={stat.Easy || 0} color="green" />
                    <PlatformStatCard label="Medium" value={stat.Medium || 0} color="yellow" />
                    <PlatformStatCard label="Hard" value={stat.Hard || 0} color="red" />
                    <PlatformStatCard label="Active Days" value={stat.ActiveDays || 0} color="blue" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}


// --- HELPER COMPONENTS (can be in the same file or moved to their own file) ---
// --- HELPER COMPONENTS (at the bottom of your page.tsx file) ---

// Define a specific type for the colors
type CardColor = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'teal';

// Define the props for the StatCard component
interface StatCardProps {
  color: CardColor;
  label: string;
  value: number;
}

const StatCard = ({ color, label, value }: StatCardProps) => {
    // This object is now correctly typed
    const colorClasses: Record<CardColor, string> = {
      green: 'from-green-500/10 to-green-600/5 border-green-500/20 text-green-400',
      yellow: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20 text-yellow-400',
      red: 'from-red-500/10 to-red-600/5 border-red-500/20 text-red-400',
      blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
      purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
      pink: 'from-pink-500/10 to-pink-600/5 border-pink-500/20 text-pink-400',
      teal: 'from-teal-500/10 to-teal-600/5 border-teal-500/20 text-teal-400',
    };
    return (
      <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 min-h-[120px]`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 font-medium">{label}</span>
        </div>
        <div className={`text-4xl font-bold`}>{value || 0}</div>
      </div>
    )
};

// Define a smaller color type for this component
type PlatformCardColor = 'green' | 'yellow' | 'red' | 'blue';

// Define props for the PlatformStatCard component
interface PlatformStatCardProps {
  label: string;
  value: number;
  color: PlatformCardColor;
}

const PlatformStatCard = ({ label, value, color }: PlatformStatCardProps) => {
    const colorClasses: Record<PlatformCardColor, string> = {
        green: 'from-green-500/10 to-green-600/5 border-green-500/30 text-green-400',
        yellow: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 text-yellow-400',
        red: 'from-red-500/10 to-red-600/5 border-red-500/30 text-red-400',
        blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/30 text-blue-400',
    };
    return (
        <div className={`p-5 rounded-lg bg-gradient-to-br ${colorClasses[color]} border text-center`}>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold">{value || 0}</p>
        </div>
    );
};