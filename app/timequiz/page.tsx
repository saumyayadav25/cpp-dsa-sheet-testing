'use client';

import { useState, useEffect } from "react";
import questions from '@/data/questions.json';
import styles from './TimeQuiz.module.css';

const TIME_PER_QUES = 10;

const TimeQuiz = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUES);
  const [isFinished, setIsFinished] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);

  const current = questions[currentIdx];

  useEffect(() => {
      if (quizStarted || isFinished) return;

      if (countdown === 0) {
          setQuizStarted(true);
          setTimeLeft(TIME_PER_QUES);
          return;
      }

      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
  }, [countdown, quizStarted, isFinished]);

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


  const restart = () => {
      setCurrentIdx(0);
      setSelected(null);
      setScore(0);
      setTimeLeft(TIME_PER_QUES);
      setIsFinished(false);
      setCountdown(3);
      setQuizStarted(false);
  };

  return (
    <div className={styles.quizContainer}>
      {!quizStarted && !isFinished && (
        <div className={styles.countdown}>
          <h2>Quiz is about to start in</h2>
          <div className={styles.countdownNumber}>{countdown}</div>
        </div>
      )}

      {quizStarted && !isFinished && (
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

      {isFinished && (
        <div className={styles.finishedContainer}>
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button className={styles.restartButton} onClick={restart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default TimeQuiz;