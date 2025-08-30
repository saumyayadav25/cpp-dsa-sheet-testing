"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react"; // new Next.js params handling
import Navbar from "@/components/Navbar";
import { Button } from "./Button";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
export default function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params); // unwrap params
  const [progress, setProgress] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch progress (contains progress object + badges)
        const progressRes = await axios.get(`/api/progress/${userId}`);
        setProgress(progressRes.data.progress || null);
        // setBadges(progressRes.data.badges || []);
        console.log("Profile data fetched successfully", progressRes.data.progress);
        setStreak(progressRes.data.progress.streakCount || 0);

        // Optionally fetch badges separately if needed
        const badgesRes = await axios.get(`/api/badges/${userId}`);
        setBadges(badgesRes.data.badges || []);

      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, [userId]);

  // Badge configurations with icons and colors
  const badgeConfig = {
    "Hard_Hitter": {
      icon: "🏆",
      color: "from-red-500 to-pink-600",
      description: "Conquered hard problems"
    },
    "Arrays": {
      icon: "📊",
      color: "from-blue-500 to-cyan-600",
      description: "Arrays master"
    },
    "Basics of Programming": {
      icon: "💻",
      color: "from-purple-500 to-indigo-600",
      description: "Programming fundamentals"
    },
    "Patterns": {
      icon: "🔄",
      color: "from-green-500 to-teal-600",
      description: "Pattern recognition expert"
    },
    "Searching and Sorting": {
      icon: "🔍",
      color: "from-orange-500 to-red-600",
      description: "Search & sort algorithms"
    },
    "Cpp STL": {
      icon: "⚡",
      color: "from-yellow-500 to-orange-600",
      description: "C++ STL proficiency"
    },
    "Char Arrays and Strings": {
      icon: "🔤",
      color: "from-pink-500 to-rose-600",
      description: "String manipulation expert"
    },
    "Arrays, Time and Space Complexity": {
      icon: "⏱️",
      color: "from-cyan-500 to-blue-600",
      description: "Complexity analysis master"
    }
  } as const;

  type BadgeKey = keyof typeof badgeConfig;

  // Time ago formatter
  const getTimeAgo = (dateInput: string | Date) => {
    const now = new Date();
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  };


  const getStatIcon = (label: string) => {
    switch (label) {
      case "Day Streak": return "🔥";
      case "Total Solved": return "✅";
      case "Hard Solved": return "💎";
      default: return "📈";
    }
  };

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 text-white flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h1 className="text-xl font-bold text-center">Loading profile...</h1>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Day Streak", value: progress.streakCount, suffix: "days" },
    { label: "Total Solved", value: progress.totalSolved, suffix: "problems" },
    { label: "Hard Solved", value: progress.hardSolved, suffix: "challenges" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-6 py-28">
      <Navbar/>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {userId?.slice(0, 2)?.toUpperCase() || "??"}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Profile Dashboard
                </h1>
                <p className="text-gray-300">User ID: {userId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Last visited: {progress.lastVisited ? new Date(progress.lastVisited).toLocaleString() : "Never"}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getStatIcon(stat.label)}</span>
                  <h3 className="text-lg font-semibold text-gray-200">{stat.label}</h3>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-400">{stat.suffix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🏅</span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Achievement Badges
            </h2>
            <div className="ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {badges.length} Earned
            </div>
          </div>

          {badges.length > 0 ? (
            <div className="space-y-4">
              {badges.map((badgeData) => {
                const badgeName = typeof badgeData === "string"
                  ? badgeData
                  : badgeData.name || badgeData.badge;

                const config =
                  badgeName in badgeConfig
                    ? badgeConfig[badgeName as BadgeKey]
                    : {
                      icon: "🎖️",
                      color: "from-gray-500 to-gray-600",
                      description: "Achievement unlocked",
                    };

                // Dynamic share content
                const badgeUrl = `https://dsa-mate.com/badges/${encodeURIComponent(
                  badgeName
                )}`;
                const linkedInShareText = `I just earned the "${badgeName}" badge on DSA-Mate 🏅! 🚀 Join me and level up your DSA skills at https://dsa-mate.com #GSSoC25 #DSAMate #Coding #DSA`;
                const twitterShareText = linkedInShareText; // same content for now

                return (
                  <div
                    key={badgeName} // ✅ Use badgeName instead of index
                    className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                      {/* Background Gradient Glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                        {/* Badge Icon */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                          >
                            {config.icon}
                          </div>
                        </div>

                        {/* Badge Info */}
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-bold text-white mb-1">
                            {badgeName.replace(/_/g, " ")}
                          </h3>
                          <p className="text-sm text-gray-400">{config.description}</p>
                        </div>

                        {/* Claimed Status */}
                        <div  className="flex justify-center items-center gap-3">

                        <div className="flex justify-center md:text-center text-right">
                          <div className="flex items-center md:justify-center justify-end gap-2 text-green-400 text-sm font-semibold mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Claimed
                          </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="flex gap-2 ">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<FaLinkedin />}
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                              `https://dsa-mate.com?badge=${badgeName}`
                            )}`}
                          >
                            Share
                          </Button>


                          <Button
                            variant="outline"
                            size="sm"
                            icon={<FaXTwitter />}
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              `I just earned the "${badgeName}" badge on DSA-Mate 🏅! 🚀 Level up your DSA skills with me at https://dsa-mate.com #GSSoC25 #DSAMate #Coding #DSA`
                            )}`}
                          >
                            Tweet
                          </Button>

                        </div>
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-4xl opacity-50">
                🏅
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No badges yet
              </h3>
              <p className="text-gray-500">
                Complete challenges to earn your first badge!
              </p>
            </div>
          )}
        </div>


        {/* Progress Ring or Additional Stats */}
        <div className="mt-8 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Quick Stats Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm text-gray-400">Accuracy</div>
              <div className="font-bold text-blue-400">
                {progress.totalSolved > 0 ? Math.round((progress.totalSolved / 104) * 100) : 0}%
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-400">Streak</div>
              <div className="font-bold text-orange-400">{progress.streakCount}</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-gray-400">Hard Rate</div>
              <div className="font-bold text-red-400">
                {progress.totalSolved > 0 ? Math.round((progress.hardSolved / progress.totalSolved) * 100) : 0}%
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🎖️</div>
              <div className="text-sm text-gray-400">Badges</div>
              <div className="font-bold text-yellow-400">{badges.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}