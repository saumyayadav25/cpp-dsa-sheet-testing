'use client';

import Navbar from '@/components/Navbar';
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
    setCompanyFilter('');
  };


  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} streak={streak} />
      <main className="min-h-screen bg-[#131313] text-white px-4 md:px-12 py-24">
        <ReportIssueButton />
        
        {/* Progress Summary */}
        <ProgressSummary />
        
        {/* HERO SECTION */}
        <div className="mb-8 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 ">DSA Practice Problems</h1>
          <p className="text-sm md:text-base text-gray-400">
            <strong>Note:</strong> Questions marked with the (for practice) tag do not include the exact solutions.
            The provided code solutions in this section serve as hints or are solutions to similar problems from platforms
            like <span className="text-blue-400">LeetCode</span>, <span className="text-green-400">GeeksforGeeks</span>, or <span className="text-yellow-400">HackerRank</span> ...
          </p>
          <div className="mt-4 bg-[#202226] border border-gray-500 text-gray-300 rounded-lg px-4 py-3 inline-block text-sm md:text-base">
            ⚠️ Company-wise filtering is currently in progress. You might see incomplete or missing tags.
            Contribute company-specific questions via <a href="https://forms.gle/8WccErg3TBFTMPkj9" className="underline text-gray-200 hover:text-gray-100" target="_blank" rel="noopener noreferrer">this form</a>.
          </div>
        </div>
        <ul className='text-sm md:text-base text-gray-300 mb-6'>
          <li className="text-sm md:text-base text-gray-300 mt-2">⚡: asked in 20+ companies</li>
          <li className="text-sm md:text-base text-gray-300 mt-1">⚡🔥: asked in 50+ companies</li>
          <li className="text-sm md:text-base text-gray-300 mt-1">⚡🔥🏆: asked in 80+ companies</li>
          <li className="text-sm md:text-base text-gray-300">(Based on data from LeetCode and GeeksforGeeks company tags)</li>
        </ul>
        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap md:flex-row gap-4 md:items-center text-black">
          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            // className="bg-white/5 rounded-lg px-3 py-2 md:px-4 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-white/8 transition duration-200"
            className='bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none transition-all duration-200 ease-out hover:shadow-md hover:scale-105 transform-gpu'
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
            // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
            className='bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none transition-all duration-200 ease-out hover:shadow-md hover:scale-105 transform-gpu'
          >
            <option value="">Solved Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          {/* Revision Filter */}
          <select
            value={revisionFilter}
            onChange={(e) => setRevisionFilter(e.target.value)}
            // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
            className='bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none transition-all duration-200 ease-out hover:shadow-md hover:scale-105 transform-gpu'
          >
            <option value="">Revision Status</option>
            <option value="marked">Marked for Revision</option>
            <option value="unmarked">Not Marked</option>
          </select>
          
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
            className='bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none transition-all duration-200 ease-out hover:shadow-md hover:scale-105 transform-gpu'
          >
            <option value="">Platform</option>
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
            // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
            className='bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none transition-all duration-200 ease-out hover:shadow-md hover:scale-105 transform-gpu'
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
            {/* Add more as needed */}
          </select>


          {/* Reset Button */}
          {/* <button
            onClick={resetFilters}
            className="bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-300 rounded-lg px-4 py-2 shadow-md hover:bg-red-500/20 transition duration-200"
          > */}
          <button
            onClick={resetFilters}
            className="bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-300 rounded-lg px-4 py-2 shadow-md hover:bg-red-500/20 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform-gpu"
            // className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 "
          >
            Reset Filters
          </button>

          <a
            href="https://dsamate.vercel.app/sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#131313] border text-white rounded px-4 py-2 hover:bg-gray-200 hover:text-[#131313] w-auto md:w-fit transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform-gpu"
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
          companyFilter={companyFilter}
        />

      </main>


      <TestimonialPrompt />
    </>
  );
}