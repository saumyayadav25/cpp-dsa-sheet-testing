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
    <nav className="sticky top-0 z-50 bg-[#202226] text-white shadow-md px-4 md:px-20 sm:py-5 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-3xl sm:text-4xl font-bold hover:text-gray-300">
          DSA<span className="text-blue-400">Mate</span>
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

        {/* Right Icons */}
        <div className="flex items-center gap-4">

          {/* Mobile Search Icon */}
          <button onClick={toggleMobileSearch} className="md:hidden text-xl">
            <FiSearch />
          </button>
          <div className="flex gap-6 items-center">
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
            <Link href="/notes" className="hover:text-blue-400 transition hover:cursor-pointer">Notes</Link>
            {/* Auth Buttons */}
            <AuthButtons />
          </div>

        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden mt-3 flex items-center bg-[#f6f6f6] text-black rounded-full px-4 py-2">
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
