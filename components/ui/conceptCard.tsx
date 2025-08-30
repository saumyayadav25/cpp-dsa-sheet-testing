import React from "react";

import Badge from "./badge";
import { Button } from "./button";
import { ArrowBigRight, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

interface ConceptCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  level?: string;
  className?: string;
  topic?: string[];
  noOfQuestion: number;
}

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

const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  description,
  icon,
  noOfQuestion,
  topic,
  level,
}) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="w-[20rem] h-[28rem] relative bg-card rounded-xl shadow-sm border"
    >
      {/* Subtle corner decoration */}
      <div className="absolute top-0 right-0 w-30 h-30 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative p-4 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-xl text-blue-600 dark:text-blue-400 group-hover:from-blue-600/20 group-hover:to-blue-500/10 group-hover:text-blue-400 transition-all duration-300 border border-blue-600/10 dark:border-blue-600/20 group-hover:border-blue-400/20"
          >
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-xl  group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            <div className="relative z-10">{icon}</div>
          </motion.div>
          <Badge className={`text-xs ${getDifficultyColor(level ?? "Hard")}`}>
            {level}
          </Badge>
        </div>
        <div className="font-semibold text-2xl mt-4">{title}</div>
      </div>
      <p className="text-muted-foreground px-6 text-sm">{description}</p>
      <div className="flex flex-col space-y-4 p-6">
        <div className="flex justify-between">
          <p className="text-sm">Progress</p>
          <p className="text-sm">75%</p>
        </div>
        <Badge className="h-4 w-full relative " variant="outline">
          <Badge
            className="h-full w-1/2 absolute top-0 left-0 border-0 bg-gray-700"
            variant="default"
          ></Badge>
        </Badge>
        <div className="flex justify-between -mt-2">
          <p className="text-sm">{noOfQuestion} Questions</p>
          <p className="text-sm">{topic?.length} Topics</p>
        </div>
        <div className="flex justify-start space-x-2 mt-4">
          {topic?.map((tag) => (
            <Badge variant="default">{tag}</Badge>
          ))}
        </div>
        <button className="flex items-center mt-2 justify-center space-x-2 relative py-2 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-lg text-blue-600 group dark:text-blue-400 border border-blue-600/10 dark:border-blue-600/20">
          Start Learning
          <MoveRight className="ml-2 mt-1 transition-transform group-hover:translate-x-2" />
        </button>
      </div>
    </motion.div>
  );
};
export default ConceptCard;
