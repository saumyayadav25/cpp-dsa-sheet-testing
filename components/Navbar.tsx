"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"; // Add this import
import AuthButtons from "@/components/AuthButtons";

type NavbarProps = {
  streak: number;
};

export default function Navbar({ streak }: NavbarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname(); 

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic navigation links based on current pathname
  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    {
      href: "/progress",
      label: "Progress",
      isActive: pathname === "/progress",
    },
    {
      href: "/contributors",
      label: "Contributors",
      isActive: pathname === "/contributors",
    },
  ];

  const streakVariants = {
    idle: { scale: 1, rotate: 0 },
    active: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#10131c]/80 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-[#10131c]/80 backdrop-blur-md shadow-md border-b border-gray-800/50"
      } px-4 sm:px-10 md:px-14 py-4 sm:py-5`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.0 }}>
          <Link
            href="/"
            className="group relative text-2xl font-bold text-white hover:cursor-pointer"
          >
            <span className="relative z-10">
              DSA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                Mate
              </span>{" "}
              Template
            </span>
          </Link>
        </motion.div>

        {/* Desktop Links and Right Icons */}
        <div className="hidden sm:flex items-center gap-6 text-white">
          {/* Streak Icon */}
          <motion.div
            title={`Streak: ${streak} day${streak === 1 ? "" : "s"}`}
            variants={streakVariants}
            animate={streak > 0 ? "active" : "idle"}
            transition={{
              duration: 0.6,
              repeat: streak > 0 ? Infinity : 0,
              repeatDelay: 3,
            }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                streak > 0
                  ? "text-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20"
                  : "text-gray-400 opacity-50 hover:opacity-75"
              }`}
            >
              <FaFire className="text-lg" />
              {streak > 0 && (
                <motion.span
                  className="text-sm font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {streak}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Navigation Links - Updated to use dynamic active state */}
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer hover:bg-white/5`}
              >
                <span
                  className={`relative z-10 ${
                    link.isActive
                      ? "text-blue-400"
                      : "text-white hover:text-blue-400"
                  }`}
                >
                  {link.label}
                </span>
                {/* Add active indicator */}
                {link.isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-400/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {/* Auth Buttons */}
          <AuthButtons />
        </div>
        <div className="sm:hidden flex items-center gap-3 text-white">
                      <div className="flex items-center gap-3">
            {/* Mobile Streak Icon */}
            <motion.div
              title={`Streak: ${streak} day${streak === 1 ? "" : "s"}`}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center gap-1 ${
                  streak > 0 ? "text-orange-400" : "text-gray-400 opacity-50"
                }`}
              >
                <FaFire className="text-lg" />
                {streak > 0 && (
                  <span className="text-sm font-bold">{streak}</span>
                )}
              </div>
            </motion.div>
            </div>
            {/* Mobile Auth Buttons */}
            <AuthButtons />
        </div>
      </div>
    </motion.nav>
  );
}
