import React from 'react'
import './prediction_layout.css';
import CustomersPrediction from './CustomersPrediction';
import SegmentationSummary from './SegmentationSummary';
import Observation from './Observation';

export default function PredictionLayout(props) {
  return (
    <div className='prediction_layout'>
      <div className='left_div'>
        <div>
          <SegmentationSummary
            pathS={props.path}
            segmentationnn={props.segmentationn}
          />
        </div>
        <div>
          <Observation
            pathS={props.path}
            observationnn={props.observationn}
          />
        </div>
      </div>
      <div className='right_div'>
        <div>
          {/* <h1>Customers prediction</h1> */}
          <CustomersPrediction
            pathS={props.path}
            predictionSummaryyy={props.predictionSummaryy}
          />
        </div>

      </div>
    </div>
  )
}
