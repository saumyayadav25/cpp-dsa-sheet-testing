"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AuthButtons from "@/components/AuthButtons";
import { ModeToggle } from "./mode-toggle";

type NavbarProps = {
  streak: number;
};

export default function Navbar({ streak }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Navigation Links
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? "border-white/10" : "border-gray-800/50"
      } px-4 sm:px-10 md:px-14 py-4 sm:py-5 bg-background`}
      // bg-background uses your CSS variable, no hard-coded background!
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
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                streak > 0
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
            <motion.div
              key={link.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer`}
              >
                <span
                  className={`relative z-10 ${
                    link.isActive
                      ? "text-blue-400"
                      : "text-foreground hover:text-blue-400"
                  }`}
                >
                  {link.label}
                </span>
                {/* Active indicator */}
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

          <AuthButtons />
          <ModeToggle />
        </div>

        {/* Mobile Right Section */}
        <div className="sm:hidden flex items-center gap-3 text-foreground">
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
          <ModeToggle />
          <AuthButtons />
        </div>
      </div>
    </motion.nav>
  );
}
