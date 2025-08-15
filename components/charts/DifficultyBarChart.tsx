'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // Added 'Cell' import

// Define component props
interface DifficultyBarChartProps {
  data: {
    Easy?: number;
    Medium?: number;
    Hard?: number;
  };
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
          <p className="label text-sm text-gray-300">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function DifficultyBarChart({ data }: DifficultyBarChartProps) {
  const chartData = [
    { name: 'Easy', solved: data.Easy || 0 },
    { name: 'Medium', solved: data.Medium || 0 },
    { name: 'Hard', solved: data.Hard || 0 },
  ];

  return (
    <div className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-200">Problems by Difficulty</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="solved">
             {
                chartData.map((entry, index) => {
                    const colors = ['#00C49F', '#FFBB28', '#FF8042'];
                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                })
             }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}