'use client';


import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
// this will render a question page based on th slug provided in URL 
export default function CustomQuestionPage() {
  // useParams hook to get the slug from the url
  // this slug will fetch the question data 
  const { slug } = useParams();
  // manage visibility of hint and whether the question is added to the to do list 
  const [showHint, setShowHint] = useState(false);
  const [isAdded, setIsAdded] = useState(false);


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

  // Load todo state from localStorage
  useEffect(() => {
    // check if slug is still valid 
    const todos = JSON.parse(localStorage.getItem('todoQuestions') || '[]');
    // set the isAdded state based on whether the slug is in the to do list
    setIsAdded(todos.includes(slug));
  }, [slug]); 

  // Add current question to todo list
  const handleAddToTodo = () => {
    // get the current to do list from LocalStorage 
    const todos = JSON.parse(localStorage.getItem('todoQuestions') || '[]');
    //if slug is not already in the to do list then add it 
    if (!todos.includes(slug)) {
      todos.push(slug);
      // update the localStorage witb the new to do list 
      localStorage.setItem('todoQuestions', JSON.stringify(todos));
      setIsAdded(true);
    }
  };


  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>❌ Question not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-20 py-10 bg-[#0d0f16] text-white">
      {/* Back Button */}
      <Link href="/sheet" className="text-blue-400 underline text-sm mb-6 inline-block hover:text-blue-500">
        ← Back to Practice Sheet
      </Link>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{meta.title}</h1>

      {/* Description */}
      <p className="whitespace-pre-line text-gray-300 mb-6">{meta.description}</p>

      {/* Example Stack */}
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

      {/* Hint Toggle Button */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-4 py-2 rounded mb-4"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {/* Hint Content */}
      {showHint && (
        <div className="bg-[#1c1f26] border border-gray-700 p-4 rounded-md text-sm text-gray-300">
          <h3 className="text-lg font-semibold mb-2">💡 Hint:</h3>
          <p className="whitespace-pre-line">{meta.hint}</p>
        </div>
      )}


      {/* To-Do Button */}
      <button
        onClick={handleAddToTodo}
        disabled={isAdded}
        className={`mt-6 px-6 py-2 rounded-md font-semibold ${
          isAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isAdded ? '✅ Added to To-Do' : '➕ Add to To-Do'}
      </button>
    </main>
  );
}

