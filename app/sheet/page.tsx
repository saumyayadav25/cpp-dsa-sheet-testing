"use client";

import Navbar from "@/components/NavbarSheet";
import SheetContent from "@/components/SheetContent";
import { sampleTopics, type Question } from "@/data/questions";
import POTD from "@/components/POTD";
import { getPOTD } from "@/utils/getPOTD";
import { useState, useEffect } from "react";
import TestimonialPrompt from "@/components/TestimonialPrompt";
import ReportIssueButton from "@/components/ReportIssueButton";
import ProgressSummary from "@/components/ProgressSummary";

export default function SheetPage() {
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [revisionFilter, setRevisionFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  const [randomPick, setRandomPick] = useState<{
    topicName: string;
    question: Question;
  } | null>(null);

  const [streak, setStreak] = useState(0);
  const [potd, setPotd] = useState<Question | null>(null);

  useEffect(() => {

    const potd = getPOTD();
    setPotd(potd);

    const savedStreak = parseInt(localStorage.getItem("potd_streak") || "0");
    setStreak(savedStreak);
  }, []);

  const updateStreak = () => {
    const updatedStreak = parseInt(localStorage.getItem("potd_streak") || "0");
    setStreak(updatedStreak);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const resetFilters = () => {
    setDifficultyFilter("");
    setStatusFilter("");
    setRevisionFilter("");
    setPlatformFilter("");
    setCompanyFilter("");
  };

  const pickRandomQuestion = () => {
    const all = sampleTopics.flatMap((topic) =>
      topic.questions.map((q) => ({ topicName: topic.name, question: q }))
    );
    if (all.length === 0) return;
    let idx = Math.floor(Math.random() * all.length);
    if (randomPick && all.length > 1) {
      const lastId = `${randomPick.topicName}-${randomPick.question.id}`;
      // Re-roll once if same as last shown
      const candidateId = `${all[idx].topicName}-${all[idx].question.id}`;
      if (candidateId === lastId) {
        idx = (idx + 1) % all.length;
      }
    }
    setRandomPick(all[idx]);
    // Smooth scroll to the card for visibility on mobile
    setTimeout(() => {
      const el = document.getElementById("random-question-card");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 sheet-navbar-offset pb-24 transition-colors duration-300">
        <ReportIssueButton />

        {/* Progress Summary */}
        <ProgressSummary />

        {/* HERO SECTION */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            DSA Practice Problems
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> Questions marked with the (for practice) tag
            do not include the exact solutions. The provided code solutions in
            this section serve as hints or are solutions to similar problems
            from platforms like{" "}
            <span className="text-blue-600 dark:text-blue-400">LeetCode</span>,{" "}
            <span className="text-green-600 dark:text-green-400">
              GeeksforGeeks
            </span>
            , or{" "}
            <span className="text-yellow-500 dark:text-yellow-400">
              HackerRank
            </span>{" "}
            ...
          </p>
          <div className="mt-4 bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 inline-block text-sm md:text-base transition-colors duration-300">
            ⚠️ Company-wise filtering is currently in progress. You might see
            incomplete or missing tags. Contribute company-specific questions
            via{" "}
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
          <div className="relative">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[140px]"
            >
              <option value="">Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Solved Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[150px]"
            >
              <option value="">Solved Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Revision Filter */}
          <div className="relative">
            <select
              value={revisionFilter}
              onChange={(e) => setRevisionFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[160px]"
            >
              <option value="">Revision Status</option>
              <option value="marked">Marked for Revision</option>
              <option value="unmarked">Not Marked</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Platform Filter */}
          <div className="relative">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[130px]"
            >
              <option value="">Platform</option>
              <option value="leetcode">LeetCode</option>
              <option value="gfg">GeeksforGeeks</option>
              <option value="hackerrank">HackerRank</option>
              <option value="spoj">SPOJ</option>
              <option value="ninja">Coding Ninjas</option>
              <option value="code">Others</option>
            </select>
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Company Filter */}
          <div className="relative">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[160px]"
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
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded px-4 py-2 shadow-md hover:bg-red-500/20 transition-colors duration-300"
          >
            Reset Filters
          </button>

          {/* Pick Random Question */}
          <button
            onClick={pickRandomQuestion}
            className="bg-blue-600 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            🎲 Pick Random Question
          </button>

        
        </div>

        {/* POTD Section */}
        <POTD potd={potd} updateStreak={updateStreak} />

        {/* Random Question Card */}
        {randomPick && (
          <div
            id="random-question-card"
            className="mt-6 mb-8 border border-blue-300 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/20 rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300 mb-1">
                  Random Pick
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {randomPick.question.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Topic:{" "}
                  <span className="font-medium">{randomPick.topicName}</span> ·
                  Difficulty:{" "}
                  <span className="font-medium capitalize">
                    {randomPick.question.difficulty}
                  </span>
                </div>
              </div>
              <button
                onClick={pickRandomQuestion}
                className="shrink-0 bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700"
              >
                Pick Another
              </button>
            </div>
            {/* Links */}
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(randomPick.question.links || {}).map(
                ([key, url]) =>
                  url ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-3 py-1 rounded border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100/60 dark:hover:bg-blue-900/40"
                    >
                      {key}
                    </a>
                  ) : null
              )}
              {randomPick.question.solutionLink && (
                <a
                  href={randomPick.question.solutionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-zinc-900"
                >
                  solution
                </a>
              )}
            </div>
          </div>
        )}

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
