'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import { syncPOTDToDSAProgress } from '@/utils/potdSync';
import Link from 'next/link';

type POTDProps = {
  potd: Question | null;
  updateStreak: () => void; // from parent
};

export default function POTD({ potd, updateStreak }: POTDProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [showSyncNotification, setShowSyncNotification] = useState(false);

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

    // Update POTD streak
    if (lastDone === new Date(Date.now() - 86400000).toDateString()) {
      const newStreak = savedStreak + 1;
      localStorage.setItem('potd_streak', newStreak.toString());
    } else if (lastDone !== today) {
      localStorage.setItem('potd_streak', '1');
    }

    localStorage.setItem('potd_last_done', today);
    setIsSolved(true);
    updateStreak(); // notify parent to update Navbar

    // ONE-WAY SYNC: Mark corresponding DSA question as solved
    if (potd) {
      const syncSuccess = syncPOTDToDSAProgress(potd);
      if (syncSuccess) {
        setShowSyncNotification(true);
        // Hide notification after 3 seconds
        setTimeout(() => setShowSyncNotification(false), 3000);
      }
    }
  };

  if (!potd) return null;

  return (
    <div className="bg-[#141414] border border-gray-600 rounded-lg p-4 mb-8 flex justify-between items-start">
      <div>
        <h2 className="text-xl font-semibold text-blue-400 mb-2">🔥 Problem of the Day</h2>
        <p className="text-lg font-medium">{potd.title}</p>
        <p className="text-sm mt-1 text-gray-400 capitalize">
          Difficulty:{" "}
          <span
            className={`font-semibold ${
              potd.difficulty === "easy"
                ? "text-green-400"
                : potd.difficulty === "medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {potd.difficulty}
          </span>
        </p>
        {/* platform links and solution */}
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-300">
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
            platform === 'leetcode' ? 'text-blue-400' :
            platform === 'gfg' ? 'text-green-400' :
            platform === 'hackerrank' ? 'text-yellow-300' :
            platform === 'spoj' ? 'text-purple-400' :
            platform === 'ninja' ? 'text-pink-400' :
            platform === 'code' ? 'text-orange-400' :
            platform === 'custom' ? 'text-blue-300' :
            'text-gray-300';

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              className={`underline ${textColor}`}
            >
              {displayName}
            </a>
          );
        })}


          {potd.solutionLink && (
            <a
              href={potd.solutionLink}
              target="_blank"
              className="text-gray-300 underline"
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
          className="bg-green-600 hover:bg-green-500 hover:cursor-pointer text-white px-4 py-2 rounded text-sm"
        >
          Mark as Done
        </button>
      ) : (
        <div className="flex flex-col items-end gap-1">
          <span className="text-green-400 font-medium text-sm">✅ Today's POTD Completed!</span>
          {showSyncNotification && (
            <span className="text-blue-400 text-xs animate-fade-in">
              📋 Also marked in DSA list
            </span>
          )}
        </div>
      )}
    </div>
  );
}