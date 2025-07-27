'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FaListUl, FaRegCalendarAlt, FaChartBar, FaSearch, FaFire } from "react-icons/fa";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import ReportIssueButton from '@/components/ReportIssueButton';
import Navbar from '@/components/Navbar';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { EnhancedCard } from '@/components/EnhancedCard';
import { motion } from 'framer-motion';



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

// testimonial
type Testimonial = {
  name: string;
  designation?: string;
  rating: number; // from 1 to 5
  text: string;
  visibility: "full" | "nameOnly" | "anonymous";
};

// testimonials -> need to add it to data when more testimonials are received
const testimonials: Testimonial[] = [
  {
    name: "Prakhar Sinha",
    designation: "Student",
    rating: 5,
    text: "It really helped me by listing important questions discussed in class, so we didn’t have to visit lectures again to revise those questions. Overall, it’s the best!",
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
  const [searchTerm, setSearchTerm] = useState('');
  const [streak, setStreak] = useState(0);

  // Initialize streak (you can load from localStorage or API)
  useEffect(() => {
    const savedStreak = localStorage.getItem('userStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        className="bg-card border border-border p-5 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-card-foreground font-semibold">{question}</h4>
          <span className="text-muted-foreground text-xl">{isOpen ? "−" : "+"}</span>
        </div>
        {isOpen && <p className="text-muted-foreground text-sm mt-2">{answer}</p>}
      </div>
    );
  }
  // Removed unused state and variables
  return (
    
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      <BackgroundPattern />
      <ReportIssueButton />
      {/* NAVBAR */}
      <Navbar 
        streak={streak}
      />

      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20 pt-32 relative z-10"
      >
        {/* Enhanced hero badge */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Open Source DSA Practice Platform
        </motion.div>
        
        <motion.h1
          variants={fadeInUp}
          custom={1}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text-light">DSA</span>
          <span className="text-primary">Mate</span>
          <span className="text-muted-foreground block text-3xl md:text-4xl font-medium mt-2">Template</span>
        </motion.h1>
        
        <motion.h2
          variants={fadeInUp}
          custom={2}
          className="text-xl md:text-2xl font-semibold mb-4 text-foreground/90"
        >
          Your daily dose for DSA practice
        </motion.h2>
        
        <motion.p
          variants={fadeInUp}
          custom={3}
          className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
        >
          Solve better, revise smarter, and stay consistent with your preparation journey.
          <br className="hidden sm:block" />
          <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium">
            ⚠️ This is just a template version of DSAMate
          </span>
        </motion.p>
        <motion.div
          variants={fadeInUp}
          custom={4}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/sheet"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl focus-ring group"
            >
              <span className="group-hover:animate-bounce">🚀</span>
              Go to Practice Sheet
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-green-600 to-lime-600 text-white hover:from-green-500 hover:to-lime-500 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl focus-ring group"
            >
              <span className="group-hover:animate-pulse">📊</span>
              Track Your Progress
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://dsamate.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl focus-ring group"
            >
              <span className="group-hover:animate-spin">🔗</span>
              Visit Original DSAMate
            </Link>
          </motion.div>
        </motion.div>

      </motion.section>

      {/* STATISTICS SECTION */}
        <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
         className="text-white px-6 md:px-20 py-10">
          <motion.div 
          variants={fadeInUp}
          custom={0}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4 sm:px-16">
            {[
              { label: "Total Users", value: "2100+", gradient: "blue" as const, color: "text-blue-500" },
              { label: "Daily Users", value: "30+", gradient: "orange" as const, color: "text-yellow-500" },
              { label: "DSA Problems", value: "450+", gradient: "green" as const, color: "text-green-500" },
              { label: "Testimonials", value: "10+", gradient: "pink" as const, color: "text-pink-500" },
            ].map(({ label, value, gradient, color }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <EnhancedCard gradient={gradient} className="text-center py-8">
                  <h2 className="text-sm text-muted-foreground mb-2 font-medium">{label}</h2>
                  <motion.h3 
                    className={`text-4xl font-black ${color} mb-2`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index * 0.1) + 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {value}
                  </motion.h3>
                  <div className={`w-12 h-1 ${color.replace('text-', 'bg-')} rounded-full mx-auto opacity-50`} />
                </EnhancedCard>
              </motion.div>
            ))}
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
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition"
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
      className="px-6 md:px-20 py-10 bg-muted/20">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="px-2 sm:px-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaListUl size={32} className="text-blue-500 mb-4" />,
              title: "Tailored Questions",
              desc: "Topic-wise DSA problems to ensure complete coverage and systematic learning.",
              link: "/sheet",
              gradient: "blue" as const,
            },
            {
              icon: <FaRegCalendarAlt size={32} className="text-cyan-500 mb-4" />,
              title: "Daily Problem (POTD)",
              desc: "Stay consistent by solving one new question daily and build momentum.",
              link: "/sheet#potd",
              gradient: "blue" as const,
            },
            {
              icon: <BiSliderAlt size={32} className="text-yellow-500 mb-4" />,
              title: "Smart Filters",
              desc: "Filter by difficulty, status, revision, and platform for targeted practice.",
              link: "/sheet#filters",
              gradient: "orange" as const,
            },
            {
              icon: <FaChartBar size={32} className="text-green-500 mb-4" />,
              title: "Track Progress",
              desc: "Comprehensive analytics, streak tracking, and detailed progress insights.",
              link: "/progress",
              gradient: "green" as const,
            },
            {
              icon: <FaFire size={32} className="text-red-500 mb-4" />,
              title: "Streaks",
              desc: "Mark POTD as done and maintain your daily solving streak for consistency!",
              link: "/progress#streaks",
              gradient: "orange" as const,
            },
            {
              icon: <FaSearch size={32} className="text-purple-500 mb-4" />,
              title: "Quick Search",
              desc: "Instantly locate problems using keywords in the dedicated search bar.",
              link: "/sheet#search",
              gradient: "purple" as const,
            }
          ].map(({ title, desc, icon, link, gradient }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <EnhancedCard 
                gradient={gradient}
                onClick={() => window.location.href = link}
                className="h-full"
              >
                <div className="flex flex-col items-start text-card-foreground h-full">
                  <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{desc}</p>
                  <div className="mt-4 text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Learn more 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          ))}


        </div>
      </motion.section>

      {/* WHY DSA MATE SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="px-6 md:px-20 py-14 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">DSA<span className="text-blue-400">Mate</span></h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-md md:text-lg">
          It's not just another practice sheet — it's your all-in-one platform to solve topic-wise problems, apply smart filters, and track your daily progress with the new streak feature. Whether you're revising for interviews, trying to stay consistent, or looking to master DSA with purpose — DSAMate helps you do it better.
          Mark questions, revisit tough ones, solve a new problem every day, and keep your streak alive.
        </p>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-muted/20 px-6 md:px-20 py-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">💬 Loved using DSAMate? Share your thoughts!</h2>
        <p className="text-gray-300 mb-6">
          Provide your testimonial to share your experience with others.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <a
            href="https://forms.gle/8BXQC1o3hsVsEEBp9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-gray-100 hover:text-blue-600 text-white px-4 py-2 rounded text-center"
          >
            💬 Give a Testimonial
          </a>
          <a
            href="https://dsamate.vercel.app" // replace with real site if custom domain
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded text-center"
          >
            🔗 Visit Original DSAMate
          </a>
        </div>


        {/* Testimonials List */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-12 text-left">
          {testimonials.map(({ name, designation, rating, text, visibility }, idx) => {
            const displayName =
              visibility === "anonymous" ? "Anonymous User" : name;
            const showDesignation = visibility === "full" && designation;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <EnhancedCard gradient="purple" className="h-full">
                  {/* User Details */}
                  <div className="flex items-center gap-3 mb-4 text-card-foreground">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <FaUserCircle className="text-2xl text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{displayName}</p>
                      {showDesignation && (
                        <p className="text-xs text-muted-foreground">{designation}</p>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed italic line-clamp-4">
                    "{text}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) =>
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (idx * 0.1) + (i * 0.05), duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {i < rating ? <FaStar className="text-lg" /> : <FaRegStar className="text-lg" />}
                      </motion.div>
                    )}
                  </div>
                </EnhancedCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
      className="px-6 md:px-20 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">📌 FAQs</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
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
      
    </main>
  );
}