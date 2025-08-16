// File: app/api/leetcode/route.ts

import { NextResponse } from 'next/server';

// This is the single, comprehensive GraphQL query to get all the data we need.
const LEETCODE_API_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      tagProblemCounts: tagProblemCounts {
        advanced {
          tagName
          problemsSolved
        }
        intermediate {
          tagName
          problemsSolved
        }
        fundamental {
          tagName
          problemsSolved
        }
      }
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
    }
    userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
            title
            startTime
        }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: LEETCODE_API_QUERY,
        variables: { username },
      }),
    });

    const data = await res.json();

    if (data.errors) {
        throw new Error(data.errors[0].message || 'User not found on LeetCode.');
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}