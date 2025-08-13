'use client';

import Navbar from '@/components/NavbarSheet';
import SheetContent from '@/components/SheetContent';
import { sampleTopics, type Question } from '@/data/questions';
import POTD from '@/components/POTD';
import { getPOTD } from '@/utils/getPOTD';
import { useState, useEffect } from 'react';
import TestimonialPrompt from '@/components/TestimonialPrompt';
import ReportIssueButton from '@/components/ReportIssueButton';
import ProgressSummary from '@/components/ProgressSummary';

export default function SheetPage() {
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [revisionFilter, setRevisionFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

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

  const [searchTerm, setSearchTerm] = useState('');

  const resetFilters = () => {
    setDifficultyFilter('');
    setStatusFilter('');
    setRevisionFilter('');
    setPlatformFilter('');
    setCompanyFilter('');
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} streak={streak} />
      <main className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
        <ReportIssueButton />

        {/* Progress Summary */}
        <ProgressSummary />

        {/* HERO SECTION */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">DSA Practice Problems</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            <strong>Note:</strong> Questions marked with the (for practice) tag do not include the exact solutions. The provided code solutions in this section serve as hints or are solutions to similar problems from platforms like{' '}
            <span className="text-blue-600 dark:text-blue-400">LeetCode</span>,{' '}
            <span className="text-green-600 dark:text-green-400">GeeksforGeeks</span>, or{' '}
            <span className="text-yellow-500 dark:text-yellow-400">HackerRank</span> ...
          </p>
          <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-lg px-4 py-3 inline-block text-sm md:text-base transition-colors duration-300">
            ⚠️ Company-wise filtering is currently in progress. You might see incomplete or missing tags. Contribute company-specific questions via{' '}
            <a
              href="https://forms.gle/8WccErg3TBFTMPkj9"
              className="underline text-amber-900 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-100 transition-colors duration-200 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              this form
            </a>
            .
          </div>
        </div>

        <div className="mb-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <ul className="text-sm md:text-base text-blue-800 dark:text-blue-300">
            <li className="flex items-center gap-2">⚡: asked in 20+ companies</li>
            <li className="flex items-center gap-2 mt-1">⚡🔥: asked in 50+ companies</li>
            <li className="flex items-center gap-2 mt-1">⚡🔥🏆: asked in 80+ companies</li>
            <li className="mt-2 text-xs text-blue-700 dark:text-blue-400">(Based on data from LeetCode and GeeksforGeeks company tags)</li>
          </ul>
        </div>

        {/* POTD Section */}
        <div className="mb-12">
          <POTD potd={potd} updateStreak={updateStreak} />
        </div>

        {/* FILTERS SECTION */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filter Problems</h2>
          <div className="flex flex-wrap gap-4">
            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Solved Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>

            {/* Revision Filter */}
            <select
              value={revisionFilter}
              onChange={(e) => setRevisionFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="">Revision Status</option>
              <option value="marked">Marked for Revision</option>
              <option value="unmarked">Not Marked</option>
            </select>

            {/* Platform Filter */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="">All Platforms</option>
              <option value="leetcode">LeetCode</option>
              <option value="gfg">GeeksforGeeks</option>
              <option value="hackerrank">HackerRank</option>
              <option value="spoj">SPOJ</option>
              <option value="ninja">Coding Ninjas</option>
              <option value="code">Others</option>
            </select>

            {/* Company Filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <option value="">All Companies</option>
              <option value="Adobe">Adobe</option>
              <option value="Amazon">Amazon</option>
              <option value="Apple">Apple</option>
              <option value="Cisco">Cisco</option>
              <option value="DE shaw">DE shaw</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Google">Google</option>
              <option value="Intuit">Intuit</option>
              <option value="MakeMyTrip">MakeMyTrip</option>
              <option value="Meta">Meta</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Morgan Stanley">Morgan Stanley</option>
              <option value="Nvidia">Nvidia</option>
              <option value="Oracle">Oracle</option>
              <option value="Paypal">PayPal</option>
              <option value="Paytm">Paytm</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Samsung">Samsung</option>
              <option value="Sprinklr">Sprinklr</option>
              <option value="Swiggy">Swiggy</option>
              <option value="Tesla">Tesla</option>
              <option value="Walmart">Walmart</option>
              <option value="Uber">Uber</option>
              <option value="Visa">Visa</option>
              <option value="WITCH">WITCH</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg px-4 py-2 hover:bg-red-100 dark:hover:bg-red-950/50 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-300 font-medium"
            >
              Reset Filters
            </button>

            <a
              href="https://dsamate.vercel.app/sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 dark:bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 font-medium inline-flex items-center gap-2"
            >
              🔗 View Full List
            </a>
          </div>
        </div>

        {/* SHEET CONTENT SECTION */}
        <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              📋 Problem Sheet
            </h2>
            <p className="text-blue-100 text-sm mt-1">Practice coding problems across different topics and difficulty levels</p>
          </div>
          
          <div className="p-0">
            <SheetContent
              difficultyFilter={difficultyFilter}
              statusFilter={statusFilter}
              revisionFilter={revisionFilter}
              searchTerm={searchTerm}
              platformFilter={platformFilter}
              companyFilter={companyFilter}
            />
          </div>
        </div>
      </main>

      <TestimonialPrompt />
    </>
  );
}