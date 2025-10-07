"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaListUl,
  FaRegCalendarAlt,
  FaChartBar,
  FaSearch,
  FaFire,
} from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import ReportIssueButton from "@/components/ReportIssueButton";
import Navbar from "@/components/Navbar";
import ScrollToTopBottom from "@/components/ScrollToTopBottom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MarqueeDemo } from "@/components/MarqueeDemo";

// Custom hook for animated counting
// Animates numbers from 1 to target value when element comes into view
// Works with strings like "2100+", "30+", etc. and preserves the suffix
function useAnimatedCounter(targetValue: string, isVisible: boolean) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!isVisible) {
      setCount(1);
      return;
    }

    // Extract numeric value from strings like "2100+", "30+", etc.
    const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));

    let currentCount = 1;
    const interval = setInterval(() => {
      currentCount += Math.max(1, Math.floor(numericValue / 50)); // Faster increment
      setCount(Math.min(currentCount, numericValue));

      if (currentCount >= numericValue) {
        clearInterval(interval);
      }
    }, 20); // Much faster animation (20ms instead of 50ms)

    return () => clearInterval(interval);
  }, [isVisible, targetValue]);

  // Format the count with the original suffix (like "+")
  const suffix = targetValue.replace(/[0-9]/g, '');
  return `${count}${suffix}`;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const people = [
  {
    id: 1,
    name: "Prakhar Sinha",
    designation: "Student",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Aryan",
    designation: "Student",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Roshan Gorakhpuriya",
    designation: "Student",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Supriya Pandey",
    designation: "Student / Aspiring Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 5,
    name: "Anonymous User B",
    designation: "Anonymous",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

// FAQ data
const faqData = [
  {
    question: "What if I find an incorrect or broken link?",
    answer: "Click on 'Report an Issue' or email us — we'll fix it quickly.",
  },
  {
    question: "Can I contribute questions or feedback?",
    answer: "The streak system tracks your daily problem-solving consistency. Mark the Problem of the Day (POTD) as completed to maintain your streak. Missing a day will reset your streak to zero, encouraging daily practice habits.",
  },
  {
    question: "How to use filters effectively?",
    answer: "You can use multiple filters like difficulty, platform, status, and revision together to narrow down the questions that best match your current focus. For example, if you're preparing for medium-level problems on LeetCode that you haven't solved yet, just select those filters. You can also filter by questions you've marked for revision. If the results feel too limited or you're done with a specific session, you can reset all filters with a single click to start fresh.",
  },
  {
    question: "What is POTD and how does it help?",
    answer: "POTD (Problem of the Day) helps you build consistency by showing one new question every day. It encourages daily problem-solving without feeling overwhelming. Even if you're short on time, solving just one question keeps your practice streak going and builds momentum over time. It's a great way to stay connected with DSA regularly.",
  },
  {
    question: "Is login required?",
    answer: "Yes , login is required.",
  },
  {
    question: "My question is not listed here, how can I get help?",
    answer: "If you have any questions or need assistance, feel free to reach out to us at contact.dsapractice@gmail.com",
  }
];

// FAQ Item Component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main card */}
      <motion.div
        className="relative w-full bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg dark:shadow-black/10 dark:hover:shadow-black/20 transition-all duration-300 backdrop-blur-sm"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.2 }}
        onClick={onToggle}
      >
        {/* Subtle hover background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/60 to-blue-100/40 dark:from-blue-950/20 dark:to-blue-900/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Question header */}
          <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-tight sm:leading-snug flex-1 min-w-0 pr-2">
              {question}
            </h3>

            {/* Chevron arrow */}
            <motion.div
              className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-0"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <svg
                className={`w-full h-full transition-colors duration-300 ${isOpen
                    ? "text-blue-600 dark:text-blue-400"
                    : isHovered
                      ? "text-gray-700 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed sm:leading-loose">
                    {answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Border highlight on open */}
        <motion.div
          className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-blue-500 dark:border-blue-400 pointer-events-none"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 1.02
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle glow effect when open */}
        <motion.div
          className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-400/10 dark:to-blue-500/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streak, setStreak] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for testimonial
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

  useEffect(() => {
    const savedStreak = localStorage.getItem("userStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
        !formData.likedMost.trim() || !formData.howHelped.trim() ||
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

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500 relative">
      <ReportIssueButton />
      <Navbar />

      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-16 pt-16 sm:pt-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url(/bg.png)" }}
      >

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col">
          <motion.h1
            variants={fadeInUp}
            custom={0}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground drop-shadow-lg mt-6"
          >

            DSA<span className="text-blue-400">Mate</span> v2
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground drop-shadow-md"
          >
            Your daily dose for DSA practice
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex justify-center"
          >
            <img
              src="dsa-hero.png"
              alt="DSA Mate Hero"
              className="w-[40vw]"
              draggable="false"
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20 rounded-full blur-3xl scale-110"></div>
          </motion.div>

          <motion.div variants={fadeInUp} custom={3} className="relative z-10">
            <motion.p
              variants={fadeInUp}
              custom={3}
              className="text-base sm:text-lg md:text-xl text-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-lg px-4 sm:px-0"
            >
              Solve better, revise smarter, and stay consistent with your
              preparation journey.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            >
              <Link
                href="/sheet"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                🚀 Go to Practice Sheet
              </Link>
              <Link
                href="/progress"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                📊 Track Your Progress
              </Link>

              <Link
                href="/cp-tracker"
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                🎯 Track Your CP
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          @media (max-width: 640px) {
            section {
              background-size: cover;
              background-position: center center;
              background-attachment: scroll;
            }
          }
        `}</style>
      </motion.section>

      {/* STATISTICS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by <span className="text-blue-500">Thousands</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Join our growing community of developers mastering DSA
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-stretch"
          >
            {[
              {
                title: "Total Users",
                value: "3100+",
                icon: "👥",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Daily Users",
                value: "30+",
                icon: "⚡",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                title: "DSA Problems",
                value: "450+",
                icon: "🧩",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Testimonials",
                value: "10+",
                icon: "💬",
                gradient: "from-pink-500 to-purple-500",
              },
            ].map(({ title, value, icon, gradient }, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, {
                once: false,
                margin: "-100px",
                amount: 0.3
              });
              const animatedValue = useAnimatedCounter(value, isInView);

              return (
                <motion.div
                  ref={ref}
                  key={title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative h-full"
                >
                  <div className={`flex flex-col justify-center h-full bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/10 ${isInView ? 'ring-2 ring-blue-500/20' : ''}`}>
                    <div className="relative">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </div>
                      <h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2 ${isInView ? 'animate-pulse' : ''}`}>
                        {animatedValue}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* COMPANY-WISE INTEREST SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-cyan-900/20 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
              🏢
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Want <span className="text-blue-500">Company-wise</span> Question Lists?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              We're planning to launch a company-specific DSA sheet! Fill this quick
              form to let us know you're interested and stay in the loop.
            </p>
            <motion.a
              href="https://forms.gle/z1sRLUGRvtfKrGcp7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📩 I'm Interested
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Key <span className="text-blue-500">Features</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to excel in your DSA journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <FaListUl size={32} />,
                title: "Tailored Questions",
                desc: "Topic-wise DSA problems to ensure complete coverage.",
                link: "/sheet",
                gradient: "from-blue-500 to-cyan-500",
                color: "text-blue-500 dark:text-blue-400"
              },
              {
                icon: <FaRegCalendarAlt size={32} />,
                title: "Daily Problem (POTD)",
                desc: "Stay consistent by solving one new question daily.",
                link: "/sheet#potd",
                gradient: "from-cyan-500 to-teal-500",
                color: "text-cyan-500 dark:text-cyan-400"
              },
              {
                icon: <BiSliderAlt size={32} />,
                title: "Smart Filters",
                desc: "Filter by difficulty, status, revision, and platform.",
                link: "/sheet#filters",
                gradient: "from-yellow-500 to-orange-500",
                color: "text-yellow-500 dark:text-yellow-400"
              },
              {
                icon: <FaChartBar size={32} />,
                title: "Track Progress",
                desc: "Comprehensive analytics, streak tracking, and detailed progress insights.",
                link: "/progress",
                gradient: "from-green-500 to-emerald-500",
                color: "text-green-500 dark:text-green-400"
              },
              {
                icon: <FaFire size={32} />,
                title: "Streaks",
                desc: "Mark POTD as done and maintain your daily solving streak!",
                link: "/progress#streaks",
                gradient: "from-red-500 to-pink-500",
                color: "text-red-500 dark:text-red-400"
              },
              {
                icon: <FaSearch size={32} />,
                title: "Search Questions Quickly",
                desc: "Instantly locate problems using keywords in the dedicated search bar.",
                link: "/sheet#search",
                gradient: "from-purple-500 to-indigo-500",
                color: "text-purple-500 dark:text-purple-400"
              },
            ].map(({ title, desc, icon, link, gradient, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group cursor-pointer"
                onClick={() => (window.location.href = link)}
              >
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-white/10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* WHY DSA MATE SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
              Why <span className="text-blue-500 dark:text-blue-400">DSAMate</span>?
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
              It's not just another practice sheet. It's your
              <span className="font-semibold text-blue-500"> all-in-one platform </span>
              to solve <span className="font-semibold">topic-wise problems</span>, apply
              <span className="font-semibold"> smart filters</span>, and track your daily progress with the
              <span className="font-semibold"> new streak feature</span>.
              <br /><br />
              Whether you're <span className="font-semibold">revising for interviews</span>,
              trying to <span className="font-semibold">stay consistent</span>, or aiming to
              <span className="font-semibold"> master DSA with purpose, </span>
              <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                DSAMate helps you do it better
              </span>.
              <br /><br />
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-2 rounded-lg font-semibold text-white">
                Mark questions, revisit tough ones, solve a new problem every day,
                and keep your streak alive.
              </span>
            </p>

          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-black/50 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              💬 Loved using <span className="text-blue-500">DSAMate</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Share your thoughts and help others discover the power of structured DSA practice
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                💬 Give a Testimonial
              </motion.button>

            </div>
          </motion.div>
          <div className="flex flex-row items-center justify-center mb-10">
            <AnimatedTooltip items={people} />
          </div>

          <motion.div
            className="flex  flex-wrap justify-center items-start gap-6"
          >
            <MarqueeDemo />
          </motion.div>
        </div>
      </motion.section>
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
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-900/70 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/20 dark:border-gray-700/30 shadow-2xl"
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
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors backdrop-blur-sm z-20"
                >
                  <FiX size={20} />
                </button>

                {/* Form Header */}
                <div className="text-center mb-8 pt-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Share Your Experience
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Help others by sharing how DSAMate helped you in your journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all shadow-sm dark:shadow-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all shadow-sm dark:shadow-none"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all shadow-sm dark:shadow-none"
                      placeholder="e.g., Student, Software Engineer, etc."
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                      Overall Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="text-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        >
                          {star <= formData.rating ? (
                            <FaStar className="text-yellow-400 drop-shadow-sm" />
                          ) : (
                            <FaRegStar className="text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* What you liked most */}
                  <div>
                    <label htmlFor="likedMost" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      What did you like most about DSAMate? *
                    </label>
                    <textarea
                      id="likedMost"
                      name="likedMost"
                      value={formData.likedMost}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar shadow-sm dark:shadow-none"
                      placeholder="Share what features or aspects you found most valuable..."
                    />
                  </div>

                  {/* How it helped */}
                  <div>
                    <label htmlFor="howHelped" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      How did DSAMate help you? *
                    </label>
                    <textarea
                      id="howHelped"
                      name="howHelped"
                      value={formData.howHelped}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar shadow-sm dark:shadow-none"
                      placeholder="Share how DSAMate improved your learning journey..."
                    />
                  </div>

                  {/* Feedback */}
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Additional Feedback
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600/30 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400/50 transition-all resize-vertical custom-scrollbar shadow-sm dark:shadow-none"
                      placeholder="Any additional thoughts, suggestions, or experiences you'd like to share..."
                    />
                  </div>

                  {/* Permission to show */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="canShow"
                      name="canShow"
                      checked={formData.canShow}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800/60 border-gray-300 dark:border-gray-600/50 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
                    />
                    <label htmlFor="canShow" className="text-sm text-gray-700 dark:text-gray-200">
                      I allow DSAMate to display this testimonial publicly
                    </label>
                  </div>

                  {/* Display Preference - Only show if canShow is true */}
                  {formData.canShow && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
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
                            className="w-4 h-4 text-blue-600 bg-white rounded-full dark:bg-gray-800/60 border-gray-300 dark:border-gray-600/50 "
                          />
                          <label htmlFor="nameAndDesignation" className="ml-2 text-sm text-gray-700 dark:text-gray-200">
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
                            className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800/60 border-gray-300 dark:border-gray-600/50 "
                          />
                          <label htmlFor="nameOnly" className="ml-2 text-sm text-gray-700 dark:text-gray-200">
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
                            className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800/60 border-gray-300 dark:border-gray-600/50 "
                          />
                          <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                            As anonymous user
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600/50 bg-white dark:bg-gray-800/40 backdrop-blur-md text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all font-medium shadow-sm dark:shadow-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500/80 dark:hover:bg-blue-500 dark:disabled:bg-blue-500/40 backdrop-blur-md text-white rounded-lg transition-all font-medium disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm dark:shadow-none"
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
              </div> {/* Close content wrapper */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTopBottom />
      {/* FAQ SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Frequently Asked <span className="text-blue-500 dark:text-blue-400">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Get answers to common questions about DSAMate
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-3 sm:space-y-4"
          >
            {faqData.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} className="w-full">
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}