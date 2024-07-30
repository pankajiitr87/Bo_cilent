import React, { useEffect, useState } from 'react'
import './boxes.css';
import { FaUser } from 'react-icons/fa';
import { GrTransaction, GrUserNew } from 'react-icons/gr';
import { GoNumber } from 'react-icons/go';
import { FcSalesPerformance } from 'react-icons/fc';

export default function Boxes(props) {
    // console.log('props.dataDictss =', props.dataDictss);
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    
    useEffect(() => {
        const loadJsonData = async () => {
          try {
            if (props.dataDictss.length > 0) {
                // console.log('DataDict =', DataDict);
                const data = props.dataDictss[0];
                const extractedKeys = [];
                const extractedValues = [];
    
                extractedKeys.push("Transaction Data");
                extractedKeys.push('Count')
                extractedValues.push(data["Transaction Data"]["Count"]);
    
                extractedKeys.push("Max Date");
                extractedValues.push(data["Transaction Data"]["Max Date"]);
    
                extractedKeys.push("No of Outlets");
                extractedValues.push(data["No of Outlets"]);
    
                extractedKeys.push("No of Customers");
                extractedValues.push(data["No of Customers"]);
    
                extractedKeys.push("First Time Customers in Month");
                extractedValues.push(data["First Time Customers in Month"]);
    
                extractedKeys.push("Sales in month");
                extractedValues.push(data["Sales in month"]);
    
                setKeys(extractedKeys);
                setValues(extractedValues);
            }
        } catch (err) {
            console.error("Error loading JSON data:", err);
          }
        };
    
        // Load the JSON data when the component mounts or props.pathS changes
        if (props.dataDictss) {
          loadJsonData();
        }
      }, [props.dataDictss]);

    return (
        <div className='boxes'>
                    <div className="rect_ demo-dark">
                        <div className='key'>
                            <GrTransaction/>
                            <span>{keys[0]}</span>
                        </div>
                        <div className='value'>
                            <p className='pair'>{keys[1]} : {values[0]}</p>
                            <p className='pair'>{keys[2]} : {values[1]}</p>
                        </div>

                    </div>
                    <div className="rect demo-light">
                        <div className='key'>
                            <GoNumber size={18}/>
                            <span>{keys[3]}</span>
                        </div>
                        <div className='value'>
                            <p >{values[2]}</p>
                        </div>
                    </div>
                    <div className="rect demo-lightUp">
                        <div className='key'>
                            <FaUser size={15}/>
                            <span>{keys[4]}</span>
                        </div>
                        <div className='value'>
                            <p >{values[3]}</p>
                        </div>
                    </div>
                    <div className="rect demo-dark">
                        <div className='key'>
                            <GrUserNew size={15}/>
                            <span>{keys[5]}</span>
                        </div>
                        <div className='value'>
                            <p >{values[4]}</p>
                        </div>
                    </div>
                    <div className="rect demo-light">
                        <div className='key'>
                            <FcSalesPerformance size={19} color='red'/>
                            <span>{keys[6]}</span>
                        </div>
                        <div className='value'>
                            <p >{values[5]}</p>
                        </div>
                    </div>
        </div>
    )
}
