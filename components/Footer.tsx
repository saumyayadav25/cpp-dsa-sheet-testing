"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border px-6 md:px-20 py-16 text-foreground transition-colors duration-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:justify-center md:items-start gap-12 lg:gap-20 mx-auto max-w-7xl">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xs flex flex-col items-center justify-center mx-auto md:justify-start md:items-start"
        >
          <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-3">
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ☕ Buy me a coffee
          </motion.a>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-3">
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
                    className="text-muted-foreground hover:text-foreground flex items-center gap-3 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                    {label}
                  </motion.a>
                ) : (
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-3 transition-all duration-300 group"
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

        {/* Related Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-3 h-3 rounded-full"></span>
            Related Links
          </h3>
          <ul className="space-y-3">
            {[
              { href: "/privacy-terms", label: "Privacy Policy" },
              {
                href: "https://github.com/saumyayadav25/cpp-dsa-sheet-testing/blob/main/CODE_OF_CONDUCT.md",
                label: "Code of Conduct",
              },
              {
                href: "/privacy-terms?tab=terms",
                external: true,
                label: "Terms of Service",
              },
              {
                href: "https://github.com/saumyayadav25/cpp-dsa-sheet-testing/blob/main/LICENSE",
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
                    className="text-muted-foreground hover:text-foreground flex items-center gap-3 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 bg-muted-foreground group-hover:bg-blue-500 rounded-full transition-colors"></span>
                    {label}
                  </motion.a>
                ) : (
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-3 transition-all duration-300 group"
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

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xs flex flex-col items-center justify-center mx-auto md:justify-start md:items-start"
        >
          <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-3">
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

          <div className="flex flex-col items-center justify-center mx-auto md:justify-start md:items-start w-full">
            <div className="flex gap-4 text-xl mb-6 text-muted-foreground">
              {[
                {
                  href: "https://x.com/SaumyaYadav817",
                  icon: FaTwitter,
                  label: "Twitter",
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

            <div className="text-center md:text-left w-full">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Support This Project
              </h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                If you find these resources helpful, consider supporting to help
                maintain and improve them.
              </p>
              <motion.a
                href="https://github.com/sponsors/saumyayadav25"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-card hover:bg-muted border border-border px-4 py-2.5 rounded-xl text-sm text-foreground transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaGithub /> Sponsor on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 border-t border-border mt-16 pt-8 text-center"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DSA Practice. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
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
  );
}
