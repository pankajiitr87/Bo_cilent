import React, { useEffect, useState } from 'react';
import './observation.css';

export default function Observation(props) {
    
    // const [Observation_data, setObservation_data] = useState(null);
    const [observations, setObservations] = useState({});
    const [keys, setKeys] = useState([]);
    
    // useEffect(() => {
    //     if (Observation_data && Observation_data.Observations) {
    //         setObservations(Observation_data.Observations);
    //         const obsKeys = Object.keys(Observation_data.Observations);
    //         setKeys(obsKeys);
    //     }
    // }, []);

    useEffect(() => {
        const loadJsonData = async () => {
        //   try {
            // Dynamically import the JSON file based on props.pathS
            // const jsonModule = await import(`../${props.pathS}/plot/observation.json`);
            // console.log('props.observationnn =', props.observationnn);
            // console.log('props.observationnn.Observations =', props.observationnn.Observations);
            // Set the imported data to the state
            // setObservation_data(jsonModule.default); // Use jsonModule.default to get the actual data
            // if (props.observationnn && props.observationnn.Observations) {
                setObservations(props.observationnn[0].Observations);
                const obsKeys = Object.keys(props.observationnn[0].Observations);
                console.log('obsKeys =', obsKeys);
                setKeys(obsKeys);
            // }
        //   } catch (err) {
        //     console.error("Error loading JSON data:", err);
        //     // setError("Failed to load data. Please check the path.");
        //   }
        };
    
        // Load the JSON data when the component mounts or props.pathS changes
        // if (props.observationnn) {
          loadJsonData();
        // }
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
