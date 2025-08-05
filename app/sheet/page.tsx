'use client';

import { sampleTopics, Question } from "@/data/questions";
import Navbar from '@/components/NavbarSheet';
import SheetContent from '@/components/SheetContent';
import POTD from '@/components/POTD';
import { getPOTD } from '@/utils/getPOTD';
import { useState, useEffect } from 'react';
import TestimonialPrompt from '@/components/TestimonialPrompt';
import ReportIssueButton from '@/components/ReportIssueButton';
import ProgressSummary from '@/components/ProgressSummary';
import { getRandomItem } from "@/utils/random";   

const allQuestions = sampleTopics.flatMap((topic) => topic.questions);

export default function SheetPage() {
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [revisionFilter, setRevisionFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const [streak, setStreak] = useState(0);
  const [potd, setPotd] = useState<Question | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(() =>
  getRandomItem(allQuestions)
);

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

  const handleShuffle = () => {
    setRandomQuestion(getRandomItem(allQuestions));
  };

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

          {/* Company Filter */}
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none transition-colors duration-300"
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
        {/* Random Question Block */}
        <button
          onClick={handleShuffle}
          className="mt-4 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Shuffle Random Question
        </button>
      {randomQuestion && (
        <>
          <div className="mt-4 p-6 rounded-xl border dark:border-white/10 border-gray-200 bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              🔀 Random Question
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-lg mb-1">
              {randomQuestion.title}
            </p>
            {(() => {
              const links = randomQuestion.links || {};
              const platforms = ['leetcode', 'gfg', 'hackerrank', 'spoj', 'ninja', 'code', 'custom'];
              const platformMap: Record<string, string> = {
                leetcode: 'LeetCode',
                gfg: 'GeeksforGeeks',
                hackerrank: 'HackerRank',
                spoj: 'SPOJ',
                ninja: 'Coding Ninjas',
                code: 'Code',
                custom: 'Custom',
              };

              const platform = platforms.find((p) => links[p as keyof typeof links]);
              if (!platform) return null;

              const url = links[platform as keyof typeof links];
              const label = platformMap[platform] || platform;

              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  🔗 Solve on {label}
                </a>
              );
            })()}
          </div>
        </>
      )}

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

