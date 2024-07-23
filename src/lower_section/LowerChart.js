import React from 'react'
import './lowerChart.css';
// import { PI } from 'chart.js/helpers';

import PiChart from '../PiChart';
import ParetoChart from '../middle_section/ParetoChart';
import SimpleLineChart from './SimpleLineChart';
import SalesPredictionChart from './SalesPredictionChart';
import BubbleChart from './BubbleChart';
import OutletSummary from './OutletSummary';

export default function LowerChart(props) {
  console.log('props.path =', props.path);
  return (
    <div className='lowerChart'>
      <div >
        <SimpleLineChart pathS={props.path} returningCustomerrr={props.returningCustomerr}/>
      </div>
      <div className='sales'>
      <SalesPredictionChart pathS={props.path} salesPredictionnn={props.salesPredictionn}/>
      </div>
      <div className='outleSummary'>
        <OutletSummary pathS={props.path} outletSummaryyy={props.outletSummaryy}/>
      </div>
    </div>
  )
}
