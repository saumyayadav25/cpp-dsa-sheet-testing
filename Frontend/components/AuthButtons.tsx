'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function AuthButtons() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Home", href: "/", icon: "" },
    { label: "Star on GitHub", href: "https://github.com/saumyayadav25/DSA-Supreme-3.0", icon: "⭐" },
    { label: "Give Testimonial", href: "https://forms.gle/8BXQC1o3hsVsEEBp9", icon: "✨" },
    { label: "Provide Feedback", href: "https://forms.gle/bdwBp8oFRWugcrcg9", icon: "💭" },
    { label: "Support the project", href: "https://www.buymeacoffee.com/saumyayadav", icon: "🔥" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      rotateX: 15,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring" as "spring",
        damping: 20,
        stiffness: 400,
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      rotateY: 15,
      transition: {
        duration: 0.15,
      }
    }
  };

  const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block w-5 h-0.5 bg-white origin-center absolute"
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? -10 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="block w-5 h-0.5 bg-white origin-center absolute"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block w-5 h-0.5 bg-white origin-center absolute"
      />
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="relative p-3 rounded-xl transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        variants={hamburgerVariants}
        animate={showDropdown ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HamburgerIcon isOpen={showDropdown} />
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg -z-10"
          animate={{
            opacity: showDropdown ? 0.6 : 0,
            scale: showDropdown ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence mode="wait">
        {showDropdown && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-3 w-64 origin-top-right z-50"
            style={{ perspective: "1000px" }}
          >
            {/* Glassmorphism backdrop */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-tl from-blue-950/90 via-neutral-950/90 to-neutral-950/90  drop-shadow-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              {/* Subtle animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative p-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      x: 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Hover effect background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.span 
                      className="text-lg flex-shrink-0 relative z-10"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    <span className="relative z-10 font-bold text-sm">
                      {item.label}
                    </span>

                    {/* External link indicator */}
                    {item.href.startsWith("http") && (
                      <motion.span
                        className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 relative z-10"
                        initial={{ rotate: -45, scale: 0 }}
                        whileHover={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        ↗
                      </motion.span>
                    )}
                  </motion.a>
                ))}

                {/* Bottom highlight */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}