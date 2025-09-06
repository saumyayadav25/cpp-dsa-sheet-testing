'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type CompanyQuestion, companies as initialCompanies } from '@/data/companyQuestions';

interface QuestionState {
  [questionId: number]: {
    isSolved: boolean;
    isMarkedForRevision: boolean;
  };
}

interface QuestionContextType {
  questionStates: QuestionState;
  updateQuestionState: (questionId: number, updates: Partial<{ isSolved: boolean; isMarkedForRevision: boolean }>) => void;
  getQuestionState: (questionId: number) => { isSolved: boolean; isMarkedForRevision: boolean };
  resetAllProgress: () => void;
  getProgressStats: () => {
    totalQuestions: number;
    solvedQuestions: number;
    markedForRevision: number;
    progressPercentage: number;
  };
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

const STORAGE_KEY = 'company_questions_progress';

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [questionStates, setQuestionStates] = useState<QuestionState>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setQuestionStates(parsed);
      }
    } catch (error) {
      console.error('Failed to load question progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questionStates));
    } catch (error) {
      console.error('Failed to save question progress:', error);
    }
  }, [questionStates]);

  const updateQuestionState = (questionId: number, updates: Partial<{ isSolved: boolean; isMarkedForRevision: boolean }>) => {
    setQuestionStates(prev => ({
      ...prev,
      [questionId]: {
        isSolved: prev[questionId]?.isSolved ?? false,
        isMarkedForRevision: prev[questionId]?.isMarkedForRevision ?? false,
        ...updates,
      }
    }));
  };

  const getQuestionState = (questionId: number) => {
    return questionStates[questionId] ?? { isSolved: false, isMarkedForRevision: false };
  };

  const resetAllProgress = () => {
    setQuestionStates({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const getProgressStats = () => {
    // Get all unique questions across all companies
    const allQuestions = new Set<number>();
    initialCompanies.forEach(company => {
      company.questions.forEach(question => {
        allQuestions.add(question.id);
      });
    });

    const totalQuestions = allQuestions.size;
    let solvedQuestions = 0;
    let markedForRevision = 0;

    allQuestions.forEach(questionId => {
      const state = getQuestionState(questionId);
      if (state.isSolved) solvedQuestions++;
      if (state.isMarkedForRevision) markedForRevision++;
    });

    const progressPercentage = totalQuestions > 0 ? (solvedQuestions / totalQuestions) * 100 : 0;

    return {
      totalQuestions,
      solvedQuestions,
      markedForRevision,
      progressPercentage,
    };
  };

  return (
    <QuestionContext.Provider value={{
      questionStates,
      updateQuestionState,
      getQuestionState,
      resetAllProgress,
      getProgressStats,
    }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestionContext must be used within a QuestionProvider');
  }
  return context;
}

// Hook to get questions with their current state
export function useQuestionsWithState(questions: CompanyQuestion[]) {
  const { getQuestionState } = useQuestionContext();
  
  return questions.map(question => ({
    ...question,
    ...getQuestionState(question.id),
  }));
}
