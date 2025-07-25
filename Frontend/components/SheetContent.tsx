'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank, SiGeeksforgeeks, SiSpoj, SiCodingninjas } from 'react-icons/si';
import { Plus, StickyNote, X } from 'lucide-react';

import DailyRecommendation from '@/components/DailyRecommendation';
import { sampleTopics, type Question } from '@/data/questions';

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
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    [id: string]: {
      isSolved: boolean;
      isMarkedForRevision: boolean;
      solvedTime?: number;
      note?: string;
    };
  }>({});

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
      const current = prev[id] || {};
      const newState = !current[field];
      const updates: any = {
        ...current,
        [field]: newState,
      };
      if (field === 'isSolved' && newState) updates.solvedTime = Date.now();
      return { ...prev, [id]: updates };
    });
  };

  const toggleTopic = (topicId: number) => {
    setOpenTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const difficultyClasses = {
    easy: 'text-green-500',
    medium: 'text-yellow-400',
    hard: 'text-red-500',
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
          <div key={topic.id} className="mb-6 border border-gray-700 rounded-lg">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full flex justify-between items-center px-4 py-3 bg-[#131313] hover:bg-[#16171a] text-left text-lg font-medium transition"
            >
              <span>{topic.name}</span>
              <span className="text-sm text-gray-400 font-medium px-2 py-2 ml-auto">
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
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openTopics.includes(topic.id) && (
              <div className="overflow-x-auto bg-[#131313] px-4 py-3">
                <table className="min-w-full text-left text-white">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 px-3 w-2/5 text-center">Question</th>
                      <th className="py-2 px-3 w-1/6 text-center">Practice Links</th>
                      <th className="py-2 px-3 w-1/6 text-center">Difficulty</th>
                      <th className="py-2 px-3 w-1/6 text-center">Solved</th>
                      <th className="py-2 px-3 w-1/6 text-center">Revision</th>
                      <th className="py-2 px-3 w-1/6 text-center">Solution</th>
                      <th className="py-2 px-3 w-1/6 text-center">Notes</th>
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
                          className="border-b border-gray-700 hover:bg-[#16171a] transition"
                        >
                          <td className="py-2 px-3">{q.title}</td>
                          <td className="py-2 px-3 text-center flex justify-center gap-2">
                            {q.links.leetcode && (
                              <a href={q.links.leetcode} target="_blank" rel="noopener noreferrer" title="LeetCode">
                                <SiLeetcode className="text-orange-500 text-2xl" />
                              </a>
                            )}
                            {q.links.gfg && (
                              <a href={q.links.gfg} target="_blank" rel="noopener noreferrer" title="GeeksforGeeks">
                                <SiGeeksforgeeks className="text-green-500 text-2xl" />
                              </a>
                            )}
                            {q.links.hackerrank && (
                              <a href={q.links.hackerrank} target="_blank" rel="noopener noreferrer" title="HackerRank">
                                <SiHackerrank className="text-green-300 text-2xl" />
                              </a>
                            )}
                            {q.links.spoj && (
                              <a href={q.links.spoj} target="_blank" rel="noopener noreferrer" title="SPOJ">
                                <SiSpoj className="text-blue-300 text-2xl" />
                              </a>
                            )}
                            {q.links.ninja && (
                              <a href={q.links.ninja} target="_blank" rel="noopener noreferrer" title="Coding Ninjas">
                                <SiCodingninjas className="text-orange-400 text-2xl" />
                              </a>
                            )}
                            {q.links.code && (
                              <a href={q.links.code} target="_blank" rel="noopener noreferrer" title="Code">
                                <FaCode className="text-purple-300 text-2xl" />
                              </a>
                            )}
                            {q.links.custom && (
                              <a href={q.links.custom} target="_blank" rel="noopener noreferrer" title="Custom">
                                <FaCode className="text-white text-2xl" />
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
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isMarked}
                              onChange={() => toggleCheckbox(uniqueKey, 'isMarkedForRevision')}
                              className="accent-red-500 cursor-pointer w-4 h-4"
                            />
                          </td>
                          <td className="py-2 px-3 text-center text-2xl">
                            {q.solutionLink ? (
                              <a href={q.solutionLink} target="_blank" rel="noopener noreferrer" title="Solution">
                                <FaGithub />
                              </a>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="py-2 px-3 text-center relative">
                            <button
                              onClick={() => setOpenNoteId(uniqueKey)}
                              className="hover:scale-110 transition-transform duration-150"
                              title={local.note?.trim() === '' ? 'Add Note' : 'Edit Note'}
                            >
                              {(local.note || '').trim() === '' ? (
                                <Plus className="text-white w-6 h-6" />
                              ) : (
                                <StickyNote className="text-amber-400 w-6 h-6" />
                              )}
                            </button>

                            {openNoteId === uniqueKey && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
                                <div className="bg-[#1e1e1e] w-full max-w-3xl h-[80vh] rounded-2xl border border-gray-700 shadow-2xl p-6 relative">
                                  <button
                                    onClick={() => setOpenNoteId(null)}
                                    className="absolute top-4 right-4 text-white hover:text-red-500"
                                  >
                                    <X className="w-6 h-6" />
                                  </button>
                                  <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                                    Notes for: {q.title}
                                  </h2>
                                  <textarea
                                    className="w-full h-[calc(100%-100px)] p-4 bg-zinc-900 text-white rounded-md border border-blue-500 resize-none"
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
                                      className="px-6 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg"
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
