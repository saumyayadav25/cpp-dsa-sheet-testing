'use client';

import { useState } from 'react';
import { IoMenu } from "react-icons/io5";

export default function AuthButtons() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="text-3xl focus:outline-none hover:cursor-pointer"
      >
        <IoMenu />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] text-white rounded shadow-lg p-2 z-50">
          <a
            href="/"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-gray-700 text-sm"
          >
            Home
          </a>
          <a
            href="https://github.com/saumyayadav25/DSA-Supreme-3.0"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-gray-700 text-sm"
          >
            🌟 Star on GitHub
          </a>
          <a
            href="https://forms.gle/8BXQC1o3hsVsEEBp9"
            target="_blank"
            className="block px-4 py-2 hover:bg-gray-700 text-sm"
          >
            ✨ Give Testimonial
          </a>
          <a
            href="https://forms.gle/bdwBp8oFRWugcrcg9"
            target="_blank"
            className="block px-4 py-2 hover:bg-gray-700 text-sm"
          >
            💭 Provide Feedback
          </a>
          <a
            href="https://www.buymeacoffee.com/saumyayadav"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-gray-700 text-sm"
          >
            ✨ Support the project
          </a>
        </div>
      )}
    </div>
  );
}
