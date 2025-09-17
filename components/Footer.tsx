"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />

      <footer className="relative bg-background border-t border-border px-4 sm:px-6 py-12 text-foreground transition-colors duration-300 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 mx-auto max-w-7xl">
          {/* About - Span 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col"
          >
            <h3 className="text-foreground text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
              About DSAMate
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your ultimate destination for mastering Data Structures and
              Algorithms with comprehensive resources.
            </p>
            <motion.a
              href="https://www.buymeacoffee.com/saumyayadav"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
            >
              ☕ Buy me a coffee
            </motion.a>
          </motion.div>

          {/* Quick Links - Span 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-foreground text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/sheet", label: "Practice Problems" },
                {
                  href: "https://github.com/saumyayadav25/DSA-Supreme-3.0",
                  external: true,
                  label: "All DSA Codes",
                },
                { href: "/notes", label: "Notes" },
                { href: "/contributors", label: "Contributors" },
              ].map(({ href, label, external }) => (
                <li key={href}>
                  {external ? (
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-300 group text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                      {label}
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-300 group text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                        {label}
                      </Link>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Related Links - Span 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-foreground text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
              Related Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/privacy-terms", label: "Privacy Policy" },
                {
                  href: "https://github.com/saumyayadav25/cpp-dsa-sheet-testing/blob/main/CODE_OF_CONDUCT.md",
                  external: true,
                  label: "Code of Conduct",
                },
                {
                  href: "/privacy-terms?tab=terms",
                  label: "Terms of Service",
                },
                {
                  href: "https://github.com/saumyayadav25/cpp-dsa-sheet-testing/blob/main/LICENSE",
                  external: true,
                  label: "License",
                },
                {
                  href: "https://forms.gle/bdwBp8oFRWugcrcg9",
                  external: true,
                  label: "Feedback",
                },
              
               
              ].map(({ href, label, external }) => (
                <li key={href}>
                  {external ? (
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-300 group text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                      {label}
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-300 group text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                        {label}
                      </Link>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Span 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col"
          >
            <h3 className="text-foreground text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
              Contact Info
            </h3>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mb-6 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <div className="p-2 rounded-lg bg-muted/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a
                href="mailto:contact.dsapractice@gmail.com"
                className="text-sm font-medium"
              >
                contact.dsapractice@gmail.com
              </a>
            </motion.div>

            <div className="flex gap-4 text-xl mb-6 text-muted-foreground">
              {[
                {
                  href: "https://x.com/SaumyaYadav817",
                  icon: FaXTwitter,
                  label: "X (Twitter)",
                },
                {
                  href: "https://github.com/saumyayadav25",
                  icon: FaGithub,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/saumya-yadav-/",
                  icon: FaLinkedin,
                  label: "LinkedIn",
                },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
                  title={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Support This Project
              </h4>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                If you find these resources helpful, consider supporting to help
                maintain and improve them.
              </p>
              <motion.a
                href="https://github.com/sponsors/saumyayadav25"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-card hover:bg-muted border border-border px-3 py-2 rounded-lg text-sm text-foreground transition-all duration-300 shadow-sm hover:shadow-md w-fit"
              >
                <FaGithub /> Sponsor on GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* Newsletter Section - Span 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col"
          >
            <h3 className="text-foreground text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates, tips, and
              resources.
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe to Newsletter"
                )}
              </motion.button>
            </form>

            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 border-t border-border mt-12 pt-6 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DSA Practice. All Rights
              Reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              by{" "}
              <motion.a
                href="https://github.com/saumyayadav25"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Saumya Yadav
              </motion.a>
            </p>
          </div>
        </motion.div>
      </footer>
    </>
  );
}