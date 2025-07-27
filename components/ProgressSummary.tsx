"use client";

import { motion } from "framer-motion";
import { FaTrophy, FaFire, FaChartLine } from "react-icons/fa";
import Link from "next/link";
import { sampleTopics } from "@/data/questions";
import { useEffect, useState } from "react";

export default function ProgressSummary() {
  const [progress, setProgress] = useState<{
    [id: string]: {
      isSolved: boolean;
      isMarkedForRevision: boolean;
      note?: string;
      solvedAt?: string;
    };
  }>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem("dsa-progress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Calculate stats
  const allQuestions = sampleTopics.flatMap((topic) =>
    topic.questions.map((q) => ({ ...q, topicId: topic.id }))
  );
  const totalQuestions = allQuestions.length;
  const solvedQuestions = allQuestions.filter(
    (q) => progress[`${q.topicId}-${q.id}`]?.isSolved
  ).length;
  const percentage =
    totalQuestions > 0
      ? Math.round((solvedQuestions / totalQuestions) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-blue-500/20 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <FaTrophy className="text-2xl text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              Your Progress
            </h3>
            <p className="text-gray-400 text-sm">
              {solvedQuestions} out of {totalQuestions} problems solved
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress Circle */}
          <div className="relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-700"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-400"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {percentage}%
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/progress"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <FaChartLine />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
