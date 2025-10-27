'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import both utility functions
import { fetchCodeforcesStats } from '../../utils/codeforces';
import { fetchLeetCodeStats } from '../../utils/leetcode';
import { fetchHackerEarthStats } from '../../utils/hackerearth';

// Import all chart and dashboard components
import LeetCodeDashboard from '../../components/LeetCodeDashboard';
import RatingChart from '../../components/charts/RatingChart';
import DifficultyBarChart from '../../components/charts/DifficultyBarChart';
import TopicRadarChart from '../../components/charts/TopicRadarChart';
import RatingProgression from '../../components/charts/RatingProgression';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

export default function CPTrackerPageClient() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [usernames, setUsernames] = useState<UsernameMap>({});
  const [stats, setStats] = useState<StatsMap>({});
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => { setUserId("local-user"); };
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
      } catch (err) {
        console.warn("Failed to parse local CP stats", err);
      }
    }
  }, [userId]);
  
  const handleSelect = (platformKey: PlatformKey) => {
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

    setLoading(true);
    // Clear the non-selected platform's data for a clean switch
    const newStats = { ...stats };
    if (selectedPlatform === 'codeforces') delete newStats.leetcode;
    if (selectedPlatform === 'leetcode') delete newStats.codeforces;
    setStats(newStats);

    try {
        let newData = null as any;
        if (selectedPlatform === 'codeforces') {
            newData = await fetchCodeforcesStats(handle);
        } else if (selectedPlatform === 'leetcode') {
            newData = await fetchLeetCodeStats(handle);
        } else if (selectedPlatform === 'hackerearth') {
            newData = await fetchHackerEarthStats(handle);
        } else {
            toast.info(`Fetching for ${selectedPlatform} requires a backend.`);
            setLoading(false);
            return;
        }

        if (newData) {
            // Use a functional update to prevent race conditions with the clear operation
            const updatedStats = { ...stats, [selectedPlatform]: newData };
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
  };
  
  // Corrected this hook to use the right data structure.
  const combinedStats = useMemo(() => {
    const initial = { Easy: 0, Medium: 0, Hard: 0, TotalSubmissions: 0 , ActiveDays: 0};
    for (const [platform, stat] of Object.entries(stats)) {
      if (!stat) continue;
      if (platform === 'codeforces') {
        initial.Easy += stat.Easy || 0;
        initial.Medium += stat.Medium || 0;
        initial.Hard += stat.Hard || 0;
      initial.TotalSubmissions += (stat.Easy || 0) + (stat.Medium || 0) + (stat.Hard || 0);
      } else if (platform === 'leetcode' && stat.submissionCounts) {
        const easy = stat.submissionCounts.easy?.solved || 0;
      const medium = stat.submissionCounts.medium?.solved || 0;
      const hard = stat.submissionCounts.hard?.solved || 0;
        initial.Easy += stat.submissionCounts.easy?.solved || 0;
        initial.Medium += stat.submissionCounts.medium?.solved || 0;
        initial.Hard += stat.submissionCounts.hard?.solved || 0;
        initial.TotalSubmissions += easy + medium + hard;

      }
    }
    return initial;
  }, [stats]);


  const codeforcesData = stats.codeforces;
  const leetcodeData = stats.leetcode;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-white px-4 md:px-12 py-24 transition-colors duration-300">

        <div className="w-full">  {/* remove mx-auto or text-center */}
  <nav className="flex justify-start m-2" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li className="inline-flex items-center">
        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
          </svg>
        Home
      </a>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Coding Tools</a>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">CP Tracker</span>
      </div>
    </li>
  </ol>
</nav>
</div>


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
            <StatCard color="blue" label="Total Submissions" value={combinedStats.TotalSubmissions} />
        </motion.div>

        <div className="max-w-md mx-auto">
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
          {/* Show a helper input when no platform is selected so users know how to proceed */}
          {!selectedPlatform && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6 flex flex-col items-center">
              <label className="block text-sm font-semibold mb-2 text-center text-gray-700 dark:text-gray-300">
                Please select a platform to enter your username
              </label>
              <input type="text" disabled
                className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-200 bg-gray-300 text-black placeholder-gray-700 text-center disabled:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900/40 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-700"
                placeholder={`Select a platform above to enter your username`} />
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2 text-center max-w-xs">
                Tip: click any platform button to reveal the username input. After selecting, type your handle and press Enter or click "Fetch Stats".
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {selectedPlatform && (
              <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -20, height: 0 }} transition={{ duration: 0.3 }} className="mb-8 flex flex-col items-center">
                <label className="block text-sm font-semibold mb-2 text-center capitalize bg-gray text-gray-700 dark:text-gray-300">
                  {selectedPlatform} Username
                </label>
                <input type="text"
                  value={usernames[selectedPlatform] || ''}
                  onChange={(e) => handleChange(selectedPlatform, e.target.value)}
                  className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-400 bg-gray-100 text-black placeholder-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
                  placeholder={`Enter your ${selectedPlatform} handle`}
                  onKeyDown={(e) => (e as any).key === 'Enter' && handleSubmit()}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center mb-16">
            <button onClick={handleSubmit} disabled={loading} className={`max-w-xs px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white shadow-lg hover:shadow-xl`}>
              {loading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="4" d="M12 2v2m0 16v2m8.4-18.4l-1.4 1.4M5 19l-1.4 1.4m16.8 0l-1.4-1.4M5 5L3.6 3.6 M22 12h-2M4 12H2"/></svg>}
              {loading ? 'Fetching... (might take a minute)' : 'Fetch Stats'}
            </button>
          </div>
        </div>

        {/* --- EXCLUSIVE CODEFORCES DASHBOARD --- */}
        <AnimatePresence>
          {codeforcesData && selectedPlatform === 'codeforces' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl text-center font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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

        {/* --- EXCLUSIVE LEETCODE DASHBOARD --- */}
        <AnimatePresence>
            {leetcodeData && selectedPlatform === 'leetcode' && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <LeetCodeDashboard data={leetcodeData} username={usernames.leetcode || ''} />
                </motion.div>
            )}
        </AnimatePresence>

        {/* --- EXCLUSIVE HACKEREARTH DASHBOARD --- */}
        <AnimatePresence>
          {stats.hackerearth && selectedPlatform === 'hackerearth' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl text-center font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HackerEarth Stats for {usernames.hackerearth}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                  color="blue"
                  label="Points"
                  value={Number(stats.hackerearth?.Points ?? 0)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M6 3h12l4 6-10 13L2 9Z"></path>
                      <path d="M11 3 8 9l4 13 4-13-3-6"></path>
                      <path d="M2 9h20"></path>
                    </svg>
                  }
                />
                <StatCard
                  color="purple"
                  label="Contest Rating"
                  value={Number(stats.hackerearth?.ContestRating ?? 0)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                  }
                />
                <StatCard
                  color="green"
                  label="Problems Solved"
                  value={Number(stats.hackerearth?.ProblemsSolved ?? 0)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                  }
                />
                <StatCard
                  color="yellow"
                  label="Solutions Submitted"
                  value={Number(stats.hackerearth?.Submissions ?? 0)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="m14.5 4-5 16"></path>
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Algorithms Ranking */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-200">Algorithms Ranking</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between"><span>Rank</span><span>{stats.hackerearth?.rankings?.algorithms?.rank ?? '—'}</span></div>
                    <div className="flex justify-between"><span>Points</span><span>{stats.hackerearth?.rankings?.algorithms?.points ?? '—'}</span></div>
                    <div className="flex justify-between"><span>Performance</span><span>{stats.hackerearth?.rankings?.algorithms?.performance ?? '—'}</span></div>
                  </div>
                </div>

                {/* Data Structures Ranking */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-200">Data Structures Ranking</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between"><span>Rank</span><span>{stats.hackerearth?.rankings?.dataStructures?.rank ?? '—'}</span></div>
                    <div className="flex justify-between"><span>Points</span><span>{stats.hackerearth?.rankings?.dataStructures?.points ?? '—'}</span></div>
                    <div className="flex justify-between"><span>Performance</span><span>{stats.hackerearth?.rankings?.dataStructures?.performance ?? '—'}</span></div>
                  </div>
                </div>
              </div>

              {/* Rewards Section */}
              {stats.hackerearth?.rewards && stats.hackerearth.rewards.length > 0 && (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-md mb-8">
                  <h3 className="text-xl font-semibold mb-6 text-gray-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-yellow-400">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    Rewards Progress
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {stats.hackerearth.rewards.map((reward: { category: string; level: string }, index: number) => {
                      const [completed, total] = reward.level.split('/').map(Number);
                      const remaining = total - completed;
                      const percentage = ((completed / total) * 100).toFixed(0);

                      const chartData = [
                        { name: 'Completed', value: completed },
                        { name: 'Remaining', value: remaining },
                      ];

                      // Define colors based on category
                      const categoryColors: Record<string, [string, string]> = {
                        'Global': ['#10b981', '#374151'],           // Green for Global
                        'Algorithms': ['#06b6d4', '#374151'],       // Cyan for Algorithms
                        'CPP': ['#a855f7', '#374151'],              // Purple for CPP (blend of hot pink and blue)
                        'Data Structures': ['#ec4899', '#374151'], // Hot pink for Data Structures
                      };

                      const COLORS = categoryColors[reward.category] || ['#10b981', '#374151']; // Default to green
                      const completedColor = COLORS[0];

                      return (
                        <div key={index} className="bg-zinc-800/40 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
                          <div className="text-center mb-2">
                            <div className="text-sm font-semibold text-gray-300">{reward.category}</div>
                            <div className="text-xs text-gray-500 mt-1">Level {reward.level}</div>
                          </div>
                          <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={55}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {chartData.map((entry, i) => (
                                  <Cell key={`cell-${i}`} fill={COLORS[i]} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="text-center mt-2">
                            <div className="text-2xl font-bold" style={{ color: completedColor }}>{percentage}%</div>
                            <div className="text-xs text-gray-500">completed</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Challenges Table */}
              {stats.hackerearth?.challenges && stats.hackerearth.challenges.length > 0 && (
                <ChallengesTable challenges={stats.hackerearth.challenges} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// --- HELPER COMPONENTS ---
type CardColor = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'teal';
interface StatCardProps { color: CardColor; label: string; value: number; icon?: React.ReactNode; }
const StatCard = ({ color, label, value, icon }: StatCardProps) => {
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
          {icon && <div className="opacity-70">{icon}</div>}
        </div>
        <div className={`text-4xl font-bold`}>{value}</div>
      </div>
    )
};

const ChartPlaceholder = ({ message }: { message: string }) => (
  <div className="bg-zinc-900/70 border border-dashed border-zinc-700 p-6 rounded-xl shadow-md backdrop-blur-lg flex items-center justify-center min-h-[352px]">
    <p className="text-gray-400 text-center">{message}</p>
  </div>
);

interface ChallengesTableProps {
  challenges: Array<{
    name: string;
    rank: number | null;
    score: number | null;
    ratingChange: string | null;
  }>;
}

const ChallengesTable = ({ challenges }: ChallengesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(challenges.length / itemsPerPage);

  // Reset to page 1 when challenges change
  useEffect(() => {
    setCurrentPage(1);
  }, [challenges]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChallenges = challenges.slice(startIndex, endIndex);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-200">Challenges</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="pb-3 text-gray-400 font-semibold">Contest Name</th>
              <th className="pb-3 text-gray-400 font-semibold text-center">Rank</th>
              <th className="pb-3 text-gray-400 font-semibold text-center">Score</th>
              <th className="pb-3 text-gray-400 font-semibold text-center">Rating Change</th>
            </tr>
          </thead>
          <tbody>
            {currentChallenges.map((challenge, index) => (
              <tr key={`${challenge.name}-${startIndex + index}`} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                <td className="py-3 text-gray-300">{challenge.name}</td>
                <td className="py-3 text-purple-400 font-semibold text-center">{challenge.rank ?? '—'}</td>
                <td className="py-3 text-blue-400 font-semibold text-center">{challenge.score ?? '—'}</td>
                <td className="py-3 text-center">
                  <span className={`font-medium inline-flex items-center gap-1 ${
                    challenge.ratingChange && challenge.ratingChange.startsWith('+')
                      ? 'text-green-400'
                      : challenge.ratingChange && challenge.ratingChange.startsWith('-')
                      ? 'text-red-400'
                      : 'text-gray-300'
                  }`}>
                    {challenge.ratingChange && challenge.ratingChange.startsWith('+') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                    )}
                    {challenge.ratingChange ?? '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages} ({challenges.length} challenges)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
