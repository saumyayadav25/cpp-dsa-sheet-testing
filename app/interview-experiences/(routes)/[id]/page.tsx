import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  Target,
  ThumbsUp,
  MessageCircle,
  Building2,
  User,
  Trophy,
  Lightbulb,
  Building,
  Laptop,
  MonitorCog,
  Speech,
  Bookmark,
  NotebookPen,
  ArrowLeft,
  Plus,
  Users,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar-interview";

const InterviewDetailPage = () => {
  const interviewData = {
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
  };

  const getOutcomeStyle = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "selected":
        return "bg-gradient-success text-white border-0";
      case "rejected":
        return "bg-tech-red text-white border-0";
      default:
        return "bg-tech-orange text-white border-0";
    }
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-tech-green text-white border-0";
      case "medium":
        return "bg-tech-orange text-white border-0";
      case "hard":
        return "bg-tech-red text-white border-0";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRoundIcon = (type: string) => {
    if (type.toLowerCase().includes("coding")) return <Laptop />;
    if (type.toLowerCase().includes("system")) return <MonitorCog />;
    if (type.toLowerCase().includes("behavioral")) return <Speech />;
    return <Bookmark />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onBack="/interview-experiences"
        page3={"Share Experience"}
        page3Link="/interview-experiences/share-experience"
        pageTitle="Interview Experiences"
        icon={<Users />}
      />
      <div className="relative rounded-4xl my-6 bg-card w-1/2 m-auto flex items-center justify-center">
        {/* Subtle corner decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Header Card */}
          <div className="bg-gradient-card shadow-elevated border-0">
            <div className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full border-gray-400 border-2 bg-[#8080802a] flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-experience" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {interviewData.company}
                    </h1>
                  </div>
                  <h2 className="text-xl text-muted-foreground">
                    {interviewData.position}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{interviewData.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{interviewData.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{interviewData.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getOutcomeStyle(interviewData.outcome)}>
                    <Trophy className="w-3 h-3 mr-1" />
                    {interviewData.outcome}
                  </Badge>
                  <Badge
                    variant={"default"}
                    className={getDifficultyStyle(interviewData.difficulty)}
                  >
                    <Target className="w-3 h-3 mr-1" />
                    {interviewData.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {interviewData.preview}
                </p>

                <div className="flex flex-wrap gap-2">
                  {interviewData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-tech-blue/10 text-tech-blue border-tech-blue/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{interviewData.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{interviewData.comments}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {interviewData.rounds} rounds
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Rounds */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center space-x-2">
              <span>Interview Rounds</span>
            </h3>

            {interviewData.interview.rounds.map((round, index) => (
              <div
                key={index}
                className="shadow-card hover:shadow-elevated transition-shadow  border-t-2 border-white p-4 duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl p-2 rounded-full border-gray-400 border-2 flex items-center justify-center">
                        {getRoundIcon(round.type)}
                      </span>
                      <div>
                        <span className="text-lg">
                          Round {round.round}: {round.type}
                        </span>
                        <p className="text-sm text-muted-foreground font-normal">
                          {round.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground my-3">
                      Questions Asked:
                    </h4>
                    <ul className="space-y-2">
                      {round.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start space-x-2">
                          <span className="text-tech-blue font-bold mt-1">
                            •
                          </span>
                          <span className="text-foreground leading-relaxed">
                            {question}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Experience:
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {round.experience}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Experience */}
          <div className="shadow-card border-t-2 px-2 py-4 border-white">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl p-2 rounded-full border-gray-400 border-2 flex items-center justify-center">
                  <NotebookPen />
                </span>
                <span>Overall Experience</span>
              </div>
            </div>
            <div>
              <p className="text-foreground leading-relaxed">
                {interviewData.interview.overallExperience}
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="shadow-card bg-gradient-card border-tech-blue/20">
            <div>
              <div className="flex items-center space-x-2 text-tech-blue">
                <Lightbulb className="w-5 h-5" />
                <span>Tips for Success</span>
              </div>
            </div>
            <div>
              <ul className="space-y-3">
                {interviewData.interview.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-tech-blue font-bold mt-1">✓</span>
                    <span className="text-foreground leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;
