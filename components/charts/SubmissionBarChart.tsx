'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// The data structure includes both submissions and solved counts
interface BarChartData {
  name: string; // e.g., "Easy"
  submissions: number;
  solved: number;
}

interface SubmissionsBarChartProps {
  data: BarChartData[];
}

// The tooltip is updated to show both values
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
          <p className="label text-sm text-gray-300 font-bold mb-2">{label}</p>
          <p className="text-sm" style={{ color: payload[0].fill }}>
            Submissions: {payload[0].value}
          </p>
          <p className="text-sm" style={{ color: payload[1].fill }}>
            Solved: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
};

export default function SubmissionsBarChart({ data }: SubmissionsBarChartProps) {
  return (
    <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-200">Submissions vs. Solved</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
                {/* Gradient for the "Submissions" bars */}
                <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
                {/* Gradient for the "Solved" bars */}
                <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}/>
            <Legend />
            {/* We now have two <Bar> components to create the groups */}
            <Bar dataKey="submissions" name="Submissions" fill="url(#colorSubmissions)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="solved" name="Solved" fill="url(#colorSolved)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}