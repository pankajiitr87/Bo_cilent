import React from 'react'
import Plot from 'react-plotly.js';
import './piChart.css'
import { color } from 'chart.js/helpers';

function PiChart() {
    const [selectedData, setSelectedData] = React.useState(null); // State to store selected data

    var data = [{
        values: [5, 20, 30, 10, 10, 20],
        labels: ['Champion', 'Loyal', 'Potential Loyal', 'Attention', 'Hibernating', 'Cannot Loose'],
        type: 'pie',
        textinfo: 'label',
        // opacity: 0.5,
        marker: {  // Add marker object to define colors and opacity
            
            colors: ['rgba(128, 0, 128, 0.742)', 'rgba(245, 229, 166, 0.5)', 'rgba(148, 215, 199, 0.5)', 'orange', '#8884d8', '#82ca9d'],
        //   opacity: 0.5  // Set opacity to 0.5 for all slices
        }
      }];
      
      var layout = {
        height: 222,
        width: 300,
        showlegend: false,
        margin: {
            l: 0,
            r: 0, 
            t: 0, 
            b: 0, 
          },
      };

      const handlePlotClick = (event) => {
        const clickedPointIndex = event.points[0].pointNumber;  // Get clicked point index
        const selectedLabel = data[0].labels[clickedPointIndex]; // Get corresponding label
        setSelectedData(selectedLabel); // Update state with selected data
      };
  return (
    <>
        <div className="lower-left">
            <Plot className='plot' data={data} layout={layout} onClick={handlePlotClick}// Attach click handler to the plot
            />
        </div>
        {/* <div className="lower-right">
          <h1>Selected: {selectedData}</h1>
          <p>
            {selectedData && ( // Conditionally render details based on selection
              <>
                <p>Description: (Describe the selected segment here)</p>
              </>
            )}
          </p>
        </div> */}
    </>
  )
}

export default PiChart