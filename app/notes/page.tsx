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
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Navbar from '@/components/Navbar2';


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
];

export default function NotesPage() {
    const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', isActive: false },
    { href: '/notes', label: 'Notes', isActive: false },
    { href: '/sheet', label: 'Sheet', isActive: true },
  ];
  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#10131c]/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
            : 'bg-[#10131c]/80 backdrop-blur-md shadow-md border-b border-gray-800/50'
        } px-4 sm:px-10 md:px-14 py-4 sm:py-5`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        <div className="relative flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1.0 }}
          >
            <Link href="/" className="group relative text-2xl font-bold text-white hover:cursor-pointer">
              <span className="relative z-10">
                DSA<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">Mate</span> Template
              </span>
            </Link>
          </motion.div>


          <div className="hidden md:flex items-center gap-8 text-white">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href={link.href} 
                  className={`relative px-3 py-2 rounded-lg transition-all  duration-300 group hover:text-blue-400 hover:cursor-pointer`}
                >
                  <span className={`relative z-10 ${link.label === 'Notes' ? 'text-blue-400' : 'text-white'}`}>
                    {link.label}
                  </span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </motion.div>
            ))}
              
              
          </div>

         <div className='flex md:hidden'>
          <Navbar/>
         </div>
        </div>
      </motion.nav>


      {/* Main notes section */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-[#0d0f16] to-[#151925] text-white px-6 md:px-20 py-24"
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
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Handwritten notes from the <span className="font-semibold text-blue-400">Supreme 3.0 DSA course</span> to help you revise concepts quickly and effectively.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {notesList.map(({ title, link, status, icon }) => (
              <motion.div
                key={title}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                className="hover:bg-[#1a1e2e] bg-[#181b27] border border-gray-800 rounded-xl p-6 text-left shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300">
                    {icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-100 group-hover:text-white">
                      {title}
                    </h2>
                    {status === 'coming-soon' ? (
                      <span className="inline-block px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-xs">
                        Coming Soon
                      </span>
                    ) : (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white text-sm font-medium transition-all duration-300 group-hover:shadow-lg"
                      >
                        View Notes
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-500 mt-12 text-sm"
          >
            *These notes are completely optional resources to supplement your learning. Happy coding! 💙
          </motion.p>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-[#141620] px-6 md:px-20 py-12 text-gray-400 border-t border-gray-800/50">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              About DSAMate
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Your ultimate destination for mastering Data Structures and Algorithms with comprehensive resources.
            </p>
            <a
              href="https://www.buymeacoffee.com/saumyayadav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              ☕ Buy me a coffee
            </a>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-400 flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sheet" className="hover:text-blue-400 flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Practice Problems
                </Link>
              </li>
              <li>
                <a href="https://github.com/saumyayadav25/DSA-Supreme-3.0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  All DSA Codes
                </a>
              </li>
              <li>
                <Link href="/notes" className="hover:text-blue-400 flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Notes
                </Link>
              </li>
              <li>
                <a href="https://forms.gle/bdwBp8oFRWugcrcg9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Feedback
                </a>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Connect With Me
            </h3>
            <div className="flex gap-4 text-2xl mb-4">
              <a href="https://x.com/SaumyaYadav817" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://github.com/saumyayadav25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/saumya-yadav-/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaLinkedin />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-[#1e2130] text-white px-3 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm rounded-r-lg transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Contact Info
            </h3>
            <p className="mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contact.dsapractice@gmail.com" className="hover:text-blue-400">contact.dsapractice@gmail.com</a>
            </p>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Support This Project</h4>
              <p className="text-xs text-gray-400 mb-3">
                If you find these resources helpful, consider supporting to help maintain and improve them.
              </p>
              <a 
                href="https://github.com/sponsors/saumyayadav25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1e2130] hover:bg-[#2a2e42] px-4 py-2 rounded-lg text-sm transition-all"
              >
                <FaGithub /> Sponsor on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DSA Practice. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Made with ❤️ by Saumya Yadav
          </p>
        </div>
      </footer>
    </>
  );
}