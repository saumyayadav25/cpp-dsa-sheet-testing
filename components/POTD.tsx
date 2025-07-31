'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import Link from 'next/link';

type POTDProps = {
  potd: Question | null;
  updateStreak: () => void; // from parent
};

export default function POTD({ potd, updateStreak }: POTDProps) {
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDone = localStorage.getItem('potd_last_done');

    // Reset streak if missed a day (i.e., lastDone !== yesterday AND !== today)
    if (lastDone && lastDone !== yesterday && lastDone !== today) {
      localStorage.setItem('potd_streak', '0');
    }

    setIsSolved(today === lastDone);
  }, []);

  const handleMarkDone = () => {
    const today = new Date().toDateString();
    const lastDone = localStorage.getItem('potd_last_done');
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');

    if (lastDone === new Date(Date.now() - 86400000).toDateString()) {
      const newStreak = savedStreak + 1;
      localStorage.setItem('potd_streak', newStreak.toString());
    } else if (lastDone !== today) {
      localStorage.setItem('potd_streak', '1');
    }

    localStorage.setItem('potd_last_done', today);
    setIsSolved(true);
    updateStreak(); // notify parent to update Navbar
  };

  if (!potd) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-8 flex justify-between items-start shadow-sm hover:shadow-lg transition-all duration-300">
      <div>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">🔥 Problem of the Day</h2>
        <p className="text-lg font-medium text-gray-900 dark:text-white">{potd.title}</p>
        <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 capitalize">
          Difficulty:{" "}
          <span
            className={`font-semibold ${
              potd.difficulty === "easy"
                ? "text-green-600 dark:text-green-400"
                : potd.difficulty === "medium"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {potd.difficulty}
          </span>
        </p>
        {/* platform links and solution */}
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          {Object.entries(potd.links || {}).map(([platform, url]) => {
            const displayName =
              platform === 'leetcode' ? 'LeetCode' :
              platform === 'gfg' ? 'GeeksForGeeks' :
              platform === 'hackerrank' ? 'HackerRank' :
              platform === 'spoj' ? 'SPOJ' :
              platform === 'ninja' ? 'Coding Ninjas' :
              platform === 'code' ? 'Other Platform' :
              platform === 'custom' ? 'View Question' :
              platform;

            const textColor =
              platform === 'leetcode' ? 'text-blue-600 dark:text-blue-400' :
              platform === 'gfg' ? 'text-green-600 dark:text-green-400' :
              platform === 'hackerrank' ? 'text-yellow-600 dark:text-yellow-300' :
              platform === 'spoj' ? 'text-purple-600 dark:text-purple-400' :
              platform === 'ninja' ? 'text-pink-600 dark:text-pink-400' :
              platform === 'code' ? 'text-orange-600 dark:text-orange-400' :
              platform === 'custom' ? 'text-blue-600 dark:text-blue-300' :
              'text-gray-600 dark:text-gray-300';

            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:no-underline transition-all duration-200 ${textColor}`}
              >
                {displayName}
              </a>
            );
          })}

          {potd.solutionLink && (
            <a
              href={potd.solutionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 underline hover:no-underline transition-all duration-200"
            >
              GitHub Solution
            </a>
          )}
        </div>
      </div>

      {/* Mark As Done Button */}
      {!isSolved ? (
        <button
          onClick={handleMarkDone}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Mark as Done
        </button>
      ) : (
        <span className="text-green-600 dark:text-green-400 font-medium text-sm bg-green-100 dark:bg-green-900/20 px-3 py-2 rounded-full">
          ✅ Today's POTD Completed!
        </span>
      )}
    </div>
  );
}
