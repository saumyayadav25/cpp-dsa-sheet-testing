"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Flashcard } from "@/components/Flashcard";
import { ProgressBar } from "@/components/ProgressBar";
import { Filters } from "@/components/Filters";
import { flashcards as ALL_CARDS } from "@/data/flashcards";
import type { FlashcardItem, Difficulty } from "@/lib/types";
import useLocalStorage from "@/lib/useLocalStorage";

type ProgressState = {
  reviewedIds: string[];
  lastIndex: number;
  difficulty: Difficulty | "All";
};

const LS_KEY = "dsa-flashcards-progress";

export default function FlashcardsPage() {
  // persisted progress
  const [progress, setProgress] = useLocalStorage<ProgressState>(LS_KEY, {
    reviewedIds: [],
    lastIndex: 0,
    difficulty: "All",
  });

  const [index, setIndex] = useState<number>(progress.lastIndex ?? 0);
  const [difficulty, setDifficulty] = useState<Difficulty | "All">(
    progress.difficulty ?? "All"
  );

  // filter by difficulty
  const cards: FlashcardItem[] = useMemo(() => {
    return difficulty === "All"
      ? ALL_CARDS
      : ALL_CARDS.filter((c) => c.difficulty === difficulty);
  }, [difficulty]);

  // clamp index if filter changes / list shrinks
  useEffect(() => {
    if (index >= cards.length) setIndex(0);
  }, [cards.length, index]);

  // persist on changes
  useEffect(() => {
    setProgress((p) => ({ ...p, lastIndex: index, difficulty }));
  }, [index, difficulty, setProgress]);

  const current = cards[index];
  const reviewedSet = useMemo(
    () => new Set(progress.reviewedIds),
    [progress.reviewedIds]
  );
  const reviewedCount = useMemo(() => {
    // count only those in the filtered list
    let count = 0;
    for (const c of cards) if (reviewedSet.has(c.id)) count++;
    return count;
  }, [cards, reviewedSet]);

  function next() {
    setIndex((i) => (i + 1) % Math.max(cards.length, 1));
  }
  function prev() {
    setIndex((i) =>
      i - 1 < 0 ? Math.max(cards.length - 1, 0) : i - 1
    );
  }

  function toggleReviewed(id: string) {
    setProgress((p) => {
      const set = new Set(p.reviewedIds);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...p, reviewedIds: Array.from(set) };
    });
  }

  const percent = cards.length ? (reviewedCount / cards.length) * 100 : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full mx-auto max-w-5xl p-4 md:p-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-sm text-muted-foreground">
            Quick revision for core DSA concepts. Click a card to flip.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <Filters
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        </div>
      </header>

      <div className="mb-4">
        <ProgressBar percent={percent} />
        <div className="mt-2 text-sm text-muted-foreground">
          Reviewed {reviewedCount}/{cards.length}
        </div>
      </div>

      <section className="grid place-items-center my-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {current ? (
              <Flashcard
                key={current.id + difficulty}
                card={current}
                reviewed={reviewedSet.has(current.id)}
                onToggleReviewed={() => toggleReviewed(current.id)}
              />
            ) : (
              <div className="rounded-2xl border p-8 text-center">
                <p className="text-lg">No cards found for this filter.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <nav className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="px-4 py-2 rounded-2xl border shadow-sm hover:shadow transition active:scale-[0.98]"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          {cards.length ? index + 1 : 0} / {cards.length}
        </span>
        <button
          onClick={next}
          className="px-4 py-2 rounded-2xl border shadow-sm hover:shadow transition active:scale-[0.98]"
        >
          Next
        </button>
      </nav>

      <footer className="mt-10 text-center text-xs text-muted-foreground">
        Progress is saved locally on your device.
      </footer>
    </div>
  );
}

