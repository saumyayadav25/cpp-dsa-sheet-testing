'use client';

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
export default function Footer() {
  return (
      <footer className="bg-card px-6 md:px-20 py-12 text-muted-foreground border-t border-border transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-20 mx-auto">
          {/* About */}
          <div className='max-w-64 flex flex-col items-center justify-center mx-auto md:justify-start md:items-start'>
            <h3 className="text-card-foreground text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              About DSAMate
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for mastering Data Structures and Algorithms with comprehensive resources.
            </p>
            <a
              href="https://www.buymeacoffee.com/saumyayadav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              ☕ Buy me a coffee
            </a>
          </div>
          
          {/* Quick Links */}
          <div className=''>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sheet" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Practice Problems
                </Link>
              </li>
              <li>
                <a href="https://github.com/saumyayadav25/DSA-Supreme-3.0" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  All DSA Codes
                </a>
              </li>
              <li>
                <Link href="/notes" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Notes
                </Link>
              </li>
              <li>
                <Link href="/contributors" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Contributors
                </Link>
              </li>
              <li>
                <a href="https://forms.gle/bdwBp8oFRWugcrcg9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-2 transition-all  hover:-translate-y-0.5 duration-300">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Feedback
                </a>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div className='flex flex-col items-center justify-center mx-auto md:justify-start md:items-start'>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Connect With Me
            </h3>
            <div className="flex gap-4 text-2xl mb-4">
              <a href="https://x.com/SaumyaYadav817" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://github.com/saumyayadav25" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/saumya-yadav-/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all hover:scale-110">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="max-w-64 flex flex-col items-center justify-center mx-auto md:justify-start md:items-start">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground flex items-center gap-2">
              <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
              Contact Info
            </h3>
            <p className="mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contact.dsapractice@gmail.com" className="hover:text-blue-400">contact.dsapractice@gmail.com</a>
            </p>
            <div className="mt-6 flex flex-col items-center justify-center mx-auto md:justify-start md:items-start">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Support This Project</h4>
              <p className="text-xs text-muted-foreground mb-3">
                If you find these resources helpful, consider supporting to help maintain and improve them.
              </p>
              <a 
                href="https://github.com/sponsors/saumyayadav25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg text-sm transition-all"
              >
                <FaGithub /> Sponsor on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DSA Practice. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Made with ❤️ by Saumya Yadav
          </p>
        </div>
      </footer>
  );
}
