// components/LeetCodeDashboard.tsx
'use client';

import DifficultyDonutChart from './charts/DifficultyDonutChart';
// Corrected the import filename typo
import SubmissionsBarChart from './charts/SubmissionBarChart';
import RatingChart from './charts/RatingChart';
import TopicRadarChart from './charts/TopicRadarChart';
import { useMemo } from 'react';

// Define the shape of the LeetCode data prop with the correct structure
interface LeetCodeData {
  submissionCounts: {
    easy: { submissions: number; solved: number };
    medium: { submissions: number; solved: number };
    hard: { submissions: number; solved: number };
  };
  contestHistory: any[];
  problemTags: Record<string, number>;
}

interface LeetCodeDashboardProps {
  data: LeetCodeData;
  username: string;
}

const ChartPlaceholder = ({ message }: { message: string }) => (
    <div className="bg-zinc-900/70 border border-dashed border-zinc-700 p-6 rounded-xl shadow-md backdrop-blur-lg flex items-center justify-center min-h-[352px]">
      <p className="text-gray-400 text-center">{message}</p>
    </div>
);

export default function LeetCodeDashboard({ data, username }: LeetCodeDashboardProps) {
    
  // Guard clause to prevent crashes if data is incomplete
  if (!data || !data.submissionCounts) {
    return null; 
  }

  // Data for the Donut Chart (uses the 'solved' part of the new structure)
  const donutChartData = useMemo(() => [
    { name: 'Easy', value: data.submissionCounts.easy.solved },
    { name: 'Medium', value: data.submissionCounts.medium.solved },
    { name: 'Hard', value: data.submissionCounts.hard.solved },
  ], [data.submissionCounts]);

  // Data for the Grouped Bar Chart (uses both 'submissions' and 'solved')
  const barChartData = useMemo(() => [
    { 
      name: 'Easy', 
      submissions: data.submissionCounts.easy.submissions,
      solved: data.submissionCounts.easy.solved,
    },
    { 
      name: 'Medium', 
      submissions: data.submissionCounts.medium.submissions,
      solved: data.submissionCounts.medium.solved,
    },
    { 
      name: 'Hard', 
      submissions: data.submissionCounts.hard.submissions,
      solved: data.submissionCounts.hard.solved,
    },
  ], [data.submissionCounts]);

  return (
    <div>
        <h2 className="text-2xl text-center font-bold mb-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            LeetCode Analysis for {username}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <DifficultyDonutChart data={donutChartData} />
            {data.problemTags && Object.keys(data.problemTags).length > 0 ? (
                <TopicRadarChart data={data.problemTags} />
            ) : (
                <ChartPlaceholder message="Topic data not available." />
            )}
            <SubmissionsBarChart data={barChartData} />
            {data.contestHistory && data.contestHistory.length > 0 ? (
                <RatingChart data={data.contestHistory} />
            ) : (
                <ChartPlaceholder message="No contest history found." />
            )}
        </div>
    </div>
  );
}