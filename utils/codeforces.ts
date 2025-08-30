// Define the structure of the final data object we want to create
export interface CodeforcesStats {
  rating?: number;
  maxRating?: number;
  contestCount?: number;
  Easy: number;
  Medium: number;
  Hard: number;
  ratingHistory?: any[];
  problemTags?: Record<string, number>;
}

// Helper function to process the list of submissions
const processSubmissions = (submissions: any[]): {
  difficultyCounts: { Easy: number; Medium: number; Hard: number };
  problemTags: Record<string, number>;
} => {
  const solvedProblems = new Set<string>();
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
  const problemTags: Record<string, number> = {};

  for (const sub of submissions) {
    if (sub.verdict !== 'OK') continue;

    const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
    if (solvedProblems.has(problemId)) continue; // Skip if already solved

    solvedProblems.add(problemId);

    // Categorize difficulty by problem rating
    const rating = sub.problem.rating;
    if (rating) {
      if (rating < 1400) difficultyCounts.Easy++;
      else if (rating < 2000) difficultyCounts.Medium++;
      else difficultyCounts.Hard++;
    }

    // Count problem tags
    for (const tag of sub.problem.tags) {
      problemTags[tag] = (problemTags[tag] || 0) + 1;
    }
  }

  return { difficultyCounts, problemTags };
};


// Main function to fetch all data for a user
export const fetchCodeforcesStats = async (handle: string): Promise<CodeforcesStats | null> => {
  try {
    const urls = [
      `https://codeforces.com/api/user.info?handles=${handle}`,
      `https://codeforces.com/api/user.rating?handle=${handle}`,
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`, // Get a large number of submissions
    ];

    const [infoRes, ratingRes, statusRes] = await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()))
    );

    // Check if any API call failed (e.g., user not found)
    if (infoRes.status !== 'OK' || ratingRes.status !== 'OK' || statusRes.status !== 'OK') {
        throw new Error(infoRes.comment || 'User not found or API error.');
    }

    const userInfo = infoRes.result[0];
    const ratingHistory = ratingRes.result;
    const submissions = statusRes.result;

    const { difficultyCounts, problemTags } = processSubmissions(submissions);

    // Assemble the final, clean data object
    const finalStats: CodeforcesStats = {
      rating: userInfo.rating,
      maxRating: userInfo.maxRating,
      contestCount: ratingHistory.length,
      Easy: difficultyCounts.Easy,
      Medium: difficultyCounts.Medium,
      Hard: difficultyCounts.Hard,
      ratingHistory: ratingHistory,
      problemTags: problemTags,
    };

    return finalStats;

  } catch (error) {
    console.error("Failed to fetch Codeforces stats:", error);
    // Re-throw the error so the component can catch it and show a toast
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while fetching stats.');
  }
};