import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const owner = 'saumyayadav25';
    const repo = 'cpp-dsa-sheet-testing';

    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch all merged PRs with gssoc25 label
    const prsRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=100`,
      { headers }
    );

    if (!prsRes.ok) {
      return NextResponse.json({ points: {} }, { status: 500 });
    }

    const prs = await prsRes.json();

    const pointsMap: Record<string, number> = {};

    for (const pr of prs) {
      if (!pr.merged_at) continue; // Only merged PRs
    if (!pr.labels.some((l: any) => l.name?.toLowerCase() === 'gssoc25')) continue;

      // Determine highest level label
      let prPoints = 0;
      if (pr.labels.some((l: any) => l.name === 'level-3')) prPoints = 10;
      else if (pr.labels.some((l: any) => l.name === 'level-2')) prPoints = 5;
      else if (pr.labels.some((l: any) => l.name === 'level-1')) prPoints = 3;

      const author = pr.user?.login;
      if (!author) continue;

      pointsMap[author] = (pointsMap[author] || 0) + prPoints;
    }

    return NextResponse.json({ points: pointsMap });
  } catch (error) {
    console.error('Error fetching contributor points:', error);
    return NextResponse.json({ points: {} }, { status: 500 });
  }
}
