'use client';
import { useMemo } from 'react';

interface RatingProgressionProps {
  currentRating: number;
}

const ranks = [
  { name: 'Newbie', min: 0, max: 1199, color: '#808080', next: 1200 },
  { name: 'Pupil', min: 1200, max: 1399, color: '#008000', next: 1400 },
  { name: 'Specialist', min: 1400, max: 1599, color: '#03A89E', next: 1600 },
  { name: 'Expert', min: 1600, max: 1899, color: '#0000FF', next: 1900 },
  { name: 'Candidate Master', min: 1900, max: 2099, color: '#AA00AA', next: 2100 },
  { name: 'Master', min: 2100, max: 2299, color: '#FF8C00', next: 2300 },
  { name: 'Intl. Master', min: 2300, max: 2399, color: '#FF8C00', next: 2400 },
  { name: 'Grandmaster', min: 2400, max: 2599, color: '#FF0000', next: 2600 },
  { name: 'Intl. Grandmaster', min: 2600, max: 2999, color: '#FF0000', next: 3000 },
  { name: 'Legendary', min: 3000, max: Infinity, color: '#FF0000', next: Infinity },
];

export default function RatingProgression({ currentRating }: RatingProgressionProps) {
  const { rank, progress, needed } = useMemo(() => {
    const currentRank = ranks.find(r => currentRating >= r.min && currentRating <= r.max) || ranks[0];
    const ratingIntoRank = currentRating - currentRank.min;
    const rankRange = currentRank.max - currentRank.min + 1;
    const progressPercentage = Math.min(100, (ratingIntoRank / rankRange) * 100);
    const neededForNext = currentRank.next !== Infinity ? currentRank.next - currentRating : 0;
    
    return { rank: currentRank, progress: progressPercentage, needed: neededForNext };
  }, [currentRating]);

  return (
    <div className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-200">Rank Progression</h3>
        <span className="font-bold text-lg" style={{ color: rank.color }}>
          {rank.name} ({currentRating})
        </span>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right mt-2 text-sm text-gray-400">
        {needed > 0 ? (
          <span>
            <strong className="text-white">{needed}</strong> points to next rank ({ranks.find(r => r.min === rank.next)?.name})
          </span>
        ) : (
          <span>Congratulations on reaching Legendary!</span>
        )}
      </div>
    </div>
  );
}