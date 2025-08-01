"use client";

import React, { useState, useEffect } from "react";
import { FaCode, FaRegListAlt, FaSortAlphaDown, FaLink, FaTree, FaProjectDiagram, FaBrain, FaChartLine, FaSitemap } from "react-icons/fa";
import { MdSort, MdOutlineLeaderboard } from "react-icons/md";
import { GiPathDistance, GiStack, GiCycle } from "react-icons/gi";
import { BsDiagram3, BsGrid3X3GapFill } from "react-icons/bs";
import { PiMathOperationsFill } from "react-icons/pi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { RiGitBranchLine } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type NoteTopic = {
  title: string;
  link: string;
  status?: "available" | "coming-soon";
  icon: React.ReactNode;
};

const notesList: NoteTopic[] = [
  { title: "Basics of Programming", link: "https://topmate.io/saumyayadav/1604053", icon: <FaCode /> },
  { title: "Patterns", link: "https://topmate.io/saumyayadav/1604073", icon: <BsGrid3X3GapFill /> },
  { title: "Arrays, Time and Space Complexity", link: "https://topmate.io/saumyayadav/1604081", icon: <FaRegListAlt /> },
  { title: "Searching and Sorting", link: "https://topmate.io/saumyayadav/1604085", icon: <MdSort /> },
  { title: "Cpp STL", link: "https://topmate.io/saumyayadav/1604098", icon: <FiPackage /> },
  { title: "Char Arrays and Strings", link: "https://topmate.io/saumyayadav/1605701", icon: <FaSortAlphaDown /> },
  { title: "Basic Maths and Pointers", link: "https://topmate.io/saumyayadav/1605727", icon: <PiMathOperationsFill /> },
  { title: "Recursion", link: "https://topmate.io/saumyayadav/1605740", icon: <GiCycle /> },
  { title: "Backtracking and DnC", link: "https://topmate.io/saumyayadav/1605744", icon: <GiPathDistance /> },
  { title: "OOPS concepts", link: "https://topmate.io/saumyayadav/1605766", icon: <BsDiagram3 /> },
  { title: "Linked List", link: "https://topmate.io/saumyayadav/1606894", icon: <FaLink /> },
  { title: "Stacks", link: "https://topmate.io/saumyayadav/1606913", icon: <GiStack /> },
  { title: "Queues", link: "https://topmate.io/saumyayadav/1606923", icon: <HiOutlineQueueList /> },
  { title: "Generic and Binary Trees", link: "https://topmate.io/saumyayadav/1606934", icon: <FaTree /> },
  { title: "Binary Search Trees", link: "https://topmate.io/saumyayadav/1606945", icon: <RiGitBranchLine /> },
  { title: "Heaps", link: "https://topmate.io/saumyayadav/1606958", icon: <MdOutlineLeaderboard /> },
  { title: "Maps and Tries", link: "https://topmate.io/saumyayadav/1606881", icon: <FaSitemap /> },
  { title: "DP", link: "https://topmate.io/saumyayadav/1606967", icon: <FaBrain /> },
  { title: "Graphs", link: "https://topmate.io/saumyayadav/1600383", icon: <FaProjectDiagram /> },
  { title: "Greedy / Sliding Window / Bit Manipulation", link: "https://topmate.io/saumyayadav/1606846", icon: <FaChartLine /> },
  { title: "COMPLETE NOTES", link: "https://topmate.io/saumyayadav/1606989", icon: <CgFileDocument /> },
];

export default function NotesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const streak = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar streak={streak} />
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white dark:bg-[#0d0f16] text-gray-900 dark:text-white px-6 md:px-20 py-24 transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Comprehensive DSA Notes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Handwritten notes from the{" "}
              <span className="font-semibold text-blue-400 dark:text-blue-400">
                Supreme 3.0 DSA course
              </span>{" "}
              to help you revise concepts quickly and effectively.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {notesList.map(({ title, link, status, icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative group cursor-pointer"
              >
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"></div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-blue-500/40"></div>

                {/* Main card */}
                <div className="relative bg-white dark:bg-[#181b27] h-52 border border-gray-300 dark:border-gray-800/50 group-hover:border-gray-400 dark:group-hover:border-gray-700 rounded-2xl p-7 shadow-md dark:shadow-xl dark:shadow-blue-500/10 group-hover:shadow-lg dark:group-hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden">
                  {/* Background glow effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-10 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon container with enhanced styling */}
                  <div className="flex items-start gap-5 mb-6">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative p-4 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-xl text-blue-600 dark:text-blue-400 group-hover:from-blue-600/20 group-hover:to-blue-500/10 group-hover:text-blue-400 transition-all duration-300 border border-blue-600/10 dark:border-blue-600/20 group-hover:border-blue-400/20"
                    >
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <div className="relative z-10">{icon}</div>
                    </motion.div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {title}
                      </h2>
                    </div>
                  </div>

                  {/* Status or Link */}
                  <div className="mt-auto">
                    {status === "coming-soon" ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 text-yellow-500 rounded-xl text-sm font-medium border border-yellow-600/30">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        Coming Soon
                      </div>
                    ) : (
                      <motion.a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                      >
                        <span>View Notes</span>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </motion.svg>
                      </motion.a>
                    )}
                  </div>

                  {/* Subtle corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-12 text-sm transition-colors duration-300"
          >
            *These notes are completely optional resources to supplement your learning. Happy coding! 💙
          </motion.p>
        </div>
      </motion.main>
    </>
  );
}
