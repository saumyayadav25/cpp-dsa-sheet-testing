'use client';

import { motion } from 'framer-motion';
import { FaChartBar, FaChartPie } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface TopicProgress {
  topicName: string;
  solvedCount: number;
  totalQuestions: number;
  percentage: number;
  category: 'Strong' | 'Moderate' | 'Weak';
}

type TopicChartsProps = {
  topicProgress: TopicProgress[];
};

export default function TopicCharts({ topicProgress }: TopicChartsProps) {
  // Prepare data for bar chart (top 10 topics by percentage)
  const barChartData = topicProgress
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10)
    .map(topic => ({
      name: topic.topicName.length > 15 ? topic.topicName.substring(0, 15) + '...' : topic.topicName,
      percentage: topic.percentage,
      category: topic.category,
      fullName: topic.topicName
    }));

  // Prepare data for pie chart (category distribution)
  const categoryData = topicProgress.reduce((acc, topic) => {
    const existing = acc.find(item => item.category === topic.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        category: topic.category,
        count: 1,
        percentage: 0 // Will be calculated below
      });
    }
    return acc;
  }, [] as { category: string; count: number; percentage: number }[]);

  // Calculate percentages for pie chart
  const totalTopics = topicProgress.length;
  categoryData.forEach(item => {
    item.percentage = Math.round((item.count / totalTopics) * 100);
  });

  // Colors for charts
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strong':
        return '#10b981'; // green
      case 'Moderate':
        return '#f59e0b'; // yellow
      case 'Weak':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const pieColors = ['#10b981', '#f59e0b', '#ef4444'];

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-zinc-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{data.fullName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Progress: <span className="font-medium">{payload[0].value}%</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Category: <span className="font-medium" style={{ color: getCategoryColor(data.category) }}>{data.category}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-zinc-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{data.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Topics: <span className="font-medium">{data.count}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Percentage: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaChartBar className="text-xl text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Progress Overview</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                className="dark:stroke-gray-400"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis
                stroke="#6b7280"
                className="dark:stroke-gray-400"
                domain={[0, 100]}
                fontSize={12}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="percentage"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Top 10 topics by completion percentage
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaChartPie className="text-xl text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Categories Distribution</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Distribution of topics across performance categories
        </div>
      </motion.div>
    </div>
  );
}