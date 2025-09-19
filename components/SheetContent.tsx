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
import { Plus, StickyNote, X } from "lucide-react";
import axios from "axios";
import ProgressTracker from "./ProgressTracker";
import RichTextEditor from "./RichTextEditor";

// Types from the API
interface Question {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isSolved: boolean;
  isMarkedForRevision: boolean;
  links: {
    leetcode?: string;
    gfg?: string;
    hackerrank?: string;
    spoj?: string;
    ninja?: string;
    code?: string;
    custom?: string;
  };
  solutionLink?: string;
  companies?: string[];
}

interface Topic {
  id: number;
  name: string;
  questions: Question[];
}

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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    } catch (e) { }
    return new Set<number>();
  });

  // Fetch topics from API
  useEffect(() => {
    console.log("SheetContent mount - fetchTopics start")
    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/questions');

        // Try to parse JSON response body when available (even on non-2xx)
        let data: any = null;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            data = await response.json();
          }
        } catch (parseErr) {
          console.warn('Failed to parse JSON from /api/questions response', parseErr);
        }

        // If server returned non-OK, prefer server-provided message if any
        if (!response.ok) {
          const serverMsg = data?.message || data?.error || `HTTP error! status: ${response.status}`;
          throw new Error(serverMsg);
        }

        console.log('Fetch /api/questions response:', data);

        if (data && typeof data === 'object' && data.success) {
          // Defensive: ensure data.data is an array
          const incoming = Array.isArray(data.data) ? data.data : [];
          setTopics(incoming);
        } else {
          throw new Error(data?.error || data?.message || 'Failed to fetch questions');
        }
      } catch (err: any) {
        console.error('Error fetching topics:', err);
        setError(err.message || 'Failed to load questions');
        setTopics([]); // Set empty array as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 503) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showSignInModal) {
        setShowSignInModal(false);
      }
    };

    if (showSignInModal) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
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

  // Debug: log key state changes to help trace persistent loading issues
  useEffect(() => {
    console.log('SheetContent state:', { loading, topicsLength: topics.length, error });
  }, [loading, topics.length, error]);

  // Defensive: ensure loading is false when topics have been populated
  useEffect(() => {
    if (loading && topics.length > 0) {
      console.log('Defensive: topics arrived while loading=true — forcing loading=false');
      setLoading(false);
    }
  }, [loading, topics.length]);
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
    easy: "text-green-600 dark:text-green-500",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-500",
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
      console.log("Sending progress update:", payload);

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
    console.log("Auth state:", { isLoggedIn, user });

    // Check if user is authenticated before allowing any changes
    if (!isLoggedIn || !user) {
      console.log("User not authenticated, showing modal");
      // Show the sign-in modal instead of browser confirm
      setShowSignInModal(true);
      return;
    }

    const currentFieldValue = !!(progress[id]?.[field]);
    console.log("Toggling checkbox:", { id, field, questionDifficulty, topicName });

    // Fail-safe: recover topicName if missing
    if (!topicName) {
      const [topicIdStr] = id.split("-");
      const topicId = parseInt(topicIdStr);
      const topic = topics.find((t: Topic) => t.id === topicId);
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
        audio.play().catch((err) => console.log("Audio play blocked or failed", err));
      } catch (err) {
        console.error("Error updating progress for solved question:", err);
      }
    }
  };

  useEffect(() => {
    const currentlyCompleted = new Set<number>();

    topics.forEach((topic: Topic) => {
      const totalQ = topic.questions.length;
      const solvedQ = topic.questions.filter((q: Question) => {
        const key = `${topic.id}-${q.id}`;
        return (progress[key]?.isSolved ?? q.isSolved) === true;
      }).length;
      if (solvedQ === totalQ) currentlyCompleted.add(topic.id);
    });

    const newCompletions: number[] = [];
    currentlyCompleted.forEach((id) => {
      if (!completedTopics.has(id)) newCompletions.push(id);
    });

    if (newCompletions.length === 0) return;

    (async () => {
      for (const topicId of newCompletions) {
        const topic = topics.find((t: Topic) => t.id === topicId);
        if (!topic) continue;

        try {
          // Fire celebration ONLY for brand-new completion (not stored previously)
          // Confetti (dynamic import for CSR only)
          import('canvas-confetti').then((confetti) => {
            confetti.default({
              particleCount: 250,
              spread: 90,
              origin: { y: 0.6 },
            });
          }).catch(() => { });

          // Lightweight toast (no external lib; ephemeral div)
          const toast = document.createElement('div');
          toast.className = 'fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md z-[9999] text-sm animate-fade-in';
          toast.textContent = `Congrats! You've completed "${topic.name}" 🎉`;
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => toast.remove(), 600);
          }, 2600);

          if (isLoggedIn && user) {
            await sendProgressUpdate({
              questionDifficulty: null,
              topicCompleted: topic.name,
            });
          } else {
            console.log(`Guest completed topic "${topic.name}" — persisting locally only`);
          }
          setCompletedTopics((prev) => new Set(prev).add(topicId));
        } catch (err) {
          console.error("Error notifying server about topic completion", err);
        }
      }
    })();
  }, [progress, isLoggedIn, user, topics]);

  const totalFiltered = topics.reduce((sum: number, topic: Topic) => {
    return (
      sum +
      topic.questions.filter((q: Question) => {
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

  // Show loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-8">
        <EmptyState
          message="Failed to load questions"
          suggestion={`Error: ${error}. Please try refreshing the page.`}
        />
      </div>
    );
  }

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

  return (
    <>
      {/* Dev debug panel - only visible in non-production builds */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-4 right-4 z-50 text-xs bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2 shadow-lg">
          <div className="font-semibold">Sheet Debug</div>
          <div>loading: {String(loading)}</div>
          <div>topics: {topics.length}</div>
          <div style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>error: {error || '-'}</div>
        </div>
      )}
      {/* Authentication Notice */}
      {(!isLoggedIn || !user) && (
        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Sign in required:</strong> To track your progress and mark questions as solved or for revision, please{' '}
              <a href="/sign-in" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-medium">
                sign in to your account
              </a>.
            </p>
          </div>
        </div>
      )}

      {topics.map((topic: Topic) => {
        const filtered = topic.questions.filter((q: Question) => {
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
        const solvedQ = topic.questions.filter((q: Question) => {
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
              className="w-full px-4 py-3 flex justify-between items-center bg-background hover:bg-gray-100 dark:hover:bg-zinc-900 transition rounded-lg"
              aria-expanded={openTopics.includes(topic.id)}
              aria-controls={`topic-${topic.id}-body`}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">{topic.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium px-2 py-2 ml-auto">
                {<ProgressTracker
                  totalQuestions={totalQ}
                  solvedQuestions={solvedQ}
                  topicName={topic.name}
                  isCompleted={completed}
                />}
              </span>
              <svg
                className={`h-5 w-5 transition-transform ${openTopics.includes(topic.id) ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Topic Body */}
            {openTopics.includes(topic.id) && (
              <div id={`topic-${topic.id}-body`} className="overflow-x-auto bg-background px-4 py-3 rounded-lg">
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
                    {filtered.map((q: Question) => {
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
                          <td className={`py-2 px-3 text-center font-semibold ${difficultyClasses[q.difficulty as keyof typeof difficultyClasses]}`}>
                            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSolved}
                              disabled={!isLoggedIn || !user}
                              onChange={() => toggleCheckbox(key, "isSolved", q.difficulty, topic.name)}
                              className={`w-4 h-4 ${!isLoggedIn || !user ? 'cursor-not-allowed opacity-50' : 'accent-green-500'}`}
                              aria-label={`Mark '${q.title}' as solved`}
                              title={!isLoggedIn || !user ? "Please sign in to mark as solved" : "Mark as solved"}
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isMarked}
                              disabled={!isLoggedIn || !user}
                              onChange={() => toggleCheckbox(key, "isMarkedForRevision", undefined, topic.name)}
                              className={`w-4 h-4 ${!isLoggedIn || !user ? 'cursor-not-allowed opacity-50' : 'accent-red-500'}`}
                              aria-label={`Mark '${q.title}' for revision`}
                              title={!isLoggedIn || !user ? "Please sign in to mark for revision" : "Mark for revision"}
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
                              {!local.note || local.note.trim() === "" ? (
                                <Plus className="w-6 h-6 text-gray-600 dark:text-white" />
                              ) : (
                                <StickyNote className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                              )}
                            </button>
                            {openNoteId === key && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-black/60 via-black/50 to-black/70 dark:from-black/80 dark:via-black/70 dark:to-black/90 animate-in fade-in duration-300">
                                <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 w-full max-w-4xl h-[85vh] rounded-3xl border-2 border-blue-200/50 dark:border-blue-500/30 shadow-2xl shadow-blue-500/20 dark:shadow-blue-400/10 p-0 relative transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
                                  
                                  {/* Header with gradient background */}
                                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900 rounded-t-3xl p-6 relative overflow-hidden">
                                    {/* Decorative background pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 backdrop-blur-sm"></div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                                    
                                    <div className="relative flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                          <StickyNote className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                          <h2 className="text-xl font-bold text-white mb-1">
                                            Notes
                                          </h2>
                                          <p className="text-blue-100 text-sm font-medium truncate max-w-md">
                                            {q.title}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <button
                                        onClick={() => setOpenNoteId(null)}
                                        className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                                        aria-label="Close notes"
                                      >
                                        <X className="w-5 h-5 text-white group-hover:text-red-200 transition-colors" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Content area */}
                                  <div className="p-6 h-[calc(100%-140px)]">
                                    <RichTextEditor
                                      value={local.note || ""}
                                      onChange={(value) =>
                                        setProgress((prev) => ({
                                          ...prev,
                                          [key]: { ...prev[key], note: value },
                                        }))
                                      }
                                      onSave={() => {
                                        // Auto-save functionality - notes are already saved to localStorage
                                        console.log('Notes saved for question:', q.title);
                                        // You could add additional save logic here (e.g., save to server)
                                      }}
                                      placeholder="Start writing your notes... Use the toolbar above for formatting!"
                                      className="h-full"
                                    />
                                  </div>

                                  {/* Footer */}
                                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 rounded-b-3xl bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-sm">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>Auto-saved to local storage</span>
                                      </div>
                                      
                                      <div className="flex space-x-3">
                                        <button
                                          onClick={() => setOpenNoteId(null)}
                                          className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                                        >
                                          Close
                                        </button>
                                        <button
                                          onClick={() => {
                                            // Export notes functionality
                                            const noteContent = local.note || '';
                                            if (noteContent.trim()) {
                                              // Create a temporary element to convert HTML to text
                                              const tempDiv = document.createElement('div');
                                              tempDiv.innerHTML = noteContent;
                                              const textContent = tempDiv.textContent || tempDiv.innerText || '';
                                              
                                              // Create and download the file
                                              const blob = new Blob([`Notes for: ${q.title}\n\n${textContent}`], { type: 'text/plain' });
                                              const url = URL.createObjectURL(blob);
                                              const a = document.createElement('a');
                                              a.href = url;
                                              a.download = `notes-${q.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                                              document.body.appendChild(a);
                                              a.click();
                                              document.body.removeChild(a);
                                              URL.revokeObjectURL(url);
                                            } else {
                                              alert('No notes to export for this question.');
                                            }
                                          }}
                                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                                        >
                                          Export
                                        </button>
                                      </div>
                                    </div>
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

      {/* Sign-In Required Modal */}
      {console.log("Modal state:", showSignInModal)}
      {showSignInModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSignInModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Sign In Required
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                You need to sign in to mark questions as solved or for revision. This helps us track your progress and provide personalized recommendations.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
