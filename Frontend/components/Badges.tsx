'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { FaFire, FaBrain, FaBullseye, FaTrophy, FaCalendarCheck } from 'react-icons/fa';
import { sampleTopics } from '@/data/questions';

type Badge = {
  label: string;
  icon: React.ReactElement;
  color: string;
};

type BadgeProps = {
  progress: {
    [id: string]: {
      isSolved: boolean;
      isMarkedForRevision: boolean;
      note?: string;
      solvedAt?: string;
    };
  };
  streak: number;
};

const Badges = ({ progress, streak }: BadgeProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const allQuestions = sampleTopics.flatMap((topic) => topic.questions);
    const solvedQuestions = allQuestions.filter((q) => progress[q.id]?.isSolved);
    const hardSolved = allQuestions.filter((q) => q.difficulty === 'hard' && progress[q.id]?.isSolved);
    const topicMaster = sampleTopics.find((topic) =>
      topic.questions.every((q) => progress[q.id]?.isSolved)
    );

    const newBadges: Badge[] = [];

    if (streak >= 7) newBadges.push({ icon: <FaFire />, label: `7-Day Streak`, color: 'text-orange-400' });
    if (streak >= 14) newBadges.push({ icon: <FaFire />, label: `14-Day Streak`, color: 'text-orange-500' });
    if (streak >= 30) newBadges.push({ icon: <FaFire />, label: `30-Day Streak`, color: 'text-orange-600' });

    if (solvedQuestions.length >= 50)
      newBadges.push({ icon: <FaTrophy />, label: `50+ Questions Solved`, color: 'text-yellow-400' });

    if (hardSolved.length >= 10)
      newBadges.push({ icon: <FaBullseye />, label: `Hard Hitter (10+ Hard Qs)`, color: 'text-red-400' });

    if (topicMaster)
      newBadges.push({
        icon: <FaBrain />,
        label: `Topic Master: ${topicMaster.name}`,
        color: 'text-purple-400',
      });

    if (streak >= 10) newBadges.push({ icon: <FaCalendarCheck />, label: `Daily Devotee`, color: 'text-green-400' });

    // Compare with previous badges stored in localStorage
    const stored = localStorage.getItem('earned_badges');
    const previousLabels: string[] = stored ? JSON.parse(stored) : [];

    const currentLabels = newBadges.map((b) => b.label);
    const newEarned = currentLabels.filter((label) => !previousLabels.includes(label));

    if (newEarned.length > 0) {
      newEarned.forEach((label) => {
        toast.success(`🏅 You unlocked: ${label}`);
      });
      localStorage.setItem('earned_badges', JSON.stringify(currentLabels));
    }

    setBadges(newBadges);
  }, [progress, streak]);

  if (badges.length === 0)
    return <div className="text-center text-gray-400 mt-8">Keep solving to earn your first badge! 🏆</div>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-white">🏅 Earned Badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`bg-[#1a1d2b] p-4 rounded-xl flex items-center gap-4 border border-white/10 shadow-md`}
          >
            <div className={`text-3xl ${badge.color}`}>{badge.icon}</div>
            <div>
              <p className="text-lg font-semibold text-white">{badge.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
