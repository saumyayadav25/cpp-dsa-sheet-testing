"use client";

import { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Navigation Links
  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    { href: "/progress", label: "Progress", isActive: pathname === "/progress" },
    { href: "/contributors", label: "Contributors", isActive: pathname === "/contributors" },
    { href: "/timequiz", label: "Timed Quiz", isActive: pathname === "/timequiz" },
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
      className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center 
        transition-all duration-300 border-b 
        ${isScrolled ? "border-white/10" : "border-gray-800/50"} 
        bg-background px-4 sm:px-10`}
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
        <div className="hidden sm:flex items-center gap-6 text-foreground flex-nowrap">

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

          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${link.isActive
                  ? "text-blue-400 bg-blue-500/10 border border-blue-400/30"
                  : "text-foreground hover:text-blue-400"

              }`}
              // Added passHref and changed children to span to avoid nested anchor
              

            >
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Right Icons */}
          <AuthButtons />
          <ModeToggle />
        </div>

        {/* Mobile Right Section */}
        <div className="sm:hidden flex items-center gap-3">
          <ModeToggle />
          <AuthButtons />
        </div>
      </div>
    </motion.nav>
  );
}
