'use client';

import React from 'react';
import { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaCode, FaRegListAlt, FaSortAlphaDown, FaLink, FaTree, FaProjectDiagram, FaBrain, FaChartLine , FaSitemap} from 'react-icons/fa';
import { MdSort , MdOutlineLeaderboard} from "react-icons/md";
import { GiPathDistance , GiStack , GiCycle} from "react-icons/gi";
import { BsDiagram3 , BsGrid3X3GapFill} from "react-icons/bs";
import { PiMathOperationsFill } from "react-icons/pi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { RiGitBranchLine } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import Link from 'next/link';
import { motion } from 'framer-motion';

type NoteTopic = {
  title: string;
  link: string;
  status?: 'available' | 'coming-soon';
  icon: React.ReactNode;
};


const notesList: NoteTopic[] = [
  { title: 'Basics of Programming', link:'https://topmate.io/saumyayadav/1604053', icon: <FaCode /> },
  { title: 'Patterns', link:'https://topmate.io/saumyayadav/1604073', icon: <BsGrid3X3GapFill /> },
  { title: 'Arrays, Time and Space Complexity', link:'https://topmate.io/saumyayadav/1604081', icon: <FaRegListAlt /> },
  { title: 'Searching and Sorting', link:'https://topmate.io/saumyayadav/1604085', icon: <MdSort /> },
  { title: 'Cpp STL', link:'https://topmate.io/saumyayadav/1604098', icon: <FiPackage /> },
  { title: 'Char Arrays and Strings', link:'https://topmate.io/saumyayadav/1605701', icon: <FaSortAlphaDown /> },
  { title: 'Basic Maths and Pointers', link:'https://topmate.io/saumyayadav/1605727', icon: <PiMathOperationsFill /> },
  { title: 'Recursion', link:'https://topmate.io/saumyayadav/1605740', icon: <GiCycle /> },
  { title: 'Backtracking and DnC', link:'https://topmate.io/saumyayadav/1605744', icon: <GiPathDistance />},
  { title: 'OOPS concepts', link:'https://topmate.io/saumyayadav/1605766', icon: <BsDiagram3 />},
  { title: 'Linked List', link: 'https://topmate.io/saumyayadav/1606894', icon: <FaLink /> },
  { title: 'Stacks', link: 'https://topmate.io/saumyayadav/1606913', icon: <GiStack /> },
  { title: 'Queues', link: 'https://topmate.io/saumyayadav/1606923', icon: <HiOutlineQueueList /> },
  { title: 'Generic and Binary Trees', link: 'https://topmate.io/saumyayadav/1606934', icon: <FaTree /> },
  { title: 'Binary Search Trees', link: 'https://topmate.io/saumyayadav/1606945', icon: <RiGitBranchLine /> },
  { title: 'Heaps', link: 'https://topmate.io/saumyayadav/1606958', icon: <MdOutlineLeaderboard /> },
  { title: 'Maps and Tries', link: 'https://topmate.io/saumyayadav/1606881', icon: <FaSitemap /> },
  { title: 'DP', link: 'https://topmate.io/saumyayadav/1606967', icon: <FaBrain /> },
  { title: 'Graphs', link: 'https://topmate.io/saumyayadav/1600383', icon: <FaProjectDiagram /> },
  { title: 'Greedy / Sliding Window / Bit Manipulation', link: 'https://topmate.io/saumyayadav/1606846', icon: <FaChartLine /> },
  { title: 'COMPLETE NOTES', link: 'https://topmate.io/saumyayadav/1606989', icon: <CgFileDocument /> },
  // { title: 'COMPLETE NOTES', link: '', status: 'coming-soon', icon: <CgFileDocument /> },
];


export default function NotesPage() {
  return (
    <>
      {/* Navbar*/}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-10 md:px-14 py-4 sm:py-5 bg-[#10131c]/80 backdrop-blur-md shadow-md flex justify-between items-center border-b border-gray-800/50"
      >
        <Link href="/" className="text-2xl font-bold text-white hover:cursor-pointer">
          DSA<span className="text-blue-400">Mate</span> Template
        </Link>
        {/* Desktop Links */}
        <div className="hidden sm:flex gap-6 text-white ">
          <Link href="/" className="hover:text-blue-400 transition hover:cursor-pointer">Home</Link>
          <Link href="./notes" className="text-blue-400 hover:cursor-pointer">Notes</Link>
          <Link href="/sheet" className="hover:text-blue-400 transition hover:cursor-pointer">Practice Sheet</Link>
        </div>

        {/* Mobile links*/}
      <div className="sm:hidden text-white">
        <Link href="/" className="text-sm text-white px-4 py-2 rounded-md transition hover:cursor-pointer">Home</Link>
        <Link
          href="/sheet"
          className="text-sm text-white px-4 py-2 rounded-md transition hover:cursor-pointer"
        >
          Practice Sheet
        </Link>
      </div>
      </motion.nav>

      {/* Main notes section */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0d0f16] text-white px-6 md:px-20 py-24"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">📚 DSA Notes</h1>
          <p className="text-gray-300 mb-8">
            Struggling to revise everything from lectures? I've compiled handwritten notes from the 
            <span className="text-blue-400 font-medium"> Supreme 3.0 DSA course</span>. 
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {notesList.map(({ title, link, status, icon }) => (
              <div
                key={title}
                className="hover:bg-[#131521] bg-[#181b27] border border-gray-700 rounded-lg p-5 text-left shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {icon}
                    {title}
                </h2>


                {status === 'coming-soon' ? (
                  <span className="text-yellow-400 text-sm">Coming Soon</span>
                ) : (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm"
                  >
                    View on Topmate →
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-8">*No pressure — just here if you need them. Happy learning 💙 All notes are optional.</p>
        </div>

      </motion.main>

        <footer 
              className="bg-[#141620] px-6 md:px-20 py-10 text-sm text-gray-400">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* about us */}
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-3">About Us</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      DSAMate | DSA Practice is your ultimate destination for all DSA (Data Structures and Algorithms) questions.
                    </p>
                    {/* Buy Me a Coffee */}
                    <a
                      href="https://www.buymeacoffee.com/saumyayadav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-yellow-600 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition"
                    >☕ Buy me a coffee</a>
                  </div>
                  {/* quick links */}
                  <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/" className="hover:text-blue-400">Home</a>
                    </li>
                    <li>
                      <a href="/sheet" className="hover:text-blue-400">Practice Problems</a>
                    </li>
                    <li>
                      <a href="https://github.com/saumyayadav25/DSA-Supreme-3.0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        All DSA Codes
                      </a>
                    </li>
                    <li>
                      <a href="/notes" rel="noopener noreferrer" className="hover:text-blue-400">Notes</a>
                    </li>
                    <li>
                      <a href="https://forms.gle/bdwBp8oFRWugcrcg9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        Feedback Form
                      </a>
                    </li>
                  </ul>
                </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl">
                      <a href="https://x.com/SaumyaYadav817" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter />
                      </a>
                      <a href="https://github.com/saumyayadav25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaGithub />
                      </a>
                      <a href="https://www.linkedin.com/in/saumya-yadav-/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Contact</h3>
                    <p>Email: <a href="mailto:contact.dsapractice@gmail.com" className="text-blue-400">contact.dsapractice@gmail.com</a></p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-400 mt-10">&copy; 2024 DSA Practice. All Rights Reserved.</p>
              </footer>
    </>
  );
}
