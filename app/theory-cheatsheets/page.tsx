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
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ConceptCard from "@/components/ui/conceptCard";
import Navbar from "@/components/ui/Navbar-interview";


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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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
    <div className="min-h-screen bg-background">
      <Navbar icon={<Sheet/>} pageTitle="Theory Cheatsheets" onBack="/" page1="Interview-Experiences" page1Link="/interview-experiences" />

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

      {/* Filters */}
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
                    variant={
                      selectedSubject === sub.title ? "default" : "outline"
                    }
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
