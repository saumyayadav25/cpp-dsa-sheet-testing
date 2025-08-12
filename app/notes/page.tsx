"use client";

import React, { useState, useEffect } from "react";
import {
  FaCode, FaRegListAlt, FaSortAlphaDown, FaLink, FaTree, FaProjectDiagram,
  FaBrain, FaChartLine, FaSitemap, FaHeart
} from "react-icons/fa";
import { MdSort, MdOutlineLeaderboard } from "react-icons/md";
import { GiPathDistance, GiStack, GiCycle } from "react-icons/gi";
import { BsDiagram3, BsGrid3X3GapFill } from "react-icons/bs";
import { PiMathOperationsFill } from "react-icons/pi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { RiGitBranchLine } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const streak = 0;

  useEffect(() => {
    const savedFaves = localStorage.getItem("favourites");
    if (savedFaves) {
      setFavourites(JSON.parse(savedFaves));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (title: string) => {
    setFavourites((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const filteredNotes = notesList.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = showFavouritesOnly ? favourites.includes(note.title) : true;
    return matchesSearch && matchesFav;
  });

  return (
    <>
      <Navbar streak={streak} />
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white dark:bg-[#0d0f16] text-gray-900 dark:text-white px-6 md:px-20 py-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
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
             <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-300 mb-8">
              If you've purchased notes, I’d love to hear your feedback! <a
                href="https://forms.gle/57g5XWCqjXAng8mK9"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-100"
              >Fill out this quick form</a> 🙌
            </motion.p>

            {/* Search + Favourites Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-96 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFavouritesOnly
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {showFavouritesOnly ? "Show All" : "Show Favourites"}
              </button>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(({ title, link, status, icon }) => (
                <div key={title} className="relative group p-7 rounded-2xl border bg-white dark:bg-[#181b27]">
                  {/* Heart Button */}
                  <button
                    onClick={() => toggleFavourite(title)}
                    className={`absolute top-4 right-4 text-xl ${
                      favourites.includes(title) ? "text-pink-500" : "text-gray-400"
                    } hover:scale-110 transition-transform`}
                  >
                    <FaHeart />
                  </button>

                  {/* Icon */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-xl text-blue-600 dark:text-blue-400">
                      {icon}
                    </div>
                    <h2 className="text-xl font-bold">{title}</h2>
                  </div>

                  {/* Status/Link */}
                  {status === "coming-soon" ? (
                    <div className="text-yellow-500">Coming Soon</div>
                  ) : (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white"
                    >
                      View Notes
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No notes found.
              </p>
            )}
          </div>
        </div>
      </motion.main>
    </>
  );
}
