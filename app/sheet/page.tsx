'use client';

import Navbar from '@/components/Navbar';
import SheetContent from '@/components/SheetContent';
import { sampleTopics, type Question } from '@/data/questions';
import POTD from '@/components/POTD';
import { getPOTD } from '@/utils/getPOTD';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import TestimonialPrompt from '@/components/TestimonialPrompt';
import ReportIssueButton from '@/components/ReportIssueButton';

export default function SheetPage() {
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [revisionFilter, setRevisionFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');

  const [streak, setStreak] = useState(0);
  const [potd, setPotd] = useState<Question | null>(null);

  useEffect(() => {
    const potd = getPOTD();
    setPotd(potd);

    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);
  }, []);
  
  const updateStreak = () => {
    const updatedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(updatedStreak);
  };

  useEffect(() => {
    const potd = getPOTD();
    setPotd(potd);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
    
  const resetFilters = () => {
    setDifficultyFilter('');
    setStatusFilter('');
    setRevisionFilter('');
    setPlatformFilter('');
  };


  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} streak={streak} />
      <main className="min-h-screen bg-[#131313] text-white px-4 md:px-12 py-8">
        <ReportIssueButton />

        {/* HERO SECTION */}
        <div className="mb-8 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 ">DSA Practice Problems Sample</h1>
          <p className="text-sm md:text-base text-gray-400">
            <strong>Note:</strong> Questions marked with the (for practice) tag do not include the exact solutions.
            The provided code solutions in this section serve as hints or are solutions to similar problems from platforms
            like <span className="text-blue-400">LeetCode</span>, <span className="text-green-400">GeeksforGeeks</span>, or <span className="text-yellow-400">HackerRank</span> ...
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap md:flex-row gap-4 md:items-center text-black">
          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-white rounded px-4 py-2 focus:outline-none"
          >
            <option value="">Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Solved Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white rounded px-4 py-2 focus:outline-none"
          >
            <option value="">Solved Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          {/* Revision Filter */}
          <select
            value={revisionFilter}
            onChange={(e) => setRevisionFilter(e.target.value)}
            className="bg-white rounded px-4 py-2 focus:outline-none"
          >
            <option value="">Revision Status</option>
            <option value="marked">Marked for Revision</option>
            <option value="unmarked">Not Marked</option>
          </select>
          
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-white rounded px-4 py-2 focus:outline-none"
          >
            <option value="">Platform</option>
            <option value="leetcode">LeetCode</option>
            <option value="gfg">GeeksforGeeks</option>
            <option value="hackerrank">HackerRank</option>
            <option value="spoj">SPOJ</option>
            <option value="ninja">Coding Ninjas</option>
            <option value="code">Others</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600  w-auto md:w-fit mt-2 md:mt-0"
          >
            Reset Filters
          </button>

          <a
            href="https://dsamate.vercel.app/sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#131313] border text-white rounded px-4 py-2 hover:bg-gray-200 hover:text-[#131313] w-auto md:w-fit"
          >
            🔗 View Full List
          </a>

        </div>

        {/* POTD Section -> moved to potd.tsx*/}
        <POTD potd={potd} updateStreak={updateStreak} />

        {/* SHEET CONTENT */}
        <SheetContent
          difficultyFilter={difficultyFilter}
          statusFilter={statusFilter}
          revisionFilter={revisionFilter}
          searchTerm={searchTerm}
          platformFilter={platformFilter}
        />

      </main>

      <Footer />
      {/* temporary pop up for testimonial form */}
      <TestimonialPrompt />
    </>
  );
}