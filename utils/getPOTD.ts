import { sampleTopics } from '@/data/questions';

// Simple pseudo-random generator based on seed (dayId)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getPOTD() {
  const allQuestions = sampleTopics.flatMap((topic) => topic.questions);

  const today = new Date();
  const dayId = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); // unique ID per day
  const randomIndex = Math.floor(seededRandom(dayId) * allQuestions.length);
  
  return allQuestions[randomIndex];
}