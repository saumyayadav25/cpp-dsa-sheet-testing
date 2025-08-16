'use client';

import { useState, useEffect } from "react";
import styles from './TimeQuiz.module.css';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const TIME_PER_QUES = 10;

// Define a type for our question structure
interface Question {
  question: string;
  options: string[];
  answer: string;
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

  // State for feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

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
        // Handle error: maybe show a message to the user
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
      handleOption("Time's up!"); // Handle timeout as an incorrect answer
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, isFinished, showFeedback]);

  const goNext = () => {
    setShowFeedback(false);
    setFeedbackText("");
    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIdx(nextIdx);
      setSelected(null);
      setTimeLeft(TIME_PER_QUES);
    }
  }

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

  const current = questions[currentIdx];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl dark:bg-black dark:text-white">Loading Quiz...</div>;
  }

  return (
    <>
      {(showWelcome || isFinished) && <Navbar />}
      <main className={`relative bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden`}
        style={{ backgroundImage: "url(/bg.png)" }}>
        <div className={styles.quizContainer}>
          {showWelcome && (
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className={styles.welcomeScreen}>
              <motion.h1 variants={fadeInUp} custom={0} className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                What's Your <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">DSA</span> Score
              </motion.h1>
              <motion.p variants={fadeInUp} custom={1} className="text-lg md:text-xl font-semibold drop-shadow-md max-w-2xl mx-auto mb-6">
                Test your knowledge with AI-generated questions.
              </motion.p>
              <motion.div variants={fadeInUp} custom={2} className="flex justify-center relative mb-8">
                 <img src="quiz.png" alt="Quiz Hero" className="w-[80vw] max-w-sm" draggable="false" />
              </motion.div>
              <motion.button variants={fadeInUp} custom={3} className={styles.startButton} onClick={startQuiz}>
                Start Quiz
              </motion.button>
            </motion.div>
          )}

          {!showWelcome && !quizStarted && !isFinished && (
            <div className={styles.countdown}>
              <h2>Quiz is about to start in</h2>
              <div className={styles.countdownNumber}>{countdown}</div>
            </div>
          )}
          
          {quizStarted && !isFinished && current && (
            <div className={styles.quizContent}>
              <div className={styles.quizHeader}>
                <div className={styles.questionSection}>
                  <div className={styles.questionText}>
                    {currentIdx + 1}. {current.question}
                  </div>
                </div>
                <div className={styles.timerSection}>
                  <div className={styles.timerLabel}>Time Left</div>
                  <div className={styles.timerValue}>{timeLeft}s</div>
                </div>
              </div>

              <div className={styles.optionsContainer}>
                {current.options.map((option) => {
                  const isCorrect = option === current.answer;
                  const isSelected = selected === option;

                  let optionClass = styles.optionButton;
                  if (selected) {
                    if (isCorrect) optionClass += ` ${styles.correct}`;
                    else if (isSelected) optionClass += ` ${styles.incorrect}`;
                  }

                  return (
                    <button key={option} onClick={() => handleOption(option)} disabled={!!selected} className={optionClass}>
                      <div className={styles.optionText}>{option}</div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={styles.feedbackContainer}>
                    {isFeedbackLoading ? <p>Loading feedback...</p> : <p>{feedbackText}</p>}
                    {!isFeedbackLoading && (
                        <button onClick={goNext} className={styles.nextButton}>
                            {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
                        </button>
                    )}
                </div>
              )}
            </div>
          )}

          {isFinished && (
            <div className={styles.finishedContainer}>
              <h2>Quiz Finished!</h2>
              <p>Your Score: {score} / {questions.length}</p>
              <button className={styles.restartButton} onClick={restart}>Restart Quiz</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default TimeQuiz;