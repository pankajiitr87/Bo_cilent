import { useEffect, useState } from 'react';
import Papa from "papaparse";
import './csv.css';

export default function Csv(props) {
    console.log('props.pathS =', props.pathS);
    console.log('props.outletSummaryyy in csv =', props.outletSummaryyy);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // console.log('in useEffect in csv component');
        const loadCsvData = async () => {
            // console.log('in loadCsvData function');
            // try {
            //     console.log('in try block of csv');
                // Construct the relative path to fetch the CSV file from the public directory
                // const csvPath = require(`../${props.pathS}/plot/SegmentSummary.csv`);
                // console.log('csvPath =', csvPath);
                // Fetch the CSV file as a text resource
                // const response = await fetch(props.outletSummaryyy);
                // console.log('response =', response);
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                // const textData = await response.text();

                // console.log('CSV content:', textData);
                // Parse the CSV data using PapaParse
                Papa.parse(props.segmentSummaryyy, {
                    header: true, // Optional: Treats the first row as headers
                    complete: (result) => {
                        // Filter out empty rows
                        const cleanedData = result.data.filter(row => 
                            Object.values(row).some(val => val && val.trim() !== "")
                        );
                        console.log('Cleaned and parsed CSV data:', cleanedData);
                        setData(cleanedData); // Store the cleaned data in state
                    },
                    error: (error) => {
                        console.error("Error parsing CSV data:", error);
                        setError("Failed to parse CSV data.");
                    }
                });
            // } catch (err) {
            //     console.error("Error loading CSV data:", err);
            //     setError("Failed to load data. Please check the path.");
            // }
        };

        if (props.segmentSummaryyy) {
            loadCsvData();
        }
    }, [props.segmentSummaryyy]);

    return (
        <div className='csv'>
            <header className='header_csv'>Segmentation Statistics</header>
            <div className='csv_table'>
                {error ? (
                    error
                ) : (
                    data?.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map((key, i) => (
                                        <th key={i} className={props.selectedSegments.includes(key) ? 'highlight' : ''}>
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j} className={props.selectedSegments.includes(Object.keys(row)[j]) ? 'highlight' : ''}>
                                                {val}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
}
