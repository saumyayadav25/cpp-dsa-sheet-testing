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
  }>(() => {
    // Ensure this runs only on the client
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      const stored = localStorage.getItem("dsa-progress");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse dsa-progress from localStorage", e);
      return {};
    }
  });
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
      // console.log("stored",stored);
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
    questionId: string;
    isSolved: boolean;
    isMarkedForRevision: boolean;
    questionDifficulty?: string | null;
    topicName?: string | null;
    topicCompleted?: string | null;
  }) {
    try {
      if (!isLoggedIn || !user) return null;
      console.log("Sending progress update:", payload);

      const body = {
        userId: user._id,
        ...payload,
        // topicName: currentQuestion.topic, // Ensure this is being sent
      };

      const res = await axios.post("/api/progress/update", body);
      console.log("Progress update response:", res.data);
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
      const [topicIdStr,questionId] = id.split("-");
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
      console.log("updated",{ ...prev, [id]: updated });
      return { ...prev, [id]: updated };
    });

      if (field === "isSolved" || field === "isMarkedForRevision") {
      try {
        const updatedValue = !currentFieldValue;
        await sendProgressUpdate({
          questionId: id,
          isSolved: field === "isSolved" ? updatedValue : progress[id]?.isSolved ?? false,
          isMarkedForRevision: field === "isMarkedForRevision" ? updatedValue : progress[id]?.isMarkedForRevision ?? false,
          questionDifficulty: questionDifficulty ?? null,
          topicName: topicName ?? null,
          // topicCompleted: topicName ?? null,
        });
    
        if (field === "isSolved" && updatedValue) {
          const audio = new Audio("/sounds/done.mp3");
          audio.play().catch((err) => console.log("Audio play blocked or failed", err));
        }
      } catch (err) {
        console.error(`Error updating progress for ${field}:`, err);
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
          toast.className = 'fixed top-5 right-5 z-50 text-xs bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2 shadow-lg';
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
              questionId: "",
              isSolved: false,
              isMarkedForRevision: false
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
      
      {/* Authentication Notice */}
      {(!isLoggedIn || !user) && (
        <div className="mb-8 bg-gradient-to-r from-amber-50/90 to-orange-50/90 dark:from-amber-900/30 dark:to-orange-900/30 backdrop-blur-md border border-amber-200/40 dark:border-amber-700/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Sign in to track your progress
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                To track your progress and mark questions as solved or for revision, please{' '}
                <a 
                  href="/sign-in" 
                  className="inline-flex items-center font-semibold underline hover:text-amber-900 dark:hover:text-amber-100 transition-colors duration-200"
                >
                  sign in to your account
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
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
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-blue-200/30 dark:border-blue-700/30 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
            >
              {/* Topic Header */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-5 flex justify-between items-center bg-gradient-to-r from-blue-50/60 to-indigo-50/60 dark:from-slate-800/60 dark:to-slate-700/60 hover:from-blue-100/80 hover:to-indigo-100/80 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 group border-b border-blue-200/20 dark:border-blue-700/20"
                aria-expanded={openTopics.includes(topic.id)}
                aria-controls={`topic-${topic.id}-body`}
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {topic.name}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <ProgressTracker
                      totalQuestions={totalQ}
                      solvedQuestions={solvedQ}
                      topicName={topic.name}
                      isCompleted={completed}
                    />
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${
                      openTopics.includes(topic.id) ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </button>

              {/* Topic Body */}
              {openTopics.includes(topic.id) && (
                <div id={`topic-${topic.id}-body`} className="bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-slate-900/40 dark:to-slate-800/40 backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-blue-200/30 dark:border-blue-700/30 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
                          <th className="py-4 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Question</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Links</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Difficulty</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Solved</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Revision</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Solution</th>
                          <th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-200/20 dark:divide-blue-700/20">
                        {filtered.map((q: Question) => {
                          const key = `${topic.id}-${q.id}`;
                          const local = progress[key] || {};
                          const isSolved = local.isSolved ?? q.isSolved;
                          const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;

                          return (
                            <tr
                              key={key}
                              className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 transition-all duration-200 group"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-1 h-8 rounded-full ${
                                    isSolved ? 'bg-green-500' : 
                                    isMarked ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
                                  }`}></div>
                                  <span className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {q.title}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex justify-center gap-2 flex-wrap">
                                  {q.links.leetcode && (
                                    <a 
                                      href={q.links.leetcode} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all duration-200 hover:scale-110"
                                    >
                                      <SiLeetcode className="text-orange-500 text-xl hover:text-orange-400" />
                                    </a>
                                  )}
                                  {q.links.gfg && (
                                    <a 
                                      href={q.links.gfg} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 hover:scale-110"
                                    >
                                      <SiGeeksforgeeks className="text-green-500 text-xl hover:text-green-400" />
                                    </a>
                                  )}
                                  {q.links.hackerrank && (
                                    <a 
                                      href={q.links.hackerrank} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200 hover:scale-110"
                                    >
                                      <SiHackerrank className="text-gray-600 dark:text-white text-xl hover:text-cyan-400" />
                                    </a>
                                  )}
                                  {q.links.spoj && (
                                    <a 
                                      href={q.links.spoj} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200 hover:scale-110"
                                    >
                                      <SiSpoj className="text-gray-600 dark:text-white text-xl hover:text-cyan-400" />
                                    </a>
                                  )}
                                  {q.links.ninja && (
                                    <a 
                                      href={q.links.ninja} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all duration-200 hover:scale-110"
                                    >
                                      <SiCodingninjas className="text-gray-600 dark:text-white text-xl hover:text-indigo-400" />
                                    </a>
                                  )}
                                  {q.links.code && (
                                    <a 
                                      href={q.links.code} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 hover:scale-110"
                                    >
                                      <FaCode className="text-blue-500 dark:text-blue-200 text-xl hover:text-blue-300" />
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                  q.difficulty === 'easy' 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700'
                                    : q.difficulty === 'medium'
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700'
                                }`}>
                                  {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex justify-center">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isSolved}
                                      disabled={!isLoggedIn || !user}
                                      onChange={() => toggleCheckbox(key, "isSolved", q.difficulty, topic.name)}
                                      className="sr-only"
                                      aria-label={`Mark '${q.title}' as solved`}
                                      title={!isLoggedIn || !user ? "Please sign in to mark as solved" : "Mark as solved"}
                                    />
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                      isSolved 
                                        ? 'bg-green-500 border-green-500 text-white' 
                                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
                                    } ${!isLoggedIn || !user ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}>
                                      {isSolved && (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex justify-center">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isMarked}
                                      disabled={!isLoggedIn || !user}
                                      onChange={() => toggleCheckbox(key, "isMarkedForRevision", undefined, topic.name)}
                                      className="sr-only"
                                      aria-label={`Mark '${q.title}' for revision`}
                                      title={!isLoggedIn || !user ? "Please sign in to mark for revision" : "Mark for revision"}
                                    />
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                      isMarked 
                                        ? 'bg-yellow-500 border-yellow-500 text-white' 
                                        : 'border-gray-300 dark:border-gray-600 hover:border-yellow-400 dark:hover:border-yellow-500'
                                    } ${!isLoggedIn || !user ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}>
                                      {isMarked && (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  </label>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                {q.solutionLink ? (
                                  <a 
                                    href={q.solutionLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110"
                                  >
                                    <FaGithub className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                                  </a>
                                ) : (
                                  <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  onClick={() => setOpenNoteId(key)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-blue-200/50 dark:border-slate-600 transition-all duration-200 hover:scale-110 group"
                                  aria-expanded={openNoteId === key}
                                >
                                  {!local.note || local.note.trim() === "" ? (
                                    <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                                  ) : (
                                    <StickyNote className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notes Modal */}
      {openNoteId && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setOpenNoteId(null)}
        >
          <div
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <StickyNote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Question Notes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add your thoughts, approach, or solution notes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenNoteId(null)}
                className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <RichTextEditor
                value={progress[openNoteId]?.note || ""}
                onChange={(value) => {
                  setProgress((prev) => ({
                    ...prev,
                    [openNoteId]: { ...(prev[openNoteId] || {}), note: value },
                  }));
                }}
                placeholder="Write your notes, approach, solution explanation, or any thoughts about this question..."
                className="min-h-[400px]"
                onSave={() => setOpenNoteId(null)}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <button
                onClick={() => setOpenNoteId(null)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/80 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenNoteId(null)}
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign-In Required Modal */}
      {console.log("Modal state:", showSignInModal)}
      {showSignInModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSignInModal(false)}
        >
          <div
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-4">
                <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sign in required
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                You need to sign in to mark questions as solved or for revision. This helps us track your progress and provide personalized recommendations.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-gray-700/80 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
                <a
                  href="/sign-in"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
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
