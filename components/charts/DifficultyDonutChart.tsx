'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DonutChartData {
  name: string;
  value: number;
}

interface DifficultyDonutChartProps {
  data: DonutChartData[];
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']; // Green, Yellow, Red

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg">
          <p className="label text-sm text-gray-300">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function DifficultyDonutChart({ data }: DifficultyDonutChartProps) {
  return (
    <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-xl shadow-md backdrop-blur-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-200">Solved by Difficulty</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}