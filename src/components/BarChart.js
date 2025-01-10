import { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartComponent({ chartData = [] }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#FFF" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
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
        <Bar 
          dataKey="population" 
          fill="#3c5b66" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === activeIndex ? "gray" : "#3c5b66"} 
              stroke={index === activeIndex ? "#FFF" : "none"} 
              strokeWidth={index === activeIndex ? 1 : 0} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
