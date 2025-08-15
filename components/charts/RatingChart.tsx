'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

// Define the shape of a single rating history item
interface RatingHistoryItem {
  contestId: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

// Define the shape of the props for this component
interface RatingChartProps {
  data: RatingHistoryItem[];
}

// Define props for the custom tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
        <p className="label text-sm text-gray-300">{`Contest ID: ${label}`}</p>
        <p className="intro text-sm" style={{ color: payload[0].color }}>
          {`Rating: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function RatingChart({ data }: RatingChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(contest => ({
      name: contest.contestId,
      Rating: contest.newRating,
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
    }));
  }, [data]);

  return (
    <div className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-200">Rating History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} domain={['dataMin - 100', 'dataMax + 100']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="Rating" stroke="url(#colorUv)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}