// utils/random.ts

/**
 * Returns a random item from the given array.
 * If the array is empty or not provided, returns null.
 * 
 * @param items - Array of any type
 * @returns A single randomly selected item or null
 */
export function getRandomItem<T>(items: T[]): T | null {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}
