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
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        
        {/* Header Section with gradient background */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-12">
            <ReportIssueButton />
            
            {/* Progress Summary */}
            <div className="mb-8">
              <ProgressSummary />
            </div>

            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H16a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L11.47 14H8.53l-.56 2.242a1 1 0 11-1.94-.485L6.47 14H4a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clipRule="evenodd" />
                </svg>
                Practice Makes Perfect
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                DSA Practice Problems
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Master Data Structures and Algorithms with our curated collection of practice problems from top companies
              </p>

              {/* Important Note Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-4xl mx-auto mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Important Note</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Questions marked with <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">(for practice)</span> do not include exact solutions. 
                      The provided code solutions serve as hints or are solutions to similar problems from platforms like{' '}
                      <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-medium">
                        LeetCode
                      </span>
                      {', '}
                      <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded text-sm font-medium">
                        GeeksforGeeks
                      </span>
                      {', or '}
                      <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded text-sm font-medium">
                        HackerRank
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 dark:border-orange-500 rounded-r-lg p-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-left">
                    <p className="text-orange-700 dark:text-orange-300 text-sm">
                      <span className="font-semibold">Work in Progress:</span> Company-wise filtering is currently being updated. You might see incomplete tags.{' '}
                      <a
                        href="https://forms.gle/8WccErg3TBFTMPkj9"
                        className="underline hover:no-underline font-medium transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contribute here →
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          
          {/* Legend Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Popularity Legend
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Popular</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Asked in 20+ companies</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <span className="text-xl">⚡🔥</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Very Popular</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Asked in 50+ companies</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <span className="text-xl">⚡🔥🏆</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Extremely Popular</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Asked in 80+ companies</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              Based on data from LeetCode and GeeksforGeeks company tags
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filter Problems
              </h3>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Difficulties</option>
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Status</option>
                  <option value="solved">✅ Solved</option>
                  <option value="unsolved">⏳ Unsolved</option>
                </select>
              </div>

              {/* Revision Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Revision</label>
                <select
                  value={revisionFilter}
                  onChange={(e) => setRevisionFilter(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Items</option>
                  <option value="marked">📌 Marked for Revision</option>
                  <option value="unmarked">📄 Not Marked</option>
                </select>
              </div>

              {/* Platform Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform</label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Platforms</option>
                  <option value="leetcode">LeetCode</option>
                  <option value="gfg">GeeksforGeeks</option>
                  <option value="hackerrank">HackerRank</option>
                  <option value="spoj">SPOJ</option>
                  <option value="ninja">Coding Ninjas</option>
                  <option value="code">Others</option>
                </select>
              </div>

              {/* Company Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://dsamate.vercel.app/sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-400 transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                View Full Sheet
              </a>
            </div>
          </div>

          {/* POTD Section */}
          <div className="mb-8">
            <POTD potd={potd} updateStreak={updateStreak} />
          </div>

          {/* Problems List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Practice Problems
              </h3>
            </div>
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