"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import AuthButtons from "@/components/AuthButtons";
import { ModeToggle } from "./mode-toggle";
import axios from "axios";

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

type NavbarProps = {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
    <motion.span
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -4,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
    <motion.span
      animate={{
        opacity: isOpen ? 0 : 1,
        x: isOpen ? -10 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
    <motion.span
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 4,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
  </div>
);

export default function NavbarSheet({ searchTerm, setSearchTerm}: NavbarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const toggleMobileSearch = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    setShowMobileSearch((v) => !v);
  };
  const toggleMobileMenu = () => {
    if (showMobileSearch) setShowMobileSearch(false);
    setIsMobileMenuOpen((v) => !v);
  };
    const [streak, setStreak] = useState(0);
      const [user, setUser] = useState<User | null>(null);
  
    // Check auth once
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("/api/check-auth");
          if (res.status === 200) {
            setUser(res.data?.user);
          }
        } catch (err: any) {
          if (err.response?.status === 401 || err.response?.status === 503) {
            setUser(null);
          } else {
            setUser(null);
          }
        }
      };
      checkAuth();
    }, []);
    useEffect(()=>{
       if (!user?._id) return;
      const fetchStreak = async () => {
        try {
          console.log("Fetching streak for user:", user?._id);
          const response = await axios.get(`/api/progress/${user?._id}`);
          console.log("Streak response:", response.data.progress.streakCount);
          setStreak(response.data.progress.streakCount);
        } catch (error) {
          console.log(error);
        }
      };
      fetchStreak();
    }, [user?._id]);
  

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

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showMobileSearch]);

  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    { href: "/code-analyzer", label: "Code Analyzer", isActive: pathname === "/code-analyzer" },
    { href: "/progress", label: "Progress", isActive: pathname === "/progress" },
    { href: "/contributors", label: "Contributors", isActive: pathname === "/contributors" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? "border-white/10" : "border-gray-800/50"
      } bg-background px-4 sm:px-10 md:px-14 py-4 sm:py-5`}
    >
      <div className="relative flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.0 }}>
          <Link
            href="/"
            className="group relative text-2xl font-bold text-foreground hover:cursor-pointer"
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

        {/* Desktop Search */}
        <motion.div
          className="hidden md:flex items-center relative group max-w-md flex-1 mx-8"
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div
            className={`relative w-full transition-all duration-300 ${
              isSearchFocused ? "transform scale-105" : ""
            }`}
          >
            <div
              className={`relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 ${
                isSearchFocused
                  ? "bg-white/15 shadow-2xl ring-2 ring-blue-400/50"
                  : "bg-white/10 shadow-lg hover:bg-white/12"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-neutral-500/10"
                animate={{
                  backgroundPosition: isSearchFocused
                    ? ["0% 50%", "100% 50%", "0% 50%"]
                    : "0% 50%",
                }}
                transition={{
                  duration: 3,
                  repeat: isSearchFocused ? Infinity : 0,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
              <div className="relative flex items-center px-5 py-3">
                <motion.div
                  animate={{
                    scale: isSearchFocused ? 1.1 : 1,
                    color: isSearchFocused ? "#60a5fa" : "#9ca3af",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FiSearch className="mr-3 text-lg" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm ?? ""}
                  onChange={(e) => setSearchTerm?.(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent focus:outline-none text-sm text-white placeholder-gray-400 w-full font-medium"
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={() => setSearchTerm?.("")}
                      className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                      aria-label="Clear search"
                    >
                      <FiX className="text-gray-400 hover:text-white" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Links + Streak + Auth */}
        <div className="hidden sm:flex flex-wrap items-center justify-end gap-4 text-white min-w-0">
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
            className="cursor-pointer shrink-0"
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

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="shrink-0"
              >
                <Link
                  href={link.href}
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer hover:bg-white/5"
                >
                  <span
                    className={`relative z-10 ${
                      link.isActive ? "text-blue-400" : "text-gray-900 dark:text-white hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </span>
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
          </div>

          {/* Auth Buttons */}
          <div className="shrink-0">
            <AuthButtons />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden mt-4 overflow-hidden"
          >
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden px-4 py-3">
              <div className="flex items-center">
                <FiSearch className="mr-3 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm ?? ""}
                  onChange={(e) => setSearchTerm?.(e.target.value)}
                  className="bg-transparent focus:outline-none text-sm w-full text-white placeholder-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchTerm?.("")}
                    className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Clear search"
                  >
                    <FiX className="text-gray-400" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Links */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden flex flex-col gap-2 mt-4 rounded-lg bg-background/90 backdrop-blur-md border border-white/20 px-4 py-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 px-3 rounded-md transition-colors ${
                  link.isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/10"
                }`}
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
