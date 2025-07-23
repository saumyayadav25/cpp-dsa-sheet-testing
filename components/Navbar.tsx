'use client';

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import Link from 'next/link';
import AuthButtons from "@/components/AuthButtons";


type NavbarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  streak: number;
};


export default function Navbar({ searchTerm, setSearchTerm, streak }: NavbarProps){
  // const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#10131c]/80 backdrop-blur-md shadow-md border-b border-gray-800/50 px-4 sm:px-10 md:px-14 py-4 sm:py-5">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:cursor-pointer">
          DSA<span className="text-blue-400">Mate</span> Template
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-[#f6f6f6] text-black rounded-full px-4 py-3">
          <FiSearch className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Search questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-sm w-64"
          />
        </div>

        {/* Desktop Links and Right Icons */}
        <div className="hidden sm:flex items-center gap-6 text-white">
          {/* Streak Icon */}
          <div title={`Streak: ${streak} day${streak === 1 ? '' : 's'}`}>
            <div
              className={`flex items-center gap-1 ${
                streak > 0 ? 'text-orange-500 font-semibold' : 'text-gray-100 opacity-50'
              }`}
            >
              <FaFire className="text-lg" />
              {streak > 0 && <span className="text-sm">{streak}</span>}
            </div>
          </div>
          <Link href="/" className="hover:text-blue-400 transition hover:cursor-pointer">Home</Link>
          <Link href="/notes" className="hover:text-blue-400 transition hover:cursor-pointer">Notes</Link>
          <Link href="/sheet" className="text-blue-400 hover:cursor-pointer">Practice Sheet</Link>
          
          
          {/* Auth Buttons */}
          <AuthButtons />
        </div>

        {/* Mobile Search Icon and Menu */}
        <div className="sm:hidden flex items-center gap-4 text-white ">
          <button onClick={toggleMobileSearch} className="text-xl text-white">
            <FiSearch />
          </button>
          <Link href="/" className="hover:cursor-pointer">Home</Link>
          <Link href="/notes" className="hover:cursor-pointer">Notes</Link>
          <div className="flex items-center gap-2">
            {/* Mobile Streak Icon */}
            <div title={`Streak: ${streak} day${streak === 1 ? '' : 's'}`}>
              <div
                className={`flex items-center gap-1 ${
                  streak > 0 ? 'text-orange-500 font-semibold' : 'text-gray-100 opacity-50'
                }`}
              >
                <FaFire className="text-lg" />
                {streak > 0 && <span className="text-sm">{streak}</span>}
              </div>
            </div>
            {/* Mobile Auth Buttons */}
            <AuthButtons />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="sm:hidden mt-3 flex items-center bg-[#f6f6f6] text-black rounded-full px-4 py-2">
          <FiSearch className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Search questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-sm w-full"
          />
        </div>
      )}
    </nav>
  );
}
