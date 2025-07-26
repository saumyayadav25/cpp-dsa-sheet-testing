// utils/badgeUtils.ts
export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  achieved: boolean;
};

interface BadgeInput {
  totalSolved: number;
  hardSolved: number;
  currentStreak: number;
  visitedDays: number;
  topicsCompleted: string[];
}

export function evaluateBadges({
  totalSolved,
  hardSolved,
  currentStreak,
  visitedDays,
  topicsCompleted,
}: BadgeInput): Badge[] {
  const badges: Badge[] = [
    {
      id: 'consistency-7',
      name: '🧱 7-Day Streak',
      icon: '🧱',
      description: 'Solved POTD for 7 consecutive days.',
      achieved: currentStreak >= 7,
    },
    {
      id: 'consistency-14',
      name: '🧱 14-Day Streak',
      icon: '🧱',
      description: 'Solved POTD for 14 consecutive days.',
      achieved: currentStreak >= 14,
    },
    {
      id: 'consistency-30',
      name: '🧱 30-Day Streak',
      icon: '🧱',
      description: 'Solved POTD for 30 consecutive days.',
      achieved: currentStreak >= 30,
    },
    {
      id: 'topic-master',
      name: '🧠 Topic Master',
      icon: '🧠',
      description: 'Completed all questions from at least 1 topic.',
      achieved: topicsCompleted.length > 0,
    },
    {
      id: '50-questions',
      name: '🔥 50 Questions Done',
      icon: '🔥',
      description: 'Solved 50+ questions in total.',
      achieved: totalSolved >= 50,
    },
    {
      id: 'hard-hitter',
      name: '💪 Hard Hitter',
      icon: '💪',
      description: 'Solved at least 10 hard questions.',
      achieved: hardSolved >= 10,
    },
    {
      id: 'daily-devotee',
      name: '🎯 Daily Devotee',
      icon: '🎯',
      description: 'Visited the sheet 10+ consecutive days.',
      achieved: visitedDays >= 10,
    },
  ];

  return badges;
}

