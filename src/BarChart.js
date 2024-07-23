import React from "react";
import "./barChart.css";
import boxChart_data from './plot/boxChart_data.json';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  {
    name: "Champion(HP)",
    totalcust: 537,
    predcust: 537,
    actualtxn: 60,
    realised: 60,
    notrealised: 0,
  },
  {
    name: "Champion(MP)",
    totalcust: 554,
    predcust: 554,
    actualtxn: 32,
    realised: 32,
    notrealised: 0,
  },
  {
    name: "Champion(LP)",
    totalcust: 537,
    predcust: 537,
    actualtxn: 24,
    realised: 24,
    notrealised: 0,
  },
  {
    name: "Loyal(HP)",
    totalcust: 1490,
    predcust: 1490,
    actualtxn: 74,
    realised: 74,
    notrealised: 0,
  },
  {
    name: "Loyal(MP)",
    totalcust: 1534,
    predcust: 1534,
    actualtxn: 31,
    realised: 31,
    notrealised: 0,
  },
  {
    name: "Loyal(LP)",
    totalcust: 1490,
    predcust: 1153,
    actualtxn: 33,
    realised: 29,
    notrealised: -1004,
  },
  {
    name: "PotentialLoyal(HP)",
    totalcust: 6052,
    predcust: 6051,
    actualtxn: 151,
    realised: 151,
    notrealised: 0,
  },
  {
    name: "PotentialLoyal(MP)",
    totalcust: 6236,
    predcust: 5665,
    actualtxn: 81,
    realised: 78,
    notrealised: -663,
  },
  {
    name: "PotentialLoyal(LP)",
    totalcust: 6052,
    predcust: 1075,
    actualtxn: 48,
    realised: 10,
    notrealised: -838,
  },
  // {
  //     "name": "New",
  //     "actualtxn": 263
  // },
  // {
  //     "name": "OTC",
  //     "actualtxn": 309
  // },
  // {
  //     "name": "New",
  //     "actualtxn": 2023
  // }
];

export default function BarCharrt() {
  return (
    <div className="chart-container">
    <BarChart
      width={720}
      height={300}
      data={boxChart_data}
      margin={{
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
      }}
      style={{fontSize: 'small'}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="totalcust" fill="#8884d8" />
      <Bar dataKey="predcust" fill="#82ca9d" />
      <Bar dataKey="actualtxn" fill="orange" />
      <Bar dataKey="realised" fill="darkblue" />
      <Bar dataKey="notrealised" fill="rgba(255, 0, 0, 0.838)" />
    </BarChart>
    </div>
  );
}
