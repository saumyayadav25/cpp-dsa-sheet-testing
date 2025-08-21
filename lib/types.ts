export interface Flashcard {
  id: number;
  term: string;
  explanation: string;
  difficulty: "Basic" | "Intermediate";
}
