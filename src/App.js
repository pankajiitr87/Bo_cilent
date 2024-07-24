// import React, { useEffect, useState } from "react";
// import "./App.css";
// import Header from "./upper_section/Header";
// import MiddleChart from "./middle_section/MiddleChart";
// import LowerChart from "./lower_section/LowerChart";
// import Sidebar from "./sidebar_section/Sidebar";
// import PredictionLayout from "./prediction_layout/PredictionLayout";
// import axios from 'axios';
// // import { parse } from 'json2csv';

// function App() {
//   const [layout, setLayout] = useState('segmentation');
//   const [ss, setSs] = useState('');
//   const [salesPrediction, setSalesPrediction] = useState(null);
//   const [returningCustomer, setReturningCustomer] = useState(null);
//   const [paretoDict, setParetoDict] = useState(null);
//   const [dataDict, setDataDict] = useState(null);
//   const [observation, setObservation] = useState(null);
//   const [outletSummary, setOutletSummary] = useState(null);
//   const [segmentSummary, setSegmentSummary] = useState(null);
//   const [segmentation, setSegmentation] = useState(null);
//   const [predictionSummary, setPredictionSummary] = useState(null);

//   function handleLayoutChange(data) {
//     setLayout(data);
//     console.log('layout =', data);
//   }

//   useEffect(() => {

//     const handleMessage = async (event) => {
//       console.log('event.data =', event.data);
//       console.log('Type of event.data:', typeof event.data);

//       if (typeof event.data === 'string') {
//         let pathParts = event.data?.split('/')
//         let basePath = pathParts.slice(0, 2).join('/');

//         localStorage.setItem('path', basePath);
//         console.log('before localStorage.getItem("path") =', localStorage.getItem("path"));
//         // const segments = path.split('/');
//         // segments.slice(0, 2).join('/');
//         setSs(localStorage.getItem("path"))

//         // Send event.data to Node.js server
//         try {
//           const response = await axios.post('/downloadData', { filePath: event.data });
//           console.log('Server response:', response.data);
//           console.log('response.data.plots =', response.data.plots);
//           console.log('response.data.csv =', response.data.csv);
//           // Parse response data and update state
//           response.data.plots.forEach((file) => {
//             const extension = file.filename.split('.')
//             console.log('extention =', extension);
//             let csvData;
//             if (extension[1] === 'csv') {
//               csvData = jsonToCsv(file.data);
//             }
//             // const csvData = jsonToCsv(file.data);
//             // console.log('csvData =', csvData);
//             switch (file.filename) {
//               case 'OutletSummary.csv':
//                 setOutletSummary(csvData);
//                 break;
//               case 'SegmentSummary.csv':
//                 setSegmentSummary(csvData);
//                 break;
//               case 'Segmentation.csv':
//                 setSegmentation(csvData);
//                 break;
//               case 'PredictionSummary.csv':
//                 setPredictionSummary(csvData);
//                 break;
//                 case 'SalesPrediction.json':
//                 setSalesPrediction(file.data);
//                 break;
//               case 'ReturningCustomer.json':
//                 setReturningCustomer(file.data);
//                 break;
//               case 'ParetoDict.json':
//                 setParetoDict(file.data);
//                 break;
//               case 'Observations.json':
//                 setObservation(file.data);
//                 break;
//               case 'DataDict.json':
//                 setDataDict(file.data);
//                 break;
//               default:
//                 console.warn('Unknown file:', file.filename);
//             }
//           });
//         } catch (error) {
//           console.error('Error sending data to server:', error);
//         }
//       }
//       else if (localStorage.getItem("path") === '' && typeof event.data !== 'string') {
//         console.log('after localStorage.getItem("path") =', localStorage.getItem("path"))
//         console.log('before ss =', ss);
//       }

//     };

//     // Add the event listener to handle messages
//     window.addEventListener('message', handleMessage)

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [ss]);

//   return (
//     <div >
//       {ss ? (
//         <div className="app-container">
//           <div>
//             <Sidebar sendDataToParent={handleLayoutChange} path={ss} dataDictt={dataDict} />
//           </div>

//           <div className="main-content">
//             <div>
//               <Header layout={layout} />
//             </div>
//             {layout === 'segmentation' && (
//               <div>
//                 <div className="content">
//                   <MiddleChart path={ss}
//                     paretoDictt={paretoDict}
//                     segmentSummaryy={segmentSummary}
//                   />
//                 </div>
//                 <div className="lower">
//                   <LowerChart path={ss}
//                     returningCustomerr={returningCustomer}
//                     salesPredictionn={salesPrediction}
//                     outletSummaryy={outletSummary}
//                   />
//                 </div>
//               </div>
//             )}
//             {layout === 'prediction' && (
//               <div className="alternate-content">
//                 <PredictionLayout 
//                 path={ss} 
//                 segmentationn={segmentation} 
//                 predictionSummaryy={predictionSummary}
//                 observationn={observation} />
//               </div>
//             )}
//             {layout === 'prescription' && (
//               <div className="alternate-content">
//                 {/* Your alternate layout content for Prescription */}
//                 <h1>Prescription Layout</h1>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="no-ss-content">
//           <h2>Go To  Home Page and Select Data Source To View Dashboard</h2>
//         </div>
//       )}

//     </div>
//   );
// }
// // Utility function to convert JSON to CSV
// function jsonToCsv(json) {
//   const array = typeof json !== 'object' ? JSON.parse(json) : json;
//   const headers = Object.keys(array[0]);
//   const csvRows = array.map(obj =>
//     headers.map(header => JSON.stringify(obj[header], replacer)).join(',')
//   );
//   csvRows.unshift(headers.join(',')); // add header row
//   return csvRows.join('\r\n');

//   function replacer(key, value) {
//     return value === null ? '' : value;
//   }
// }
// export default App;

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
      domain: urlParams.get('domain'),
      clientId: urlParams.get('clientId'),
      month: urlParams.get('month'),
      year: urlParams.get('year')
    };
  };

  // Function to process the file data
  const handleFileData = (file) => {
    const extension = file.filename.split('.');
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
    const { domain, clientId, month, year } = getQueryParams();
    if (domain || clientId || month || year) {
      const message = `${domain}/${clientId}/${month}/${year}`;
      setUserInfo(message)
      console.log('Initial message from URL:', message);
      let pathParts = message.split('/');
      let basePath = pathParts.slice(0, 2).join('/');

      localStorage.setItem('path', basePath);
      setSs(basePath);

      // Optionally, you can fetch data based on the URL message here
      fetchData(message);
    } else {
      console.log('No parameters received from URL.');
    }
  };

  // Function to fetch data based on the message
  const fetchData = async (filePath) => {
    try {
      const response = await axios.post('/downloadData', { filePath });
      console.log('Server response:', response.data);
      response.data.plots.forEach(handleFileData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle postMessage events
  const handleMessage = async (event) => {
    console.log('event.data =', event.data);
    console.log('Type of event.data:', typeof event.data);

    if (typeof event.data === 'string') {
      let pathParts = event.data?.split('/');
      let basePath = pathParts.slice(0, 2).join('/');
      console.log('basePath in handleMessage =', basePath);
      localStorage.setItem('path', basePath);
      setSs(basePath);

      // Send event.data to Node.js server
      try {
        const response = await axios.post('/downloadData', { filePath: event.data });
        console.log('Server response:', response.data);
        response.data.plots.forEach(handleFileData);
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

