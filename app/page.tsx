"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaListUl,
  FaRegCalendarAlt,
  FaChartBar,
  FaSearch,
  FaFire,
} from "react-icons/fa";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import ReportIssueButton from "@/components/ReportIssueButton";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

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

type Testimonial = {
  name: string;
  designation?: string;
  rating: number; // from 1 to 5
  text: string;
  visibility: "full" | "nameOnly" | "anonymous";
};

const testimonials: Testimonial[] = [
  {
    name: "Prakhar Sinha",
    designation: "Student",
    rating: 5,
    text: "It really helped me by listing important questions discussed in class, so we didn't have to visit lectures again to revise those questions. Overall, it's the best!",
    visibility: "full",
  },
  {
    name: "Aryan",
    designation: "Student",
    rating: 5,
    text: "It's amazing! The way in which we can track our progress is amazing.",
    visibility: "full",
  },
  {
    name: "",
    rating: 5,
    text: "DSAMate bhot bhot accha laga mujhe! Especially the platform filter where we can choose LeetCode, GFG, etc. Now I'm definitely going to start practicing questions from DSAMate as well.",
    visibility: "anonymous",
  },
  {
    name: "Roshan Gorakhpuriya",
    designation: "Student",
    rating: 5,
    text: "Structured question which covers all the supreme batch questions.",
    visibility: "full",
  },
  {
    name: "Supriya Pandey",
    designation: "Student / Aspiring Developer",
    rating: 5,
    text: "EXCELLENT! Helped a lot in my dsa journey. ",
    visibility: "full",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem("userStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group"
      >
        <div
          className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-lg hover:scale-[1.02]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-gray-900 dark:text-white font-semibold text-lg">
              {question}
            </h4>
            <span className="text-blue-500 dark:text-blue-400 text-2xl font-light transition-transform duration-300 group-hover:scale-110">
              {isOpen ? "−" : "+"}
            </span>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700 dark:text-gray-300 text-base mt-4 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (

    <div
      className="bg-[#1a1e2a] p-5 rounded-xl border border-gray-800 cursor-pointer hover:bg-gray-700 hover:text-black transition duration-200"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-white font-semibold">{question}</h4>
        <span className="text-gray-400 text-xl">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <p className="text-gray-400 text-sm mt-2">{answer}</p>}
    </div>
  );
}
  // Removed unused state and variables
  return (
    
    <main className="min-h-screen bg-black text-white">

      <ReportIssueButton />
      <Navbar streak={streak} />

      {/* HERO SECTION - UNCHANGED */}
      <motion.section
        initial="hidden"
        animate="visible"

        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-34 bg-black pt-24"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">DSA<span className="bg-gradient-to-r from blue-400 to purple-500 text-blue-400 bg-clip-text">Mate</span> template </h1>
        <motion.h1

        initial={{ y: 0 }}
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 2, repeat:2,repeatType:"loop", ease: "easeInOut" }}
  className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-md mb-3"
      
        >
          Your daily dose for DSA practice
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          custom={1}
          className="text-lg md:text-xl text-gray-300 max-w-xl mb-8"
        >
          Solve better, revise smarter, and stay consistent with your preparation journey.
          ⚠️ This is just a <span className="font-medium text-white">template version</span> of DSAMate.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 mt-4 var:to-cyan-600 text-white font-semibold "
        >
          <Link
            href="/sheet"

          >
            DSA<span className="text-blue-400">Mate</span> template
          </motion.h1>


          <Link
            href="/progress"
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:to-teal-900 text-white  font-semibold py-3 px-6 rounded-full shadow-lg transition text-center"

          >
            Your daily dose for DSA practice
          </motion.h2>


          <Link
            href="https://dsamate.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:bg-blue-800 hover:text-white font-semibold py-3 px-6 rounded-full transition shadow-md        text-center"

          >
            <img
              src="dsa-hero.png"
              alt="DSA Mate Hero"
              className="w-[40vw]"
              draggable="false"
            />

      {/* STATISTICS SECTION */}
        <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
         className="text-white px-6 md:px-20 py-10 text-lg font-bold ">
          <motion.div 
          variants={fadeInUp}
          custom={0}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-4 sm:px-32">
            <div className="bg-[#141720] border border-gray-700 py-4 px-4 rounded-md ">
              <h2 className="text-m text-gray-300">Total Users</h2>
              <h3 className="text-2xl font-bold text-blue-400">2100+</h3>
            </div>
            <div className="bg-[#141720] border border-gray-700 py-4 px-4 rounded-md">
              <h2 className="text-m text-gray-300">Daily users</h2>
              <h3 className="text-2xl font-bold text-yellow-400">30+</h3>
            </div>
            <div className="bg-[#141720] border border-gray-700 py-4 px-4 rounded-md">
              <h2 className="text-m text-gray-300">DSA Problems</h2>
              <h3 className="text-2xl font-bold text-green-400">450+</h3>
            </div>
            <div className="bg-[#141720] border border-gray-700 py-4 px-4 rounded-md">
              <h2 className="text-m text-gray-300">Testimonials received</h2>
              <h3 className="text-2xl font-bold text-pink-400">10+</h3>
            </div>
          </motion.div>
        </motion.section>
        
        {/* COMPANY-WISE INTEREST SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="px-6 md:px-20 py-14 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Want Company-wise Question Lists?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-md md:text-lg">
            We’re planning to launch a company-specific DSA sheet! Fill this quick form to let us know you're interested and stay in the loop.
          </p>
          <a
            href="https://forms.gle/z1sRLUGRvtfKrGcp7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white hover:bg-blue-300 hover:text-black font-bold px-6 py-3 rounded-full transition"
          >
            📩 I'm Interested
          </a>
        </motion.section>

      {/* FEATURES SECTION */}
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
      className="px-6 md:px-20 py-10 bg-[#0d0f16]">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="px-2 sm:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaListUl size={28} className="text-blue-400 mb-3 " />,
              title: "Tailored Questions",
              desc: "Topic-wise DSA problems to ensure complete coverage.",
              link: "/sheet",
            },
            {
              icon: <FaRegCalendarAlt size={28} className="text-cyan-200 mb-3 " />,
              title: "Daily Problem (POTD)",
              desc: "Stay consistent by solving one new question daily.",
              link: "/sheet#potd",
            },
            {
              icon: <BiSliderAlt size={28} className="text-yellow-400 mb-3 " />,
              title: "Smart Filters",
              desc: "Filter by difficulty, status, revision, and platform.",
              link: "/sheet#filters",
            },
            {
              icon: <FaChartBar size={28} className="text-green-400 mb-3 " />,
              title: "Track Progress",
              desc: "Comprehensive analytics, streak tracking, and detailed progress insights.",
              link: "/progress",
            },
            {
              icon: <FaFire size={28} className="text-red-400 mb-3 " />,
              title: "Streaks",
              desc: "Mark POTD as done and maintain your daily solving streak!",
              link: "/progress#streaks",
            },
            {
              icon: <FaSearch size={28} className="text-purple-400 mb-3 " />,
              title: "Search Questions Quickly",
              desc: "Instantly locate problems using keywords in the dedicated search bar.",
              link: "/sheet#search",
            }
          ].map(({ title, desc, icon ,link }) => (

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
                href="https://dsamate.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover:border-white/50 font-semibold py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                🔗 Visit Original DSAMate
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

      {/* STATISTICS SECTION - REDESIGNED */}
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                title: "Total Users",
                value: "2100+",
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
            ].map(({ title, value, icon, gradient }, index) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-white/10">
                  <div className="relative">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                      {value}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* COMPANY-WISE INTEREST SECTION - REDESIGNED */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-20 relative overflow-hidden"
      >

        <h2 className="text-3xl font-semibold mb-4">💬 Loved using DSAMate? Share your thoughts!</h2>
        <p className="text-gray-300 mb-6 text-xl">
          Provide your testimonial to share your experience with others.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <a
            href="https://forms.gle/8BXQC1o3hsVsEEBp9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-gray-100 hover:text-blue-600 hover:font-bold text-white px-4 py-2 rounded text-center font-bold "
          >
            💬 Give a Testimonial
          </a>
          <a
            href="https://dsamate.vercel.app" // replace with real site if custom domain
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white font-bold text-blue-600 hover:text-white hover:font-bold  hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded text-center"

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

      {/* FEATURES SECTION - REDESIGNED */}
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

                {/* User Details */}
                <div className="flex items-center gap-3 mb-2 text-white">
                  <FaUserCircle className="text-3xl text-gray-400" />
                  <div>
                    <p className="font-bold">{displayName}</p>
                    {showDesignation && (
                      <p className="text-s text-gray-400">{designation}</p>
                    )}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg mb-4 italic">"{text}"</p>

                {/* Rating */}
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
      className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">📌 FAQs</h2>
        <div className="space-y-4 max-w-3xl mx-auto text-lg text-lg font-bold ">
          {[
            {
              q: "What if I find an incorrect or broken link?",
              a: "Click on ‘Report an Issue’ or email us — we’ll fix it quickly.",
            },
            {
              q: "Can I contribute questions or feedback?",
              a: "Yes! Please fill the feedback form to provide your feedback. Email us to contribute questions.",
            },
            {
              q: "How to use filters effectively?",
              a: "You can use multiple filters like difficulty, platform, status, and revision together to narrow down the questions that best match your current focus. For example, if you're preparing for medium-level problems on LeetCode that you haven't solved yet, just select those filters. You can also filter by questions you've marked for revision. If the results feel too limited or you're done with a specific session, you can reset all filters with a single click to start fresh."
            },
            {
              q: "What is POTD and how does it help?",
              a: "POTD (Problem of the Day) helps you build consistency by showing one new question every day. It encourages daily problem-solving without feeling overwhelming. Even if you're short on time, solving just one question keeps your practice streak going and builds momentum over time. It’s a great way to stay connected with DSA regularly."
            },
            {
              q: "Is login required?",
              a: "Nope! There's no need to sign up or log in. Your progress is automatically saved in your browser's local storage. However, keep in mind that if you clear your browser cache or use incognito mode, this data might get deleted — so your progress will reset. Just use the same browser and device for the best experience."
            },
            {
              q: "My question is not listed here, how can I get help?",
              a: "If you have any questions or need assistance, feel free to reach out to us at contact.dsapractice@gmail.com"
            },
          ].map(({ q, a }, i) => (
            <FAQItem key={i} question={q} answer={a} />
          ))}

        </div>
      </motion.section>

      {/* FAQ SECTION - REDESIGNED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="px-6 md:px-20 py-20 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-blue-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              📌 Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Everything you need to know about DSAMate
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What if I find an incorrect or broken link?",
                a: "Click on 'Report an Issue' or email us — we'll fix it quickly.",
              },
              {
                q: "Can I contribute questions or feedback?",
                a: "Yes! Please fill the feedback form to provide your feedback. Email us to contribute questions.",
              },
              {
                q: "How to use filters effectively?",
                a: "You can use multiple filters like difficulty, platform, status, and revision together to narrow down the questions that best match your current focus. For example, if you're preparing for medium-level problems on LeetCode that you haven't solved yet, just select those filters. You can also filter by questions you've marked for revision. If the results feel too limited or you're done with a specific session, you can reset all filters with a single click to start fresh.",
              },
              {
                q: "What is POTD and how does it help?",
                a: "POTD (Problem of the Day) helps you build consistency by showing one new question every day. It encourages daily problem-solving without feeling overwhelming. Even if you're short on time, solving just one question keeps your practice streak going and builds momentum over time. It's a great way to stay connected with DSA regularly.",
              },
              {
                q: "Is login required?",
                a: "Nope! There's no need to sign up or log in. Your progress is automatically saved in your browser's local storage. However, keep in mind that if you clear your browser cache or use incognito mode, this data might get deleted — so your progress will reset. Just use the same browser and device for the best experience.",
              },
              {
                q: "My question is not listed here, how can I get help?",
                a: "If you have any questions or need assistance, feel free to reach out to us at contact.dsapractice@gmail.com",
              },
            ].map(({ q, a }, i) => (
              <FAQItem key={i} question={q} answer={a} />
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
