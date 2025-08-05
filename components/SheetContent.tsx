"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaCode } from "react-icons/fa";
import EmptyState from "@/components/EmptyState";
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiSpoj,
  SiCodingninjas,
} from "react-icons/si";
import { sampleTopics, type Question } from "@/data/questions";
import { Plus, StickyNote, X } from "lucide-react";

type SheetContentProps = {
  difficultyFilter: string;
  statusFilter: string;
  revisionFilter: string;
  searchTerm: string;
  platformFilter: string;
  companyFilter: string;
};

export default function SheetContent({
  difficultyFilter,
  statusFilter,
  revisionFilter,
  searchTerm,
  platformFilter,
  companyFilter,
}: SheetContentProps) {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [progress, setProgress] = useState<{
    [id: string]: {
      isSolved: boolean;
      isMarkedForRevision: boolean;
      note?: string;
    };
  }>({});
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  // Step 1: Define state and handler at the top
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

  const handleRandomQuestion = () => {
    const allQuestions = sampleTopics.flatMap((topic) => topic.questions);
    const random = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    setRandomQuestion(random);
  };

  // Load & persist progress
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("dsa-progress");
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse stored progress:', error);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("dsa-progress", JSON.stringify(progress));
    }
  }, [progress]);

  // Toggle solved/marked state
  const toggleCheckbox = (
    id: string,
    field: "isSolved" | "isMarkedForRevision"
  ) => {
    setProgress((prev) => {
      const current = prev[id]?.[field] || false;
      const updated = { ...prev[id], [field]: !current };
      if (field === "isSolved" && !current) {
        (updated as any).solvedAt = new Date().toISOString();
      }
      return { ...prev, [id]: updated };
    });
  };

  // Expand/collapse topic
  const toggleTopic = (topicId: number) => {
    setOpenTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const difficultyClasses: Record<string, string> = {
    easy: "text-green-600 dark:text-green-500",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-500",
  };

  // 1️⃣ Compute total matches across all topics
  const totalFiltered = sampleTopics.reduce((sum, topic) => {
    return (
      sum +
      topic.questions.filter((q) => {
        const key = `${topic.id}-${q.id}`;
        const local = progress[key] || {};
        const isSolved = local.isSolved ?? q.isSolved;
        const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

        if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
        if (statusFilter === "solved" && !isSolved) return false;
        if (statusFilter === "unsolved" && isSolved) return false;
        if (revisionFilter === "marked" && !isMarked) return false;
        if (revisionFilter === "unmarked" && isMarked) return false;
        if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (platformFilter) {
          const links = Object.keys(q.links || {});
          if (!links.includes(platformFilter)) return false;
        }
        if (companyFilter && (!q.companies || !q.companies.includes(companyFilter))) return false;
        return true;
      }).length
    );
  }, 0);

  // 2️⃣ If none match, show empty state ONCE
  if (totalFiltered === 0) {
    return (
      <div className="p-8">
        <EmptyState
          message="No questions match your filters"
          suggestion="Try removing or changing some filters to see results."
        />
      </div>
    );
  }

  // 3️⃣ Otherwise render each topic that has matches
  return (
    <>
      {/* Step 2: Add the Button above the table */}
      <div className="mb-6">
        <div className="flex justify-end mb-2">
          <button
            onClick={handleRandomQuestion}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Random Question
          </button>
        </div>
        {randomQuestion && (
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-md">
            <table className="min-w-full table-fixed text-sm text-gray-900 dark:text-white bg-yellow-50 dark:bg-yellow-900">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="py-2 px-3">Question</th>
                  <th className="py-2 px-3">Links</th>
                  <th className="py-2 px-3">Difficulty</th>
                  <th className="py-2 px-3">Solved</th>
                  <th className="py-2 px-3">Revision</th>
                  <th className="py-2 px-3">Solution</th>
                  <th className="py-2 px-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr key={randomQuestion ? randomQuestion.title : 'random-row'}>
                  <td className="py-2 px-3 font-medium">
                    {randomQuestion.title}
                  </td>
                  <td className="py-2 px-3 flex justify-center gap-2">
                    {randomQuestion.links && randomQuestion.links.leetcode && (
                      <a href={randomQuestion.links.leetcode} target="_blank" rel="noopener noreferrer">
                        <SiLeetcode className="text-orange-500 text-2xl hover:text-orange-400" />
                      </a>
                    )}
                    {randomQuestion.links && randomQuestion.links.gfg && (
                      <a href={randomQuestion.links.gfg} target="_blank" rel="noopener noreferrer">
                        <SiGeeksforgeeks className="text-green-500 text-2xl hover:text-green-400" />
                      </a>
                    )}
                    {randomQuestion.links && randomQuestion.links.hackerrank && (
                      <a href={randomQuestion.links.hackerrank} target="_blank" rel="noopener noreferrer">
                        <SiHackerrank className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" />
                      </a>
                    )}
                    {randomQuestion.links && randomQuestion.links.spoj && (
                      <a href={randomQuestion.links.spoj} target="_blank" rel="noopener noreferrer">
                        <SiSpoj className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" />
                      </a>
                    )}
                    {randomQuestion.links && randomQuestion.links.ninja && (
                      <a href={randomQuestion.links.ninja} target="_blank" rel="noopener noreferrer">
                        <SiCodingninjas className="text-gray-600 dark:text-white text-2xl hover:text-indigo-400" />
                      </a>
                    )}
                    {randomQuestion.links && randomQuestion.links.code && (
                      <a href={randomQuestion.links.code} target="_blank" rel="noopener noreferrer">
                        <FaCode className="text-blue-500 dark:text-blue-200 text-2xl hover:text-blue-300" />
                      </a>
                    )}
                    {(!randomQuestion.links || (
                      !randomQuestion.links.leetcode &&
                      !randomQuestion.links.gfg &&
                      !randomQuestion.links.hackerrank &&
                      !randomQuestion.links.spoj &&
                      !randomQuestion.links.ninja &&
                      !randomQuestion.links.code
                    )) && <span>—</span>}
                  </td>
                  <td className="py-2 px-3 capitalize">{randomQuestion.difficulty}</td>
                  <td className="py-2 px-3">{randomQuestion.isSolved ? "✅" : "—"}</td>
                  <td className="py-2 px-3">{randomQuestion.isMarkedForRevision ? "🔁" : "—"}</td>
                  <td className="py-2 px-3">
                    {randomQuestion.solutionLink ? (
                      <a
                        href={randomQuestion.solutionLink}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Solution
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-2 px-3">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      {sampleTopics.map((topic) => {
        // Filter per-topic
        const filtered = topic.questions.filter((q) => {
          const key = `${topic.id}-${q.id}`;
          const local = progress[key] || {};
          const isSolved = local.isSolved ?? q.isSolved;
          const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

          if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
          if (statusFilter === "solved" && !isSolved) return false;
          if (statusFilter === "unsolved" && isSolved) return false;
          if (revisionFilter === "marked" && !isMarked) return false;
          if (revisionFilter === "unmarked" && isMarked) return false;
          if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
          if (platformFilter) {
            const links = Object.keys(q.links || {});
            if (!links.includes(platformFilter)) return false;
          }
          if (companyFilter && (!q.companies || !q.companies.includes(companyFilter))) return false;
          return true;
        });

        if (filtered.length === 0) return null;

        const totalQ = topic.questions.length;
        const solvedQ = topic.questions.filter((q) => {
          const key = `${topic.id}-${q.id}`;
          return (progress[key]?.isSolved ?? q.isSolved) === true;
        }).length;
        const completed = solvedQ === totalQ;

        return (
          <div
            key={topic.id}
            className="mb-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition"
          >
            {/* Topic Header */}
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full px-4 py-3 flex justify-between items-center bg-background hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
              aria-expanded={openTopics.includes(topic.id)}
              aria-controls={`topic-${topic.id}-body`}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {topic.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium px-2 py-2 ml-auto">
                {completed ? "🎉 Completed" : `✅ ${solvedQ}/${totalQ} solved`}
              </span>
              <svg
                className={`h-5 w-5 transition-transform ${
                  openTopics.includes(topic.id) ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Topic Body */}
            {openTopics.includes(topic.id) && (
              <div
                id={`topic-${topic.id}-body`}
                className="overflow-x-auto bg-background px-4 py-3"
              >
              <table className="min-w-full table-fixed text-gray-900 dark:text-white">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="py-2 px-3">Question</th>
                      <th className="py-2 px-3">Links</th>
                      <th className="py-2 px-3">Difficulty</th>
                      <th className="py-2 px-3">Solved</th>
                      <th className="py-2 px-3">Revision</th>
                      <th className="py-2 px-3">Solution</th>
                      <th className="py-2 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Regular rows start below */}
                    {filtered.map((q) => {
                      const key = `${topic.id}-${q.id}`;
                      const local = progress[key] || {};
                      const isSolved = local.isSolved ?? q.isSolved;
                      const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

                      return (
                        <tr
                          key={key}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
                        >
                          <td className="py-2 px-3">{q.title}</td>
                          <td className="py-2 px-3 flex justify-center gap-2">
                            {q.links && q.links.leetcode && (
                              <a href={q.links.leetcode} target="_blank" rel="noopener noreferrer">
                                <SiLeetcode className="text-orange-500 text-2xl hover:text-orange-400" aria-label="LeetCode" />
                              </a>
                            )}
                            {q.links && q.links.gfg && (
                              <a href={q.links.gfg} target="_blank" rel="noopener noreferrer">
                                <SiGeeksforgeeks className="text-green-500 text-2xl hover:text-green-400" aria-label="GeeksforGeeks" />
                              </a>
                            )}
                            {q.links && q.links.hackerrank && (
                              <a href={q.links.hackerrank} target="_blank" rel="noopener noreferrer">
                                <SiHackerrank className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" aria-label="HackerRank" />
                              </a>
                            )}
                            {q.links && q.links.spoj && (
                              <a href={q.links.spoj} target="_blank" rel="noopener noreferrer">
                                <SiSpoj className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" aria-label="SPOJ" />
                              </a>
                            )}
                            {q.links && q.links.ninja && (
                              <a href={q.links.ninja} target="_blank" rel="noopener noreferrer">
                                <SiCodingninjas className="text-gray-600 dark:text-white text-2xl hover:text-indigo-400" aria-label="Coding Ninjas" />
                              </a>
                            )}
                            {q.links && q.links.code && (
                              <a href={q.links.code} target="_blank" rel="noopener noreferrer">
                                <FaCode className="text-blue-500 dark:text-blue-200 text-2xl hover:text-blue-300" aria-label="Code" />
                              </a>
                            )}
                          </td>
                          <td className={`py-2 px-3 text-center font-semibold ${difficultyClasses[q.difficulty] || 'text-gray-600'}`}>
                            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSolved}
                              onChange={() => toggleCheckbox(key, "isSolved")}
                              className="accent-green-500 w-4 h-4"
                              aria-label={`Mark '${q.title}' solved`}
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isMarked}
                              onChange={() => toggleCheckbox(key, "isMarkedForRevision")}
                              className="accent-red-500 w-4 h-4"
                              aria-label={`Mark '${q.title}' for revision`}
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            {q.solutionLink ? (
                              <a href={q.solutionLink} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-2xl hover:text-gray-400 dark:hover:text-gray-100" aria-label="GitHub Solution" />
                              </a>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-center relative">
                            <button
                              onClick={() => setOpenNoteId(key)}
                              className="hover:scale-110 transition"
                              aria-expanded={openNoteId === key}
                            >
                              {(!local.note || local.note.trim() === "") ? (
                                <Plus className="w-6 h-6 text-gray-600 dark:text-white" />
                              ) : (
                                <StickyNote className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                              )}
                            </button>
                            {openNoteId === key && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 dark:bg-black/80">
                                <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl h-[80vh] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-2xl p-6 relative transition">
                                  <button
                                    onClick={() => setOpenNoteId(null)}
                                    className="absolute top-4 right-4 hover:text-red-500 transition"
                                    aria-label="Close notes"
                                  >
                                    <X className="w-6 h-6 text-gray-600 dark:text-white" />
                                  </button>
                                  <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
                                    Notes for: {q.title}
                                  </h2>
                                  <textarea
                                    className="w-full h-[calc(100%-100px)] p-4 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md border border-blue-300 dark:border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                                    placeholder="Write your notes..."
                                    value={local.note || ""}
                                    onChange={(e) =>
                                      setProgress((prev) => ({
                                        ...prev,
                                        [key]: { ...prev[key], note: e.target.value },
                                      }))
                                    }
                                  />
                                  <div className="flex justify-center mt-4">
                                    <button
                                      onClick={() => setOpenNoteId(null)}
                                      className="px-6 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 text-white rounded-lg transition"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}