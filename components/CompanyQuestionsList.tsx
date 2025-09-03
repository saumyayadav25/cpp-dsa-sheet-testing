'use client';

import { useState, useEffect } from 'react';
import { type CompanyQuestion } from '@/data/companyQuestions';
import { useQuestionContext, useQuestionsWithState } from '@/contexts/QuestionContext';
import { ExternalLink, Clock, Tag, CheckCircle, Circle, Star, StarOff } from 'lucide-react';

interface CompanyQuestionsListProps {
  questions: CompanyQuestion[];
  companyName: string;
}

export default function CompanyQuestionsList({ questions, companyName }: CompanyQuestionsListProps) {
  const { updateQuestionState } = useQuestionContext();
  const questionsWithState = useQuestionsWithState(questions);
  const [filteredQuestions, setFilteredQuestions] = useState(questionsWithState);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get all unique tags from questions
  const allTags = Array.from(new Set(questions.flatMap(q => q.tags))).sort();

  useEffect(() => {
    let filtered = questionsWithState;

    if (difficultyFilter) {
      filtered = filtered.filter(q => q.difficulty === difficultyFilter);
    }

    if (statusFilter) {
      if (statusFilter === 'solved') {
        filtered = filtered.filter(q => q.isSolved);
      } else if (statusFilter === 'unsolved') {
        filtered = filtered.filter(q => !q.isSolved);
      } else if (statusFilter === 'revision') {
        filtered = filtered.filter(q => q.isMarkedForRevision);
      }
    }

    if (tagFilter) {
      filtered = filtered.filter(q => q.tags.includes(tagFilter));
    }

    if (frequencyFilter) {
      filtered = filtered.filter(q => q.frequency === frequencyFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredQuestions(filtered);
  }, [questionsWithState, difficultyFilter, statusFilter, tagFilter, frequencyFilter, searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'very-high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const toggleSolved = (questionId: number) => {
    const currentState = questionsWithState.find(q => q.id === questionId);
    updateQuestionState(questionId, { isSolved: !currentState?.isSolved });
  };

  const toggleRevision = (questionId: number) => {
    const currentState = questionsWithState.find(q => q.id === questionId);
    updateQuestionState(questionId, { isMarkedForRevision: !currentState?.isMarkedForRevision });
  };

  const resetFilters = () => {
    setDifficultyFilter('');
    setStatusFilter('');
    setTagFilter('');
    setFrequencyFilter('');
    setSearchTerm('');
  };

  const solvedCount = filteredQuestions.filter(q => q.isSolved).length;
  const progressPercentage = filteredQuestions.length > 0 ? (solvedCount / filteredQuestions.length) * 100 : 0;

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {solvedCount} / {filteredQuestions.length} solved
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {progressPercentage.toFixed(1)}% complete
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex flex-wrap gap-4">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
            <option value="revision">Marked for Revision</option>
          </select>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">All Topics</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">All Frequencies</option>
            <option value="very-high">Very High</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            onClick={resetFilters}
            className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded px-4 py-2 hover:bg-red-500/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 ${
              question.isSolved ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => toggleSolved(question.id)}
                    className="flex-shrink-0"
                  >
                    {question.isSolved ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-green-600" />
                    )}
                  </button>
                  
                  <h3 className={`font-medium text-lg ${question.isSolved ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {question.title}
                  </h3>
                  
                  <button
                    onClick={() => toggleRevision(question.id)}
                    className="flex-shrink-0"
                  >
                    {question.isMarkedForRevision ? (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    ) : (
                      <StarOff className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                    )}
                  </button>
                </div>
                
                {question.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {question.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(question.frequency)}`}>
                {question.frequency} frequency
              </span>
              
              {question.lastAsked && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {question.lastAsked}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.entries(question.links).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {platform}
                  </a>
                )
              ))}
              
              {question.solutionLink && (
                <a
                  href={question.solutionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  Solution
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Circle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No questions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters to see more questions.
          </p>
        </div>
      )}
    </div>
  );
}
