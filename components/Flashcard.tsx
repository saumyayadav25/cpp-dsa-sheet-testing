"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FlashcardProps {
  term: string;
  explanation: string;
}

export default function Flashcard({ term, explanation }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      {/* Custom CSS via Tailwind utilities */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

      <div
        className="w-80 h-48 cursor-pointer perspective"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-xl backface-hidden">
            <h2 className="text-2xl font-bold">{term}</h2>
          </div>
          {/* Back */}
          <div
            className="absolute w-full h-full bg-gray-800 text-white flex items-center justify-center rounded-xl backface-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-center px-4">{explanation}</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
