import React, { useEffect, useState } from 'react';
import './observation.css';

export default function Observation(props) {

    // const [Observation_data, setObservation_data] = useState(null);
    const [observations, setObservations] = useState({});
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const loadJsonData = async () => {
            setObservations(props.observationnn[0].Observations);
            const obsKeys = Object.keys(props.observationnn[0].Observations);
            console.log('obsKeys =', obsKeys);
            setKeys(obsKeys);
        };
        
        if(props.observationnn){
            loadJsonData();
        } 
    }, [props.observationnn]);

    return (
        <div className='observation'>
            <div className='div_Ob'>
                <div className="rect_O demo-dark">
                    <div className='key'>
                        <span>{keys[0]}</span>
                    </div>
                    <div className='value'>
                        <p>{observations["Observation I"]}</p>
                    </div>
                </div>
                <div className="rect_O demo-light">
                    <div className='key'>
                        <span>{keys[1]}</span>
                    </div>
                    <div className='value'>
                        <p>{observations["Observation II"]}</p>
                    </div>
                </div>

            </div>
            <div>
                <div className="rect_Ob demo-lightUp">
                    <div className='key'>
                        <span>{keys[2]}</span>
                    </div>
                    <div className='value'>
                        <p>{observations["Observation III"]}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
