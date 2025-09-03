'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function CustomQuestionPage() {
  const { slug } = useParams() as { slug: string };
  const [showHint, setShowHint] = useState(false);

  const questionMeta: Record<string, { title: string; description: string; hint: string }> = {
    'check-if-stack-is-sorted': {
      title: 'Check if Stack is Sorted ',
      description: `Given a stack of integers, check whether it is sorted in strictly increasing order
(i.e., each element is bigger than the one below it).

You may use only stack operations like push, pop, top, and empty.`,
      hint: `Use recursion to check elements one by one from top to bottom.
Keep comparing the top element with the next one (which was previously on top).
If at any point the current element is not bigger than the one below it, return false.

Steps:
• Pop the top element.
• Compare it with the next.
• If the order breaks, return false.
• Otherwise, continue recursively.`,
    },
  };

  const meta = questionMeta[slug as string];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background text-gray-900 dark:text-white transition-colors duration-300">
        <p className="text-lg">❌ Question not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-white dark:bg-background text-gray-900 dark:text-white transition-colors duration-300">
      {/* Back Button */}
      <Link 
        href="/sheet" 
        className="text-blue-600 dark:text-blue-400 underline text-sm mb-6 inline-block hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
      >
        ← Back to Practice Sheet
      </Link>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {meta.title}
      </h1>

      {/* Description */}
      <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        {meta.description}
      </p>

      {/* Example Stack */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Example Test Case:
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Stack (Top to Bottom):
        </p>
        <div className="inline-block">
          {['50', '40', '30', '20', '10'].map((val, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md mb-1 text-center w-40 font-mono transition-colors duration-300"
            >
              {val}
            </div>
          ))}
        </div>
        <p className="text-base text-gray-800 dark:text-gray-200 mt-3">
          <strong>Output:</strong> Stack is sorted
        </p>
      </div>

      {/* Hint Toggle Button */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-lg mb-4 font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {/* Hint Content */}
      {showHint && (
        <div className="bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-gray-700 p-6 rounded-lg text-sm text-gray-700 dark:text-gray-300 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2">
            💡 Hint:
          </h3>
          <p className="whitespace-pre-line leading-relaxed">
            {meta.hint}
          </p>
        </div>
      )}
    </main>
  );
}
