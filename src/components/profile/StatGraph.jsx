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