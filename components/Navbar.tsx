"use client";

import { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import axios from "axios";

interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [streak, setStreak] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  // Check auth once
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setUser(res.data?.user);
          console.log("User authenticated:", res.data.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setUser(null);
        } else if (err.response?.status === 503) {
          console.log("Auth service temporarily unavailable");
          setUser(null);
        } else {
          console.log("Auth service unavailable");
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dropdown menu structure
  const learningLinks = [
    { href: "/sheet", label: "Sheet" },
    { href: "/notes", label: "Notes" },
    { href: "/companies", label: "Company-wise Sheet" },
    { href: "/timequiz", label: "Timed Quiz" },
    { href: "/theory-cheatsheets", label: "Theory Cheatsheets" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/interview-experiences", label: "Interview Experiences" },
  ];

  const codingLinks = [
    { href: "/code-analyzer", label: "Code Analyzer" },
    { href: "/cp-tracker", label: "Track Your CP" },
  ];

  const communityLinks = [
    { href: "https://github.com/saumyayadav25/DSA-Supreme-3.0", label: "Star on GitHub", external: true },
    { href: "/contributors", label: "Contributors" },
    { href: "#", label: "Give Testimonial", onClick: () => window.dispatchEvent(new CustomEvent('openTestimonialModal')) },
    { href: "https://forms.gle/bdwBp8oFRWugcrcg9", label: "Provide Feedback", external: true },
    { href: "https://www.buymeacoffee.com/saumyayadav", label: "Support the Project", external: true },
  ];

  const streakVariants = {
    idle: { scale: 1, rotate: 0 },
    active: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center 
        transition-all duration-300 border-b 
        ${isScrolled ? "border-white/10" : "border-gray-800/50"} 
        bg-background px-4 sm:px-6 lg:px-10`}
    >
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.0 }}>
          <Link
            href="/"
            className="group relative text-xl sm:text-2xl font-bold text-foreground flex-shrink-0"
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

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-foreground flex-nowrap">
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
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${streak > 0
                ? "text-orange-400"
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

          {/* Home (hide on homepage) */}
          {pathname !== "/" && (
            <Link href="/" className="relative px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400">
              Home
            </Link>
          )}

          {/* Learning Tools Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1">
              Learning Tools
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
              <div className="py-2">
                {learningLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Coding Tools Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1">
              Coding Tools
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
              <div className="py-2">
                {codingLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1">
              Community
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
              <div className="py-2">
                {communityLinks.map(link => link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all">
                    {link.label}
                  </a>
                ) : link.onClick ? (
                  <button key={link.label} onClick={link.onClick} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all">
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-foreground hover:text-blue-400">
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-blue-400/50 transition-all"
                />
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full mt-1 min-w-[180px] bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                    Profile
                  </Link>
                  <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-red-400 transition-all">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="px-4 py-2 text-sm text-foreground hover:text-blue-400 transition-colors">
                Login
              </Link>
              <Link href="/sign-up" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mode Toggle */}
          <ModeToggle />
        </div>

        {/* Mobile Right Section */}
        <div className="lg:hidden flex items-center gap-3">
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -10,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg lg:hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Streak (Mobile) */}
          <div className="flex items-center justify-center">
            <motion.div
              title={`Streak: ${streak} day${streak === 1 ? "" : "s"}`}
              variants={streakVariants}
              animate={streak > 0 ? "active" : "idle"}
              transition={{
                duration: 0.6,
                repeat: streak > 0 ? Infinity : 0,
                repeatDelay: 3,
              }}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${streak > 0
                  ? "text-orange-400"
                  : "text-gray-400 opacity-50"
                  }`}
              >
                <FaFire className="text-lg" />
                {streak > 0 && (
                  <span className="text-sm font-bold">{streak}</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Home Link (Mobile) */}
          {pathname !== "/" && (
            <Link href="/" className="block px-4 py-3 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all rounded-lg">
              Home
            </Link>
          )}

          {/* Learning Tools (Mobile) */}
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Learning Tools</div>
            {learningLinks.map(link => (
              <Link key={link.href} href={link.href} className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Coding Tools (Mobile) */}
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Coding Tools</div>
            {codingLinks.map(link => (
              <Link key={link.href} href={link.href} className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Community (Mobile) */}
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Community</div>
            {communityLinks.map(link => link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                {link.label}
              </a>
            ) : link.onClick ? (
              <button key={link.label} onClick={link.onClick} className="block w-full text-left px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                {link.label}
              </button>
            ) : (
              <Link key={link.href} href={link.href} className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Profile (Mobile) */}
          {user ? (
            <div className="space-y-1 border-t border-border pt-4">
              <div className="flex items-center gap-3 px-4 py-2">
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{user.full_name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Link href="/profile" className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                Profile
              </Link>
              <Link href="/dashboard" className="block px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-6 py-2.5 text-foreground hover:bg-muted/50 hover:text-red-400 transition-all">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2 border-t border-border pt-4">
              <Link href="/sign-in" className="block px-4 py-3 text-center text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all rounded-lg border border-border">
                Login
              </Link>
              <Link href="/sign-up" className="block px-4 py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}