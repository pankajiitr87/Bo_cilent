import React, { useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import './simpleLine.css'; 

export default function SimpleLineChart(props) {
  const [data, setData] = useState(null);
  
  const yAxisTickFormatter = (value) => `${value / 1000}k`;
  // console.log('props.pathS =', props.pathS);

  useEffect(() => {
    const loadJsonData = async () => {
      try {
        // Dynamically import the JSON file based on props.pathS
        // const jsonModule = await import(`../${props.pathS}/plot/ReturningCustomer.json`);
        // console.log('jsonModule.default =', jsonModule.default);
        // Set the imported data to the state
        setData(props.returningCustomerrr); // Use jsonModule.default to get the actual data
      } catch (err) {
        console.error("Error loading JSON data:", err);
        // setError("Failed to load data. Please check the path.");
      }
    };

    // Load the JSON data when the component mounts or props.pathS changes
    if (props.returningCustomerrr) {
      loadJsonData();
    }
  }, [props.returningCustomerrr]);
  
  return (
    <div className="simpleLine">
      <header className="header_simple">New Vs Returning Customers</header>
      {/* <pre>{JSON.stringify(ss, null, 2)}</pre> */}
      <LineChart width={450} height={315} data={data}>
      
        <XAxis
          dataKey="Month"
          padding={{ left: 30, right: 30 }}
          tick={{ fontSize: 14 }}
          
        />
        <YAxis
          tick={{ fontSize: 14 }}
          tickFormatter={yAxisTickFormatter}
          label={{ value: "Customers count", angle: -90, position: "insideLeft", offset: +10 }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Total"
          stroke="#8884d8"
          fill="#8884d8"
          dot={{
            r:4
        }}
          activeDot={{ 
            r: 7,
            stroke: " #8884d8",  // Set border color to match line color
            fill: "white",  // Fill dot interior with white
            strokeWidth: 4,
           }}
          strokeWidth={3}
        />
        <Line 
        type="monotone" 
        dataKey="OneTime" 
        stroke="#82ca9d"
        fill="#82ca9d"
        dot={{
          r:4
      }} 
        activeDot={{ 
          r: 7,
          stroke: "#82ca9d",  // Set border color to match line color
          fill: "white",  // Fill dot interior with white
          strokeWidth: 4,
         }}
        strokeWidth={3}
        />
        <Line 
        type="monotone" 
        dataKey="Returning" 
        stroke="rgba(128, 0, 128, 0.742)" 
        fill="rgba(128, 0, 128, 0.742)"
        dot={{
          r:4
      }}
        activeDot={{ 
          r: 7,
          stroke: " rgba(128, 0, 128, 0.742)",  // Set border color to match line color
          fill: "white",  // Fill dot interior with white
          strokeWidth: 4,
         }}
        strokeWidth={3}
        />
        <Line 
        type="monotone" 
        dataKey="New" 
        stroke="orange" 
        fill="orange"
        dot={{
          r:4
      }}
        activeDot={{ 
          r: 7,
          stroke: "orange",  // Set border color to match line color
          fill: "white",  // Fill dot interior with white
          strokeWidth: 4,
         }}
        strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}
