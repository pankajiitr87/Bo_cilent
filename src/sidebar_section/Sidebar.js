import React, { useState } from 'react'
import Boxes from './Boxes'
import './sidebar.css';

export default function Sidebar(props) {
    const [activeButton, setActiveButton] = useState('segmentation');
    console.log('props.dataDictt in sidebar=', props.dataDictt);

    const handleButtonClick = (layout) => {
        setActiveButton(layout);
        props.sendDataToParent(layout);
      };
    
    const handleClose =() => {
        window.location.reload(window.location.href); // This will refresh the page
    }
  return (
    <div className='sidebarData'>
        <div>
            <div className='header_rec'>
                <h2 className='h2'>Know Your Data</h2>
            </div>
            <div>
                <Boxes pathS={props.path} dataDictss={props.dataDictt}/>
            </div>
        </div>
        <div className='prediction'>
            <button 
            className={`btn ${activeButton === 'segmentation' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('segmentation')}
            >
                Segmentation
            </button>
            <button 
            className={`btn ${activeButton === 'prediction' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('prediction')}
            >
                Prediction
            </button>
            <button 
            className={`btn ${activeButton === 'prescription' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('prescription')}
            >
                Prescription
            </button>
        </div>
        <div className='close'>
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
  )
}
