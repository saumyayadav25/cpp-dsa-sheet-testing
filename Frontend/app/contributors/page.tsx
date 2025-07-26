'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

interface Contributor {
  login: string
  html_url: string
  avatar_url: string
  contributions: number
}

async function fetchContributors(): Promise<Contributor[]> {
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
    '[contributors] stats endpoint returned:',
    statsRes.status,
    statsRes.statusText
  );

  // If GitHub is still generating stats, fall back
  if (statsRes.status === 202) {
    console.warn('[contributors] stats not ready, falling back to /contributors');
    const listRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
      { headers, next: { revalidate: 86400 } }
    );
    console.log(
      '[contributors] fallback endpoint returned:',
      listRes.status,
      listRes.statusText
    );
    if (!listRes.ok) {
      throw new Error(
        `[contributors] fallback fetch failed: ${listRes.status} ${listRes.statusText}`
      );
    }
    // @ts-expect-error GitHub’s type
    const contributors: Contributor[] = await listRes.json();
    return contributors.sort((a, b) => b.contributions - a.contributions);
  }

  // If it's any other non‑OK code, throw a detailed error
  if (!statsRes.ok) {
    throw new Error(
      `[contributors] stats fetch failed: ${statsRes.status} ${statsRes.statusText}`
    );
  }

  // Otherwise parse the stats response
  const stats: Array<{
    total: number
    author: { login: string; html_url: string; avatar_url: string }
  }> = await statsRes.json();

  const contributors = stats.map((c) => ({
    login: c.author.login,
    html_url: c.author.html_url,
    avatar_url: c.author.avatar_url,
    contributions: c.total,
  }));

  return contributors.sort((a, b) => b.contributions - a.contributions);
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);

    // Fetch contributors data from our API route
    const fetchData = async () => {
      try {
        const response = await fetch('/api/contributors');
        if (!response.ok) {
          throw new Error(`Failed to fetch contributors: ${response.status}`);
        }
        const fetchedContributors: Contributor[] = await response.json();
        setContributors(fetchedContributors);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Navbar streak={streak} />
      <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-[#131313] text-white">
      <section aria-labelledby="contributors-heading" className="max-w-7xl mx-auto">
        <h1
          id="contributors-heading"
          className="text-3xl font-bold mb-8 text-center"
        >
          ✨ <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Our Contributors</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contributors.map((c, index) => {
            // Calculate gradient based on position
            const totalContributors = contributors.length;
            const ratio = index / Math.max(1, totalContributors - 1);
            
            // Create gradient from purple to blue based on position
            const getGradient = (ratio: number) => {
              if (ratio <= 0.33) {
                return "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/20";
              } else if (ratio <= 0.66) {
                return "bg-gradient-to-br from-purple-400/15 via-indigo-500/15 to-blue-500/15 border-indigo-500/20";
              } else {
                return "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/20";
              }
            };

            // Create reverse gradient for button
            const getButtonGradient = (ratio: number) => {
              if (ratio <= 0.33) {
                return "bg-gradient-to-br from-blue-500/30 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/30 border-blue-500/30";
              } else if (ratio <= 0.66) {
                return "bg-gradient-to-br from-blue-400/25 via-indigo-500/25 to-purple-500/25 hover:from-blue-400/35 hover:via-indigo-500/35 hover:to-purple-500/35 border-indigo-500/30";
              } else {
                return "bg-gradient-to-br from-purple-500/30 to-purple-600/20 hover:from-purple-500/40 hover:to-purple-600/30 border-purple-500/30";
              }
            };

            return (
            <div
              key={c.login}
              className={`${getGradient(ratio)} rounded-xl p-6 flex flex-col items-center text-center shadow-sm border`}
            >
              <Image
                src={c.avatar_url}
                alt={`${c.login}’s avatar`}
                width={96}
                height={96}
                className="rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{c.login}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                <span className="text-yellow-400">{c.contributions} commit
                {c.contributions === 1 ? '' : 's'}</span>
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className={`w-full ${getButtonGradient(ratio)} text-white border transition-all duration-300`}
              >
                <Link href={c.html_url} target="_blank">
                  View Profile
                </Link>
              </Button>
            </div>
          )})}
        </div>
      </section>
    </main>
    </>
  )
}
