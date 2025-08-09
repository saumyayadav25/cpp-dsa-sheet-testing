import axios from "axios";

export const fetchCodeforcesStats = async (username: string) => {
  try {
    const submissionsRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    const problemsRes = await axios.get(
      `https://codeforces.com/api/problemset.problems`
    );

    const submissions = submissionsRes.data.result;
    const problems = problemsRes.data.result.problems;

    const ratingMap = new Map<string, number>();
    for (const prob of problems) {
      if (prob.rating !== undefined) {
        ratingMap.set(`${prob.contestId}-${prob.index}`, prob.rating);
      }
    }

    // Count days where any submission was made (regardless of verdict)
    const activeDays = new Set<string>();
    for (const sub of submissions) {
      const date = new Date(sub.creationTimeSeconds * 1000)
        .toISOString()
        .split("T")[0];
      activeDays.add(date);
    }

    // Only count accepted problems for difficulty breakdown
    const accepted = submissions.filter((sub: any) => sub.verdict === "OK");

    const uniqueProblems = new Set<string>();
    for (const sub of accepted) {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      uniqueProblems.add(problemId);
    }

    let Easy = 0,
      Medium = 0,
      Hard = 0;

    for (const pid of uniqueProblems) {
      const rating = ratingMap.get(pid);
      if (rating !== undefined) {
        if (rating <= 1200) Easy++;
        else if (rating <= 1800) Medium++;
        else Hard++;
      }
    }

    return {
      Easy,
      Medium,
      Hard,
      Total: uniqueProblems.size,
      ActiveDays: activeDays.size,
    };
  } catch (err) {
     return null;
    //console.error("Error fetching Codeforces stats:", err);
    // return {
    //   Easy: 0,
    //   Medium: 0,
    //   Hard: 0,
    //   Total: 0,
    //   ActiveDays: 0,
    // };
  }
};
