import { NextResponse } from 'next/server';

interface PRData {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: Array<{
    name: string;
  }>;
  merged_at: string | null;
}

interface ContributorPoints {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number; // Keep original for fallback
  points: number;
  prCount: number;
  levelBreakdown: {
    level1: number;
    level2: number;
    level3: number;
  };
}

function calculatePoints(labels: string[]): number {
  // Check for level labels and return points for the highest level
  if (labels.includes('level-3')) return 10;
  if (labels.includes('level-2')) return 5;
  if (labels.includes('level-1')) return 3;
  return 0;
}

function hasGssocLabel(labels: string[]): boolean {
  return labels.some(label => label.toLowerCase().includes('gssoc25'));
}

export async function GET() {
  try {
    const owner = 'saumyayadav25';
    const repo = 'cpp-dsa-sheet-testing';

    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };

    // Fetch all merged PRs
    let allPRs: PRData[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=${perPage}&page=${page}`,
        { headers, next: { revalidate: 3600 } } // Cache for 1 hour
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch PRs: ${response.status} ${response.statusText}`);
      }

      const prs: PRData[] = await response.json();
      
      if (prs.length === 0) break; // No more PRs
      
      allPRs.push(...prs);
      page++;
      
      // Safety limit to prevent infinite loops
      if (page > 50) break;
    }

    // Filter for merged PRs with gssoc25 label
    const eligiblePRs = allPRs.filter(pr => 
      pr.merged_at && 
      hasGssocLabel(pr.labels.map(l => l.name))
    );

    console.log(`[contributors-points API] Found ${eligiblePRs.length} eligible PRs out of ${allPRs.length} total PRs`);

    // Group by contributor and calculate points
    const contributorMap = new Map<string, ContributorPoints>();

    for (const pr of eligiblePRs) {
      const login = pr.user.login;
      const labelNames = pr.labels.map(l => l.name);
      const points = calculatePoints(labelNames);

      if (points === 0) continue; // Skip PRs without level labels

      if (!contributorMap.has(login)) {
        contributorMap.set(login, {
          login,
          html_url: pr.user.html_url,
          avatar_url: pr.user.avatar_url,
          contributions: 0, // Will be filled from commits API if needed
          points: 0,
          prCount: 0,
          levelBreakdown: {
            level1: 0,
            level2: 0,
            level3: 0,
          },
        });
      }

      const contributor = contributorMap.get(login)!;
      contributor.points += points;
      contributor.prCount += 1;

      // Update level breakdown
      if (labelNames.includes('level-3')) {
        contributor.levelBreakdown.level3 += 1;
      } else if (labelNames.includes('level-2')) {
        contributor.levelBreakdown.level2 += 1;
      } else if (labelNames.includes('level-1')) {
        contributor.levelBreakdown.level1 += 1;
      }
    }

    // Convert to array and sort by points
    const contributors = Array.from(contributorMap.values())
      .sort((a, b) => b.points - a.points);

    // Also fetch commit data to fill in contributions count
    try {
      const statsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
        { headers, next: { revalidate: 86400 } }
      );

      if (statsRes.ok) {
        const stats: Array<{
          total: number;
          author: { login: string };
        }> = await statsRes.json();

        const commitMap = new Map(stats.map(s => [s.author.login, s.total]));
        
        contributors.forEach(contributor => {
          contributor.contributions = commitMap.get(contributor.login) || 0;
        });
      }
    } catch (error) {
      console.warn('[contributors-points API] Failed to fetch commit stats:', error);
    }

    const totalPoints = contributors.reduce((sum, c) => sum + c.points, 0);
    const totalPRs = contributors.reduce((sum, c) => sum + c.prCount, 0);

    return NextResponse.json({
      contributors,
      stats: {
        totalContributors: contributors.length,
        totalPoints,
        totalPRs,
        totalCommits: contributors.reduce((sum, c) => sum + c.contributions, 0),
      }
    });

  } catch (error) {
    console.error('[contributors-points API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributor points' },
      { status: 500 }
    );
  }
}
