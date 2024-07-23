import React from 'react';
import './header.css';

export default function Header(props) {
  console.log('props.layout =', props.layout);
  const info = props.userInfoo.split('/').join('-')
  console.log('info in header =', info);
  return (
    <div className='Heading_section'>
      <div className="Header">
      {props.layout === 'segmentation' && (
        <header>DASHBOARD - SMART ANALYTICS - BOTS SEGMENTATION</header>
      )}
      {props.layout === 'prediction' && (
        <header>DASHBOARD - SMART ANALYTICS - BOTS PREDICTION</header>
      )}
      {props.layout === 'prescription' && (
        <header>DASHBOARD - SMART ANALYTICS - BOTS PRESCRIPTION</header>
      )}
    </div>
      <div className='userInfo'>{info}</div>
    </div>
    
  );
}
