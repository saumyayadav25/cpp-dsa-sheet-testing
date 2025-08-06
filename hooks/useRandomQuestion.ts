// hooks/useRandomQuestion.ts
import { useState } from "react";
import { getRandomItem } from "@/utils/random";

/**
 * Custom hook to manage random question selection from a given list.
 *
 * @param items - Array of questions or any data type.
 * @returns selected item and a function to pick a new one.
 */
export function useRandomQuestion<T>(items: T[]) {
  const [selected, setSelected] = useState<T | null>(null);

  const pickRandom = () => {
    const randomItem = getRandomItem(items);
    setSelected(randomItem);
  };

  return { selected, pickRandom };
}
