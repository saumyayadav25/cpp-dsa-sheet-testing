import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaMedal } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
type Badge = {
  name: string;
  claimedAt: string;
};

export default function RecentActivity() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ _id: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userid, setuserid] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetchBadges = async () => {
      try {
        // 1️⃣ Check auth
        const authRes = await axios.get("/api/check-auth");
        if (authRes.status === 200 && authRes.data?.user?._id) {
          setIsLoggedIn(true);
          const userId = authRes.data.user._id;
          setUser({ _id: userId });
          setuserid(userId);

          // 2️⃣ Fetch badges using user ID
          const badgesRes = await axios.get(`/api/badges/${userId}`);
          if (badgesRes.status === 200 && badgesRes.data?.badges) {
            setBadges(badgesRes.data.badges);
          }
          console.log("Fetched badges:", badgesRes.data.badges);
        }
      } catch (err) {
        console.error("Auth or badge fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchBadges();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading recent activity...</div>;
  }

  if (!isLoggedIn) {
    return <div className="text-center py-8 text-gray-500">Please login to see recent activity.</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
      <FaClock className="text-xl text-orange-600 dark:text-orange-400" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      </div>

      {badges.length === 0 ? (
      <div className="text-center py-8">
        <FaMedal className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <div className="text-gray-600 dark:text-gray-400 mb-2">No recent achievements</div>
        <div className="text-sm text-gray-500 dark:text-gray-500">
        Earn badges by completing topics and challenges!
        </div>
      </div>
      ) : (
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {badges.map((badge, index) => (
        <motion.div
          key={`${badge.name}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-colors"
        >
          <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-600 dark:text-green-400 text-lg" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {badge.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(badge.claimedAt)}
            </span>
            </div>
          </div>
          </div>
        </motion.div>
        ))}
      </div>
      )}

      {/* Link to profile page */}
      <div className="mt-6 text-center">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
        onClick={() => router.push(`/profile/${userid}`)}
      >
        View badges on profile page
      </button>
      </div>
    </div>
  );
}
