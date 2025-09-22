"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Filter,
  Layers,
  MonitorCog,
  Network,
  Search,
  Sheet,
  Sprout,
  Zap,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ConceptCard from "@/components/ui/conceptCard";
import Navbar2 from "@/components/Navbar";
import FlashcardComponent from "@/components/FlashcardComponent";
import { motion, AnimatePresence } from "framer-motion";

// Flashcard type (from DB)
export type Flashcard = {
  id: number;
  term: string;
  explanation: string;
  difficulty: string;
  category: string;
};

// ====================
// Core cheatsheet data
// ====================
const coreConcept = [
  {
    title: "OOPS",
    description:
      "Object-Oriented Programming focuses on classes, objects, inheritance, polymorphism, and encapsulation.",
    icon: <BookOpen />,
    level: "easy",
    questions: [
      { questionTitle: "OOPS belongs to which subject?", optionA: "Computer Science", optionB: "Geology", optionC: "Math", optionD: "Zoology", level: "hard" },
      { questionTitle: "Which of these is not a principle of OOPS?", optionA: "Inheritance", optionB: "Polymorphism", optionC: "Encapsulation", optionD: "Photosynthesis", level: "medium" },
    ],
    topic: ["classes", "objects", "inheritance"],
  },
  {
    title: "DBMS",
    description:
      "Database Management System helps in creating, managing, and retrieving data efficiently.",
    icon: <Layers />,
    level: "medium",
    questions: [
      { questionTitle: "Which of the following is a DBMS software?", optionA: "MySQL", optionB: "Photoshop", optionC: "MS Word", optionD: "Excel", level: "easy" },
      { questionTitle: "What is normalization in DBMS?", optionA: "Organizing data to reduce redundancy", optionB: "Adding more tables", optionC: "Deleting duplicate records", optionD: "Converting text to uppercase", level: "medium" },
    ],
    topic: ["SQL", "normalization", "transactions"],
  },
  {
    title: "Operating System",
    description:
      "An OS manages hardware and software resources, provides services, and enables interaction between user and computer.",
    icon: <MonitorCog />,
    level: "hard",
    questions: [
      { questionTitle: "Which of the following is not an OS?", optionA: "Linux", optionB: "Windows", optionC: "MS Excel", optionD: "MacOS", level: "easy" },
      { questionTitle: "What is the purpose of a process scheduler?", optionA: "Manage memory allocation", optionB: "Select process from ready queue", optionC: "Format hard disk", optionD: "Connect to network", level: "hard" },
    ],
    topic: ["processing", "memory", "scheduling"],
  },
  {
    title: "Computer Networks",
    description:
      "Computer networks connect multiple devices to share resources, data, and communication services.",
    icon: <Network />,
    level: "easy",
    questions: [
      { questionTitle: "Which of these is a networking device?", optionA: "Router", optionB: "Compiler", optionC: "Keyboard", optionD: "Printer", level: "easy" },
      { questionTitle: "Which protocol is used for secure web browsing?", optionA: "HTTP", optionB: "FTP", optionC: "HTTPS", optionD: "SMTP", level: "medium" },
    ],
    topic: ["protocols", "OSI model", "topologies"],
  },
];

const totalQuestions = coreConcept.reduce((count, concept) => count + concept.questions.length, 0);
const rounded = Math.floor(totalQuestions / 50) * 50;
const displayQuestions = totalQuestions % 50 === 0 ? `${rounded} Questions` : `${rounded}+ Questions`;

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"cheatsheets" | "flashcards">("cheatsheets");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // ====================
  // Flashcard state
  // ====================
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [difficulties, setDifficulties] = useState<string[]>(["All"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // ====================
  // Fetch flashcards from API
  // ====================
  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await fetch("/api/flashcards", { cache: "no-store" });
        const data: Flashcard[] = await res.json();
        setFlashcards(data);

        const validCards = data.filter((c) => c.category && c.difficulty);
        setCategories(["All", ...Array.from(new Set(validCards.map((c) => c.category)))]);
        setDifficulties(["All", ...Array.from(new Set(validCards.map((c) => c.difficulty)))]);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    }
    fetchFlashcards();
  }, []);

  // ====================
  // Persist flashcard progress in localStorage
  // ====================
  useEffect(() => {
    const savedIndex = localStorage.getItem("flashcard_current_index");
    const savedReviewed = localStorage.getItem("flashcard_reviewed");
    const savedCategoryFilter = localStorage.getItem("flashcard_category_filter");
    const savedDifficultyFilter = localStorage.getItem("flashcard_difficulty_filter");

    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
    if (savedReviewed) setReviewedCards(new Set(JSON.parse(savedReviewed)));
    if (savedCategoryFilter) setCategoryFilter(savedCategoryFilter);
    if (savedDifficultyFilter) setDifficultyFilter(savedDifficultyFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem("flashcard_current_index", currentIndex.toString());
    localStorage.setItem("flashcard_reviewed", JSON.stringify([...reviewedCards]));
    localStorage.setItem("flashcard_category_filter", categoryFilter);
    localStorage.setItem("flashcard_difficulty_filter", difficultyFilter);
  }, [currentIndex, reviewedCards, categoryFilter, difficultyFilter]);

  // ====================
  // Flashcard navigation
  // ====================
  const filteredCards = flashcards.filter((card) => {
    const categoryMatch = categoryFilter === "All" || card.category === categoryFilter;
    const difficultyMatch = difficultyFilter === "All" || card.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  useEffect(() => {
    if (currentIndex >= filteredCards.length && filteredCards.length > 0) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [filteredCards.length, currentIndex]);

  const currentCard = filteredCards[currentIndex];
  const reviewedCount = filteredCards.filter((card) => reviewedCards.has(card.id)).length;
  const progress = filteredCards.length > 0 ? (reviewedCount / filteredCards.length) * 100 : 0;

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
    if (!isFlipped && currentCard && !reviewedCards.has(currentCard.id)) {
      setReviewedCards((prev) => new Set([...prev, currentCard.id]));
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

  // ====================
  // Cheatsheet filtering
  // ====================
  const filteredSubjects = coreConcept
    .filter((con, idx, arr) => arr.findIndex((c) => c.title === con.title) === idx)
    .filter((con) => {
      const matchesSearch =
        con.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        con.topic.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = !selectedSubject || con.title === selectedSubject;
      return matchesSearch && matchesSubject;
    });

  // ====================
  // UI
  // ====================
  return (
    <div className="min-h-screen bg-background pt-12">
      <Navbar2 />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-experience/10 to-experience/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Theory Cheatsheets
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Master the fundamentals with our comprehensive collection of
              interview questions and concepts.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{coreConcept.length} Core Topics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>{displayQuestions}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sprout className="h-4 w-4" />
                <span>Track Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="px-4 pt-6 container mx-auto">
        <div className="flex gap-4 border-b border-border">
          <button onClick={() => setActiveTab("cheatsheets")} className={`px-4 py-2 text-sm font-medium relative ${activeTab === "cheatsheets" ? "text-primary" : "text-muted-foreground"}`}>
            Cheatsheets
            {activeTab === "cheatsheets" && <span className="absolute left-0 -bottom-px h-0.5 w-full bg-primary" />}
          </button>
          <button onClick={() => setActiveTab("flashcards")} className={`px-4 py-2 text-sm font-medium relative ${activeTab === "flashcards" ? "text-primary" : "text-muted-foreground"}`}>
            Flashcards
            {activeTab === "flashcards" && <span className="absolute left-0 -bottom-px h-0.5 w-full bg-primary" />}
          </button>
        </div>
      </div>

      {/* Cheatsheets */}
      {activeTab === "cheatsheets" && (
        <>
          <section className="py-8 px-4 border-b bg-secondary/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search subjects, topics..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-wrap gap-6 items-stretch justify-center px-4 py-8">
            {filteredSubjects.map((sub) => (
              <ConceptCard key={sub.title} title={sub.title} description={sub.description} icon={sub.icon} level={sub.level} topic={sub.topic} noOfQuestion={sub.questions.length} />
            ))}
          </section>
        </>
      )}

      {/* Flashcards */}
      {activeTab === "flashcards" && (
        <motion.div className="max-w-screen mt-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          {/* Control Buttons */}
          <div className="flex gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-2 h-12 py-1 rounded-xl font-medium transition-all ${showFilters ? "bg-blue-600 text-white shadow-lg" : "bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10"}`}>
              <Filter size={18} />
              Filters
            </button>
            <button onClick={resetProgress} className="flex items-center gap-2 px-2 h-12 py-1 bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all">
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          {/* Flashcard display */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {filteredCards.length > 0 && currentCard ? (
                <motion.div key={currentCard.id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                  <FlashcardComponent flashcard={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />
                </motion.div>
              ) : (
                <motion.div key="no-flashcard" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full max-w-2xl mx-auto h-80 flex items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                  <div className="text-center p-8">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">No Flashcard Available</h3>
                    <p className="text-red-600 dark:text-red-400">Please check your filters or add new flashcards.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6">
            <button onClick={handlePrevious} disabled={filteredCards.length <= 1} className="flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft size={20} />
              Previous
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {currentCard && reviewedCards.has(currentCard.id) && (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Trophy size={16} />
                  Reviewed
                </span>
              )}
            </div>
            <button onClick={handleNext} disabled={filteredCards.length <= 1} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Page;
