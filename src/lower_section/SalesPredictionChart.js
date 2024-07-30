import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './sales.css'; 

const SalesPredictionChart = (props) => {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const yAxisTickFormatter = (value) => `${value / 1000000}M`;
   
    useEffect(() => {
        const loadJsonData = async () => {
          try {
            // Set the imported data to the state
            setData(props.salesPredictionnn);
          } catch (err) {
            console.error("Error loading JSON data:", err);
          }
        };
    
        // Load the JSON data when the component mounts or props.pathS changes
        if (props.salesPredictionnn) {
          loadJsonData();
        }
      }, [props.salesPredictionnn]);

      const renderCustomizedTick = ({ x, y, payload, index }) => {
        if (!data || data.length === 0) return null;

        const month = data[index].Month;
        const year = data[index].Year;
        const isJanuary = month === 'January';

        return (
            <g transform={`translate(${x},${y + 10})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill="#666"
                    className={isJanuary ? 'highlight-year' : ''}
                >
                    {month}
                </text>
                {isJanuary && (
                    <text
                        x={0}
                        y={20}
                        dy={16}
                        textAnchor="middle"
                        fill="#666"
                        className="highlight-year"
                    >
                        {year}
                    </text>
                )}
            </g>
        );
    };

    return (
        <div className='sales_chart'>
            <header className='salesHeader'>Sales Prediction</header>
            <ResponsiveContainer width="100%" height={315}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right:5,
                        left: 5,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis 
                    tick={{ fontSize: 14 }}
                    tickFormatter={yAxisTickFormatter}
                    label={{ value: "Sales Amount", angle: -90, position: "insideLeft", offset: +10 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                    type="monotone" 
                    dataKey="InvoiceAmt" 
                    stroke="#8884d8" 
                    fill='#8884d8'
                    strokeWidth={2.5}
                    dot={{
                        r:4
                    }}
                    activeDot={{ 
                        r: 8,
                        stroke: "#8884d8",  // Set border color to match line color
                        fill: "white",  // Fill dot interior with white
                        strokeWidth: 4,
                       }}
                    />
                    <Line 
                    type="monotone" 
                    dataKey="PredictedAmt" 
                    stroke="red" 
                    strokeWidth={2.5}
                    fill='red'
                    dot={{
                        r:4
                    }}
                    activeDot={{ 
                        r: 8,
                        stroke: "red",  // Set border color to match line color
                        fill: "white",  // Fill dot interior with white
                        strokeWidth: 4,
                       }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesPredictionChart;
