"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire, FaStar, FaRegStar } from "react-icons/fa";

import { usePathname } from "next/navigation";
interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

interface MenuItem {
  label: string;
  href: string;
  icon: string;
  onClick?: () => void;
}

export default function AuthButtons() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Testimonial Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    rating: 5,
    likedMost: "",
    howHelped: "",
    feedback: "",
    canShow: true,
    displayPreference: "nameAndDesignation"
  });


  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data?.user);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setIsLoggedIn(false);
          setUser(null);
        } else if (err.response?.status === 503) {
          setIsLoggedIn(false);
          setUser(null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  const menuItems = [
    {
      label: "Interview Experiences",
      href: "/interview-experiences",
      icon: "🗣️",
    },
    {
      label: "Theory Cheatsheets",
      href: "/theory-cheatsheets",
      icon: "📒",
    },
    {
      label: "Track Your Cp",
      href: "/cp-tracker",
      icon: "🎯",
    },
    {
      label: "Flashcards",
      href: "/flashcards",
      icon: "🧠",
    },
    {
      label: "Star on GitHub",
      href: "https://github.com/saumyayadav25/DSA-Supreme-3.0",
      icon: "⭐",
    },
    {
      label: "Give Testimonial",
      href: "#",
      icon: "✨",
      onClick: () => setIsModalOpen(true),
    },
    {
      label: "Provide Feedback",
      href: "https://forms.gle/bdwBp8oFRWugcrcg9",
      icon: "💭",
    },
    {
      label: "Support the project",
      href: "https://www.buymeacoffee.com/saumyayadav",
      icon: "🔥",
    },
  ];
  const handleLogOut = async () => {
    const res = await axios.post("/api/logout");

    if (res.status === 200) {
      toast("User Logged Out Successfully!");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    {
      href: "/code-analyzer",
      label: "Code Analyzer",
      isActive: pathname === "/code-analyzer",
    },
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
    {
      href: "/companies",
      label: "Companies",
      isActive: pathname === "/companies",
    },
    {
      href: "/timequiz",
      label: "Timed Quiz",
      isActive: pathname === "/timequiz",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
  };

  // Testimonial form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      let newValue: string | number | boolean = value;

      if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        newValue = parseInt(value);
      }

      // If canShow is being unchecked, reset displayPreference
      if (name === 'canShow' && !newValue) {
        return {
          ...prev,
          [name]: newValue as boolean,
          displayPreference: "nameAndDesignation" // Reset to default
        };
      }

      return {
        ...prev,
        [name]: newValue
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.designation.trim() ||
        !formData.likedMost.trim() || !formData.howHelped.trim() || !formData.feedback.trim() ||
        (formData.canShow && !formData.displayPreference)) {
        alert('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/testimonial/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Trigger testimonials refresh event
        window.dispatchEvent(new CustomEvent('testimonialsUpdated'));

        alert('Thank you for your testimonial! It has been submitted successfully and will appear in the testimonials section shortly.');

        setFormData({
          name: "",
          email: "",
          designation: "",
          rating: 5,
          likedMost: "",
          howHelped: "",
          feedback: "",
          canShow: true,
          displayPreference: "nameAndDesignation"
        });
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to submit testimonial'}`);
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Error submitting testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      designation: "",
      rating: 5,
      likedMost: "",
      howHelped: "",
      feedback: "",
      canShow: true,
      displayPreference: "nameAndDesignation"
    });
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
    },
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
      },
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
      },
    },
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
        type: "spring" as const,
        damping: 20,
        stiffness: 400,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      rotateY: 15,
      transition: {
        duration: 0.15,
      },
    },
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


  return (
    <div className="flex items-center gap-3">
      {/* Login/Sign In Button or User Profile */}
      {!isLoggedIn ? (
        <motion.div>
          <Link
            href="/sign-in"
            className="px-4 w-20 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
          >
            Sign In
          </Link>
        </motion.div>
      ) : (

        <Link
          href={user ? `/profile/${encodeURIComponent(user._id)}` : "#"} //Redirects to user profile dashboard
          className="relative flex items-center gap-2 px-3 py-2 bg-muted/50 backdrop-blur-sm rounded-lg hover:bg-muted transition-all duration-200 text-foreground text-sm font-medium border border-border"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 w-full"
          >
            {/* Avatar Circle */}
            <div className="relative w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="U"
                  width={25}
                  height={25}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src="/images/default-avatar.png"
                  alt="Default Avatar"
                  width={25}
                  height={25}
                  className="object-cover w-full h-full"
                />
              )}

              {/* Hover Edit Button */}
              <button
                type="button"
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-full"
                onClick={e => {
                  e.stopPropagation();
                  window.location.href = "/profile_pic/settings/avatar";
                }} // prevent navigating to profile when clicking this and redirect
                aria-label="Edit Avatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232a3 3 0 014.243 4.243L7.5 21H3v-4.5L15.232 5.232z"
                  />
                </svg>
              </button>
            </div>

            <span className="max-w-20 truncate">{user?.full_name}</span>
          </motion.div>
        </Link>
      )}

      {/* Hamburger Menu */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="relative p-3 rounded-xl transition-all duration-300 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-400/50"
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
              {/* Glassmorphism backdrop with proper theme support */}
              <div className="relative backdrop-blur-2xl bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent pointer-events-none" />

                {/* Subtle animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(var(--border) / 0.3), transparent)",
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
                  {/* User-specific menu items */}
                  {/* {user && (
                    <>
                      <motion.a
                        href="/profile"
                        variants={itemVariants}
                        className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.02,
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
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
                          👤
                        </motion.span>
                        
                        <span className="relative z-10 font-bold text-sm">
                          Profile
                        </span>
                      </motion.a>

                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </>
                  )} */}
                    <div className="md:hidden flex flex-wrap justify-center items-center gap-2 py-3 ">
                    {navLinks.map((link, index) => (
                      <motion.div
                      key={link.href}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      >
                        <Link
                          href={link.href}
                          className={`relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer hover:bg-muted/50`}
                        >
                          <span
                            className={`relative z-10 ${link.isActive
                              ? "text-blue-400"
                              : "text-foreground hover:text-blue-400"
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
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    </div>
                  {/* Bottom highlight */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />

                  {/* Original menu items */}
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group flex items-center gap-3 px-4 py-3 text-sm text-foreground rounded-xl transition-all duration-200 hover:bg-muted hover:text-foreground relative overflow-hidden cursor-pointer"
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        } else if (item.href && item.href !== "#") {
                          if (item.href.startsWith("http")) {
                            window.open(item.href, "_blank", "noopener noreferrer");
                          } else {
                            window.location.href = item.href;
                          }
                        }
                      }}
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
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {item.icon}
                      </motion.span>

                      <span className="relative z-10 font-bold text-sm">
                        {item.label}
                      </span>

                      {/* External link indicator */}
                      {item.href.startsWith("http") && (
                        <motion.span
                          className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 relative z-10"
                          initial={{ rotate: -45, scale: 0 }}
                          whileHover={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          ↗
                        </motion.span>
                      )}
                    </motion.div>
                  ))}

                  {/* Logout button for logged-in users */}
                  {isLoggedIn && (
                    <>
                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      />

                      <motion.div
                        onClick={handleLogout}
                        variants={itemVariants}
                        className="group flex items-center gap-3 px-4 py-3 text-sm text-red-500 dark:text-red-400 rounded-xl transition-all duration-200 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 relative overflow-hidden w-full"
                        whileHover={{
                          scale: 1.02,
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.span
                          className="text-lg flex-shrink-0 relative z-10"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        ></motion.span>

                        <Button
                          onClick={handleLogOut}
                          className="relative z-10 font-bold text-sm"
                        >
                          <LogOut /> LogOut
                        </Button>
                      </motion.div>
                    </>
                  )}

                  {/* Bottom highlight */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-2"
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

      {/* Testimonial Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative backdrop-blur-2xl bg-popover border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#94a3b8 transparent',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >

              {/* Subtle animated border gradient */}
              <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                <div className="w-full h-full bg-transparent rounded-2xl" />
              </div>

              {/* Content wrapper with proper z-index */}
              <div className="relative z-10 w-full h-full">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors backdrop-blur-sm z-20"
                >
                  <FiX size={20} />
                </button>

                {/* Form Header */}
                <div className="text-center mb-8 pt-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Share Your Experience
                  </h2>
                  <p className="text-muted-foreground">
                    Help others by sharing how DSAMate helped you in your journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-foreground mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                      placeholder="e.g., Student, Software Engineer, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Overall Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="text-2xl transition-all hover:scale-110"
                        >
                          {star <= formData.rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-muted-foreground" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="likedMost" className="block text-sm font-medium text-foreground mb-2">
                      What did you like most about DSAMate? *
                    </label>
                    <textarea
                      id="likedMost"
                      name="likedMost"
                      value={formData.likedMost}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar"
                      placeholder="Share what features or aspects you found most valuable..."
                    />
                  </div>


                  <div>
                    <label htmlFor="howHelped" className="block text-sm font-medium text-foreground mb-2">
                      How did DSAMate help you? *
                    </label>
                    <textarea
                      id="howHelped"
                      name="howHelped"
                      value={formData.howHelped}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar"
                      placeholder="Share how DSAMate improved your learning journey..."
                    />
                  </div>

                  {/* Feedback */}
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-foreground mb-2">
                      Additional Feedback *
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar"
                      placeholder="Any additional thoughts, suggestions, or experiences you'd like to share..."
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="canShow"
                      name="canShow"
                      checked={formData.canShow}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-400 bg-background border-border rounded focus:ring-blue-400 focus:ring-2"
                    />
                    <label htmlFor="canShow" className="text-sm text-foreground">
                      I allow DSAMate to display this testimonial publicly
                    </label>
                  </div>

                  {formData.canShow && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        If yes, how would you like your feedback to be shown? *
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="nameAndDesignation"
                            name="displayPreference"
                            value="nameAndDesignation"
                            checked={formData.displayPreference === "nameAndDesignation"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-background border-border focus:ring-blue-400 focus:ring-2"
                          />
                          <label htmlFor="nameAndDesignation" className="ml-2 text-sm text-foreground">
                            Use my name and designation
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="nameOnly"
                            name="displayPreference"
                            value="nameOnly"
                            checked={formData.displayPreference === "nameOnly"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-background border-border focus:ring-blue-400 focus:ring-2"
                          />
                          <label htmlFor="nameOnly" className="ml-2 text-sm text-foreground">
                            Use my name only
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="anonymous"
                            name="displayPreference"
                            value="anonymous"
                            checked={formData.displayPreference === "anonymous"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-background border-border focus:ring-blue-400 focus:ring-2"
                          />
                          <label htmlFor="anonymous" className="ml-2 text-sm text-foreground">
                            As anonymous user
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-border bg-background text-foreground rounded-lg hover:bg-muted transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/40 text-white rounded-lg transition-all font-medium disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Testimonial'
                      )}
                    </button>
                  </div>
                </form>
              </div> 
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6));
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8));
        }
        
        /* Dark mode adjustments */
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4));
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7));
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
        }
        
        /* Hide scrollbar completely option - uncomment to use */
        /*
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        */
      `}</style>
    </div>
  );
}
