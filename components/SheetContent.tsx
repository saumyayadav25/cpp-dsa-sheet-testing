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
import Footer from "@/components/Footer"; // Use the same footer as notes page

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

type SheetContentProps = {
  difficultyFilter: string;
  statusFilter: string; // fixed typo from "statuses"
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
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [completedTopics, setCompletedTopics] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem("dsa-completed-topics");
      if (raw) return new Set<number>(JSON.parse(raw));
    } catch (e) {}
    return new Set<number>();
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err: any) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Escape for modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSignInModal) {
        setShowSignInModal(false);
      }
    };

    if (showSignInModal) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [showSignInModal]);

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

  const difficultyClasses = {
    easy: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-300",
    hard: "text-red-600 dark:text-red-400",
  };

  const toggleTopic = (topicId: number) => {
    setOpenTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  async function sendProgressUpdate(payload: {
    questionDifficulty?: string | null;
    topicName?: string | null;
    topicCompleted?: string | null;
  }) {
    try {
      if (!isLoggedIn || !user) return null;
      const body = {
        userId: user._id,
        questionDifficulty: payload.questionDifficulty ?? null,
        topicName: payload.topicName ?? null,
        topicCompleted: payload.topicCompleted ?? null,
      };
      const res = await axios.post("/api/progress/update", body);
      return res.data;
    } catch (err) {
      console.error("Error sending progress update:", err);
      return null;
    }
  }

  const toggleCheckbox = async (
    id: string,
    field: "isSolved" | "isMarkedForRevision",
    questionDifficulty?: string,
    topicName?: string
  ) => {
    if (!isLoggedIn || !user) {
      setShowSignInModal(true);
      return;
    }

    const currentFieldValue = !!(progress[id]?.[field]);

    if (!topicName) {
      const [topicIdStr] = id.split("-");
      const topicId = parseInt(topicIdStr);
      const topic = sampleTopics.find((t) => t.id === topicId);
      topicName = topic?.name || undefined;
    }

    setProgress((prev) => {
      const updated = { ...(prev[id] || {}) };
      updated[field] = !currentFieldValue;
      if (field === "isSolved" && !currentFieldValue) {
        updated.solvedAt = new Date().toISOString();
      }
      return { ...prev, [id]: updated };
    });

    if (field === "isSolved" && !currentFieldValue) {
      try {
        await sendProgressUpdate({
          questionDifficulty: questionDifficulty ?? null,
          topicName: topicName ?? null,
        });
        const audio = new Audio("/sounds/done.mp3");
        audio.play().catch(() => {});
      } catch (err) {
        console.error("Error updating progress for solved question:", err);
      }
    }
  };

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

  if (totalFiltered === 0) {
    return (
      <div className="p-8 bg-gray-950 text-white">
        <EmptyState
          message="No questions match your filters"
          suggestion="Try removing or changing some filters to see results."
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Auth Notice */}
        {(!isLoggedIn || !user) && (
          <div className="mb-6 bg-amber-900/20 border border-amber-800 rounded-lg p-4">
            <p className="text-amber-200 text-sm">
              <strong>Sign in required:</strong> Please{" "}
              <a href="/sign-in" className="underline hover:text-amber-100">
                sign in
              </a>{" "}
              to track your progress.
            </p>
          </div>
        )}

        {/* Topics */}
        {sampleTopics.map((topic) => {
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

          return (
            <div
              key={topic.id}
              className="mb-8 border border-gray-700 rounded-lg shadow bg-gray-900"
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-800 hover:bg-gray-700 transition rounded-t-lg"
              >
                <span className="text-lg font-medium text-white">{topic.name}</span>
                <span className="text-sm text-gray-400">
                  ✅ {solvedQ}/{totalQ} solved
                </span>
              </button>

              {openTopics.includes(topic.id) && (
                <div className="overflow-x-auto bg-gray-900 px-4 py-3 rounded-b-lg">
                  <table className="min-w-full table-fixed text-white">
                    <thead>
                      <tr className="border-b border-gray-700 text-gray-300">
                        <th className="py-2 px-3">Question</th>
                        <th className="py-2 px-3">Links</th>
                        <th className="py-2 px-3">Difficulty</th>
                        <th className="py-2 px-3">Status</th>
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
                            className="border-b border-gray-800 hover:bg-gray-800"
                          >
                            <td className="py-2 px-3">{q.title}</td>
                            <td className="py-2 px-3 flex justify-center gap-2">
                              {q.links.leetcode && (
                                <a href={q.links.leetcode} target="_blank">
                                  <SiLeetcode className="text-orange-500 text-2xl" />
                                </a>
                              )}
                              {q.links.gfg && (
                                <a href={q.links.gfg} target="_blank">
                                  <SiGeeksforgeeks className="text-green-500 text-2xl" />
                                </a>
                              )}
                            </td>
                            <td className={`py-2 px-3 text-center font-semibold ${difficultyClasses[q.difficulty]}`}>
                              {q.difficulty}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <input
                                type="checkbox"
                                checked={isSolved}
                                disabled={!isLoggedIn || !user}
                                onChange={() =>
                                  toggleCheckbox(key, "isSolved", q.difficulty, topic.name)
                                }
                                className="accent-green-500"
                              />
                            </td>
                            <td className="py-2 px-3 text-center">
                              <input
                                type="checkbox"
                                checked={isMarked}
                                disabled={!isLoggedIn || !user}
                                onChange={() =>
                                  toggleCheckbox(key, "isMarkedForRevision", undefined, topic.name)
                                }
                                className="accent-red-500"
                              />
                            </td>
                            <td className="py-2 px-3 text-center">
                              {q.solutionLink ? (
                                <a href={q.solutionLink} target="_blank">
                                  <FaGithub className="text-2xl" />
                                </a>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <button onClick={() => setOpenNoteId(key)}>
                                {!local.note ? (
                                  <Plus className="w-6 h-6 text-gray-400" />
                                ) : (
                                  <StickyNote className="w-6 h-6 text-amber-400" />
                                )}
                              </button>
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
      </div>


    
    </div> 
  );
} // <-- Add this to close the function