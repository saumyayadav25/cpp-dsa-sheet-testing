import flashcardsData from "./flashcards.json";

export type Flashcard = {
  id: number;
  term: string;
  explanation: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  category: string;
};

// all flashcards loaded from JSON
export const flashcards: Flashcard[] = flashcardsData as Flashcard[];

// unique categories (first item is "All")
export const categories: string[] = [
  "All",
  ...Array.from(new Set(flashcards.map((f) => f.category))),
];

// fixed difficulty levels (with "All" at start)
export const difficulties: string[] = ["All", "Basic", "Intermediate", "Advanced"];
