// components/EarnedBadges.tsx
import { useEffect, useState } from 'react';
import { evaluateBadges, Badge } from '@/utils/badgeUtils';
import BadgeCard from './BadgeCard';

interface Props {
  progress: Record<string, any>;
  streak: number;
}

export default function EarnedBadges({ progress, streak }: Props) {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const allQuestions = Object.values(progress);
    const totalSolved = allQuestions.filter(q => q?.isSolved).length;
    const hardSolved = allQuestions.filter(q => q?.isSolved && q.difficulty === 'hard').length;
    const visitedDays = parseInt(localStorage.getItem('visit_count') || '1');

    // Topic Completion Check
    const topicData = JSON.parse(localStorage.getItem('dsa-topics') || '[]');
    const topicsCompleted = topicData.filter((t: any) => t.percentage === 100).map((t: any) => t.name);

    const evaluated = evaluateBadges({
      totalSolved,
      hardSolved,
      currentStreak: streak,
      visitedDays,
      topicsCompleted
    });

    setBadges(evaluated);
    localStorage.setItem('userBadges', JSON.stringify(evaluated.filter(b => b.achieved).map(b => b.id)));
  }, [progress, streak]);

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
        🏅 Your Badges
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge, i) => (
          <BadgeCard
            key={badge.id}
            name={badge.name}
            icon={badge.icon}
            description={badge.description}
            achieved={badge.achieved}
            delay={i * 0.05}
          />
        ))}
      </div>
    </section>
  );
}

