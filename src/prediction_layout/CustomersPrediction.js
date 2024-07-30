import { useEffect, useState } from 'react';
import Papa from "papaparse";
import './customersPrediction.css';

export default function CustomersPrediction(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 25;  // Define how many rows you want per page

    useEffect(() => {
        const loadCsvData = async () => {
                // Parse the CSV data using PapaParse
                Papa.parse(props.predictionSummaryyy, {
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

        if (props.predictionSummaryyy) {
            loadCsvData();
        }
    }, [props.predictionSummaryyy]); // Add an empty dependency array to avoid infinite loop

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDownload = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'customers_prediction.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className='prediction_'>
            <div className='pagination'>
                <div>
                    <header className='header_prediction'>Predicted Customer List</header>

                </div>
                <div className='display_button'>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                    <button onClick={handleDownload}>
                        Download
                    </button>
                </div>
                
            </div>
            <div style={{ marginTop: "5px" }} className='customersPrediction_table'>
                {error
                    ? error
                    : data.length > 0 && (
                        <div>
                            <table className='table_P'>
                                <thead className='thead_P'>
                                    <tr>
                                        {Object.keys(data[0]).map((key, i) => (
                                            <th key={i} className='th_P'>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((row, i) => (
                                        <tr key={i}>
                                            {Object.values(row).map((val, j) => (
                                                <td key={j} className='td_P'>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    )}
            </div>
        </div>
    );
}
