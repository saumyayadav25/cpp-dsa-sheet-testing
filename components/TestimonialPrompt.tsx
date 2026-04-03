'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

export default function TestimonialPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!showPrompt) return null;

  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="fixed bottom-20 right-3 z-50 
    bg-white text-gray-900 hover:bg-gray-100 
    dark:bg-[#202029] dark:text-white dark:hover:bg-[#19191f] 
    px-3 py-2 rounded-lg shadow-md 
    w-[85vw] max-w-[300px] sm:px-4 sm:py-3"
>

      <div className="relative">
        {/* Close Button */}
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-0 right-0 
            text-gray-500 hover:text-black         // 👈 Visible in light mode
            dark:text-gray-400 dark:hover:text-white transition"
        >
          <FiX className="sm:text-lg text-md" />
        </button>

        {/* Content */}
        <div className="pr-6">
          <p className="sm:text-sm text-xs font-medium mb-3 leading-relaxed">
            ❤️ Your journey matters. Share how this sheet helped you —
            and inspire others by filling the testimonial form.
          </p>

          <Link
            href="https://forms.gle/8BXQC1o3hsVsEEBp9"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 sm:text-sm text-xs text-white px-2 py-1 rounded inline-block sm:px-3 sm:py-1"
          >
            Fill Form
          </Link>
        </div>
      </div>
    </motion.div>
  );
}