'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useMemo } from 'react';

interface TopicRadarChartProps {
  data: { [key: string]: number };
}

// Define props for the custom tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CORE_TOPICS = [
    'dp', 'data structures', 'graphs', 'greedy', 'math', 'implementation', 'strings', 'binary search'
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
          <p className="label text-sm text-gray-300 capitalize">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function TopicRadarChart({ data }: TopicRadarChartProps) {
  const { chartData, maxCount } = useMemo(() => {
    if (!data) return { chartData: [], maxCount: 0 };
    
    const processedData = CORE_TOPICS.map(topic => ({
      subject: topic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      count: data[topic] || 0,
    }));

    const maxVal = Math.max(...processedData.map(d => d.count), 0);
    
    return { chartData: processedData, maxCount: maxVal > 0 ? Math.ceil(maxVal * 1.1) : 5 }; // Add 10% padding
  }, [data]);

  return (
    <div className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-200">Topic Proficiency</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#4A4A4A" />
          <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" fontSize={12} />
          <PolarRadiusAxis angle={30} domain={[0, maxCount]} tick={false} axisLine={false} />
          <Radar name="Solved" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}