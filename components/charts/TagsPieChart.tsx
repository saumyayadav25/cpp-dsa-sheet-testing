'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

// Define the shape of the data prop
interface TagsPieChartProps {
  data: { [key: string]: number };
}

// Define props for the custom tooltip
interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D7FF'];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
          <p className="label text-sm text-gray-300">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function TagsPieChart({ data }: TagsPieChartProps) {
    const chartData = useMemo(() => {
        if (!data) return [];
        // Sort tags by count and take the top 7 for clarity
        return Object.entries(data)
            .sort(([, a]: [string, number], [, b]: [string, number]) => b - a) // Explicitly type the sort parameters
            .slice(0, 7)
            .map(([name, value]) => ({ name, value }));
    }, [data]);

  return (
    <div className="bg-white/5 dark:bg-zinc-900/70 border border-gray-200/10 dark:border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
       <h3 className="text-lg font-bold mb-4 text-gray-200">Problem Tags Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}