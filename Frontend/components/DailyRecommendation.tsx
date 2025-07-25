'use client';

import { useEffect, useState } from 'react';
import { sampleTopics } from '@/data/questions';
import type { Question, Topic } from '@/data/questions';

type ProgressData = {
  [questionId: string]: {
    isSolved?: boolean;
    isMarkedForRevision?: boolean;
    difficult?: boolean;
    solvedTime?: number;
  };
};

const DailyRecommendation = () => {
  const [recommended, setRecommended] = useState<{ topic: Topic; question: Question } | null>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('daily-recommendation');
    const storedData = stored ? JSON.parse(stored) : null;

    if (storedData?.date === today) {
      setRecommended(storedData.data);
      return;
    }

    const progress: ProgressData = JSON.parse(localStorage.getItem('dsa-progress') || '{}');

    // Step 1: Count solved questions per topic
    const topicProgress: { [topicId: string]: number } = {};

    for (const topic of sampleTopics) {
      let solvedCount = 0;
      for (const question of topic.questions) {
        const key = `${topic.id}-${question.id}`;
        if (progress[key]?.isSolved) {
          solvedCount++;
        }
      }
      topicProgress[topic.id] = solvedCount;
    }

    // Step 2: Sort topics by least solved count
    const sortedTopics = [...sampleTopics].sort(
      (a, b) => topicProgress[a.id] - topicProgress[b.id]
    );

    // Step 3: Collect weak questions from those topics
    const weakQuestions: { topic: Topic; question: Question }[] = [];

    for (const topic of sortedTopics) {
      for (const question of topic.questions) {
        const key = `${topic.id}-${question.id}`;
        const qProgress = progress[key] || {};

        const isUnsolved = !qProgress.isSolved;
        const needsRevision = qProgress.isMarkedForRevision;
        const isDifficult = qProgress.difficult;

        if (isUnsolved || needsRevision || isDifficult) {
          weakQuestions.push({ topic, question });
        }
      }
      if (weakQuestions.length) break; // only from the weakest topic
    }

    // Step 4: Pick 1 random weak question
    if (weakQuestions.length > 0) {
      const chosen = weakQuestions[Math.floor(Math.random() * weakQuestions.length)];
      setRecommended(chosen);
      localStorage.setItem('daily-recommendation', JSON.stringify({ date: today, data: chosen }));
    }
  }, []);

  if (!recommended) return null;

  // Fallback to first available question link
  const link =
    recommended.question.links?.leetcode ||
    recommended.question.links?.gfg ||
    recommended.question.links?.hackerrank ||
    recommended.question.links?.spoj ||
    recommended.question.links?.ninja ||
    recommended.question.links?.code ||
    recommended.question.links?.custom ||
    '#';

  return (
    <div className="p-4 rounded-xl shadow-sm border border-gray-600 bg-[#141414] my-4 text-white">


      <h2 className="text-xl font-bold mb-2">📌 Recommended For You</h2>
      <p>
        <strong>Topic:</strong> {recommended.topic.name}
      </p>
      <p>
        <strong>Question:</strong> {recommended.question.title}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Question
      </a>
    </div>
  );
};

export default DailyRecommendation;
