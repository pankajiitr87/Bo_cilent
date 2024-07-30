import { useEffect, useState } from 'react';
import Papa from "papaparse";
import './segmentation.css';

export default function SegmentationSummary(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCsvData = async () => {
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
