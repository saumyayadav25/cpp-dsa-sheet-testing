'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// The utility function for client-side fetching remains the same
import { fetchCodeforcesStats } from '../../utils/codeforces';

// Import all chart components
import RatingChart from '../../components/charts/RatingChart';
import DifficultyBarChart from '../../components/charts/DifficultyBarChart';
import TopicRadarChart from '../../components/charts/TopicRadarChart';
import RatingProgression from '../../components/charts/RatingProgression';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const platforms = [
  { key: 'codeforces', label: 'Codeforces', payloadKey: 'codeforcesHandle' },
  { key: 'leetcode', label: 'LeetCode', payloadKey: 'leetcodeUsername' },
  { key: 'hackerearth', label: 'HackerEarth', payloadKey: 'hackerearthUsername' },
];

type PlatformKey = typeof platforms[number]['key'];
type UsernameMap = { [key in PlatformKey]?: string };
type StatsMap = { [key in PlatformKey]?: any };

export default function CPTrackerPage() {
  // Restore state to allow no initial selection
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [usernames, setUsernames] = useState<UsernameMap>({});
  const [stats, setStats] = useState<StatsMap>({});
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  // This hook can be used for your own user session logic
  useEffect(() => {
    const fetchUser = async () => { setUserId("local-user"); };
    fetchUser();
  }, []);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    if (!userId) return;
    const localKey = `cp-stats-${userId}`;
    const localData = localStorage.getItem(localKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setStats(parsed.stats || {});
        setUsernames(parsed.usernames || {});
      } catch (err) {
        console.warn("Failed to parse local CP stats", err);
      }
    }
  }, [userId]);
  
  const handleSelect = (platformKey: PlatformKey) => {
    // Allows toggling selection on and off
    setSelectedPlatform(prev => (prev === platformKey ? null : platformKey));
  };

  const handleChange = (platformKey: PlatformKey, value: string) => {
    setUsernames(prev => ({ ...prev, [platformKey]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedPlatform) {
      toast.error("Please select a platform first.");
      return;
    }
    
    const handle = usernames[selectedPlatform]?.trim();
    if (!handle) {
      toast.error(`Please enter a ${selectedPlatform} username.`);
      return;
    }

    // Handle fetching for the selected platform
    setLoading(true);
    if (selectedPlatform === 'codeforces') {
      try {
        const cfData = await fetchCodeforcesStats(handle);
        if (cfData) {
          const updatedStats = { ...stats, codeforces: cfData };
          setStats(updatedStats);
          toast.success(`Successfully fetched stats for ${handle}!`);
          if (userId) {
            localStorage.setItem(`cp-stats-${userId}`, JSON.stringify({
              stats: updatedStats,
              usernames: { ...usernames },
            }));
          }
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    } else {
      // Handle other platforms that require a backend
      toast.info(`Fetching for ${selectedPlatform} requires a backend and is not supported in this client-only version.`);
      setLoading(false);
    }
  };
  
  // The combined stats for the top cards will work automatically
  const combinedStats = useMemo(() => {
    const initial = { Easy: 0, Medium: 0, Hard: 0, ActiveDays: 0 };
    for (const stat of Object.values(stats)) {
      if (!stat) continue;
      initial.Easy += stat.Easy || 0;
      initial.Medium += stat.Medium || 0;
      initial.Hard += stat.Hard || 0;
      initial.ActiveDays = Math.max(initial.ActiveDays || 0, stat.ActiveDays || 0);
    }
    return initial;
  }, [stats]);


  const codeforcesData = stats.codeforces;

  return (
    <>
      <Navbar streak={streak} />
      <div className="min-h-screen bg-background text-white px-4 md:px-12 py-24 transition-colors duration-300">
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="dark" />
        
        <motion.div className="text-4xl text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Competitive Programming Tracker
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mt-4">
                Your all-in-one CP dashboard to monitor growth and visualize achievements.
            </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={fadeInUp} initial="hidden" animate="visible">
            <StatCard color="green" label="Solved Easy" value={combinedStats.Easy} />
            <StatCard color="yellow" label="Solved Medium" value={combinedStats.Medium} />
            <StatCard color="red" label="Solved Hard" value={combinedStats.Hard} />
            <StatCard color="blue" label="Total Active Days" value={combinedStats.ActiveDays} />
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* --- PLATFORM SELECTOR RESTORED --- */}
          <motion.div className="flex flex-wrap justify-center gap-4 mb-8">
            {platforms.map(({ key, label }) => (
              <motion.button key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`rounded-full px-6 py-3 text-sm font-semibold border transition-all duration-300 shadow-md hover:shadow-lg
                  ${selectedPlatform === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent ring-2 ring-offset-2 ring-blue-400 ring-offset-background'
                    : 'bg-zinc-900 text-white border-gray-700 hover:border-blue-400'
                  }`}
                onClick={() => handleSelect(key)}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* --- CONDITIONAL INPUT FIELD RESTORED --- */}
          <AnimatePresence>
            {selectedPlatform && (
              <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -20, height: 0 }} transition={{ duration: 0.3 }} className="mb-8 flex flex-col items-center">
                <label className="block text-sm font-semibold mb-2 text-center capitalize">
                  {selectedPlatform} Username
                </label>
                <input type="text"
                  value={usernames[selectedPlatform] || ''}
                  onChange={(e) => handleChange(selectedPlatform, e.target.value)}
                  className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-700 bg-zinc-800 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your ${selectedPlatform} handle`}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center mb-16">
            <button onClick={handleSubmit} disabled={loading} className={`max-w-xs px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white shadow-lg hover:shadow-xl`}>
              {loading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="4" d="M12 2v2m0 16v2m8.4-18.4l-1.4 1.4M5 19l-1.4 1.4m16.8 0l-1.4-1.4M5 5L3.6 3.6 M22 12h-2M4 12H2"/></svg>}
              {loading ? 'Fetching...' : 'Fetch Stats'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {codeforcesData && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl text-center font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Codeforces Analysis for {usernames.codeforces}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {codeforcesData.rating !== undefined && <StatCard color="purple" label="Current Rating" value={codeforcesData.rating} />}
                {codeforcesData.maxRating !== undefined && <StatCard color="pink" label="Max Rating" value={codeforcesData.maxRating} />}
                {codeforcesData.contestCount !== undefined && <StatCard color="teal" label="Contests" value={codeforcesData.contestCount} />}
              </div>
              {codeforcesData.rating !== undefined && (
                <div className="mb-8">
                  <RatingProgression currentRating={codeforcesData.rating} />
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {codeforcesData.ratingHistory && codeforcesData.ratingHistory.length > 0 ? (
                  <RatingChart data={codeforcesData.ratingHistory} />
                ) : (
                  <ChartPlaceholder message="No contest history found." />
                )}
                {codeforcesData.problemTags && Object.keys(codeforcesData.problemTags).length > 0 ? (
                  <TopicRadarChart data={codeforcesData.problemTags} />
                ) : (
                  <ChartPlaceholder message="No solved problems with tags found." />
                )}
                <DifficultyBarChart data={{ Easy: codeforcesData.Easy, Medium: codeforcesData.Medium, Hard: codeforcesData.Hard }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// --- HELPER COMPONENTS ---

type CardColor = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'teal';
interface StatCardProps { color: CardColor; label: string; value: number; }
const StatCard = ({ color, label, value }: StatCardProps) => {
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
        <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-400 font-medium">{label}</span></div>
        <div className={`text-4xl font-bold`}>{value}</div>
      </div>
    )
};

const ChartPlaceholder = ({ message }: { message: string }) => (
  <div className="bg-white/5 dark:bg-zinc-900/70 border border-dashed border-gray-200/10 dark:border-zinc-700 p-6 rounded-xl shadow-md backdrop-blur-lg flex items-center justify-center min-h-[352px]">
    <p className="text-gray-400 text-center">{message}</p>
  </div>
);