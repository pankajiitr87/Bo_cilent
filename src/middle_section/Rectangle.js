import React, { useEffect, useState } from 'react';
import './rectangleChart.css';
import Plot from 'react-plotly.js';

export default function Rectangle({ setSelectedSegment }) {
    const [tableData, setTableData] = useState([]); // State for table data

    useEffect(() => {
        // Automatically populate table data
        const initialTableData = [
            {
                segment: 'Member Count',
                Champion: 100,
                Loyal: 5,
                PotentialLoyal: 50,
                Hibernating: 250,
                NeedAttention: 10,
                CannotLoose: 21
            },
            {
                segment: 'Avg Txn Count',
                Champion: 200,
                Loyal: 4,
                PotentialLoyal: 40,
                Hibernating: 160,
                NeedAttention: 12,
                CannotLoose: 21
            },
            {
                segment: 'Average Ticket Size',
                Champion: 200,
                Loyal: 4,
                PotentialLoyal: 40,
                Hibernating: 160,
                NeedAttention: 12,
                CannotLoose: 21
            },
            {
                segment: 'Average Spend',
                Champion: 250,
                Loyal: 41,
                PotentialLoyal: 420,
                Hibernating: 110,
                NeedAttention: 123,
                CannotLoose: 231
            },
            {
                segment: 'Avg b/w transactions',
                Champion: 500,
                Loyal: 334,
                PotentialLoyal: 405,
                Hibernating: 140,
                NeedAttention: 112,
                CannotLoose: 31
            }
        ];
        setTableData(initialTableData);
    }, []);

    const data = [
      {
          x: [4.5, 3.5, 4.0, 1.75, 1.75, 1.75, 4.0, 4.0, 0.25, 0.25],
          y: [4.5, 4.5, 3.0, 3.5, 1.5, 0.5, 0.5, 1.5, 4.5, 2.0],
          text: ['SuperChamp', 'Champ', 'Champ', 'PotentialChamp', 'NeedAttention', 'Hibernating', 'AtRisk', 'CannotLose','New','Lost'],
          mode: 'text',
          textfont: {
            color: 'black',
            size: 11.5,
            family: 'Arial',
            weight: 'bold'
          },
          hoverinfo: 'none', // Disable default hover info
          hovertemplate: '%{text}<extra></extra>'
      }
  ];

    const layout = {
        xaxis: {
            range: [0, 5],
            showgrid: false,
            title: { // Add X-axis title
              text: 'Frequency', // Replace with your desired X-axis name
              font: {
                family: 'Arial',
                size: 14,
                // weight: 'bold',
                // color: 'darkgray',
              },
            },
          },
          yaxis: {
            range: [0, 5],
            showgrid: false,
            title: { // Add Y-axis title
              text: 'Recency', // Replace with your desired Y-axis name
              font: {
                family: 'Arial',
                size: 14,
                // weight: 'bold',
                // color: 'lightblack',
              },
            },
          },
        width: 390,
        height: 260,
        margin: {
            l: 28,
            r: 5,
            t: 8,
            b: 28,
        },
        shapes: [
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 4.0,
            y0: 4.0,
            x1: 5.0,
            y1: 5.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'yellow',
            customdata: 'SuperChamp'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 3.0,
            y0: 4,
            x1: 4.0,
            y1: 5,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'blue',
            customdata: 'Champ'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 3.0,
            y0: 2.0,
            x1: 5.0,
            y1: 4.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'blue',
            customdata: 'Champ'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0.5,
            y0: 2.0,
            x1: 3.0,
            y1: 5.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'red',
            customdata: 'PotentialChamp'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0.5,
            y0: 1.0,
            x1: 3.0,
            y1: 2.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'purple',
            customdata: 'NeedAttention'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0.5,
            y0: 0.0,
            x1: 3.0,
            y1: 1.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'green',
            customdata: 'Hibernating'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 3.0,
            y0: 1.0,
            x1: 5.0,
            y1: 2.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'black',
            customdata: 'CannotLoose'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 3.0,
            y0: 0.0,
            x1: 5.0,
            y1: 1.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'gold',
            customdata: 'AtRisk'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0.0,
            y0: 4.0,
            x1: 0.5,
            y1: 5.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'cyan',
            customdata: 'New'
          },
          {
            opacity: 0.5,
            type: 'rect',
            xref: 'x',
            yref: 'y',
            x0: 0.0,
            y0: 0.0,
            x1: 0.5,
            y1: 4.0,
            line: {
              color: 'none',
              width: 0
            },
            fillcolor: 'grey',
            customdata: 'Lost'
          }
      ]
    };

    const handleTextClick = (text) => {
        setSelectedSegment(text);
    };
  
    return (
        <div className='plot'>
            <header className='header_custmoer'>Customers Segmentation</header>
            <Plot
                data={data}
                layout={layout}
                onClick={(event) => {
                    const point = event.points[0];
                    if (point && point.text) {
                        handleTextClick(point.text);
                    }
                }}
            />
        </div>
    );
}
