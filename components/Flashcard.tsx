"use client";

import { motion } from "framer-motion";
import type { FlashcardItem } from "@/lib/types";
import { useState } from "react";

export function Flashcard({
  card,
  reviewed,
  onToggleReviewed,
}: {
  card: FlashcardItem;
  reviewed: boolean;
  onToggleReviewed: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="relative h-[360px] w-full rounded-2xl shadow-lg border overflow-hidden cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 p-6 grid place-items-center bg-card"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border">
              <span className="opacity-70">Topic:</span> {card.topic}
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold">{card.term}</h2>
            <p className="text-sm text-muted-foreground">
              Difficulty: {card.difficulty}
            </p>
            <p className="text-xs text-muted-foreground">
              (Tap/click to flip)
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 p-6 grid place-items-center bg-background"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium opacity-80">
              Explanation
            </h3>
            <p className="text-base leading-relaxed">{card.explanation}</p>
            {card.example && (
              <div className="text-sm rounded-xl border p-3">
                <div className="font-medium mb-1 opacity-80">Example</div>
                <pre className="whitespace-pre-wrap">{card.example}</pre>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFlipped(false);
          }}
          className="text-sm px-3 py-2 rounded-xl border hover:shadow active:scale-[0.98]"
        >
          Show Front
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleReviewed();
          }}
          className={`text-sm px-3 py-2 rounded-xl border hover:shadow active:scale-[0.98] ${
            reviewed ? "bg-green-500/10 border-green-500/40" : ""
          }`}
        >
          {reviewed ? "Reviewed ✓" : "Mark Reviewed"}
        </button>
      </div>
    </div>
  );
}
