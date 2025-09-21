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
      <main className="min-h-screen bg-neutral-50 dark:bg-background text-gray-900 dark:text-white px-2 md:px-0 sheet-navbar-offset pb-24 transition-colors duration-300 flex justify-center">
  <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl px-6 sm:px-12 py-12 mt-6 mb-10 border border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <ReportIssueButton />
            <div className="w-full flex justify-center">
              <ProgressSummary />
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900 dark:text-white">
              DSA Practice Problems
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              <span className="font-semibold">Note:</span> Questions marked with the (for practice) tag do not include the exact solutions. The provided code solutions in this section serve as hints or are solutions to similar problems from platforms like <span className="text-blue-600 dark:text-blue-400 font-medium">LeetCode</span>, <span className="text-green-600 dark:text-green-400 font-medium">GeeksforGeeks</span>, or <span className="text-yellow-500 dark:text-yellow-400 font-medium">HackerRank</span> ...
            </p>
            <div className="mt-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-3 text-sm md:text-base transition-colors duration-300 flex items-start gap-2">
              <span className="pt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              </span>
              <span>
                <span className="font-semibold">Heads up:</span> Company-wise filtering is currently in progress. You might see incomplete or missing tags. Want to help us improve? Contribute company-specific questions via{' '}
                <a
                  href="https://forms.gle/8WccErg3TBFTMPkj9"
                  className="underline text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this form
                </a>
                .
              </span>
            </div>
          </div>

          <ul className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8 flex flex-wrap justify-center gap-x-8 gap-y-1">
            <li className="flex items-start gap-1"><span className="pt-1 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg></span>Asked in 20+ companies</li>
            <li className="flex items-start gap-1"><span className="pt-1 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.894.553l1.382 2.764 3.05.444a1 1 0 01.554 1.706l-2.206 2.15.521 3.037a1 1 0 01-1.451 1.054L10 12.347l-2.744 1.443a1 1 0 01-1.451-1.054l.521-3.037-2.206-2.15a1 1 0 01.554-1.706l3.05-.444L9.106 2.553A1 1 0 0110 2z" /></svg></span>Asked in 50+ companies</li>
            <li className="flex items-start gap-1"><span className="pt-1 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" /></svg></span>Asked in 80+ companies</li>
            <li className="font-medium">(Based on data from LeetCode and GeeksforGeeks company tags)</li>
          </ul>

          {/* FILTERS */}
          <div className="mb-8 flex flex-wrap md:flex-row gap-4 md:items-center justify-center">
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

          {/* Pick Random Question */}
          <button
            onClick={pickRandomQuestion}
            className="bg-blue-600 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            🎲 Pick Random Question
          </button>

        
        </div>


          {/* POTD Section */}
          <div className="mb-8">
            <POTD potd={potd} updateStreak={updateStreak} />
          </div>

          {/* Random Question Card */}
          {randomPick && (
            <div
              id="random-question-card"
              className="mb-8 border border-blue-300 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/20 rounded-lg p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300 mb-1 font-semibold">
                    Random Pick
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {randomPick.question.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Topic: <span className="font-medium">{randomPick.topicName}</span> · Difficulty: <span className="font-medium capitalize">{randomPick.question.difficulty}</span>
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
        </div>
      </main>

      <TestimonialPrompt />
    </>
  );
}
