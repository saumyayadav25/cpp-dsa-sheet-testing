'use client';

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#24262a] text-white px-4 md:px-20 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 text-left">
        {/* About Us */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-sm text-gray-300 mb-4">
            DSA Practice is your ultimate destination for all DSA (Data Structures and Algorithms) questions.
          </p>
          {/* Buy Me a Coffee */}
          <a
            href="https://www.buymeacoffee.com/saumyayadav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-yellow-600 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >☕ Buy me a coffee</a>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
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

        {/* Social Links */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
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
      
      {/* Bottom Text */}
      <p className="text-center text-sm text-gray-400 mt-10">&copy; {new Date().getFullYear()} DSA Practice. All Rights Reserved.</p>
    </footer>
  );
}
