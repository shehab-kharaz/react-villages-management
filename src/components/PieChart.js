import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#a74c65', '#2f71a3', '#a58c4d', '#3c8489', '#684eaf'];
const DARKENED_COLORS = COLORS.map(color => darkenColor(color, 20)); 

function PieChartComponent({ chartData = [] }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const transformedData = Object.entries(chartData)
    .slice(1)
    .map(([key, value]) => ({
      name: key.replace(/_/g, '-').toUpperCase(),
      value: value,
    }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {transformedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === activeIndex ? DARKENED_COLORS[index % COLORS.length] : COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1a202c', borderRadius: '8px' }}
          itemStyle={{ color: 'white' }}
        />
        <Legend
          verticalAlign="top"
          iconType="rect"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function darkenColor(hexColor, percent) {
  const num = parseInt(hexColor.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;
  return `#${((1 << 24) + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
               (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
               (B < 255 ? (B < 1 ? 0 : B) : 255))
    .toString(16)
    .slice(1)}`;
}

export default PieChartComponent;
