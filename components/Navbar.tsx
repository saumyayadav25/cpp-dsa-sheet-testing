"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import AuthButtons from "@/components/AuthButtons";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavbarProps = {
  streak: number;
};

export default function Navbar({ streak }: NavbarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Function to toggle mobile search visibility
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  // Handle scroll effect to change navbar appearance
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

  // Navigation links with dynamic active state
  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    { href: "/progress", label: "Progress", isActive: pathname === "/progress" },
    { href: "/contributors", label: "Contributors", isActive: pathname === "/contributors" },
  ];

  // Animation variants for the streak icon
  const streakVariants = {
    idle: { scale: 1, rotate: 0 },
    active: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // RESOLVED: Used theme-aware classes for background, blur, shadow, and border
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-2xl border-b border-border/50'
          : 'bg-background/80 backdrop-blur-md shadow-md border-b border-border/30'
      } px-4 sm:px-10 md:px-14 py-4 sm:py-5`}
    >
      {/* Subtle gradient overlay for aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative flex items-center justify-between gap-4">
        {/* Logo */}
        {/* RESOLVED: Used the styled logo from the enhancement branch */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 1.0 }}
        >
          <Link href="/" className="group relative text-2xl font-black tracking-tight hover:cursor-pointer transition-all duration-300 hover:scale-105">
            <span className="relative z-10">
              <span className="gradient-text-light">DSA</span>
              <span className="text-primary">Mate</span>
              <span className="text-muted-foreground ml-1 text-lg font-medium">Template</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Links and Right Icons */}
        <div className="hidden sm:flex items-center gap-6 text-foreground">
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
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
              streak > 0
                ? "text-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20"
                : "text-gray-400 opacity-50 hover:opacity-75"
            }`}>
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

          {/* Navigation Links */}
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer hover:bg-white/5`}
              >
                {/* RESOLVED: Used 'text-foreground' for theme compatibility */}
                <span className={`relative z-10 ${link.isActive ? 'text-blue-400' : 'text-foreground hover:text-blue-400'}`}>
                  {link.label}
                </span>
                {/* Active link indicator */}
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
          
          {/* RESOLVED: Added the ThemeToggle component for desktop view */}
          <ThemeToggle />
          
          <AuthButtons />
        </div>

        {/* Mobile Right Section */}
        {/* RESOLVED: Merged mobile view to include search, links, streak, theme toggle, and auth */}
        <div className="sm:hidden flex items-center gap-3 text-foreground">
          <motion.button
            onClick={toggleMobileSearch}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: showMobileSearch ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {showMobileSearch ? <FiX className="text-xl" /> : <FiSearch className="text-xl" />}
            </motion.div>
          </motion.button>

          {/* Mobile Streak Icon */}
          <motion.div
            title={`Streak: ${streak} day${streak === 1 ? "" : "s"}`}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <div className={`flex items-center gap-1 ${
              streak > 0 ? "text-orange-400" : "text-gray-400 opacity-50"
            }`}>
              <FaFire className="text-lg" />
              {streak > 0 && (
                <span className="text-sm font-bold">{streak}</span>
              )}
            </div>
          </motion.div>
          
          {/* Mobile Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Auth Buttons */}
          <AuthButtons />
        </div>
      </div>
    </motion.nav>
  );
}
