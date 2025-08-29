"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FlashcardComponent from "@/components/FlashcardComponent";
import ReportIssueButton from "@/components/ReportIssueButton";
import { flashcards, categories, difficulties, type Flashcard } from "@/data/flashcards";
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Filter, Trophy } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem('flashcard_current_index');
    const savedReviewed = localStorage.getItem('flashcard_reviewed');
    const savedCategoryFilter = localStorage.getItem('flashcard_category_filter');
    const savedDifficultyFilter = localStorage.getItem('flashcard_difficulty_filter');
    
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
    if (savedReviewed) setReviewedCards(new Set(JSON.parse(savedReviewed)));
    if (savedCategoryFilter) setCategoryFilter(savedCategoryFilter);
    if (savedDifficultyFilter) setDifficultyFilter(savedDifficultyFilter);
  }, []);

  // Filter flashcards
  const filteredCards = flashcards.filter(card => {
    const categoryMatch = categoryFilter === "All" || card.category === categoryFilter;
    const difficultyMatch = difficultyFilter === "All" || card.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  // Reset index and flip state when filtered cards change
  useEffect(() => {
    if (currentIndex >= filteredCards.length && filteredCards.length > 0) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [filteredCards.length, currentIndex]);

  // Reset current index when filters change to prevent out-of-bounds
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [categoryFilter, difficultyFilter]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('flashcard_current_index', currentIndex.toString());
    localStorage.setItem('flashcard_reviewed', JSON.stringify([...reviewedCards]));
    localStorage.setItem('flashcard_category_filter', categoryFilter);
    localStorage.setItem('flashcard_difficulty_filter', difficultyFilter);
  }, [currentIndex, reviewedCards, categoryFilter, difficultyFilter]);

  const currentCard = filteredCards[currentIndex];
  const reviewedCount = filteredCards.filter(card => reviewedCards.has(card.id)).length;
  const progress = filteredCards.length > 0 ? (reviewedCount / filteredCards.length) * 100 : 0;

  // Ensure currentCard exists to prevent undefined errors
  if (!currentCard && filteredCards.length > 0) {
    return null; // Prevent rendering while state is updating
  }

  const handleNext = () => {
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // Mark card as reviewed when flipped for the first time
    if (!isFlipped && currentCard && !reviewedCards.has(currentCard.id)) {
      setReviewedCards(prev => new Set([...prev, currentCard.id]));
    }
  };

  const resetProgress = () => {
    setReviewedCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetFilters = () => {
    setCategoryFilter("All");
    setDifficultyFilter("All");
  };

  if (filteredCards.length === 0) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden">
        <Navbar />
        
        <div className="px-6 md:px-20 py-24 flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl">
              📚
            </div>
            <h2 className="text-2xl font-bold mb-4">No flashcards found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters to see more flashcards.
            </p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">
      <Navbar />
      
      <main className="pt-6">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="px-6 md:px-20 py-8 relative"
        >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-cyan-50/30 dark:from-blue-900/20 dark:via-transparent dark:to-cyan-900/20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto pt-8">
          {/* Header */}
          <motion.div variants={fadeInUp} custom={0} className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
                🧠
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                DSA <span className="text-blue-500">Flashcards</span>
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Master core Data Structures & Algorithms concepts with interactive flashcards
            </p>
          </motion.div>

          {/* Stats and Controls */}
          <motion.div variants={fadeInUp} custom={1} className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Progress Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{currentIndex + 1}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current</div>
              </div>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{reviewedCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reviewed</div>
              </div>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">{filteredCards.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  showFilters 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10'
                }`}
              >
                <Filter size={18} />
                Filters
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetProgress}
                className="flex items-center gap-2 px-4 py-3 bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all"
              >
                <RotateCcw size={18} />
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setCategoryFilter(category)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              categoryFilter === category
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Difficulty
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {difficulties.map((difficulty) => (
                          <button
                            key={difficulty}
                            onClick={() => setDifficultyFilter(difficulty)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              difficultyFilter === difficulty
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {difficulty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Elegant Progress Design */}
          <motion.div variants={fadeInUp} custom={2} className="mb-6">
            <div className="max-w-2xl mx-auto">
              {/* Minimalist Progress Header */}
              <div className="text-center mb-4">
                <motion.div
                  key={Math.round(progress)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-4 px-8 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-xl"
                >
                  <div className="text-4xl font-light text-gray-900 dark:text-white">
                    {Math.round(progress)}<span className="text-2xl text-gray-500 dark:text-gray-400">%</span>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {reviewedCount}<span className="text-gray-500 dark:text-gray-400">/{filteredCards.length}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mastered
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sophisticated Progress Bar */}
              <div className="relative">
                {/* Background track */}
                <div className="h-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  {/* Progress fill with gradient */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut" 
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress milestones */}
                <div className="absolute -top-1 left-0 right-0 flex justify-between">
                  {[0, 25, 50, 75, 100].map((milestone) => (
                    <motion.div
                      key={milestone}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        progress >= milestone
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-white shadow-lg scale-110'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}
                      animate={{
                        scale: progress >= milestone ? 1.1 : 1,
                        boxShadow: progress >= milestone 
                          ? "0 0 20px rgba(59, 130, 246, 0.5)" 
                          : "0 0 0px rgba(0, 0, 0, 0)"
                      }}
                      transition={{ duration: 0.3, delay: milestone * 0.02 }}
                    >
                      {progress >= milestone && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Elegant completion message */}
              <AnimatePresence>
                {progress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mt-8 text-center"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full">
                      <div className="text-2xl">🎉</div>
                      <div className="text-lg font-medium text-green-600 dark:text-green-400">
                        All concepts mastered!
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Flashcard */}
          <motion.div variants={fadeInUp} custom={3} className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <FlashcardComponent
                  flashcard={currentCard}
                  isFlipped={isFlipped}
                  onFlip={handleFlip}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div variants={fadeInUp} custom={4} className="flex justify-center items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </motion.button>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {reviewedCards.has(currentCard.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-green-600 dark:text-green-400"
                >
                  <Trophy size={16} />
                  Reviewed
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={filteredCards.length <= 1}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Next
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </main>
    </div>
  );
}
