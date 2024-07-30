import React, { useEffect, useState } from "react";
import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
  ConstantLine,
  Label,
} from "devextreme-react/chart";
import './paretoChart.css';

const ParetoChart = (props) => {
  console.log('props.paretoDictts =', props.paretoDictts);
  const [paretoDict, setParetoDict] = useState(null);

  const data = paretoDict?.sort((a, b) => b.Amount - a.Amount);
  const totalCount = data?.reduce(
    (prevValue, item) => prevValue + item.Amount,
    0
  );
  let cumulativeCount = 0;

  const dataArray = data?.map((item) => {
    cumulativeCount += item.Amount;
    return {
      Segments: item.Segments,
      Amount: item.Amount,
      cumulativePercentage: Math.round((cumulativeCount * 100) / totalCount),
    };
  });

  useEffect(() => {
    const loadJsonData = async () => {
      try {
        // Set the imported data to the state
        setParetoDict(props.paretoDictts); 
      } catch (err) {
        console.error("Error loading JSON data:", err);
      }
    };

    // Load the JSON data when the component mounts or props.pathS changes
    if (props.paretoDictts) {
      loadJsonData();
    }
  }, [props.paretoDictts]);

  const customizeTooltip = (pointInfo) => {
    return {
      html: `
        <div>
          <div class="tooltip-header">${pointInfo.argumentText}</div>
          <div class="tooltip-body">
            <div class="series-name">
              <span class='top-series-name'>${pointInfo.points[0].seriesName}</span>: 
            </div>
            <div class="value-text">
              <span class='top-series-value'>${pointInfo.points[0].valueText}</span>
            </div>
            <div class="series-name">
              <span class='bottom-series-name'>${pointInfo.points[1].seriesName}</span>: 
            </div>
            <div class="value-text">
              <span class='bottom-series-value'>${pointInfo.points[1].valueText}</span>% 
            </div>
          </div>
        </div>`,
    };
  };

  const customizePercentageText = ({ valueText }) => {
    return `${valueText}%`;
  };

  return (
    <div className="pareto">
      <header className="header_">% Contribution by Customer Segments in Total Transaction</header>
      <Chart
        height={255}
        dataSource={dataArray}
        palette="Harmony Light"
        id="chart"

      >

        <CommonSeriesSettings argumentField="Segments" />
        <Label visible={true} font={{ size: 10 }} />
        <Series
          name="Transaction amount"
          valueField="Amount"
          axis="frequency"
          type="bar"
          color="#fac29a"
          className='series'
        />
        <Series
          name="Cumulative percentage"
          valueField="cumulativePercentage"
          axis="percentage"
          type="spline"
          color="#6b71c3"
          className='series'
        />

        <ArgumentAxis>
          <Label overlappingBehavior="stagger" />
        </ArgumentAxis>

        <ValueAxis name="frequency" position="left" tickInterval={300} />
        <ValueAxis
          name="percentage"
          position="right"
          tickInterval={20}
          showZero={true}
          valueMarginsEnabled={false}
        >
          <Label customizeText={customizePercentageText} />
          <ConstantLine value={80} width={2} color="#fc3535" dashStyle="dash">
            <Label visible={false} />
          </ConstantLine>
        </ValueAxis>

        <Tooltip
          enabled={true}
          shared={true}
          customizeTooltip={customizeTooltip}
        />

        <Legend verticalAlignment="top" horizontalAlignment="center" />
      </Chart>

    </div>

  );
};

export default ParetoChart;
