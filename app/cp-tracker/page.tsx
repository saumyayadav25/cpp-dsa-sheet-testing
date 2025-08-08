'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCode, FaTrophy, FaBolt, FaChartLine } from 'react-icons/fa';

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
  //CAN ADD IN FUTURE 
  //{ key: 'gfg', label: 'GeeksForGeeks', payloadKey: 'gfgUsername' },
  //{ key: 'hackerrank', label: 'HackerRank', payloadKey: 'hackerrankUsername' },
  //{ key: 'codechef', label: 'CodeChef', payloadKey: 'codechefUsername' },
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

  // Fetch userId from check-auth
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

  // Fetch existing CP stats for this user
  useEffect(() => {
  if (!userId) return;

  const localKey = `cp-stats-${userId}`;
  const localData = localStorage.getItem(localKey);

  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      setStats(parsed.stats || {});
      setUsernames(parsed.usernames || {});
      return; // skip backend fetch if found locally
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
        //if (data.gfgUsername) updatedUsernames.gfg = data.gfgUsername;
        //if (data.hackerrankUsername) updatedUsernames.hackerrank = data.hackerrankUsername;
        //if (data.codechefUsername) updatedUsernames.codechef = data.codechefUsername;

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
    setSelectedPlatform(prev => {
      if (prev === platformKey) {
        setUsernames(prevUsernames => {
          const updated = { ...prevUsernames };
          delete updated[platformKey];
          return updated;
        });
        setStats(prevStats => {
          const updated = { ...prevStats };
          delete updated[platformKey];
          return updated;
        });
        return null;
      }
      return platformKey;
    });
  };

  const handleChange = (platformKey: PlatformKey, value: string) => {
    setUsernames(prev => ({ ...prev, [platformKey]: value }));
  };

  const handleSubmit = async () => {
  // Filter platforms with valid (non-empty) handles
  const validHandles = platforms.filter(({ key }) => usernames[key]?.trim());

  if (validHandles.length === 0) {
    toast.error("Please enter username before fetching.");
    return;
  }

  setLoading(true);
  try {
    const payload: Record<string, string> = { userId: userId! };

    // Build payload with only valid handles
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

        // Only update if platformStats is valid
        if (platformStats) {
          updatedStats[key] = platformStats;
        } else {
          toast.error(`Invalid ${key} username.`);
        }
      });

      setStats(updatedStats);

      localStorage.setItem(`cp-stats-${userId}`, JSON.stringify({
        stats: updatedStats,
        usernames: updatedUsernames,
      }));
    } else {
      toast.error('Failed to fetch stats. Please try again.');
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
      // initial.ActiveDays += stat.ActiveDays || 0;  
      initial.ActiveDays = Math.max(initial.ActiveDays || 0, stat.ActiveDays || 0);
    }
    return initial;
  }, [stats]);

  return (
    <>
      <Navbar streak={streak} />
      <div className="pt-5">
        <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
          <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="light" />

          {/* Heading */}
          <motion.div
            className="text-4xl font text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Competitive Programming Tracker
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your all-in-one CP dashboard to monitor growth, visualize achievements, and stay committed to daily problem-solving
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
          >
            {/* Easy */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 min-h-[160px]">
              <div className="flex items-center  justify-between mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 " />
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Solved Easy</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white ">{combinedStats.Easy || 0}</div>

            </div>

            {/* Medium */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Solved Medium</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{combinedStats.Medium || 0}</div>
            </div>

            {/* Hard */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Solved Hard</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{combinedStats.Hard || 0}</div>
            </div>

            {/* Active Days */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Active Days</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{combinedStats.ActiveDays || 0}</div>
            </div>
          </motion.div>


          {/* Platform Select Buttons */}
          <motion.div className="flex flex-wrap justify-center gap-4 mb-10">
            {platforms.map(({ key, label }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl px-6 py-3 text-sm font-semibold border transition-all duration-300 shadow-md hover:shadow-xl
        ${selectedPlatform === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                    : 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                  }`}
                onClick={() => handleSelect(key)}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Username Input Field */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-xs">
              <label className="block text-sm font-semibold mb-2 text-center">
                {selectedPlatform
                  ? `${platforms.find(p => p.key === selectedPlatform)?.label} Username`
                  : "Select a Platform"}
              </label>
              <input
                type="text"
                value={
                  selectedPlatform
                    ? usernames[selectedPlatform] || ''
                    : ''
                }
                onChange={(e) => {
                  if (selectedPlatform) {
                    handleChange(selectedPlatform, e.target.value);
                  }
                }}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-center"
                placeholder="Enter your username"
                disabled={!selectedPlatform}
              />
            </div>
          </div>


          {/* Fetch Stats Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={` max-w-xs px-5 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition
      ${loading
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }
      text-white mb-12`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    d="M12 4a8 8 0 018 8"
                  />
                </svg>
              )}
              {loading ? 'Fetching...' : 'Fetch Stats'}
            </button>
          </div>

          {/* Platform Stats Cards */}

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {Object.entries(stats).map(([platform, stat]) => {
              if (!stat) return null;

              return (
                <motion.div
                  key={platform}
                  className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold capitalize mb-4 text-blue-600 dark:text-blue-400">
                    {platform} Stats
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    {/* Easy */}
                    <div className="p-5 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 border border-green-500/20 dark:border-green-500/30 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stat.Easy || 0}
                      </p>
                    </div>

                    {/* Medium */}
                    <div className="p-5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/10 border border-yellow-500/20 dark:border-yellow-500/30 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {stat.Medium || 0}
                      </p>
                    </div>

                    {/* Hard */}
                    <div className="p-5 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 dark:from-red-500/20 dark:to-red-600/10 border border-red-500/20 dark:border-red-500/30 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {stat.Hard || 0}
                      </p>
                    </div>

                    {/* Active Days */}
                    <div className="p-5 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 border border-blue-500/20 dark:border-blue-500/30 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Days</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stat.ActiveDays || 0}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>


        </div>
      </div>
    </>
  )
}