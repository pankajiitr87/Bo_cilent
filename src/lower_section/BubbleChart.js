import React from 'react'
import Plot from 'react-plotly.js';
// import BubbleChart from '../data_files/BubbleChart.json';

export default function BubbleChart() {
    const dataPoints = {
        avg: [130, 388, 647, 906, 1165, 1424, 1682, 1941, 2200, 2459],
        amt: [448, 1346, 2243, 3140, 4038, 4935, 5832, 6730, 7627, 8524],
        markerSize: [2, 6, 11, 15, 20, 24, 29, 33, 38, 42]
      };
    
      const trace1 = {
        x: dataPoints.avg,
        y: dataPoints.amt,
        mode: 'markers',
        marker: {
          size: dataPoints.markerSize
        }
      };
    
      const data = [trace1];
    
      const layout = {
        title: 'Bubble chart',
        showlegend: false,
        height: 360,
        width: 370,
        
        xaxis: {
          title: 'Average Value'
        },
        yaxis: {
          title: 'Amount Value'
        },
        margin:{
            l: 40,
            r: 30,
            t: 30,
            

        }
      };
    
  return (
    <div>
        <Plot
        data={data}
        layout={layout}
      />
    </div>
  )
}
