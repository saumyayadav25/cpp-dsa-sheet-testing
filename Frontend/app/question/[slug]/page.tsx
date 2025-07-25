'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { sampleTopics } from '@/data/questions';

export default function CustomQuestionPage() {
 const { slug } = useParams() as { slug: string };

  const [showHint, setShowHint] = useState(false);

  let meta = null;

  for (const topic of sampleTopics) {
    for (const question of topic.questions) {
      const key = `${topic.id}-${question.id}`;
      if (key === slug) {
        meta = {
          title: question.title,
          description: 'No description available for this question.',
          hint: 'Try solving this problem using what you know!',
        };
      }
    }
  }

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>❌ Question not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-[#0d0f16] text-white">
      <Link href="/sheet" className="text-blue-400 underline text-sm mb-6 inline-block hover:text-blue-500">
        ← Back to Practice Sheet
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold mb-4">{meta.title}</h1>
      <p className="whitespace-pre-line text-gray-300 mb-6">{meta.description}</p>

      {/* Example Stack (you can customize this per question later) */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Example Test Case:</h2>
        <p className="text-sm text-gray-400 mb-2">Stack (Top to Bottom):</p>
        <div className="inline-block">
          {['50', '40', '30', '20', '10'].map((val, index) => (
            <div
              key={index}
              className="bg-[#202533] border border-gray-600 text-white px-4 py-2 rounded-md mb-1 text-center w-40"
            >
              {val}
            </div>
          ))}
        </div>
        <p className="text-m text-gray-200 mt-3"><strong>Output:</strong> Stack is sorted</p>
      </div>

      <button
        onClick={() => setShowHint(!showHint)}
        className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-2 rounded mb-4"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {showHint && (
        <div className="bg-[#1c1f26] border border-gray-700 p-4 rounded-md text-sm text-gray-300">
          <h3 className="text-lg font-semibold mb-2">💡 Hint:</h3>
          <p className="whitespace-pre-line">{meta.hint}</p>
        </div>
      )}
    </main>
  );
}
