// Function to show each interview experience details individually
"use client"
import React, { useState, useEffect } from "react";
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
  Laptop,
  MonitorCog,
  Speech,
  Bookmark,
  NotebookPen,
  Users,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar-interview";
import { useParams } from "next/navigation";

const InterviewDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [interviewData, setInterviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchInterview = async () => {
    try {
      const res = await fetch(`/api/interview-experiences/${id}`, {
        method: "GET",
        cache: "no-store",   // prevents static caching
      });
      const result = await res.json();
      if (result.success) {
        setInterviewData(result.data);
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchInterview();
}, [id]);

  

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading interview...</div>;
  }

  if (!interviewData) {
    return <div className="text-center mt-10 text-red-500">Interview not found</div>;
  }

  const getOutcomeStyle = (result: string) => {
    switch (result.toLowerCase()) {
      case "selected":
        return "bg-gradient-success text-white border-0";
      case "rejected":
        return "bg-tech-red text-white border-0";
      default:
        return "bg-tech-orange text-white border-0";
    }
  };

  const getDifficultyStyle = (level: string) => {
    switch (level.toLowerCase()) {
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

<div className="relative rounded-4xl my-6 bg-card max-w-6xl mx-auto px-6 md:px-10 py-8">

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
                      <span>{interviewData.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getOutcomeStyle(interviewData.result)}>
                    <Trophy className="w-3 h-3 mr-1" />
                    {interviewData.result}
                  </Badge>
                  <Badge
                    variant={"default"}
                    className={getDifficultyStyle(interviewData.level)}
                  >
                    <Target className="w-3 h-3 mr-1" />
                    {interviewData.level}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {interviewData.preview}
              </p>

              <div className="flex flex-wrap gap-2">
                {interviewData.tags?.map((tag: string) => (
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
                  {interviewData.interview?.rounds?.length || 0} rounds
                </div>
              </div>
            </div>
          </div>

          {/* Interview Rounds */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Interview Rounds</h3>
            {interviewData.interview?.rounds?.map((round: any, index: number) => (
              <div
                key={index}
                className="shadow-card hover:shadow-elevated transition-shadow border-t-2 border-white p-4 duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl p-2 rounded-full border-gray-400 border-2 flex items-center justify-center">
                    {getRoundIcon(round.type)}
                  </span>
                  <div>
                    <span className="text-lg">
                      Round {round.round}: {round.type}
                    </span>
                    <p className="text-sm text-muted-foreground font-normal">
                      {round.duration} min
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Questions Asked:</h4>
                    <ul className="space-y-2">
                      {round.questions?.map((q: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-tech-blue font-bold mt-1">•</span>
                          <span className="text-foreground leading-relaxed">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Experience:</h4>
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
            <div className="flex items-center space-x-2">
              <NotebookPen />
              <span>Overall Experience</span>
            </div>
            <p className="text-foreground leading-relaxed">
              {interviewData.interview?.overallExperience}
            </p>
          </div>

          {/* Tips Section */}
          <div className="shadow-card bg-gradient-card border-tech-blue/20">
            <div className="flex items-center space-x-2 text-tech-blue">
              <Lightbulb className="w-5 h-5" />
              <span>Tips for Success</span>
            </div>
            <ul className="space-y-3 mt-2">
              {interviewData.interview?.tips?.map((tip: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-tech-blue font-bold mt-1">✓</span>
                  <span className="text-foreground leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Final Outcome */}
          <div className="shadow-card border-t-2 px-2 py-4 border-white">
            <h4 className="font-semibold text-foreground">Final Outcome</h4>
            <p className="text-foreground leading-relaxed">
              {interviewData.interview?.finalOutcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;

