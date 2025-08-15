// utils/leetcode.ts

export interface LeetCodeStats {
  submissionCounts: {
    easy: { submissions: number; solved: number };
    medium: { submissions: number; solved: number };
    hard: { submissions: number; solved: number };
  };
  contestHistory: any[];
  problemTags: Record<string, number>;
}

// This function now correctly processes the full API response.
const processLeetCodeData = (apiResponse: any): LeetCodeStats => {
    const data = apiResponse.data;

    const submissionStats = {
        easy: { submissions: 0, solved: 0 },
        medium: { submissions: 0, solved: 0 },
        hard: { submissions: 0, solved: 0 },
    };

    // Extract submission and solved counts
    data.matchedUser.submitStats.acSubmissionNum.forEach((item: any) => {
        switch (item.difficulty) {
            case 'Easy':
                submissionStats.easy = { submissions: item.submissions, solved: item.count };
                break;
            case 'Medium':
                submissionStats.medium = { submissions: item.submissions, solved: item.count };
                break;
            case 'Hard':
                submissionStats.hard = { submissions: item.submissions, solved: item.count };
                break;
        }
    });

    const problemTags: Record<string, number> = {};
    const tagGroups = data.matchedUser.tagProblemCounts;
    if (tagGroups) {
        [...tagGroups.advanced, ...tagGroups.intermediate, ...tagGroups.fundamental].forEach((tag: any) => {
            problemTags[tag.tagName.toLowerCase()] = tag.problemsSolved;
        });
    }

    const contestHistory = (data.userContestRankingHistory || [])
        .filter((contest: any) => contest.attended && contest.rating)
        .map((contest: any) => ({
            contestId: contest.contest.title, // Use title as a unique key for the chart
            newRating: Math.round(contest.rating),
            ratingUpdateTimeSeconds: contest.contest.startTime,
        }));

    return { submissionCounts: submissionStats, problemTags, contestHistory };
};

export const fetchLeetCodeStats = async (handle: string): Promise<LeetCodeStats | null> => {
    const res = await fetch('/api/leetcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: handle }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to fetch LeetCode stats.`);
    }

    const rawData = await res.json();
    return processLeetCodeData(rawData);
};