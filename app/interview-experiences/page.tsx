"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Building,
  Star,
  Clock,
  Search,
  Filter,
  Plus,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar-interview";

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const experiences = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      author: "Alex Chen",
      date: "2 days ago",
      duration: "45 min",
      rounds: 4,
      difficulty: "Hard",
      outcome: "Selected",
      likes: 124,
      comments: 18,
      tags: ["Arrays", "System Design", "Behavioral"],
      preview:
        "Had 4 rounds - 2 coding, 1 system design, 1 behavioral. Coding questions were medium-hard level focusing on arrays and dynamic programming...",
      interview: {
        rounds: [
          {
            round: 1,
            type: "Coding (DSA)",
            duration: "60 min",
            questions: [
              "Given an unsorted array of integers, find the length of the longest consecutive sequence in O(n) time.",
              "Implement an LRU (Least Recently Used) cache with get and put operations in O(1).",
            ],
            experience:
              "The interviewer was friendly but strict on time. They focused heavily on coding efficiency and correctness. Follow-up questions included space complexity tradeoffs.",
          },
          {
            round: 2,
            type: "Coding (Dynamic Programming + Arrays)",
            duration: "60 min",
            questions: [
              "You are given an array of integers, return the maximum sum of non-adjacent elements.",
              "Given two strings, find the length of their longest common subsequence.",
            ],
            experience:
              "This was a tough round. The interviewer pushed me to optimize my DP solution and also explain the recurrence relation clearly. They wanted clean code and edge case handling.",
          },
          {
            round: 3,
            type: "System Design",
            duration: "75 min",
            questions: [
              "Design a URL Shortener (like bit.ly).",
              "Scale the system to handle 1 billion requests per day.",
            ],
            experience:
              "The system design round was open-ended. I had to talk about database choices, sharding, caching, load balancing, and failure handling. They were keen on my ability to break down the problem step by step.",
          },
          {
            round: 4,
            type: "Behavioral",
            duration: "45 min",
            questions: [
              "Tell me about a time you had a conflict in your team and how you resolved it.",
              "What motivates you to work at Google?",
              "How do you handle failures or setbacks?",
            ],
            experience:
              "The behavioral round was conversational. The interviewer wanted to understand my communication style, teamwork ability, and cultural fit at Google.",
          },
        ],
        overallExperience:
          "The interview process was challenging but fair. Google placed a strong emphasis on problem-solving skills, system design fundamentals, and communication. Each interviewer was professional and encouraged me to think aloud.",
        tips: [
          "Practice arrays and dynamic programming problems daily.",
          "Focus on writing clean, efficient, and bug-free code.",
          "Learn system design basics like load balancing, caching, and database sharding.",
          "Prepare structured answers for behavioral questions using the STAR method.",
        ],
        finalOutcome: "Selected",
      },
    },
    {
      id: 2,
      company: "Microsoft",
      position: "SDE II",
      author: "Sarah Johnson",
      date: "5 days ago",
      duration: "60 min",
      rounds: 5,
      difficulty: "Medium",
      outcome: "Selected",
      likes: 89,
      comments: 12,
      tags: ["Trees", "Graphs", "OOP"],
      preview:
        "Microsoft interview was well-structured. Started with easy warm-up, then moved to tree traversal and graph problems. System design was focused on scalability...",
    },
    {
      id: 3,
      company: "Amazon",
      position: "Software Development Engineer",
      author: "Raj Patel",
      date: "1 week ago",
      duration: "50 min",
      rounds: 6,
      difficulty: "Hard",
      outcome: "Rejected",
      likes: 156,
      comments: 24,
      tags: ["Dynamic Programming", "Leadership Principles", "System Design"],
      preview:
        "Amazon's bar is really high. They focus heavily on leadership principles. Technical rounds had challenging DP problems and system design for distributed systems...",
    },
    {
      id: 4,
      company: "Meta",
      position: "Frontend Engineer",
      author: "Emily Davis",
      date: "1 week ago",
      duration: "40 min",
      rounds: 3,
      difficulty: "Medium",
      outcome: "Selected",
      likes: 67,
      comments: 9,
      tags: ["JavaScript", "React", "Product Sense"],
      preview:
        "Meta frontend interview was focused on React concepts, state management, and building scalable UI components. Product sense round was interesting...",
    },
    {
      id: 5,
      company: "Apple",
      position: "iOS Developer",
      author: "Mike Wilson",
      date: "2 weeks ago",
      duration: "55 min",
      rounds: 4,
      difficulty: "Medium",
      outcome: "Selected",
      likes: 92,
      comments: 15,
      tags: ["Swift", "iOS", "Design Patterns"],
      preview:
        "Apple interview process was smooth. Heavy focus on iOS fundamentals, Swift language features, and mobile app architecture patterns...",
    },
    {
  id: 2,
  company: "JP Morgan",
  position: "Software Developer Intern",
  author: "Neha Kapoor",
  date: "5 days ago",
  duration: "60 min",
  rounds: 3,
  difficulty: "Medium",
  outcome: "Selected",
  likes: 89,
  comments: 12,
  tags: ["Linked List", "Trees", "Behavioral"],
  preview:
    "Had 3 rounds - 2 coding and 1 behavioral. Focused mainly on data structures like linked lists and binary trees. The final round tested cultural fit and teamwork...",
  interview: {
    rounds: [
      {
        round: 1,
        type: "Coding (Data Structures)",
        duration: "45 min",
        questions: [
          "Reverse a singly linked list iteratively and recursively.",
          "Check if a given binary tree is height-balanced.",
        ],
        experience:
          "The interviewer was patient and gave hints when I got stuck. They focused on explaining my approach and reasoning rather than just the final solution.",
      },
      {
        round: 2,
        type: "Coding (Problem Solving)",
        duration: "60 min",
        questions: [
          "Find the diameter of a binary tree.",
          "Implement a function to detect if a cycle exists in a linked list.",
        ],
        experience:
          "This was a slightly more difficult round. The interviewer wanted optimized solutions and asked me to explain time and space complexity in detail.",
      },
      {
        round: 3,
        type: "Behavioral",
        duration: "45 min",
        questions: [
          "Tell me about a time you had to quickly learn a new technology.",
          "Describe a challenging project you worked on and how you managed it.",
          "Why do you want to join Microsoft?",
        ],
        experience:
          "The interviewer was very friendly and focused on my teamwork, leadership, and problem-solving outside of technical skills. They were testing cultural fit and growth mindset.",
      },
    ],
    overallExperience:
      "The overall interview process was smooth and well-structured. The technical rounds tested fundamental knowledge of data structures, while the behavioral round ensured cultural alignment. It felt supportive and less stressful compared to other big tech interviews.",
    tips: [
      "Revise core data structures like linked lists, trees, and graphs.",
      "Practice explaining your thought process clearly.",
      "Prepare examples of past experiences using STAR format.",
      "Stay calm during behavioral rounds and show enthusiasm for the company.",
    ],
    finalOutcome: "Selected",
  },
}

  ];

  const companies = [...new Set(experiences.map((item) => item.company))];

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCompany = !selectedCompany || exp.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const rounded = Math.floor(experiences.length / 5) * 5;
  const displayExperiences =
    experiences.length % 5 === 0
      ? `${rounded} Experiences`
      : `${rounded}+ Experiences`;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOutcomeColor = (outcome: string) => {
    return outcome === "Selected"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        icon={<Users />}
        onBack="/"
        page1="Theory-cheatSheets"
        page1Link="/theory-cheatsheets"
        pageTitle="Interview Experiences"
        page3={"Share Experience"}
        page3Link="/interview-experiences/share-experience"
      />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-experience/10 to-experience/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Interview Experiences
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn from real interview experiences shared by the community. Get
              insights into company processes, questions asked, and preparation
              tips.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>
                  {companies.length} {" Companies"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>{displayExperiences}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Community Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b bg-secondary/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, positions, or topics..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCompany === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCompany(null)}
                >
                  All Companies
                </Button>
                {companies.slice(0, 4).map((company) => (
                  <Button
                    key={company}
                    variant={
                      selectedCompany === company ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCompany(company)}
                  >
                    {company}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredExperiences.map((exp) => (
              <div className="bg-card rounded-xl shadow-sm border" key={exp.id}>
                <div className="p-6 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="relative p-4 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-xl text-blue-600 dark:text-blue-400 group-hover:from-blue-600/20 group-hover:to-blue-500/10 group-hover:text-blue-400 transition-all duration-300 border border-blue-600/10 dark:border-blue-600/20 group-hover:border-blue-400/20"
                      >
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl  group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                        <div className="relative z-10">
                          <Building />
                        </div>
                      </motion.div>
                      <div>
                        <div className="font-semibold text-xl group-hover:text-experience transition-colors">
                          {exp.company} - {exp.position}
                        </div>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                          <span>by {exp.author}</span>
                          <span>•</span>
                          <span>{exp.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`text-xs ${getDifficultyColor(
                          exp.difficulty
                        )}`}
                      >
                        {exp.difficulty}
                      </Badge>
                      <Badge
                        className={`text-xs ${getOutcomeColor(exp.outcome)}`}
                      >
                        {exp.outcome}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </span>
                    <span>{exp.rounds} rounds</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-muted-foreground text-sm  leading-relaxed mb-6">
                    {exp.preview}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{exp.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>{exp.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:/10"
                      onPush={`/interview-experiences/${exp.id}`}
                    >
                      Read Full Experience
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-experience/5 to-experience/10">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Share Your Interview Experience
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Help others in their interview preparation by sharing your
              experience. Your story could be the key to someone's success!
            </p>
            <Button
              size="lg"
              className="bg-experience/10 transition-colors duration-300 hover:bg-gray-400"
            >
              <Plus className="h-5 w-5 mr-2" />
              Submit Your Experience
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experiences;
