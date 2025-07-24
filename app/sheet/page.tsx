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
  const [companyFilter, setCompanyFilter] = useState('');
  const [streak, setStreak] = useState(0);
  const [potd, setPotd] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const resetFilters = () => {
    setDifficultyFilter('');
    setStatusFilter('');
    setRevisionFilter('');
    setPlatformFilter('');
    setCompanyFilter('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} streak={streak} />
      
      <main className="px-4 md:px-8 lg:px-12 py-8 md:py-12 max-w-7xl mx-auto mt-16"> {/* mt-16 instead of pt-24 */}
        <ReportIssueButton />
        
        {/* HERO SECTION */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">DSA Practice Problems</h1>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 mb-6 text-lg">
              Curated collection of data structures and algorithms problems with solutions to help you prepare for technical interviews.
            </p>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
              <p className="text-gray-400 mb-3">
                <span className="font-semibold text-blue-400">Note:</span> Questions marked with "(for practice)" include solution approaches rather than exact code.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  LeetCode
                </span>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  GeeksforGeeks
                </span>
                <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  HackerRank
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-amber-500/20 text-amber-100 rounded-xl px-5 py-3 inline-block text-sm mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>
                  Company-wise filtering is in progress. Contribute via{' '}
                  <a href="https://forms.gle/8WccErg3TBFTMPkj9" className="underline hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                    this form
                  </a>.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY FREQUENCY LEGEND */}
        <div className="mb-8 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Company Frequency Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center">
              <span className="flex items-center mr-2">
                <span className="text-blue-400">⚡</span>
              </span>
              <span className="text-gray-400">Asked in 20+ companies</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center mr-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-amber-400">🔥</span>
              </span>
              <span className="text-gray-400">Asked in 50+ companies</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center mr-2">
                <span className="text-blue-400">⚡</span>
                <span className="text-amber-400">🔥</span>
                <span className="text-purple-400">🏆</span>
              </span>
              <span className="text-gray-400">Asked in 80+ companies</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">(Based on data from LeetCode and GeeksforGeeks company tags)</p>
        </div>

        {/* FILTERS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-300 mr-2">Filter Problems:</h3>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">All Difficulties</option>
                <option value="easy" className="text-green-400">Easy</option>
                <option value="medium" className="text-amber-400">Medium</option>
                <option value="hard" className="text-red-400">Hard</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Solved Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">All Statuses</option>
                <option value="solved" className="text-green-400">Solved</option>
                <option value="unsolved" className="text-gray-400">Unsolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Revision Filter */}
            <div className="relative">
              <select
                value={revisionFilter}
                onChange={(e) => setRevisionFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">All Revision</option>
                <option value="marked" className="text-purple-400">Marked for Revision</option>
                <option value="unmarked" className="text-gray-400">Not Marked</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Platform Filter */}
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">All Platforms</option>
                <option value="leetcode" className="text-blue-400">LeetCode</option>
                <option value="gfg" className="text-green-400">GeeksforGeeks</option>
                <option value="hackerrank" className="text-amber-400">HackerRank</option>
                <option value="spoj" className="text-red-400">SPOJ</option>
                <option value="ninja" className="text-purple-400">Coding Ninjas</option>
                <option value="code" className="text-gray-400">Others</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Company Filter */}
            <div className="relative">
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">All Companies</option>
                <option value="Adobe">Adobe</option>
                <option value="Amazon">Amazon</option>
                <option value="Apple">Apple</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Meta">Meta</option>
                <option value="Uber">Uber</option>
                {/* Other companies... */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <a
              href="https://dsamate.vercel.app/sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Full List
            </a>
          </div>
        </div>

        {/* POTD Section */}
        <POTD potd={potd} updateStreak={updateStreak} />

        {/* SHEET CONTENT */}
        <SheetContent
          difficultyFilter={difficultyFilter}
          statusFilter={statusFilter}
          revisionFilter={revisionFilter}
          searchTerm={searchTerm}
          platformFilter={platformFilter}
          companyFilter={companyFilter}
        />
      </main>

      <Footer />
      <TestimonialPrompt />
    </div>
  );
}