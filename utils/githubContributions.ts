import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Points mapping
const pointsMap: Record<string, number> = {
  "level-1": 3,
  "level-2": 7,
  "level-3": 10,
};

export async function fetchContributions(owner: string, repo: string) {
  const contributions: Record<string, number> = {};

  // fetch All closed PRs
  const pulls = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    state: "closed",
    per_page: 100,
  });

  for (const pr of pulls.data) {
    // count only merged PRs
    if (!pr.merged_at) continue;

    // only PR with "gssoc25" label
    const labels = pr.labels.map((label: any) => label.name.toLowerCase());
    if (!labels.includes("gssoc25")) continue;

    // add points based on labels
    let prPoints = 0;
    for (const label of labels) {
      if (pointsMap[label]) {
        prPoints = pointsMap[label];
        break;
      }
    }

    if (prPoints > 0) {
      const user = pr.user?.login || "unknown";
      contributions[user] = (contributions[user] || 0) + prPoints;
    }
  }

  return contributions;
}
