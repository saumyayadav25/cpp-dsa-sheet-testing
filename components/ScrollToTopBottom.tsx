"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function ScrollToTopBottom() {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
      setAtBottom(
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <div className="fixed z-50 bottom-28 right-8 flex flex-col gap-3">
      {!atBottom && (
        <button
          aria-label="Scroll to bottom"
          onClick={scrollToBottom}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaArrowDown size={20} />
        </button>
      )}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}
