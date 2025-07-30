'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

interface GitHubStatsResponse {
  total: number;
  author: {
    login: string;
    html_url: string;
    avatar_url: string;
  };
}

async function fetchContributors(): Promise<Contributor[]> {
  const owner = 'saumyayadav25';
  const repo = 'cpp-dsa-sheet-testing';

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const statsRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        headers,
        next: { revalidate: 86400 },
      }
    );

    console.log('[contributors] stats endpoint returned:', statsRes.status, statsRes.statusText);

    if (statsRes.status === 202) {
      console.warn('[contributors] stats not ready, falling back to /contributors');
      return await fetchContributorsFallback(owner, repo, headers);
    }

    if (statsRes.ok) {
      const stats: GitHubStatsResponse[] = await statsRes.json();

      const contributors: Contributor[] = stats.map((stat) => ({
        login: stat.author.login,
        html_url: stat.author.html_url,
        avatar_url: stat.author.avatar_url,
        contributions: stat.total,
      }));

      return contributors.sort((a, b) => b.contributions - a.contributions);
    }

    console.warn('[contributors] stats endpoint failed, trying fallback');
    return await fetchContributorsFallback(owner, repo, headers);
  } catch (error) {
    console.error('[contributors] Error fetching from GitHub API:', error);
    throw new Error('Failed to fetch contributors data');
  }
}

async function fetchContributorsFallback(owner: string, repo: string, headers: HeadersInit): Promise<Contributor[]> {
  const listRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`, {
    headers,
    next: { revalidate: 86400 },
  });

  console.log('[contributors] fallback endpoint returned:', listRes.status, listRes.statusText);

  if (!listRes.ok) {
    throw new Error(`[contributors] fallback fetch failed: ${listRes.status} ${listRes.statusText}`);
  }

  const contributors: Contributor[] = await listRes.json();
  return contributors.sort((a, b) => b.contributions - a.contributions);
}

const getCardGradient = (ratio: number): string => {
  if (ratio <= 0.33) {
    return 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/20';
  } else if (ratio <= 0.66) {
    return 'bg-gradient-to-br from-purple-400/15 via-indigo-500/15 to-blue-500/15 border-indigo-500/20';
  } else {
    return 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/20';
  }
};

const getButtonGradient = (ratio: number): string => {
  if (ratio <= 0.33) {
    return 'bg-gradient-to-br from-blue-500/30 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/30 border-blue-500/30';
  } else if (ratio <= 0.66) {
    return 'bg-gradient-to-br from-blue-400/25 via-indigo-500/25 to-purple-500/25 hover:from-blue-400/35 hover:via-indigo-500/35 hover:to-purple-500/35 border-indigo-500/30';
  } else {
    return 'bg-gradient-to-br from-purple-500/30 to-purple-600/20 hover:from-purple-500/40 hover:to-purple-600/30 border-purple-500/30';
  }
};

interface ContributorCardProps {
  contributor: Contributor;
  index: number;
  totalContributors: number;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor, index, totalContributors }) => {
  const ratio = index / Math.max(1, totalContributors - 1);

  return (
    <div
      className={`${getCardGradient(ratio)} rounded-xl p-6 flex flex-col items-center text-center shadow-sm border transition-transform duration-300 hover:scale-105`}
      key={contributor.login}
    >
      <div className="relative mb-4">
        <Image
          src={contributor.avatar_url}
          alt={`${contributor.login}'s avatar`}
          width={96}
          height={96}
          className="rounded-full border-2 border-white/10"
          loading="lazy"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-foreground">{contributor.login}</h2>

      <p className="text-sm text-foreground mb-4">
        <span className="text-yellow-400 font-medium">
          {contributor.contributions.toLocaleString()} commit{contributor.contributions === 1 ? '' : 's'}
        </span>
      </p>

      <Button
        asChild
        variant="outline"
        size="sm"
        className={`w-full ${getButtonGradient(ratio)} text-white border transition-all duration-300 hover:shadow-lg`}
      >
        <Link href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
          <span>View Profile</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </Button>
    </div>
  );
};

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from our API route first
        const response = await fetch('/api/contributors');

        if (response.ok) {
          const fetchedContributors: Contributor[] = await response.json();
          setContributors(fetchedContributors);
        } else {
          // Fallback to direct GitHub API call
          console.warn('API route failed, trying direct GitHub API');
          const directFetch = await fetchContributors();
          setContributors(directFetch);
        }
      } catch (err) {
        console.error('Error fetching contributors:', err);
        setError('Failed to load contributors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar streak={streak} />
        <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background text-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded-lg mb-4 max-w-md mx-auto"></div>
              <div className="h-6 bg-gray-700 rounded mb-8 max-w-2xl mx-auto"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-700/20 rounded-xl p-6 animate-pulse">
                    <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded mb-4 w-20 mx-auto"></div>
                    <div className="h-8 bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar streak={streak} />
        <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background text-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Contributors</h1>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30">
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar streak={streak} />
      <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background ">
        <section aria-labelledby="contributors-heading" className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 id="contributors-heading" className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Our Amazing Contributors
              </span>
            </h1>

            <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
              Every line of code, every fix, every idea — it all adds up. <br />
              <span className="text-yellow-400 font-medium">Grateful to have you building with us.</span> <br />
              You all are the heart of this community! 🌟
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-400 mt-6">
              <div className="bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                <span className="text-purple-400 font-semibold">{contributors.length}</span> Contributors
              </div>
              <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="text-blue-400 font-semibold">
                  {contributors.reduce((sum, c) => sum + c.contributions, 0).toLocaleString()}
                </span>{' '}
                Total Commits
              </div>
            </div>
          </div>

          {contributors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No contributors found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => (
                <ContributorCard key={contributor.login} contributor={contributor} index={index} totalContributors={contributors.length} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Want to Contribute?
                </span>
              </h2>
              <p className="text-foreground mb-6 max-w-2xl mx-auto">
                Join our amazing community of developers! Check out our repository and start contributing today.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Link
                  href={`https://github.com/saumyayadav25/cpp-dsa-sheet-testing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Visit Repository
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
