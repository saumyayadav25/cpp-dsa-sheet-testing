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
      <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background text-foreground">
      <section aria-labelledby="contributors-heading" className="max-w-7xl mx-auto">
        <h1
          id="contributors-heading"
          className="text-3xl font-bold mb-8 text-center"
        >
          ✨ Our Contributors
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contributors.map((c) => (
            <div
              key={c.login}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center shadow-sm"
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
                {c.contributions} commit
                {c.contributions === 1 ? '' : 's'}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Link href={c.html_url} target="_blank">
                  View Profile
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  )
}
