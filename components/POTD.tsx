
'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

type POTDProps = {
  potd: Question | null;
  updateStreak: () => void;
};

export default function POTD({ potd, updateStreak }: POTDProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [today, setToday] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const currentDate = new Date().toDateString();
    setToday(currentDate);

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDone = localStorage.getItem('potd_last_done');

    if (lastDone && lastDone !== yesterday && lastDone !== currentDate) {
      localStorage.setItem('potd_streak', '0');
    }

    setIsSolved(currentDate === lastDone);
  }, []);

  const handleMarkDone = () => {
    const lastDone = localStorage.getItem('potd_last_done');
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');

    if (lastDone === new Date(Date.now() - 86400000).toDateString()) {
      localStorage.setItem('potd_streak', (savedStreak + 1).toString());
    } else if (lastDone !== today) {
      localStorage.setItem('potd_streak', '1');
    }

    localStorage.setItem('potd_last_done', today);
    setIsSolved(true);
    updateStreak();

    // Confetti 🎉
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    const audio = new Audio('/sounds/done.mp3');
    audio.play().catch((err) => {
      console.log("Audio play blocked or failed", err);
    });
  };

  if (!potd) return null;

  return (
    <div
      className="transition-all duration-300 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-8 shadow-md hover:shadow-2xl hover:scale-[1.02] transform animate-fade-in"
    >
      {showConfetti && <Confetti width={width} height={height} />}
      
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 animate-slide-in-down">
        🔥 Problem of the Day
      </h2>

      <p className="text-lg font-medium text-gray-900 dark:text-white">{potd.title}</p>

      <p className="text-sm mt-1 text-gray-400 dark:text-gray-400 capitalize">
        Difficulty:
        <span className={`ml-1 font-semibold ${
          potd.difficulty === 'easy'
            ? 'text-green-600 dark:text-green-400'
            : potd.difficulty === 'medium'
            ? 'text-yellow-600 dark:text-yellow-400'
            : 'text-red-600 dark:text-red-400'
        }`}>{potd.difficulty}</span>
      </p>

      <div className="mt-3 flex flex-wrap gap-3 text-sm animate-fade-in">
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
            'text-gray-600 dark:text-gray-300';

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:no-underline hover:scale-105 transition-transform duration-200 ${textColor}`}>
              {displayName}
            </a>
          );
        })}
      </div>

      {potd.solutionLink && (
        <a
          href={potd.solutionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-gray-600 dark:text-gray-300 underline hover:no-underline hover:text-blue-500 transition duration-200">
          GitHub Solution
        </a>
      )}

      <div className="mt-4">
        {!isSolved ? (
          <button
            onClick={handleMarkDone}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium transition-transform duration-200 hover:scale-105 shadow-md">
            ✅ Mark as Done
          </button>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-medium text-sm bg-green-100 dark:bg-green-900/20 px-3 py-2 rounded-full inline-block">
            🎉 Today's POTD Completed!
          </span>
        )}
      </div>
    </div>
  );
}
