import { useEffect, useState } from 'react';
import Papa from "papaparse";
import './outletSummary.css';

export default function OutletSummary(props) {
    console.log('props.outletSummaryyy =', props.outletSummaryyy);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCsvData = async () => {
            console.log('in loadCsvData function');
            // try {
            //     // Construct the relative path to fetch the CSV file from the specified directory
            //     const csvPath = require(`../${props.pathS}/plot/OutletSummary.csv`);
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
                Papa.parse(props.outletSummaryyy, {
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

        if (props.outletSummaryyy) {
            loadCsvData();
        }
    }, [props.outletSummaryyy]);

    return (
        <div className='outlet'>
            <header className='header_outlet'>Outlet-wise Sales Contribution</header>
            <div style={{ marginTop: "5px" }} className="table-container">
                {error
                    ? error
                    : data.length > 0 && (
                        <table className='table'>
                            <thead className='thead'>
                                <tr>
                                    {Object.keys(data[0]).map((key, i) => (
                                        <th key={i} className='th_'>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val, j) => (
                                            <td key={j} className='td_'>{val}</td>
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
