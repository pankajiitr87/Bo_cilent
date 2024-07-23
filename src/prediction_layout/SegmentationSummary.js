import { useEffect, useState } from 'react';
import Papa from "papaparse";
// import SegmentationSummary_data from '../plot/Segmentation.csv';
import './segmentation.css';

export default function SegmentationSummary(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCsvData = async () => {
            // try {
            //     // Construct the relative path to fetch the CSV file from the public directory
            //     const csvPath = require(`../${props.pathS}/plot/Segmentation.csv`);
            //     console.log('csvPath =', csvPath);
            //     // Fetch the CSV file as a text resource
            //     const response = await fetch(csvPath);
            //     console.log('response =', response);
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! Status: ${response.status}`);
            //     }
            //     const textData = await response.text();

            //     console.log('CSV content:', textData);
                // Parse the CSV data using PapaParse
                Papa.parse(props.segmentationnn, {
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

        if (props.segmentationnn) {
            loadCsvData();
        }
    }, [props.segmentationnn]);

    return(
        <div className='segmentation'>
            <header className='header_segmentation'>Prediction Summary</header>
            <div style={{ marginTop: "5px" }} className='segmentation_table'>
                {error
                    ? error
                    : data.length > 0 && (
                        <table className='table_S'>
                            <thead className='thead_S'>
                                <tr>
                                    {Object.keys(data[0]).map((key, i) => (
                                        <th key={i} className='th_S'>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j} className='td_S'>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
        </div>
    );
}
