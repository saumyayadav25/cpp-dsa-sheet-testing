'use client';

import React from 'react';
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaListUl, FaRegCalendarAlt, FaChartBar, FaSearch, FaFire } from "react-icons/fa";
import { FaStar, FaRegStar, FaUserCircle  } from "react-icons/fa";
import { FaUserAlt, FaUserSecret, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import ReportIssueButton from '@/components/ReportIssueButton';

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
  function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-[#1a1e2a] p-5 rounded-xl border border-gray-800 cursor-pointer"
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

  return (
    
    <main className="min-h-screen bg-black text-white">
      <ReportIssueButton />
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 sm:px-10 md:px-14 py-4 sm:py-5 bg-[#10131c] shadow-md flex justify-between items-center relative"
      >
        <Link href="/" className="text-2xl font-bold text-white hover:cursor-pointer">
          DSA<span className="text-blue-400">Mate</span> Template
        </Link>
        {/* Desktop Links */}
        <div className="hidden sm:flex gap-6 text-white ">
          <Link href="/" className="hover:text-blue-400 transition hover:cursor-pointer">Home</Link>
          <Link href="/sheet" className="hover:text-blue-400 transition hover:cursor-pointer">Practice Sheet</Link>
        </div>

        {/* Mobile links*/}
      <div className="sm:hidden ">
        <Link
          href="/sheet"
          className="text-sm text-white px-4 py-2 rounded-md transition hover:cursor-pointer"
        >
          Practice Sheet
        </Link>
      </div>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">DSA<span className="text-blue-400">Mate</span> template</h1>
        <motion.h1
          variants={fadeInUp}
          custom={0}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Your daily dose for DSA practice
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          custom={1}
          className="text-lg text-gray-300 max-w-xl mb-6"
        >
          Solve better, revise smarter, and stay consistent with your preparation journey.
          ⚠️ This is just a <span className="font-medium">template version</span> of DSAMate.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <Link
            href="/sheet"
            className="bg-black text-white hover:bg-gray-200 border hover:text-blue-600 font-semibold py-3 px-6 rounded-full transition text-center"
          >
            🚀 Go to Practice Sheet
          </Link>

          <Link
            href="https://dsamate.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-blue-600 hover:text-white hover:bg-black border border-blue-600 font-semibold py-3 px-6 rounded-full transition text-center"
          >
            🔗 Visit Original DSAMate
          </Link>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-4 sm:px-32">
            <div className="bg-[#141720] border border-gray-700 py-4 px-4 rounded-md">
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
      className="px-6 md:px-20 py-10 bg-[#0d0f16]">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="px-2 sm:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaListUl size={28} className="text-blue-400 mb-3" />,
              title: "Tailored Questions",
              desc: "Topic-wise DSA problems to ensure complete coverage."
            },
            {
              icon: <FaRegCalendarAlt size={28} className="text-cyan-200 mb-3" />,
              title: "Daily Problem (POTD)",
              desc: "Stay consistent by solving one new question daily."
            },
            {
              icon: <BiSliderAlt size={28} className="text-yellow-400 mb-3" />,
              title: "Smart Filters",
              desc: "Filter by difficulty, status, revision, and platform."
            },
            {
              icon: <FaChartBar size={28} className="text-green-400 mb-3" />,
              title: "Track Progress",
              desc: "See how many questions you've solved per topic."
            },
            {
              icon: <FaFire size={28} className="text-red-400 mb-3" />,
              title: "Streaks",
              desc: "Mark POTD as done and maintain your daily solving streak!"
            },
            {
              icon: <FaSearch size={28} className="text-purple-400 mb-3" />,
              title: "Search Questions Quickly",
              desc: "Instantly locate problems using keywords in the dedicated search bar."
            }
          ].map(({ title, desc, icon }) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-[#202533] p-6 rounded-xl shadow-md border border-gray-800 hover:bg-[#212638]"
              key={title}
            >
              {/* <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p> */}
              <div className="flex flex-col items-start text-white">
          {icon}
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
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
      className="px-6 md:px-20 py-14 text-center">
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
        className="bg-[#0d0f16] px-6 md:px-20 py-12 text-center"
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-12 text-left">
          {testimonials.map(({ name, designation, rating, text, visibility }, idx) => {
            const displayName =
              visibility === "anonymous" ? "Anonymous User" : name;
            const showDesignation = visibility === "full" && designation;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-[#202533] p-6 rounded-xl shadow-md border border-gray-800 hover:bg-[#212638]"
              >
                {/* User Details */}
                <div className="flex items-center gap-3 mb-4 text-white">
                  <FaUserCircle className="text-2xl text-gray-400" />
                  <div>
                    <p className="font-semibold">{displayName}</p>
                    {showDesignation && (
                      <p className="text-xs text-gray-400">{designation}</p>
                    )}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-sm mb-4 italic">"{text}"</p>

                {/* Rating */}
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
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
      
      {/* FOOTER */}
      <footer 
      className="bg-[#101010] px-6 md:px-20 py-10 text-sm text-gray-400">
        <div className="grid md:grid-cols-4 gap-6">
          {/* about us */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-3">About Us</h3>
            <p className="text-sm text-gray-300 mb-4">
              DSAMate | DSA Practice is your ultimate destination for all DSA (Data Structures and Algorithms) questions.
            </p>
            {/* Buy Me a Coffee */}
            <a
              href="https://www.buymeacoffee.com/saumyayadav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-yellow-600 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition"
            >☕ Buy me a coffee</a>
          </div>
          {/* quick links */}
          <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400">Home</a>
            </li>
            <li>
              <a href="/sheet" className="hover:text-blue-400">Practice Problems</a>
            </li>
            <li>
              <a href="https://github.com/saumyayadav25/DSA-Supreme-3.0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                All DSA Codes
              </a>
            </li>
            <li>
              <a href="/notes" rel="noopener noreferrer" className="hover:text-blue-400">Notes</a>
            </li>
            <li>
              <a href="https://forms.gle/bdwBp8oFRWugcrcg9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                Feedback Form
              </a>
            </li>
          </ul>
        </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="https://x.com/SaumyaYadav817" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://github.com/saumyayadav25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/saumya-yadav-/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Contact</h3>
            <p>Email: <a href="mailto:contact.dsapractice@gmail.com" className="text-blue-400">contact.dsapractice@gmail.com</a></p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-10">&copy; 2024 DSA Practice. All Rights Reserved.</p>
      </footer>
    </main>
  );
}