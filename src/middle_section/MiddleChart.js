import React, { useEffect, useState, useRef } from 'react';
import './rectangleChart.css';
import Csv from './Csv';
import Rectangle from './Rectangle';
import ParetoChart from './ParetoChart';

const MiddleChart = (props) => {
    const [selectedSegments, setSelectedSegments] = useState([]);
    const containerRef = useRef(null);

    const handleSegmentSelect = (segment) => {
        setSelectedSegments((prevSegments) =>
            prevSegments.includes(segment) ? prevSegments : [...prevSegments, segment]
        );
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setSelectedSegments([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='rectangle' ref={containerRef}>
            <div >
                <Rectangle setSelectedSegment={handleSegmentSelect} pathS = {props.path}/>
            </div>
            <div >
               <Csv selectedSegments={selectedSegments} pathS = {props.path} segmentSummaryyy={props.segmentSummaryy}/>
            </div>
            <div>
                <ParetoChart pathS = {props.path} paretoDictts ={props.paretoDictt}/>
            </div>
        </div>
    );
};

export default MiddleChart;
