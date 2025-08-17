'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { fetchContributions } from "@/utils/githubContributions";

interface Contributor {
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
  points?: number;
  prCount?: number;
  levelBreakdown?: {
    level1: number;
    level2: number;
    level3: number;
  };
}

interface ContributorStats {
  totalContributors: number;
  totalPoints: number;
  totalPRs: number;
  totalCommits: number;
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
  isProjectOwner?: boolean;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor, index, totalContributors, isProjectOwner = false }) => {
  const ratio = index / Math.max(1, totalContributors - 1);
  const hasPoints = contributor.points !== undefined && contributor.points > 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
      },
    },
  };
  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="h-full"
    transition={{ duration: 0.2, ease: "easeOut" }} //Exit transition because after hover it took 4-5 seconds to be back to original position 
    >
      <Link 
        href={contributor.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
      <div
        className={`${getCardGradient(ratio)} rounded-xl p-6 flex flex-col items-center text-center shadow-sm border transition-all duration-300 relative group cursor-pointer h-full min-h-[280px]`}
        key={contributor.login}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col items-center justify-center z-10">
          <div className="relative mb-3">
            <Image
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              width={64}
              height={64}
              className="rounded-full border-2 border-white/40"
              loading="lazy"
            />
          </div>
          <div className="text-yellow-400 font-medium text-sm mb-2 text-center px-2">
            {contributor.login}
          </div>
          <div className="text-gray-900 dark:text-white font-semibold text-sm">Click To Visit Profile</div>
        </div>

        <div className="relative mb-4 group-hover:opacity-0 transition-opacity duration-500 ease-in-out">
          <Image
            src={contributor.avatar_url}
            alt={`${contributor.login}'s avatar`}
            width={96}
            height={96}
            className="rounded-full border-2 border-white/10"
            loading="lazy"
          />
        </div>

        <h2 className="text-lg font-semibold mb-2 text-foreground group-hover:opacity-0 transition-opacity duration-500 ease-in-out">{contributor.login}</h2>

        <div className="text-sm text-foreground mb-4 space-y-1 flex-grow flex flex-col justify-start group-hover:opacity-0 transition-opacity duration-500 ease-in-out">{isProjectOwner ? (
            <>
              <div className="text-transparent bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text font-bold text-lg">
                👑 Project Admin
              </div>
              <div className="text-gray-400 text-xs mt-2 mb-4 flex-grow"></div>
              <div className="text-xs mt-2">
                <span className="text-blue-400 font-medium">
                  {contributor.contributions} Commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </>
          ) : hasPoints ? (
            <>
              <div className="font-bold text-lg">
                <span className="bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text text-transparent">
                  🏆 {contributor.points} Points
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2 space-y-1 min-h-[60px]">
                {contributor.levelBreakdown && (
                  <>
                    {contributor.levelBreakdown.level3 > 0 && (
                      <div>🥇 Level-3: {contributor.levelBreakdown.level3} (10pts each)</div>
                    )}
                    {contributor.levelBreakdown.level2 > 0 && (
                      <div>🥈 Level-2: {contributor.levelBreakdown.level2} (5pts each)</div>
                    )}
                    {contributor.levelBreakdown.level1 > 0 && (
                      <div>🥉 Level-1: {contributor.levelBreakdown.level1} (3pts each)</div>
                    )}
                  </>
                )}
              </div>
              <div className="text-xs mt-2">
                <span className="text-red-400 font-medium">
                  {contributor.prCount} PRS
                </span>
                <span className="text-gray-400"> & </span>
                <span className="text-blue-400 font-medium">
                  {contributor.contributions} Commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </>
          ) : (
            <div className="text-gray-400 flex flex-col justify-between h-full">
              <div className="text-xs text-gray-500 mt-1 mb-4 flex-grow">
                Community Contributor
              </div>
              <div className="text-xs mt-2">
                <span className="text-blue-400 font-medium">
                  {contributor.contributions.toLocaleString()} commit{contributor.contributions === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      </Link>
    </motion.div>
  );
};

export default async function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [stats, setStats] = useState<ContributorStats | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const res = await fetch("https://api.github.com/repos/saumyayadav25/cpp-dsa-sheet-testing/contributors");
  // const contributorsList = await res.json(); // 🔹 naam change kiya

  // // Leaderboard ke liye points fetch karo
  // const leaderboard = await fetchContributions("saumyayadav25", "cpp-dsa-sheet-testing");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from our new points API first
        const pointsResponse = await fetch('/api/contributors-points');

        if (pointsResponse.ok) {
          const data = await pointsResponse.json();
          setContributors(data.contributors);
          setStats(data.stats);
        } else {
          // Fallback to original contributors API
          console.warn('Points API failed, trying original contributors API');
          const response = await fetch('/api/contributors');

          if (response.ok) {
            const fetchedContributors: Contributor[] = await response.json();
            setContributors(fetchedContributors);
            setStats({
              totalContributors: fetchedContributors.length,
              totalPoints: 0,
              totalPRs: 0,
              totalCommits: fetchedContributors.reduce((sum, c) => sum + c.contributions, 0),
            });
          } else {
            // Last resort: direct GitHub API call
            console.warn('API route failed, trying direct GitHub API');
            const directFetch = await fetchContributors();
            setContributors(directFetch);
            setStats({
              totalContributors: directFetch.length,
              totalPoints: 0,
              totalPRs: 0,
              totalCommits: directFetch.reduce((sum, c) => sum + c.contributions, 0),
            });
          }
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
        <Navbar />
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
        <Navbar />
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
      <Navbar />
      <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background transition-colors duration-300">
        <section aria-labelledby="contributors-heading" className="max-w-7xl mx-auto">

          {/* <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
          <table className="table-auto border-collapse border border-gray-400 w-full mb-8">
            <thead>
              <tr>
                <th className="border px-4 py-2">Contributor</th>
                <th className="border px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(leaderboard).map(([user, points]) => (
                <tr key={user}>
                  <td className="border px-4 py-2">{user}</td>
                  <td className="border px-4 py-2">{points}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          

          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 id="contributors-heading" className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Our Amazing Contributors
              </span>
            </h1>

            <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
              Every line of code, every fix, every idea — it all adds up. <br />
              <span className="text-yellow-400 font-medium">Grateful to have you building with us.</span> <br />
              You all are the heart of this community! 🌟 <br />
             
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-400 mt-6 mb-12"
          >
              <div className="bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                <span className="text-purple-400 font-semibold">{stats?.totalContributors || contributors.length}</span> Contributors
              </div>
              {stats?.totalPoints && stats.totalPoints > 0 && (
                <div className="bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                  <span className="text-yellow-400 font-semibold">
                    {stats.totalPoints.toLocaleString()}
                  </span>{' '}
                  Total Points
                </div>
              )}
              {stats?.totalPRs && stats.totalPRs > 0 && (
                <div className="bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <span className="text-green-400 font-semibold">
                    {stats.totalPRs.toLocaleString()}
                  </span>{' '}
                  Eligible PRs
                </div>
              )}
              <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="text-blue-400 font-semibold">
                  {stats?.totalCommits?.toLocaleString() || contributors.reduce((sum, c) => sum + c.contributions, 0).toLocaleString()}
                </span>{' '}
                Total Commits
              </div>
            </motion.div>

            {stats?.totalPoints === 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeInUp}
                className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 max-w-2xl mx-auto"
              >
                <p className="text-amber-400 text-sm">
                  <strong>Note:</strong> No GSSoC'25 eligible PRs found with required labels (gssoc25 + level-1/2/3). 
                  Showing all contributors sorted by commits as fallback.
                </p>
              </motion.div>
            )}

          {contributors.length === 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeInUp}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No contributors found.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {(() => {
                const projectOwner = 'saumyayadav25';
                
                // Separate contributors into different categories
                const ownerContributor = contributors.find(c => c.login === projectOwner);
                const gssocContributors = contributors.filter(c => 
                  c.login !== projectOwner && 
                  c.points !== undefined && 
                  c.points > 0
                ).sort((a, b) => (b.points || 0) - (a.points || 0));
                
                const nonGssocContributors = contributors.filter(c => 
                  c.login !== projectOwner && 
                  (c.points === undefined || c.points === 0)
                ).sort((a, b) => b.contributions - a.contributions);

                // Combine them in order: owner first, then gssoc contributors, then non-gssoc
                const sortedContributors = [
                  ...(ownerContributor ? [ownerContributor] : []),
                  ...gssocContributors,
                  ...nonGssocContributors
                ];

                return sortedContributors.map((contributor, index) => (
                  <ContributorCard 
                    key={contributor.login} 
                    contributor={contributor} 
                    index={index} 
                    totalContributors={sortedContributors.length}
                    isProjectOwner={contributor.login === projectOwner}
                  />
                ));
              })()}
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeInUp}
            className="mt-16 space-y-8"
          >
            {/* Point System Explanation */}
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  🏆 Point System
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <div className="text-2xl mb-2">🥉</div>
                  <div className="text-yellow-400 font-bold text-lg">Level-1</div>
                  <div className="text-gray-300 text-sm">3 Points</div>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                  <div className="text-2xl mb-2">🥈</div>
                  <div className="text-orange-400 font-bold text-lg">Level-2</div>
                  <div className="text-gray-300 text-sm">5 Points</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-2xl mb-2">🥇</div>
                  <div className="text-purple-400 font-bold text-lg">Level-3</div>
                  <div className="text-gray-300 text-sm">10 Points</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center mt-4">
                Points are awarded only for <strong>merged PRs</strong> with the <strong>gssoc25</strong> label
                and appropriate <strong>level</strong> labels. Only the highest level per PR counts in case multiple assignment.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Want to Contribute?
                </span>
              </h2>
              <p className="text-foreground mb-6 max-w-2xl mx-auto">
                Join our amazing community of developers! Check out our repository and start contributing today.
                Make sure to follow the contribution guidelines to earn points!
              </p>
              <div className="flex justify-center">
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
          </motion.div>
        </section>
      </main>
    </>
  );
}
