// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

// const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b'];

// const CodeforcesCharts = ({ userStats, userInfo, contestHistory }) => {
//   if (!userStats) return null;

//   // Prepare data for difficulty distribution
//   const difficultyData = [
//     { name: 'Easy (800-1200)', value: userStats.difficultyDistribution?.easy || 0, color: '#22c55e' },
//     { name: 'Medium (1300-1600)', value: userStats.difficultyDistribution?.medium || 0, color: '#eab308' },
//     { name: 'Hard (1700+)', value: userStats.difficultyDistribution?.hard || 0, color: '#ef4444' },
//   ].filter(item => item.value > 0);

//   // Prepare data for tags distribution
//   const tagsData = userStats.tagDistribution?.slice(0, 8).map((tag, index) => ({
//     name: tag.tag,
//     value: tag.count,
//     color: COLORS[index % COLORS.length]
//   })) || [];

//   // Prepare data for rating change
//   const ratingData = contestHistory?.map((contest, index) => ({
//     contest: index + 1,
//     rating: contest.newRating,
//     change: contest.newRating - contest.oldRating
//   })) || [];

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//           <p className="text-sm font-medium">{`${label}: ${payload[0].value}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const PieTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//           <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       {/* Stats Cards Row */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">Current Rating</p>
//             <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//               {userInfo?.rating || 'Unrated'}
//             </p>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">Max Rating</p>
//             <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//               {userInfo?.maxRating || 'N/A'}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
//             <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//               {userStats?.totalSolved || 0}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <div className="text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">Contests</p>
//             <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
//               {contestHistory?.length || 0}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Difficulty Distribution Bar Chart */}
//         <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Problems by Difficulty</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={difficultyData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
//               <XAxis 
//                 dataKey="name" 
//                 stroke="#6b7280"
//                 fontSize={12}
//                 interval={0}
//                 angle={-45}
//                 textAnchor="end"
//                 height={80}
//               />
//               <YAxis stroke="#6b7280" fontSize={12} />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Topics Distribution Pie Chart */}
//         <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800">
//           <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Problems by Topics</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={tagsData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 dataKey="value"
//                 label={({ name, value }) => `${name}: ${value}`}
//                 labelLine={false}
//                 fontSize={10}
//               >
//                 {tagsData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<PieTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Rating History Line Chart */}
//         {ratingData.length > 0 && (
//           <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-800 lg:col-span-2">
//             <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Rating Progress</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={ratingData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
//                 <XAxis 
//                   dataKey="contest" 
//                   stroke="#6b7280"
//                   fontSize={12}
//                 />
//                 <YAxis stroke="#6b7280" fontSize={12} />
//                 <Tooltip 
//                   content={({ active, payload, label }) => {
//                     if (active && payload && payload.length) {
//                       const data = payload[0].payload;
//                       return (
//                         <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//                           <p className="text-sm font-medium">{`Contest ${label}`}</p>
//                           <p className="text-sm">{`Rating: ${data.rating}`}</p>
//                           <p className="text-sm" style={{color: data.change >= 0 ? '#22c55e' : '#ef4444'}}>
//                             {`Change: ${data.change >= 0 ? '+' : ''}${data.change}`}
//                           </p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="rating" 
//                   stroke="#3b82f6" 
//                   strokeWidth={2}
//                   dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
//                   activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CodeforcesCharts;