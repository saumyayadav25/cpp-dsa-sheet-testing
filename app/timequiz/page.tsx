'use client';

import { useState, useEffect } from "react";
import questions from '@/data/questions.json';
import styles from './TimeQuiz.module.css';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const TIME_PER_QUES = 10;

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUES);
  const [isFinished, setIsFinished] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  const current = questions[currentIdx];

  useEffect(() => {
    const savedStreak = localStorage.getItem("userStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  useEffect(() => {
      if (!showWelcome && (quizStarted || isFinished)) return;

      if (countdown === 0) {
          setQuizStarted(true);
          setTimeLeft(TIME_PER_QUES);
          return;
      }

      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
  }, [countdown, quizStarted, isFinished, showWelcome]);

  useEffect(() => {
      if (!quizStarted || isFinished) return;

      if (timeLeft === 0) {
          goNext();
          return;
      }

      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, isFinished]);

  const goNext = () => {
      const nextIdx = currentIdx + 1;
      if (nextIdx >= questions.length) {
          setIsFinished(true);
      } else {
          setCurrentIdx(nextIdx);
          setSelected(null);
          setTimeLeft(TIME_PER_QUES);
      }
}


  const handleOption = (option: string) => {
      setSelected(option);

      if (option === current.answer) {
        setScore((prev) => prev + 1);
      }

      setTimeout(goNext, 500);
  }


  const startQuiz = () => {
      setShowWelcome(false);
  };

  const restart = () => {
      setCurrentIdx(0);
      setSelected(null);
      setScore(0);
      setTimeLeft(TIME_PER_QUES);
      setIsFinished(false);
      setCountdown(3);
      setQuizStarted(false);
      setShowWelcome(true);
  };

  return (
    <>
      <Navbar streak={streak} />
      <main 
        className="relative bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-16 pt-16 sm:pt-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url(/bg.png)" }}
      >
        <div className={styles.quizContainer}>
          {showWelcome && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className={styles.welcomeScreen}
            >
              <motion.h1
                variants={fadeInUp}
                custom={0}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground drop-shadow-lg"
              >
                What's Your <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sleep</span> Score
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                custom={1}
                className="text-xl sm:text-1xl md:text-1xl lg:text-1xl font-semibold text-foreground drop-shadow-md max-w-2xl mx-auto mb-6"
              >
                To learn you have to Listen, To improve you have to try
              </motion.p>
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="flex justify-center relative mb-8"
              >
                <img
                  src="quiz.png"
                  alt="Quiz Hero"
                  className="w-[80vw]"
                  draggable="false"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20 rounded-full blur-3xl scale-110"></div>
              </motion.div>
              <motion.button
                variants={fadeInUp}
                custom={3}
                className={styles.startButton}
                onClick={startQuiz}
              >
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

      {!showWelcome && quizStarted && !isFinished && (
        <div className={styles.quizContent}>
          <h2>Question {currentIdx + 1} / {questions.length}</h2>
          <p>{current.question}</p>
          <div className={styles.optionsContainer}>
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOption(option)}
                disabled={!!selected}
                className={`${styles.optionButton} ${selected === option ? styles.selectedOption : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className={styles.timer}>Time Left: {timeLeft}s</p>
        </div>
      )}

      {!showWelcome && isFinished && (
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