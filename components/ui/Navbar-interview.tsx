"use client";

import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { ChevronDown, Menu, X, Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

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

export default function NavbarInterview({
  searchTerm,
  setSearchTerm,
}: NavbarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
    const searchInputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const isSheetPage = pathname ? pathname.startsWith("/sheet") : false;
    const isInterviewPage = pathname?.startsWith("/interview-experiences");


    const [streak, setStreak] = useState(0);
    const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showMobileSearch]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowMobileSearch(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileSearch = () => {
    setShowMobileSearch((v) => !v);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown menu structure
  const learningLinks = [
    { href: "/sheet", label: "Sheet", keepSearch: true },
    { href: "/notes", label: "Notes" },
    { href: "/companies", label: "Company-wise Sheet" },
    { href: "/timequiz", label: "Timed Quiz" },
    // Flashcards merged into theory-cheatsheets page (tabbed UI)
    { href: "/theory-cheatsheets", label: "Theory Cheatsheets & Flashcards" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "border-white/10" : "border-gray-800/50"
        } bg-background px-4 sm:px-6 lg:px-10 py-4 sm:py-5`}
    >
      <div className="relative w-full flex flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
        {/* Logo & Search Row */}
        <div className="flex flex-row items-center gap-6 lg:gap-12 xl:gap-16 flex-shrink-0 min-w-[220px]">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.0 }}>
            <Link
              href="/"
              className="group relative text-xl sm:text-2xl font-bold text-foreground hover:cursor-pointer flex-shrink-0 pr-2 lg:pr-6 xl:pr-8"
            >
              <span className="relative z-10">
                DSA
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Mate
                </span>{" "}
                v2
              </span>
            </Link>
          </motion.div>
          {/* Desktop Search Icon Only (sheet page only) */}
          {isSheetPage && (
            <button
              className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors ml-2"
              aria-label="Open search bar"
              onClick={() => setShowMobileSearch((v) => !v)}
              style={{ minWidth: 44 }}
            >
              <FiSearch className="text-xl text-foreground" />
            </button>
          )}
        </div>
        {/* Desktop Search Bar Expansion (sheet page only) */}
        {isSheetPage && (
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="hidden lg:block w-full absolute left-0 top-full z-40"
              >
                <div className="max-w-2xl mx-auto mt-2 px-4">
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden px-5 py-4">
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
                        <button
                          onClick={() => setSearchTerm?.("")}
                          className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                          aria-label="Clear search"
                        >
                          <FiX className="text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Desktop Links */}
        <div className="hidden lg:flex flex-row items-center justify-end gap-6 xl:gap-2 text-white min-w-0 w-auto">
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
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown('learning')}
              className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1"
            >
              Learning Tools
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'learning' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl transition-all duration-200 z-40 ${openDropdown === 'learning' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="py-2">
                {learningLinks.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Coding Tools Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown('coding')}
              className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1"
            >
              Coding Tools
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'coding' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl transition-all duration-200 z-40 ${openDropdown === 'coding' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="py-2">
                {codingLinks.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={() => toggleDropdown('community')}
              className="px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 text-foreground hover:text-blue-400 flex items-center gap-1"
            >
              Community
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full mt-1 min-w-[200px] backdrop-blur-xl bg-gradient-to-br from-blue-900/20 via-blue-700/20 to-black/20 border border-blue-950 rounded-2xl shadow-2xl transition-all duration-200 z-40 ${openDropdown === 'community' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="py-2">
                {communityLinks.map(link => link.external ? (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all"
                  >
                    {link.label}
                  </a>
                ) : link.onClick ? (
                  <button 
                    key={link.label} 
                    onClick={() => {
                      link.onClick?.();
                      setOpenDropdown(null);
                    }} 
                    className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-blue-800/40 hover:text-blue-300 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            {isInterviewPage && (
            <Link href="/interview-experiences/share-experience">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 border-blue-500 text-blue-400 hover:bg-blue-500/20"
              >
                <Plus className="h-4 w-4" /> Share Experience
              </Button>
            </Link>
          )}
          </div>

          

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative dropdown-container">
              <button 
                onClick={() => toggleDropdown('profile')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-foreground hover:text-blue-400"
              >
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${openDropdown === 'profile' ? 'border-blue-400/50' : 'border-transparent'}`}
                />
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'profile' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute right-0 top-full mt-1 min-w-[180px] bg-background border border-border rounded-lg shadow-lg transition-all duration-200 z-40 ${openDropdown === 'profile' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all"
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-blue-400 transition-all"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setOpenDropdown(null);
                    }} 
                    className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-red-400 transition-all"
                  >
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
          {/* Mobile Search Button (sheet page only) */}
          {isSheetPage && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileSearch}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle search"
            >
              <FiSearch className="text-xl text-foreground" />
            </motion.button>
          )}

          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setOpenDropdown(null); // Close any open dropdowns
            }}
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

      {/* Mobile Search Bar */}
      {isSheetPage && (
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 overflow-hidden"
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
      )}

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed top-[80px] left-0 right-0 bottom-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -10,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto z-50"
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
