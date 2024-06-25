import React, { useState } from 'react'

export default function Studentleave() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
      console.log()
    }

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
    <h2 style={{ textAlign: 'center' }}>Apply Leave</h2>
    <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>From Date:</label>
            <input
                type="date"
                
                onChange={(e) => setFromDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>To Date:</label>
            <input
                type="date"
             
                onChange={(e) => setToDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Reason:</label>
            <textarea
                
                onChange={(e) => setReason(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            ></textarea>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'rgb(28, 66, 95)', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
    </form>
   
</div>
  )
}
