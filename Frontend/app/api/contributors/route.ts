import { NextResponse } from 'next/server';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

export async function GET() {
  try {
    const owner = 'saumyayadav25';
    const repo = 'cpp-dsa-sheet-testing';

    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };

    // First try the stats endpoint
    const statsRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      { headers, next: { revalidate: 86400 } }
    );

    console.log(
      '[contributors API] stats endpoint returned:',
      statsRes.status,
      statsRes.statusText
    );

    // If GitHub is still generating stats, fall back
    if (statsRes.status === 202) {
      console.warn('[contributors API] stats not ready, falling back to /contributors');
      const listRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
        { headers, next: { revalidate: 86400 } }
      );
      console.log(
        '[contributors API] fallback endpoint returned:',
        listRes.status,
        listRes.statusText
      );
      if (!listRes.ok) {
        throw new Error(
          `[contributors API] fallback fetch failed: ${listRes.status} ${listRes.statusText}`
        );
      }
      const contributors: Contributor[] = await listRes.json();
      return NextResponse.json(contributors.sort((a, b) => b.contributions - a.contributions));
    }

    // If it's any other non‑OK code, throw a detailed error
    if (!statsRes.ok) {
      throw new Error(
        `[contributors API] stats fetch failed: ${statsRes.status} ${statsRes.statusText}`
      );
    }

    // Otherwise parse the stats response
    const stats: Array<{
      total: number;
      author: { login: string; html_url: string; avatar_url: string };
    }> = await statsRes.json();

    const contributors = stats.map((c) => ({
      login: c.author.login,
      html_url: c.author.html_url,
      avatar_url: c.author.avatar_url,
      contributions: c.total,
    }));

    return NextResponse.json(contributors.sort((a, b) => b.contributions - a.contributions));
  } catch (error) {
    console.error('[contributors API] Error fetching contributors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributors' },
      { status: 500 }
    );
  }
}
