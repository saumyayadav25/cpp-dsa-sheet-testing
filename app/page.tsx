"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaListUl,
  FaRegCalendarAlt,
  FaChartBar,
  FaSearch,
  FaFire,
} from "react-icons/fa";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import ReportIssueButton from "@/components/ReportIssueButton";
import Navbar from "@/components/Navbar";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Question } from './timequiz/types';

// Custom hook for animated counting
// Animates numbers from 1 to target value when element comes into view
// Works with strings like "2100+", "30+", etc. and preserves the suffix
function useAnimatedCounter(targetValue: string, isVisible: boolean) {
  const [count, setCount] = useState(1);
  
  useEffect(() => {
    if (!isVisible) {
      setCount(1);
      return;
    }
    
    // Extract numeric value from strings like "2100+", "30+", etc.
    const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
    
    let currentCount = 1;
    const interval = setInterval(() => {
      currentCount += Math.max(1, Math.floor(numericValue / 50)); // Faster increment
      setCount(Math.min(currentCount, numericValue));
      
      if (currentCount >= numericValue) {
        clearInterval(interval);
      }
    }, 20); // Much faster animation (20ms instead of 50ms)
    
    return () => clearInterval(interval);
  }, [isVisible, targetValue]);
  
  // Format the count with the original suffix (like "+")
  const suffix = targetValue.replace(/[0-9]/g, '');
  return `${count}${suffix}`;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

type Testimonial = {
  name: string;
  designation?: string;
  rating: number; // from 1 to 5
  text: string;
  visibility: "full" | "nameOnly" | "anonymous";
};

const testimonials: Testimonial[] = [
  {
    name: "Prakhar Sinha",
    designation: "Student",
    rating: 5,
    text: "It really helped me by listing important questions discussed in class, so we didn't have to visit lectures again to revise those questions. Overall, it's the best!",
    visibility: "full",
  },
  {
    name: "Aryan",
    designation: "Student",
    rating: 5,
    text: "It's amazing! The way in which we can track our progress is amazing.",
    visibility: "full",
  },
  {
    name: "",
    rating: 5,
    text: "DSAMate bhot bhot accha laga mujhe! Especially the platform filter where we can choose LeetCode, GFG, etc. Now I'm definitely going to start practicing questions from DSAMate as well.",
    visibility: "anonymous",
  },
  {
    name: "Roshan Gorakhpuriya",
    designation: "Student",
    rating: 5,
    text: "Structured question which covers all the supreme batch questions.",
    visibility: "full",
  },
  {
    name: "Supriya Pandey",
    designation: "Student / Aspiring Developer",
    rating: 5,
    text: "EXCELLENT! Helped a lot in my dsa journey. ",
    visibility: "full",
  },
];

// FAQ data
const faqData = [
  {
    question: "What if I find an incorrect or broken link?",
    answer:  "Click on 'Report an Issue' or email us — we'll fix it quickly.",
  },
  {
    question: "Can I contribute questions or feedback?",
    answer: "The streak system tracks your daily problem-solving consistency. Mark the Problem of the Day (POTD) as completed to maintain your streak. Missing a day will reset your streak to zero, encouraging daily practice habits.",
  },
  {
    question: "How to use filters effectively?",
    answer: "You can use multiple filters like difficulty, platform, status, and revision together to narrow down the questions that best match your current focus. For example, if you're preparing for medium-level problems on LeetCode that you haven't solved yet, just select those filters. You can also filter by questions you've marked for revision. If the results feel too limited or you're done with a specific session, you can reset all filters with a single click to start fresh.",
  },
  {
    question: "What is POTD and how does it help?",
    answer: "POTD (Problem of the Day) helps you build consistency by showing one new question every day. It encourages daily problem-solving without feeling overwhelming. Even if you're short on time, solving just one question keeps your practice streak going and builds momentum over time. It's a great way to stay connected with DSA regularly.",
  },
  {
    question: "Is login required?",
    answer: "Nope! There's no need to sign up or log in. Your progress is automatically saved in your browser's local storage. However, keep in mind that if you clear your browser cache or use incognito mode, this data might get deleted — so your progress will reset. Just use the same browser and device for the best experience.",
  },
  {
    question: "My question is not listed here, how can I get help?",
    answer: "If you have any questions or need assistance, feel free to reach out to us at contact.dsapractice@gmail.com",
  }
];

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background with moving gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 rounded-2xl"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isOpen 
            ? "0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)"
            : isHovered 
              ? "0 0 0 1px rgba(139, 92, 246, 0.4), 0 0 15px rgba(139, 92, 246, 0.2)"
              : "0 0 0 1px rgba(229, 231, 235, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "100%", 
                opacity: 0,
                scale: 0 
              }}
              animate={{ 
                y: "-20%", 
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Main card */}
      <motion.div
        className="relative bg-white dark:bg-gray-900 rounded-2xl cursor-pointer overflow-hidden backdrop-blur-sm"
        whileHover={{ 
          scale: 1.03,
          rotateY: 2,
          rotateX: 1,
        }}
        whileTap={{ 
          scale: 0.97,
          rotateY: 0,
          rotateX: 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shimmer effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Question header */}
          <div className="flex items-center justify-between p-8">
            <motion.h3 
              className="text-lg font-bold text-gray-900 dark:text-white pr-8 relative"
              animate={{
                color: isOpen 
                  ? "#3B82F6" 
                  : isHovered 
                    ? "#8B5CF6" 
                    : undefined
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: isHovered || isOpen ? "100%" : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              {question}
            </motion.h3>
            
            {/* 3D Rotating chevron with glow */}
            <motion.div
              className="flex-shrink-0 w-8 h-8 relative"
              animate={{ 
                rotateX: isOpen ? 180 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 200
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow effect behind chevron */}
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full blur-md"
                animate={{
                  opacity: isHovered ? 0.4 : 0,
                  scale: isHovered ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              
              <svg
                className="w-full h-full text-gray-600 dark:text-gray-400 relative z-10"
                style={{
                  filter: isOpen ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" : "none"
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                  animate={{
                    stroke: isOpen ? "#3B82F6" : isHovered ? "#8B5CF6" : undefined
                  }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Answer with dramatic reveal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ 
                  height: 0, 
                  opacity: 0,
                  rotateX: -90,
                }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  rotateX: 0,
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  rotateX: -90,
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  opacity: { delay: 0.1 }
                }}
                className="overflow-hidden"
                style={{ transformOrigin: "top" }}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="px-8 pb-8"
                >
                  {/* Animated divider */}
                  <motion.div
                    className="relative mb-6"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    <motion.div
                      className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    />
                  </motion.div>
                  
                  {/* Answer text with typewriter effect simulation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                  >
                    <motion.p 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed text-base"
                      initial={{ filter: "blur(2px)" }}
                      animate={{ filter: "blur(0px)" }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      {answer}
                    </motion.p>
                    
                    {/* Subtle background highlight */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-blue-400 rounded-2xl pointer-events-none"
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ 
            scale: isOpen ? [0, 1.2, 0] : 0,
            opacity: isOpen ? [0.3, 0.1, 0] : 0
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem("userStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isGlowing, setIsGlowing] = useState(false);
    
    const handleClick = () => {
      setIsOpen(!isOpen);
      setIsGlowing(true);
      // Reset glow effect after animation
      setTimeout(() => setIsGlowing(false), 600);
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group"
      >
        <div
          className={`bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] hover:ring-4 hover:ring-blue-400/70 hover:shadow-[0_0_80px_rgba(147,197,253,0.6)] ${
            isGlowing ? 'shadow-[0_0_80px_rgba(59,130,246,1)] ring-8 ring-blue-400/80 shadow-[0_0_120px_rgba(147,197,253,0.8)]' : ''
          }`}
          onClick={handleClick}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-900 dark:text-white font-semibold text-lg">
              {question}
            </h4>
                         <motion.span 
               className={`text-blue-500 dark:text-blue-400 text-2xl font-light transition-all duration-300 group-hover:scale-110 ${
                 isGlowing ? 'text-blue-200 scale-150' : ''
               }`}
               animate={isGlowing ? {
                 scale: [1, 1.6, 1.5],
                 textShadow: [
                   "0 0 15px rgba(59, 130, 246, 1)",
                   "0 0 40px rgba(147, 197, 253, 1)",
                   "0 0 60px rgba(96, 165, 250, 1)",
                   "0 0 30px rgba(59, 130, 246, 1)",
                   "0 0 50px rgba(147, 197, 253, 0.9)"
                 ],
                 color: [
                   "rgb(147, 197, 253)",
                   "rgb(191, 219, 254)",
                   "rgb(219, 234, 254)",
                   "rgb(147, 197, 253)",
                   "rgb(96, 165, 250)"
                 ]
               } : {}}
             >
              {isOpen ? "−" : "+"}
            </motion.span>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700 dark:text-gray-300 text-base mt-4 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }


  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">
      <ReportIssueButton />
      <Navbar streak={streak} />

      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-16 pt-16 sm:pt-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url(/bg.png)" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col">
          <motion.h1
            variants={fadeInUp}
            custom={0}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground drop-shadow-lg mt-6"
          >
            DSA<span className="text-blue-400">Mate</span> template
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground drop-shadow-md"
          >
            Your daily dose for DSA practice
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex justify-center"
          >
            <img
              src="dsa-hero.png"
              alt="DSA Mate Hero"
              className="w-[40vw]"
              draggable="false"
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20 rounded-full blur-3xl scale-110"></div>
          </motion.div>

          <motion.div variants={fadeInUp} custom={3} className="relative z-10">
            <motion.p
              variants={fadeInUp}
              custom={3}
              className="text-base sm:text-lg md:text-xl text-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-lg px-4 sm:px-0"
            >
              Solve better, revise smarter, and stay consistent with your
              preparation journey.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            >
              <Link
                href="/sheet"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                🚀 Go to Practice Sheet
              </Link>
              <Link
                href="/progress"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                📊 Track Your Progress
              </Link>
              <Link
                href="https://dsamate.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover:border-white/50 font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                🔗 Visit Original DSAMate
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          @media (max-width: 640px) {
            section {
              background-size: cover;
              background-position: center center;
              background-attachment: scroll;
            }
          }
        `}</style>
      </motion.section>

      {/* STATISTICS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by <span className="text-blue-500">Thousands</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Join our growing community of developers mastering DSA
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                title: "Total Users",
                value: "2100+",
                icon: "👥",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Daily Users",
                value: "30+",
                icon: "⚡",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                title: "DSA Problems",
                value: "450+",
                icon: "🧩",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Testimonials",
                value: "10+",
                icon: "💬",
                gradient: "from-pink-500 to-purple-500",
              },
            ].map(({ title, value, icon, gradient }, index) => {
               const ref = useRef(null);
               const isInView = useInView(ref, { 
                 once: false,
                 margin: "-100px",
                 amount: 0.3
               });
               const animatedValue = useAnimatedCounter(value, isInView);
              
              return (
                <motion.div
                  ref={ref}
                  key={title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative"
                >
                  <div className={`bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/10 ${isInView ? 'ring-2 ring-blue-500/20' : ''}`}>
                    <div className="relative">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </div>
                      <h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2 ${isInView ? 'animate-pulse' : ''}`}>
                        {animatedValue}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* COMPANY-WISE INTEREST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-cyan-900/20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
              🏢
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Want <span className="text-blue-500">Company-wise</span> Question Lists?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              We're planning to launch a company-specific DSA sheet! Fill this quick
              form to let us know you're interested and stay in the loop.
            </p>
            <motion.a
              href="https://forms.gle/z1sRLUGRvtfKrGcp7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📩 I'm Interested
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Key <span className="text-blue-500">Features</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to excel in your DSA journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <FaListUl size={32} />,
                title: "Tailored Questions",
                desc: "Topic-wise DSA problems to ensure complete coverage.",
                link: "/sheet",
                gradient: "from-blue-500 to-cyan-500",
                color: "text-blue-500 dark:text-blue-400"
              },
              {
                icon: <FaRegCalendarAlt size={32} />,
                title: "Daily Problem (POTD)",
                desc: "Stay consistent by solving one new question daily.",
                link: "/sheet#potd",
                gradient: "from-cyan-500 to-teal-500",
                color: "text-cyan-500 dark:text-cyan-400"
              },
              {
                icon: <BiSliderAlt size={32} />,
                title: "Smart Filters",
                desc: "Filter by difficulty, status, revision, and platform.",
                link: "/sheet#filters",
                gradient: "from-yellow-500 to-orange-500",
                color: "text-yellow-500 dark:text-yellow-400"
              },
              {
                icon: <FaChartBar size={32} />,
                title: "Track Progress",
                desc: "Comprehensive analytics, streak tracking, and detailed progress insights.",
                link: "/progress",
                gradient: "from-green-500 to-emerald-500",
                color: "text-green-500 dark:text-green-400"
              },
              {
                icon: <FaFire size={32} />,
                title: "Streaks",
                desc: "Mark POTD as done and maintain your daily solving streak!",
                link: "/progress#streaks",
                gradient: "from-red-500 to-pink-500",
                color: "text-red-500 dark:text-red-400"
              },
              {
                icon: <FaSearch size={32} />,
                title: "Search Questions Quickly",
                desc: "Instantly locate problems using keywords in the dedicated search bar.",
                link: "/sheet#search",
                gradient: "from-purple-500 to-indigo-500",
                color: "text-purple-500 dark:text-purple-400"
              },
            ].map(({ title, desc, icon, link, gradient, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group cursor-pointer"
                onClick={() => (window.location.href = link)}
              >
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-white/10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* WHY DSA MATE SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
              Why <span className="text-blue-500 dark:text-blue-400">DSAMate</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              It's not just another practice sheet — it's your all-in-one platform
              to solve topic-wise problems, apply smart filters, and track your
              daily progress with the new streak feature. Whether you're revising
              for interviews, trying to stay consistent, or looking to master DSA
              with purpose — DSAMate helps you do it better. Mark questions, revisit
              tough ones, solve a new problem every day, and keep your streak alive.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              💬 Loved using <span className="text-blue-500">DSAMate</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Share your thoughts and help others discover the power of structured DSA practice
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <motion.a
                href="https://forms.gle/8BXQC1o3hsVsEEBp9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                💬 Give a Testimonial
              </motion.a>
              <motion.a
                href="https://dsamate.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-blue-500/50 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
              >
                🔗 Visit Original DSAMate
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {testimonials.map(
              ({ name, designation, rating, text, visibility }, idx) => {
                const displayName =
                  visibility === "anonymous" ? "Anonymous User" : name;
                const showDesignation = visibility === "full" && designation;

                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group"
                  >
                    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                          <FaUserCircle className="text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {displayName}
                          </p>
                          {showDesignation && (
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {designation}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic leading-relaxed">
                        "{text}"
                      </p>

                      <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) =>
                          i < rating ? (
                            <FaStar key={i} className="text-sm" />
                          ) : (
                            <FaRegStar key={i} className="text-sm" />
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Get answers to common questions about DSAMate
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-4"
          >
            {faqData.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}