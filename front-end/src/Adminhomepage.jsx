import React, { useContext } from 'react';
import { DataContext } from './App';
import Managestudent from './Managestudent';

export default function Adminhomepage() {
  const { staffCout,studentCout,classCout,subjectCount} = useContext(DataContext);

  // ...styles...
  const cardStyle = {
    flex: 1,
    padding: '20px',
    margin: '10px',
    background: 'rgb(28, 66, 95)',
    borderRadius: '8px',
    color: '#fff',
    textAlign: 'center',
    
  };


   
  return (
    <div style={{ background: 'rgb(184, 192, 198)', display: 'flex', flexWrap: 'wrap', zIndex: '1' }}>
      <div style={cardStyle}>
        <h3>Total Students</h3>
        <p>{studentCout}</p>
      </div>

      <div style={cardStyle}>
        <h3>Total Staff</h3>
        <p>{staffCout}</p>
      </div>
      <div style={cardStyle}>
        <h3>Total Class</h3>
        <p>{classCout}</p>
      </div>
      <div style={cardStyle}>
        <h3>Total Subjects</h3>
        <p>{subjectCount}</p>
      </div>
    </div>
  );
}
