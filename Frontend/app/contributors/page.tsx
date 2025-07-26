'use client';

import React, { useEffect, useState } from 'react';

type Contributor = {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  commits: number;
};

const ContributorsPage = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    // Fake data for testing layout
    const dummyData: Contributor[] = [
      {
        username: 'siddhikasavant',
        profileUrl: 'https://github.com/siddhikasavant',
        avatarUrl: 'https://avatars.githubusercontent.com/u/86191827?v=4',
        commits: 42,
      },
      {
        username: 'gauridev',
        profileUrl: 'https://github.com/gauridev',
        avatarUrl: 'https://avatars.githubusercontent.com/u/12345678?v=4',
        commits: 27,
      },
    ];
    setContributors(dummyData);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">✨ Our Amazing Contributors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contributors.map((c, index) => (
          <a
            key={index}
            href={c.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img src={c.avatarUrl} alt={c.username} className="w-20 h-20 rounded-full mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-2">{c.username}</h2>
            <p className="text-center text-sm text-gray-500">{c.commits} commits</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContributorsPage;
