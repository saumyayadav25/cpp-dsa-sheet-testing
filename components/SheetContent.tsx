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
import axios from "axios";

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

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
      isSolved?: boolean;
      isMarkedForRevision?: boolean;
      note?: string;
      solvedAt?: string;
    };
  }>({});
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Completed topics persisted (store topic ids or names — using topic.id here)
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem("dsa-completed-topics");
      if (raw) {
        return new Set<number>(JSON.parse(raw));
      }
    } catch (e) {
      // ignore
    }
    return new Set<number>();
  });


  // Auth check (runs once)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };
    checkAuth();
  }, []);

  // Load & persist per-question progress (local cache)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dsa-progress");
      if (stored) setProgress(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse dsa-progress from localStorage", e);
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("dsa-progress", JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to persist dsa-progress", e);
    }
  }, [progress]);

  // Persist completedTopics set
  useEffect(() => {
    try {
      localStorage.setItem(
        "dsa-completed-topics",
        JSON.stringify(Array.from(completedTopics))
      );
    } catch (e) {
      console.error("Failed to persist completed topics", e);
    }
  }, [completedTopics]);

  // Helper: call progress update for a single question (or for topic completion)
  async function sendProgressUpdate(payload: {
    questionDifficulty?: string | null;
    topicCompleted?: string | null;
  }) {
    try {
      if (!isLoggedIn || !user) return null;

      const body = {
        userId: user._id,
        questionDifficulty: payload.questionDifficulty ?? null,
        topicCompleted: payload.topicCompleted ?? null,
      };

      // Update progress in backend
      const res = await axios.post("/api/progress/update", body);

      // ✅ If a topic was completed, also award the badge
      if (payload.topicCompleted) {
        try {
          const badgeRes = await axios.post("/api/badges", {
            userId: user._id,
            topicCompleted: payload.topicCompleted
          });
          console.log("Badge awarded:", badgeRes.data);
        } catch (badgeErr) {
          console.error("Error awarding badge:", badgeErr);
        }
      }

      return res.data;
    } catch (err) {
      console.error("Error sending progress update:", err);
      return null;
    }
  }


  // Toggle checkbox (solved/revision)
  const toggleCheckbox = async (
    id: string,
    field: "isSolved" | "isMarkedForRevision",
    questionDifficulty?: string,
    topicCompleted?: string
  ) => {
    // Read current value from latest state to avoid stale reads
    const currentFieldValue = !!(progress[id]?.[field]);

    // Optimistic UI update
    setProgress((prev) => {
      const updated = { ...(prev[id] || {}) };
      updated[field] = !currentFieldValue;
      if (field === "isSolved" && !currentFieldValue) {
        updated.solvedAt = new Date().toISOString();
      }
      return { ...prev, [id]: updated };
    });

    // Only fire backend update when marking solved (not when unchecking)
    if (field === "isSolved" && !currentFieldValue) {
      try {
        // If the caller already passed topicCompleted (meaning they determined this question completed the topic),
        // it's fine to pass that through; otherwise we'll detect topic completion centrally below.
        await sendProgressUpdate({
          questionDifficulty: questionDifficulty ?? null,
          topicCompleted: topicCompleted ?? null,
        });

        // Play success sound
        const audio = new Audio("/sounds/done.mp3");
        audio.play().catch((err) =>
          console.log("Audio play blocked or failed", err)
        );
      } catch (err) {
        console.error("Error updating progress for solved question:", err);
      }
    }
  };

  // Expand/collapse topic
  const toggleTopic = (topicId: number) => {
    setOpenTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const difficultyClasses = {
    easy: "text-green-600 dark:text-green-500",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-500",
  };

  //
  // CENTRAL TOPIC-COMPLETION DETECTION
  //
  // Whenever `progress` or `user` changes, compute which topics are now completed.
  // For any newly completed topic that we haven't previously recorded in completedTopics,
  // call the backend once (via /api/progress/update) with topicCompleted to update server-side progress & trigger badge awarding.
  //
  useEffect(() => {
    // Build list/set of topic ids that are completed according to current progress
    const currentlyCompleted = new Set<number>();

    sampleTopics.forEach((topic) => {
      const totalQ = topic.questions.length;
      const solvedQ = topic.questions.filter((q) => {
        const key = `${topic.id}-${q.id}`;
        return (progress[key]?.isSolved ?? q.isSolved) === true;
      }).length;
      if (solvedQ === totalQ) {
        currentlyCompleted.add(topic.id);
      }
    });

    // Find new completions = currentlyCompleted - completedTopics
    const newCompletions: number[] = [];
    currentlyCompleted.forEach((id) => {
      if (!completedTopics.has(id)) newCompletions.push(id);
    });

    if (newCompletions.length === 0) return;

    // For each new completion: call backend once (if logged in) and add to completedTopics set
    (async () => {
      for (const topicId of newCompletions) {
        const topic = sampleTopics.find((t) => t.id === topicId);
        if (!topic) continue;

        try {
          if (isLoggedIn && user) {
            // Pass topic name so backend can push into progress.topicsCompleted and award badges
            await sendProgressUpdate({
              questionDifficulty: null,
              topicCompleted: topic.name,
            });
          } else {
            // Not logged in: just persist locally (we avoid calling server)
            console.log(
              `Guest completed topic "${topic.name}" — persisting locally only`
            );
          }

          // Mark as handled locally so we won't re-send later
          setCompletedTopics((prev) => new Set(prev).add(topicId));
        } catch (err) {
          console.error("Error notifying server about topic completion", err);
          // If error, don't mark as completedTopics so we can retry later
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, isLoggedIn, user]); // note: completedTopics used inside setter, persisted separately

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
                className={`h-5 w-5 transition-transform ${openTopics.includes(topic.id) ? "rotate-180" : ""
                  }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
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
                            {q.links.leetcode && (
                              <a href={q.links.leetcode} target="_blank" rel="noopener noreferrer">
                                <SiLeetcode className="text-orange-500 text-2xl hover:text-orange-400" />
                              </a>
                            )}
                            {q.links.gfg && (
                              <a href={q.links.gfg} target="_blank" rel="noopener noreferrer">
                                <SiGeeksforgeeks className="text-green-500 text-2xl hover:text-green-400" />
                              </a>
                            )}
                            {q.links.hackerrank && (
                              <a href={q.links.hackerrank} target="_blank" rel="noopener noreferrer">
                                <SiHackerrank className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" />
                              </a>
                            )}
                            {q.links.spoj && (
                              <a href={q.links.spoj} target="_blank" rel="noopener noreferrer">
                                <SiSpoj className="text-gray-600 dark:text-white text-2xl hover:text-cyan-400" />
                              </a>
                            )}
                            {q.links.ninja && (
                              <a href={q.links.ninja} target="_blank" rel="noopener noreferrer">
                                <SiCodingninjas className="text-gray-600 dark:text-white text-2xl hover:text-indigo-400" />
                              </a>
                            )}
                            {q.links.code && (
                              <a href={q.links.code} target="_blank" rel="noopener noreferrer">
                                <FaCode className="text-blue-500 dark:text-blue-200 text-2xl hover:text-blue-300" />
                              </a>
                            )}
                          </td>
                          <td className={`py-2 px-3 text-center font-semibold ${difficultyClasses[q.difficulty]}`}>
                            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSolved}
                              onChange={() =>
                                toggleCheckbox(
                                  key,
                                  "isSolved",
                                  q.difficulty,
                                  // Pass topicCompleted only when this change likely completes the topic.
                                  // We still have central detection so this is optional.
                                  completed ? topic.name : undefined
                                )
                              }
                              className="accent-green-500 w-4 h-4"
                              aria-label={`Mark '${q.title}' as solved`}
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
                                <FaGithub className="text-2xl hover:text-gray-400 dark:hover:text-gray-100" />
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
