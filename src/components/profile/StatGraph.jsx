// Alternative to using react-chartjs-2
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function StatGraph({ profile }) {
//   const data = {
//     labels: ["Fundamental", "Medium", "Difficult"],
//     datasets: [
//       {
//         label: "Problems Solved",
//         data: [
//           profile.solved.fundamental,
//           profile.solved.medium,
//           profile.solved.difficult,
//         ],
//         backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
//         borderColor: ["#36A2EB", "#FFCE56", "#FF6384"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Problems Solved by Difficulty",
//       },
//     },
//   };

//   return (
//       <Bar data={data} options={options} />
//   );
// }

// Use recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

export default function StatGraph({ profile }) {
  const data = [
    { 
      name: 'Easy',
      Problems: profile.solved.fundamental,
    },
    { 
      name: 'Medium',
      Problems: profile.solved.medium,
    },
    { 
      name: 'Hard',
      Problems: profile.solved.difficult,
    },
  ];

  const COLORS = {
    Easy: 'rgb(34 197 94)', // green
    Medium: '#F59E0B',      // Yellow/Orange
    Hard: '#EF4444'    // Red
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#9CA3AF' }}
        />
        <YAxis 
          tick={{ fill: '#9CA3AF' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '6px',
            color: '#F3F4F6'
          }}
        />
        <Bar 
          dataKey="Problems"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}