'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiSpoj,
  SiCodingninjas,
} from 'react-icons/si';
import { sampleTopics, type Question } from '@/data/questions';
import { Plus, StickyNote, X } from 'lucide-react';

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
    [id: string]: { isSolved: boolean; isMarkedForRevision: boolean; note?: string };
  }>({});
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  useEffect(() => {
    const storedProgress = localStorage.getItem('dsa-progress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dsa-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleCheckbox = (id: string, field: 'isSolved' | 'isMarkedForRevision') => {
    setProgress((prev) => {
      const currentState = prev[id]?.[field] || false;
      const newState = !currentState;

      const updates: any = {
        [field]: newState,
      };
      if (field === 'isSolved' && newState) {
        updates.solvedAt = new Date().toISOString();
      }

      return {
        ...prev,
        [id]: {
          ...prev[id],
          ...updates,
        },
      };
    });
  };

  const toggleTopic = (topicId: number) => {
    setOpenTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const difficultyClasses = {
    easy: 'text-green-600 dark:text-green-500',
    medium: 'text-yellow-600 dark:text-yellow-400',
    hard: 'text-red-600 dark:text-red-500',
  };

  return (
    <>
      {sampleTopics.map((topic) => {
        const totalQuestions = topic.questions.length;
        const solvedQuestions = topic.questions.filter((q) => {
          const uniqueKey = `${topic.id}-${q.id}`;
          const local = progress[uniqueKey] || {};
          return local.isSolved ?? q.isSolved;
        }).length;
        const isCompleted = solvedQuestions === totalQuestions;

        const filteredQuestions = topic.questions.filter((q) => {
          const uniqueKey = `${topic.id}-${q.id}`;
          const local = progress[uniqueKey] || {};
          const isSolved = local.isSolved ?? q.isSolved;
          const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

          if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
          if (statusFilter === 'solved' && !isSolved) return false;
          if (statusFilter === 'unsolved' && isSolved) return false;
          if (revisionFilter === 'marked' && !isMarked) return false;
          if (revisionFilter === 'unmarked' && isMarked) return false;
          if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
          if (platformFilter) {
            const availableLinks = Object.keys(q.links || {});
            if (!availableLinks.includes(platformFilter)) return false;
          }
          if (companyFilter && (!q.companies || !q.companies.includes(companyFilter))) return false;
          return true;
        });
        if (filteredQuestions.length === 0) return null;

        return (
          <div key={topic.id} className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full flex justify-between items-center px-4 py-3 bg-background hover:bg-gray-100 dark:hover:bg-zinc-900 text-left text-lg font-medium transition-colors duration-300"
              aria-expanded={openTopics.includes(topic.id)}
              aria-controls={`topic-${topic.id}-table`}
            >
              <span className="text-gray-900 dark:text-white">{topic.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium px-2 py-2 ml-auto">
                {isCompleted ? '🎉 Completed' : `✅ ${solvedQuestions} / ${totalQuestions} solved`}
              </span>
              <svg
                className={`transform transition-transform duration-200 ${
                  openTopics.includes(topic.id) ? 'rotate-180' : ''
                }`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-900 dark:text-white"
                />
              </svg>
            </button>

            {openTopics.includes(topic.id) && (
              <div
                className="overflow-x-auto bg-background px-4 py-3"
                id={`topic-${topic.id}-table`}
                role="region"
                aria-labelledby={`topic-${topic.id}-header`}
              >
                <table className="min-w-full text-left text-gray-900 dark:text-white table-fixed">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="py-2 px-3 w-2/5 text-center text-gray-700 dark:text-gray-300">Question</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Practice Links</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Difficulty</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Solved</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Revision</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Solution</th>
                      <th className="py-2 px-3 w-1/6 text-center text-gray-700 dark:text-gray-300">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map((q) => {
                      const uniqueKey = `${topic.id}-${q.id}`;
                      const local = progress[uniqueKey] || {};
                      const isSolved = local.isSolved ?? q.isSolved;
                      const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

                      return (
                        <tr
                          key={uniqueKey}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors duration-300"
                        >
                          <td className="py-2 px-3 text-gray-900 dark:text-white">{q.title}</td>
                          <td className="py-2 px-3 text-center flex justify-center gap-2">
                            {q.links.leetcode && (
                              <a
                                href={q.links.leetcode}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LeetCode"
                                className="hover:text-orange-400 transition-colors"
                              >
                                <SiLeetcode className="text-orange-500 text-2xl" />
                              </a>
                            )}
                            {q.links.gfg && (
                              <a
                                href={q.links.gfg}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GeeksforGeeks"
                                className="hover:text-green-400 transition-colors"
                              >
                                <SiGeeksforgeeks className="text-green-500 text-2xl" />
                              </a>
                            )}
                            {q.links.hackerrank && (
                              <a
                                href={q.links.hackerrank}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="HackerRank"
                                className="hover:text-cyan-400 transition-colors"
                              >
                                <SiHackerrank className="text-gray-600 dark:text-white text-2xl" />
                              </a>
                            )}
                            {q.links.spoj && (
                              <a
                                href={q.links.spoj}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="SPOJ"
                                className="hover:text-cyan-400 transition-colors"
                              >
                                <SiSpoj className="text-gray-600 dark:text-white text-2xl" />
                              </a>
                            )}
                            {q.links.ninja && (
                              <a
                                href={q.links.ninja}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Coding Ninjas"
                                className="hover:text-indigo-400 transition-colors"
                              >
                                <SiCodingninjas className="text-gray-600 dark:text-white text-2xl" />
                              </a>
                            )}
                            {q.links.code && (
                              <a
                                href={q.links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Code"
                                className="hover:text-blue-300 transition-colors"
                              >
                                <FaCode className="text-blue-500 dark:text-blue-200 text-2xl" />
                              </a>
                            )}
                            {q.links.custom && (
                              <a
                                href={q.links.custom}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Custom"
                                className="hover:text-blue-400 transition-colors"
                              >
                                <FaCode className="text-blue-600 dark:text-blue-400 text-2xl" />
                              </a>
                            )}
                          </td>
                          <td className={`text-center py-2 px-3 font-semibold ${difficultyClasses[q.difficulty]}`}>
                            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSolved}
                              onChange={() => toggleCheckbox(uniqueKey, 'isSolved')}
                              className="accent-green-500 cursor-pointer w-4 h-4"
                              aria-label={`Mark question '${q.title}' as solved`}
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isMarked}
                              onChange={() => toggleCheckbox(uniqueKey, 'isMarkedForRevision')}
                              className="accent-red-500 cursor-pointer w-4 h-4"
                              aria-label={`Mark question '${q.title}' for revision`}
                            />
                          </td>
                          <td className="py-2 px-3 text-center flex justify-center items-center text-2xl">
                            {q.solutionLink ? (
                              <a
                                href={q.solutionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Solution on GitHub"
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-100 transition-colors"
                              >
                                <FaGithub />
                              </a>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-center relative">
                            <button
                              onClick={() => setOpenNoteId(uniqueKey)}
                              className="hover:scale-110 transition-transform duration-150"
                              title={local.note?.trim() === '' ? 'Add Note' : 'Edit Note'}
                              aria-expanded={openNoteId === uniqueKey}
                              aria-controls={`note-editor-${uniqueKey}`}
                            >
                              {(local.note || '').trim() === '' ? (
                                <Plus className="text-gray-600 dark:text-white w-6 h-6" />
                              ) : (
                                <StickyNote className="text-amber-500 dark:text-amber-400 w-6 h-6" />
                              )}
                            </button>

                            {openNoteId === uniqueKey && (
                              <div
                                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 dark:bg-black/80"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={`note-editor-title-${uniqueKey}`}
                              >
                                <div
                                  id={`note-editor-${uniqueKey}`}
                                  className="bg-white dark:bg-zinc-900 w-full max-w-3xl h-[80vh] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-2xl p-6 relative transform scale-100 transition-all duration-300"
                                >
                                  <button
                                    onClick={() => setOpenNoteId(null)}
                                    className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-500 transition-colors"
                                    title="Close"
                                    aria-label="Close note editor"
                                  >
                                    <X className="w-6 h-6" />
                                  </button>

                                  <h2
                                    id={`note-editor-title-${uniqueKey}`}
                                    className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center"
                                  >
                                    Notes for: {q.title}
                                  </h2>

                                  <textarea
                                    className="w-full h-[calc(100%-100px)] p-4 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md border border-blue-300 dark:border-blue-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                                    placeholder="Write your notes..."
                                    value={local.note || ''}
                                    onChange={(e) =>
                                      setProgress((prev) => ({
                                        ...prev,
                                        [uniqueKey]: {
                                          ...prev[uniqueKey],
                                          note: e.target.value,
                                        },
                                      }))
                                    }
                                  />

                                  <div className="flex justify-center mt-4">
                                    <button
                                      onClick={() => setOpenNoteId(null)}
                                      className="px-6 py-2 bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 text-white rounded-lg transition-colors duration-300"
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
