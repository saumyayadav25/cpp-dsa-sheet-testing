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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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

  // Company list for dropdown
  const companies = [
    'Adobe',
    'Amazon',
    'Apple',
    'Cisco',
    'DE shaw',
    'Flipkart',
    'Google',
    'Intuit',
    'MakeMyTrip',
    'Meta',
    'Microsoft',
    'Morgan Stanley',
    'Nvidia',
    'Oracle',
    'Paypal',
    'Paytm',
    'PhonePe',
    'Salesforce',
    'Samsung',
    'Sprinklr',
    'Swiggy',
    'Tesla',
    'Walmart',
    'Uber',
    'Visa',
    'WITCH',
  ];

  const handleCompanySelect = (company: string) => {
    setCompanyFilter(company);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} streak={streak} />
      <main className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
        <ReportIssueButton />

        {/* Progress Summary */}

        <ProgressSummary />

        {/* HERO SECTION */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">DSA Practice Problems</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> Questions marked with the (for practice) tag do not include the exact solutions. The provided code solutions in this section serve as hints or are solutions to similar problems from platforms like{' '}
            <span className="text-blue-600 dark:text-blue-400">LeetCode</span>,{' '}
            <span className="text-green-600 dark:text-green-400">GeeksforGeeks</span>, or{' '}
            <span className="text-yellow-500 dark:text-yellow-400">HackerRank</span> ...
          </p>
          <div className="mt-4 bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 inline-block text-sm md:text-base transition-colors duration-300">
            ⚠️ Company-wise filtering is currently in progress. You might see incomplete or missing tags. Contribute company-specific questions via{' '}
            <a
              href="https://forms.gle/8WccErg3TBFTMPkj9"
              className="underline text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              this form
            </a>
            .
          </div>
        </div>

        <ul className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
          <li className="mt-2">⚡: asked in 20+ companies</li>
          <li className="mt-1">⚡🔥: asked in 50+ companies</li>
          <li className="mt-1">⚡🔥🏆: asked in 80+ companies</li>
          <li>(Based on data from LeetCode and GeeksforGeeks company tags)</li>
        </ul>

        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap md:flex-row gap-4 md:items-center">
          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300"
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
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300"
          >
            <option value="">Solved Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          {/* Revision Filter */}
          <select
            value={revisionFilter}
            onChange={(e) => setRevisionFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300"
          >
            <option value="">Revision Status</option>
            <option value="marked">Marked for Revision</option>
            <option value="unmarked">Not Marked</option>
          </select>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300"
          >
            <option value="">Platform</option>
            <option value="leetcode">LeetCode</option>
            <option value="gfg">GeeksforGeeks</option>
            <option value="hackerrank">HackerRank</option>
            <option value="spoj">SPOJ</option>
            <option value="ninja">Coding Ninjas</option>
            <option value="code">Others</option>
          </select>

          {/* Company Filter - replaced with DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300 cursor-pointer">
              {companyFilter || 'All Companies'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCompanySelect('')}>
                All Companies
              </DropdownMenuItem>
              {companies.map((company) => (
                <DropdownMenuItem key={company} onClick={() => handleCompanySelect(company)}>
                  {company}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded px-4 py-2 shadow-md hover:bg-red-500/20 transition-colors duration-300"
          >
            Reset Filters
          </button>

          <a
            href="https://dsamate.vercel.app/sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 rounded px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors duration-300"
          >
            🔗 View Full List
          </a>
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

      <TestimonialPrompt />
    </>
  );
}
