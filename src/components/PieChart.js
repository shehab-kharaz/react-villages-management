import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend} from 'recharts';
const COLORS = ['#a74c65', '#2f71a3', '#a58c4d', '#3c8489', '#684eaf'];

function PieChartComponent({chartData=[]})  {
  const transformedData = Object.entries(chartData)
  .slice(1) 
  .map(([key, value]) => ({
    name: key.replace(/_/g, '-').toUpperCase(),
    value: value,
  }));

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
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
        <Tooltip 
        contentStyle={{ backgroundColor: '#1a202c', borderRadius: '8px' }}
        itemStyle={{ color: 'white' }} 
        />
        <Legend 
         verticalAlign='top'
         iconType='rect'
         wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
         />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;