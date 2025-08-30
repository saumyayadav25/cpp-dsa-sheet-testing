import React from "react";
import styles from './QuizResult.module.css';


type Question = {
  question: string;
  topic: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

type QuizResultProps = {
  score: number;
  totalQuestions: number;
  questions: Question[];
  onRestart?: () => void;
};

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  questions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className={styles.quizContainer}>
      <h1 className={styles.quizTitle}>Quiz Finished!</h1>
      <h2 className={styles.quizScore}>
        Your Score: <span>{score}</span> / {totalQuestions}
      </h2>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className={`${styles.questionCard} ${
            q.isCorrect ? styles.correct : styles.incorrect
          }`}
        >
          <h3>
            Question {index + 1}: {q.question}
          </h3>
          <p>
            <strong>Topic:</strong> {q.topic}
          </p>
          <p>
            <strong>Your Answer:</strong>{" "}
            <span className={q.isCorrect ? styles.correctText : styles.incorrectText}>
              {q.userAnswer}
            </span>
          </p>
          <p>
            <strong>Correct Answer:</strong>{" "}
            <span className={styles.correctText}>{q.correctAnswer}</span>
          </p>
        </div>
      ))}

      <button 
        id="restartQuizButton" 
        className={styles.restartButton}
        onClick={onRestart}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizResult;
