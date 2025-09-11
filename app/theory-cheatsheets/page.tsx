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
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ConceptCard from "@/components/ui/conceptCard";
import Navbar from "@/components/ui/Navbar-interview";
// Flashcards imports (migrated from former /flashcards page)
import Navbar2 from "@/components/Navbar";
import FlashcardComponent from "@/components/FlashcardComponent";
import { flashcards, categories, difficulties, type Flashcard } from "@/data/flashcards";
import { ChevronLeft, ChevronRight, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const coreConcept = [
  {
    title: "OOPS",
    description:
      "Object-Oriented Programming focuses on classes, objects, inheritance, polymorphism, and encapsulation.",
    icon: <BookOpen />,
    level: "easy",
    questions: [
      {
        questionTitle: "OOPS belongs to which subject?",
        optionA: "Computer Science",
        optionB: "Geology",
        optionC: "Math",
        optionD: "Zoology",
        level: "hard",
      },
      {
        questionTitle: "Which of these is not a principle of OOPS?",
        optionA: "Inheritance",
        optionB: "Polymorphism",
        optionC: "Encapsulation",
        optionD: "Photosynthesis",
        level: "medium",
      },
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
      {
        questionTitle: "Which of the following is a DBMS software?",
        optionA: "MySQL",
        optionB: "Photoshop",
        optionC: "MS Word",
        optionD: "Excel",
        level: "easy",
      },
      {
        questionTitle: "What is normalization in DBMS?",
        optionA: "Organizing data to reduce redundancy",
        optionB: "Adding more tables",
        optionC: "Deleting duplicate records",
        optionD: "Converting text to uppercase",
        level: "medium",
      },
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
      {
        questionTitle: "Which of the following is not an OS?",
        optionA: "Linux",
        optionB: "Windows",
        optionC: "MS Excel",
        optionD: "MacOS",
        level: "easy",
      },
      {
        questionTitle: "What is the purpose of a process scheduler?",
        optionA: "Manage memory allocation",
        optionB: "Select process from ready queue",
        optionC: "Format hard disk",
        optionD: "Connect to network",
        level: "hard",
      },
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
      {
        questionTitle: "Which of these is a networking device?",
        optionA: "Router",
        optionB: "Compiler",
        optionC: "Keyboard",
        optionD: "Printer",
        level: "easy",
      },
      {
        questionTitle: "Which protocol is used for secure web browsing?",
        optionA: "HTTP",
        optionB: "FTP",
        optionC: "HTTPS",
        optionD: "SMTP",
        level: "medium",
      },
    ],
    topic: ["protocols", "OSI model", "topologies"],
  },
];

const totalQuestions = coreConcept.reduce((count, concept) => {
  return count + concept.questions.length;
}, 0);

const rounded = Math.floor(totalQuestions / 50) * 50;
const displayQuestions =
  totalQuestions % 50 === 0
    ? `${rounded} Questions`
    : `${rounded}+ Questions`;

const page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cheatsheets' | 'flashcards'>('cheatsheets');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Flashcard states (ported)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Persist flashcard progress
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

  useEffect(() => {
    localStorage.setItem('flashcard_current_index', currentIndex.toString());
    localStorage.setItem('flashcard_reviewed', JSON.stringify([...reviewedCards]));
    localStorage.setItem('flashcard_category_filter', categoryFilter);
    localStorage.setItem('flashcard_difficulty_filter', difficultyFilter);
  }, [currentIndex, reviewedCards, categoryFilter, difficultyFilter]);

  const filteredCards = flashcards.filter(card => {
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

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [categoryFilter, difficultyFilter]);

  const currentCard = filteredCards[currentIndex];
  const reviewedCount = filteredCards.filter(card => reviewedCards.has(card.id)).length;
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

  const filteredSubjects = coreConcept.filter((con) => {
    const matchesSearch =
      con.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.topic.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesSubject = !selectedSubject || con.title === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-background pt-12">
      <Navbar2 />
      {/* <Navbar icon={<Sheet />} pageTitle="Theory Cheatsheets & Flashcards" onBack="/" page1="Interview-Experiences" page1Link="/interview-experiences" /> */}

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
          <button onClick={() => setActiveTab('cheatsheets')} className={`px-4 py-2 text-sm font-medium relative ${activeTab === 'cheatsheets' ? 'text-primary' : 'text-muted-foreground'}`}>
            Cheatsheets
            {activeTab === 'cheatsheets' && <span className="absolute left-0 -bottom-px h-0.5 w-full bg-primary" />}
          </button>
          <button onClick={() => setActiveTab('flashcards')} className={`px-4 py-2 text-sm font-medium relative ${activeTab === 'flashcards' ? 'text-primary' : 'text-muted-foreground'}`}>
            Flashcards
            {activeTab === 'flashcards' && <span className="absolute left-0 -bottom-px h-0.5 w-full bg-primary" />}
          </button>
        </div>
      </div>

      {activeTab === 'cheatsheets' && (
        <>
          {/* Filters (Cheatsheets) */}
          <section className="py-8 px-4 border-b bg-secondary/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subjects, topics..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedSubject === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubject(null)}
                    >
                      All Subjects
                    </Button>
                    {coreConcept.slice(0, 3).map((sub) => (
                      <Button
                        key={sub.title}
                        variant={selectedSubject === sub.title ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSubject(sub.title)}
                      >
                        {sub.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Concept Cards */}
          <section className="flex flex-wrap gap-6 items-stretch justify-center px-4 py-8">
            {filteredSubjects.map((sub) => (
              <ConceptCard
                key={sub.title}
                title={sub.title}
                description={sub.description}
                icon={sub.icon}
                level={sub.level}
                topic={sub.topic}
                noOfQuestion={sub.questions.length}
              />
            ))}
          </section>
        </>
      )}

      {activeTab === 'flashcards' && (
        <div className="px-4 py-10">
          {/* Flashcards Controls */}
          <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowFilters(v => !v)} size="sm">Filters</Button>
              <Button variant="outline" onClick={resetProgress} size="sm">Reset Progress</Button>
            </div>
            <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}% ({reviewedCount}/{filteredCards.length})</div>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="max-w-5xl mx-auto mb-8 overflow-hidden border rounded-xl p-4 bg-secondary/30">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-3 py-1 rounded-md text-xs font-medium border ${categoryFilter === cat ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted hover:bg-muted/70'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Difficulty</p>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map(diff => (
                        <button key={diff} onClick={() => setDifficultyFilter(diff)} className={`px-3 py-1 rounded-md text-xs font-medium border ${difficultyFilter === diff ? 'bg-green-600 text-white border-green-600' : 'bg-muted hover:bg-muted/70'}`}>{diff}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="ghost" onClick={resetFilters}>Reset Filters</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Flashcard Component */}
          {filteredCards.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20">
              <p className="mb-4 font-medium">No flashcards found.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {currentCard && (
                <FlashcardComponent flashcard={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />
              )}
              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button variant="outline" size="sm" disabled={filteredCards.length <= 1} onClick={handlePrevious}><ChevronLeft className="h-4 w-4" />Prev</Button>
                {currentCard && reviewedCards.has(currentCard.id) && (
                  <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400"><Trophy className="h-3 w-3" />Reviewed</span>
                )}
                <Button size="sm" disabled={filteredCards.length <= 1} onClick={handleNext}>Next<ChevronRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Concept Cards */}
      <section className="flex items-center justify-around px-4  py-8">
        {filteredSubjects.map((sub) => (
          <ConceptCard
            title={sub.title}
            description={sub.description}
            icon={sub.icon}
            level={sub.level}
            topic={sub.topic}
            noOfQuestion={sub.questions.length}
          />
        ))}
      </section>
    </div>
  );
};

export default page;
