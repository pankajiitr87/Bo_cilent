import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./upper_section/Header";
import MiddleChart from "./middle_section/MiddleChart";
import LowerChart from "./lower_section/LowerChart";
import Sidebar from "./sidebar_section/Sidebar";
import PredictionLayout from "./prediction_layout/PredictionLayout";
import axios from 'axios';

function App() {
  const [layout, setLayout] = useState('segmentation');
  const [ss, setSs] = useState('');
  const [salesPrediction, setSalesPrediction] = useState(null);
  const [returningCustomer, setReturningCustomer] = useState(null);
  const [userInfo, setUserInfo] = useState(null)
  const [paretoDict, setParetoDict] = useState(null);
  const [dataDict, setDataDict] = useState(null);
  const [observation, setObservation] = useState(null);
  const [outletSummary, setOutletSummary] = useState(null);
  const [segmentSummary, setSegmentSummary] = useState(null);
  const [segmentation, setSegmentation] = useState(null);
  const [predictionSummary, setPredictionSummary] = useState(null);

  function handleLayoutChange(data) {
    setLayout(data);
    console.log('layout =', data);
  }

  // Function to extract parameters from the URL
  const getQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      clientId: urlParams.get('clientId'),
      date: urlParams.get('date')
    };
  };

  // Function to process the file data
  const handleFileData = (file) => {
    console.log('handleFileData =', handleFileData);
    const extension = file.filename.split('.');
    console.log('extension =', extension);
    let csvData;
    if (extension[1] === 'csv') {
      csvData = jsonToCsv(file.data);
    }
    switch (file.filename) {
      case 'OutletSummary.csv':
        setOutletSummary(csvData);
        break;
      case 'SegmentSummary.csv':
        setSegmentSummary(csvData);
        break;
      case 'Segmentation.csv':
        setSegmentation(csvData);
        break;
      case 'PredictionSummary.csv':
        setPredictionSummary(csvData);
        break;
      case 'SalesPrediction.json':
        setSalesPrediction(file.data);
        break;
      case 'ReturningCustomer.json':
        setReturningCustomer(file.data);
        break;
      case 'ParetoDict.json':
        setParetoDict(file.data);
        break;
      case 'Observations.json':
        setObservation(file.data);
        break;
      case 'DataDict.json':
        setDataDict(file.data);
        break;
      default:
        console.warn('Unknown file:', file.filename);
    }
  };

  // Function to display or process the query parameters
  const processInitialParams = () => {
    const {clientId, date } = getQueryParams();
    if ( clientId || date) {
      const message = `${clientId}/${date}`;
      console.log('message in processInitialParams =', message);
      setUserInfo(message)
      console.log('Initial message from URL:', message);
      // let pathParts = message.split('/');
      // let basePath = pathParts.slice(0, 2).join('/');

      // localStorage.setItem('path', basePath);
      setSs(message);

      // Optionally, you can fetch data based on the URL message here
      console.log('end of processInitialParams');
      fetchData(message);
    } else {
      console.log('No parameters received from URL.');
    }
  };

  // Function to fetch data based on the message 
  const fetchData = async (filePath) => {
    console.log('in fetchdat');
    try {
      console.log('in try block');
      const response = await axios.post('https://bo-server-side.onrender.com/downloadData', { filePath });
      console.log('Server response:', response);
      response.data[0].plots.forEach(handleFileData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle postMessage events
  const handleMessage = async (event) => {
    console.log('event.data =', event.data);
    console.log('Type of  event.data:', typeof event.data);

    if (typeof event.data === 'string') {
      setUserInfo(event.data )
      // let pathParts = event.data?.split('/');
      // let basePath = pathParts.slice(0, 2).join('/');
      // console.log('basePath in handleMessage =', basePath);
      // localStorage.setItem('path', basePath);
      setSs(event.data);
      
      // Send event.data to Node.js server
      try {
        const response = await axios.post('https://bo-server-side.onrender.com/downloadData', { filePath: event.data });
        console.log('Server response:', response.data);
        console.log('response.data[0].plots =', response.data[0].plots);
        // Check if `response.data` and `response.data.plots` are defined and are arrays
      //  if (response.data && Array.isArray(response.data.plots)) {
      //   console.log('response.data.plots =', response.data.plots);
        response.data[0].plots.forEach(handleFileData);
    // } else {
    //     console.error('Invalid response format:', response.data);
    // }
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    }
  };

  useEffect(() => {
    processInitialParams();

    // Add the event listener to handle messages
    window.addEventListener('message', handleMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      {ss ? (
        <div className="app-container">
          <div>
            <Sidebar sendDataToParent={handleLayoutChange} path={ss} dataDictt={dataDict}  />
          </div>

          <div className="main-content">
            <div>
              <Header layout={layout} userInfoo={userInfo}/>
            </div>
            {layout === 'segmentation' && (
              <div>
                <div className="content">
                  <MiddleChart path={ss}
                    paretoDictt={paretoDict}
                    segmentSummaryy={segmentSummary}
                  />
                </div>
                <div className="lower">
                  <LowerChart path={ss}
                    returningCustomerr={returningCustomer}
                    salesPredictionn={salesPrediction}
                    outletSummaryy={outletSummary}
                  />
                </div>
              </div>
            )}
            {layout === 'prediction' && (
              <div className="alternate-content">
                <PredictionLayout 
                path={ss} 
                segmentationn={segmentation} 
                predictionSummaryy={predictionSummary}
                observationn={observation} />
              </div>
            )}
            {layout === 'prescription' && (
              <div className="alternate-content">
                <h1>Prescription Layout</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-ss-content">
          <h2>Go To Home Page and Select Data Source To View Dashboard</h2>
        </div>
      )}
    </div>
  );
}

// Utility function to convert JSON to CSV
function jsonToCsv(json) {
  const array = typeof json !== 'object' ? JSON.parse(json) : json;
  const headers = Object.keys(array[0]);
  const csvRows = array.map(obj =>
    headers.map(header => JSON.stringify(obj[header], replacer)).join(',')
  );
  csvRows.unshift(headers.join(',')); // add header row
  return csvRows.join('\r\n');

  function replacer(key, value) {
    return value === null ? '' : value;
  }
}

export default App;


