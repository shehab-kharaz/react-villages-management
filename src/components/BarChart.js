import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

 function BarChartComponent({chartData=[]}) {
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
          <CartesianGrid 
           stroke="#FFF" 
           strokeDasharray="5 5" 
          />
          <XAxis dataKey="name" />
          <YAxis />
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
          <Bar dataKey="population" fill="#3c5b66" 
            activeBar={<Rectangle fill="#3c5b66" stroke="#4dcecc" />} 
            />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default BarChartComponent;