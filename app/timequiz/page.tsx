'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const TIME_PER_QUES = 10;

// Define a type for our question structure
interface Question {
  question: string;
  options: string[];
  answer: string;
}

// Minimal User shape expected from auth endpoint
interface User {
  _id: string;
  name?: string;
  email?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const TimeQuiz = () => {
  const router = useRouter();

  // State for dynamically fetched questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUES);
  const [isFinished, setIsFinished] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  // Recent attempts and stats
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [stats, setStats] = useState<{ avgScore?: number; totalQuizzes?: number } | null>(null);

  // State for feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  // --- NEW: State for the exit confirmation modal ---
  const [showExitModal, setShowExitModal] = useState(false);

  // Fetch questions from our new API route
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/generate-quiz');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer logic for the countdown before the quiz starts
  useEffect(() => {
    if (showWelcome || quizStarted || isFinished || isLoading) return;
    if (countdown === 1) {
      const timer = setTimeout(() => {
        setQuizStarted(true);
        setTimeLeft(TIME_PER_QUES);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdown > 1) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, quizStarted, isFinished, showWelcome, isLoading]);

  // Timer logic for each question
  useEffect(() => {
    if (!quizStarted || isFinished || showFeedback) return;
    if (timeLeft === 0) {
      handleOption("Time's up!");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, isFinished, showFeedback]);

  // Track whether results were saved to server to avoid duplicate calls
  const [savedToServer, setSavedToServer] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user || null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        console.debug("Auth check failed or not logged in", err);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.push('/sign-in');
    }
  }, [authChecked, isLoggedIn, router]);

  // When user becomes available, fetch recent attempts and stats
  useEffect(() => {
    if (!user?._id) return;

    const fetchRecentAndStats = async () => {
      try {
        const recentRes = await fetch(`/api/quiz-results/${user._id}/recent`);
        if (recentRes.ok) {
          const recentData = await recentRes.json();
          setRecentAttempts(recentData || []);
        }
      } catch (e) {
        console.debug("Failed to fetch recent attempts", e);
      }

      try {
        const statsRes = await fetch(`/api/quiz-results/${user._id}/stats`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData || null);
        }
      } catch (e) {
        console.debug("Failed to fetch stats", e);
      }
    };

    fetchRecentAndStats();
  }, [user]);

  // Save results to server (used when quiz finishes or butterfly is clicked)
  const saveResults = async () => {
    if (savedToServer) return;

    if (!user?._id) {
      console.warn("No authenticated user found — skipping saveResults.");
      return;
    }

    try {
      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          quizId: "dsa_quiz",
          score: score,
          totalQuestions: questions.length,
          correctAnswers: score,
          quizType: "MCQ",
        }),
      });

      if (!response.ok) {
        console.error("Failed to save quiz result");
      } else {
        console.log("Quiz result saved successfully");
        setSavedToServer(true);
      }
    } catch (err) {
      console.error("Error saving quiz result:", err);
    }
  };

  // Updated goNext that will save results when the quiz finishes
  const goNext = async () => {
    setShowFeedback(false);
    setFeedbackText("");

    const nextIdx = currentIdx + 1;

    if (nextIdx >= questions.length) {
      // Quiz is finished
      setIsFinished(true);

      // Call API to save result
      await saveResults();
    } else {
      setCurrentIdx(nextIdx);
      setSelected(null);
      setTimeLeft(TIME_PER_QUES);
    }
  };

  const handleOption = async (option: string) => {
    if (selected) return; // Prevent multiple selections

    setSelected(option);
    setShowFeedback(true);
    setIsFeedbackLoading(true);

    const currentQuestion = questions[currentIdx];
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    // Get feedback from Gemini
    try {
      const response = await fetch('/api/generate-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: option,
          correctAnswer: currentQuestion.answer
        })
      });
      const data = await response.json();
      setFeedbackText(data.explanation || "Feedback couldn't be loaded.");
    } catch (error) {
      setFeedbackText("Error loading feedback.");
    } finally {
      setIsFeedbackLoading(false);
    }
  }

  const startQuiz = () => {
    if (isLoading || questions.length === 0) return; // Don't start if questions aren't loaded
    setShowWelcome(false);
    setCountdown(3);
  };

  const restart = () => {
    window.location.reload(); // Easiest way to get a new set of questions
  };

  // --- NEW: Function to handle exiting the quiz ---
  const handleExitQuiz = () => {
    // Hide the modal and return to the welcome screen without saving progress
    setShowExitModal(false);
    setShowWelcome(true);
    setQuizStarted(false);
    setIsFinished(false);

    // Reset quiz state
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(TIME_PER_QUES);
    setSavedToServer(false);
  };


  const current = questions[currentIdx];

  if (!authChecked || isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl dark:bg-black dark:text-white">Loading Quiz...</div>;
  }

  if (!isLoggedIn) {
    return <div className="flex items-center justify-center min-h-screen text-2xl dark:bg-black dark:text-white">Redirecting to sign in...</div>;
  }

  return (
    <>
      {(showWelcome || isFinished) && <Navbar />}
      <main className={`relative bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden`}
        style={{ backgroundImage: "url(/bg.png)" }}>
        <div className="relative z-10 max-w-[1152px] mx-auto w-full flex flex-col justify-center items-center min-h-[calc(100vh-12rem)] text-center">
          {showWelcome && (
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="max-w-[600px] w-full text-center">
              <motion.h1 variants={fadeInUp} custom={0} className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                What's Your <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">DSA</span> Score
              </motion.h1>
              <motion.p variants={fadeInUp} custom={1} className="text-lg md:text-xl font-semibold drop-shadow-md max-w-2xl mx-auto mb-6">
                Test your knowledge with AI-generated questions.
              </motion.p>
              <motion.div variants={fadeInUp} custom={2} className="flex justify-center relative mb-8">
                <img src="quiz.png" alt="Quiz Hero" className="w-[80vw] max-w-sm" draggable="false" />
              </motion.div>
              <motion.button variants={fadeInUp} custom={3} className="bg-gradient-to-r from-green-500 via-blue-600 to-green-500 text-white font-semibold px-6 py-3 rounded-md shadow-lg w-full sm:w-auto" onClick={startQuiz}>
                Start Quiz
              </motion.button>

              {/* Recent attempts & stats (visible before starting) */}
              <div className="mt-6 text-left w-full">
                {stats && (
                  <div className="flex gap-4 items-center justify-start mb-4">
                    <div className="px-4 py-3 bg-white/5 rounded-md">
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                      <div className="text-lg font-bold">{Math.round((stats.avgScore || 0) * 100) / 100}%</div>
                    </div>
                    <div className="px-4 py-3 bg-white/5 rounded-md">
                      <div className="text-xs text-muted-foreground">Total Quizzes</div>
                      <div className="text-lg font-bold">{stats.totalQuizzes || 0}</div>
                    </div>
                  </div>
                )}

                {recentAttempts.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold mb-2">Recent attempts</h3>
                    <ul className="space-y-2">
                      {recentAttempts.map((r) => (
                        <li key={r._id} className="flex justify-between items-center bg-white/5 p-3 rounded-md">
                          <div className="text-sm">Score: <span className="font-semibold">{r.score} / {r.totalQuestions}</span></div>
                          <div className="text-xs text-muted-foreground">{new Date(r.timestamp || r.createdAt || r.updatedAt).toLocaleString()}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {!showWelcome && !quizStarted && !isFinished && (
            <div className="text-xl">
              <h2>Quiz is about to start in</h2>
              <div className="text-6xl font-bold mt-4">{countdown}</div>
            </div>
          )}

          {quizStarted && !isFinished && current && (
            <div className="w-full h-screen text-current p-12 flex flex-col items-center justify-center relative">
              {/* --- NEW: Exit Button --- */}
              <button
                onClick={() => setShowExitModal(true)}
                className="absolute top-6 left-6 px-4 py-2 bg-black/20 border border-white/10 rounded-md text-sm font-semibold hover:bg-red-500 hover:border-red-500 transition-colors"
              >
                Exit
              </button>

              <div className="flex justify-between items-start mb-6 w-full max-w-[1200px]">
                <div className="flex-1 text-left max-w-[70%]">
                  <div className="text-2xl font-medium leading-7">
                    {currentIdx + 1}. {current.question}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-red-50 border border-red-200 rounded-lg px-4 py-3 text-center min-w-[120px]">
                  <div className="text-sm text-red-600 font-medium mb-2">Time Left</div>
                  <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 w-full max-w-[1200px] mt-4">
                {current.options.map((option) => {
                  const isCorrect = option === current.answer;
                  const isSelected = selected === option;

                  let optionClass = "bg-gradient-to-r from-white/5 to-white/3 border border-purple-200 text-current cursor-pointer rounded-lg p-6 text-left text-base font-medium leading-6 shadow-md min-h-[70px] flex items-center gap-4 transition-all duration-300";
                  if (selected) {
                    if (isCorrect) optionClass += " bg-green-500 text-white border-green-600 -translate-y-1 scale-105 shadow-lg";
                    else if (isSelected) optionClass += " bg-red-500 text-white border-red-600";
                    else optionClass += " opacity-50 cursor-not-allowed";
                  }

                  return (
                    <button key={option} onClick={() => handleOption(option)} disabled={!!selected} className={optionClass}>
                      <div className="flex-1">{option}</div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="mt-6 p-4 rounded-lg bg-black/20 border border-white/10 backdrop-blur text-current w-full max-w-[1200px] text-center">
                  {isFeedbackLoading ? <p>Loading feedback...</p> : <p>{feedbackText}</p>}
                  {!isFeedbackLoading && (
                    <button onClick={goNext} className="mt-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-4 py-2 rounded-md font-bold">
                      {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {isFinished && (
            <div className="max-w-[720px] w-full">
              <div className="bg-gradient-to-r from-white/5 to-white/3 rounded-xl p-6 text-left shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Quiz Finished</h2>
                    <p className="text-sm text-muted-foreground">Good job — here's your result</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Score</div>
                    <div className="text-3xl font-extrabold">{score} / {questions.length}</div>
                    <div className="text-sm">{Math.round((score / Math.max(1, questions.length)) * 100)}%</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white/3 rounded-md">
                    <div className="text-xs text-muted-foreground">Total Questions</div>
                    <div className="font-semibold">{questions.length}</div>
                  </div>
                  <div className="p-3 bg-white/3 rounded-md">
                    <div className="text-xs text-muted-foreground">Correct Answers</div>
                    <div className="font-semibold">{score}</div>
                  </div>
                  <div className="p-3 bg-white/3 rounded-md">
                    <div className="text-xs text-muted-foreground">Saved</div>
                    <div className="font-semibold">{savedToServer ? 'Yes' : 'Not saved'}</div>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={restart} className="px-4 py-2 bg-blue-600 text-white rounded-md font-bold">Restart Quiz</button>
                  <button onClick={async () => await saveResults()} className={`px-4 py-2 rounded-md font-semibold ${savedToServer ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-pink-500 text-white'}`} disabled={savedToServer}>
                    {savedToServer ? 'Saved' : 'Save Result'}
                  </button>
                  <button onClick={() => { setShowFeedback(false); setIsFinished(false); setCurrentIdx(0); setSelected(null); setScore(0); }} className="px-4 py-2 bg-transparent border border-white/10 rounded-md">Review Questions</button>
                </div>

                {recentAttempts.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-2">Recent attempts</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {recentAttempts.map(r => (
                        <div key={r._id} className="flex justify-between items-center bg-white/5 p-3 rounded-md">
                          <div className="text-sm">{new Date(r.timestamp || r.createdAt || r.updatedAt).toLocaleString()}</div>
                          <div className="font-semibold">{r.score} / {r.totalQuestions}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- NEW: Exit Confirmation Modal --- */}
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-gray-800 border border-white/10 rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
              <h3 className="text-lg font-bold mb-2">Exit Quiz?</h3>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to exit? Your current progress will not be saved.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-500 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitQuiz}
                  className="px-6 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default TimeQuiz;