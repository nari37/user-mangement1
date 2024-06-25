import React from 'react'

export default function StaffHome() {

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
       
      </div>

      <div style={cardStyle}>
        <h3>Total Staff</h3>
        
      </div>
      <div style={cardStyle}>
        <h3>Total Class</h3>
       
      </div>
      <div style={cardStyle}>
        <h3>Total Subjects</h3>
       
      </div>
    </div>
  )
}
