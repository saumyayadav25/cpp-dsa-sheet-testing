export type Difficulty = "Basic" | "Intermediate";

export interface FlashcardItem {
  id: string;
  term: string;
  topic: string;
  difficulty: Difficulty;
  explanation: string;
  example?: string;
}

