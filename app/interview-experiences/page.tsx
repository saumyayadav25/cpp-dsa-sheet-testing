//page to list all interview experiences
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
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
import NavbarInterview from "@/components/ui/Navbar-interview";

import { useRouter } from "next/navigation";

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch from DBF
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/interview-experiences");
        const data = await res.json();
        if (data.success) {
          setExperiences(data.data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const companies = [...new Set(experiences.map((item) => item.company))];

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.tags?.some((tag: string) =>
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
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOutcomeColor = (outcome: string) => {
    return outcome?.toLowerCase() === "selected"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">Loading experiences...</div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarInterview />

      {/* Hero Section */}
      <section className="py-16 px-4 mt-13 bg-gradient-to-r from-experience/10 to-experience/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight pb-1">
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
              <div
                className="bg-card rounded-xl shadow-sm border"
                key={exp._id}
              >
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
                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl transition-opacity duration-300 blur-md"></div>
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
                        className={`text-xs ${getDifficultyColor(exp.level)}`}
                      >
                        {exp.level}
                      </Badge>
                      <Badge
                        className={`text-xs ${getOutcomeColor(exp.result)}`}
                      >
                        {exp.result}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{exp.duration} min</span>
                    </span>
                    <span>{exp.interview?.rounds?.length || 0} rounds</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags?.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {exp.preview}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{exp.likes || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>{exp.comments || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-experience transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/interview-experiences/${exp._id}`)
                      }
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
              onClick={() =>
                router.push("/interview-experiences/share-experience")
              }
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
