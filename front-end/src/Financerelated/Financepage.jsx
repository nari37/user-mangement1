

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCurrencyRupee } from "react-icons/md";

import '../css/Finance.css'
import { GiCash } from 'react-icons/gi';

function FinancingHomepage() {
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const nav = useNavigate()
    const navigate = useNavigate();

    
    const handleLogout = () => {      
        alert('Logging out');
        navigate('/login');
    };

const gotostudentslist = () =>{
    nav('/collectfees')
}
   

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Navigation bar */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#1c425f', color: 'white' }}>
                <h2>Finance Home</h2>
                <button onClick={handleLogout} style={{ backgroundColor: '#1976d2', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                </button>
            </nav>

            {/* Main content */}
            <div style={{ marginTop: '20px' }}>
                <h1>Welcome to the Financing Homepage</h1>
                {loading ? (
                    <p>Loading data...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px' }}>
                        {/* Card 1: Current Fees Balance */}
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' ,cursor:"pointer"}} id='card'>
                            <h3> Paid Balance</h3>
                            <p><MdOutlineCurrencyRupee />{financialData?.currentFeesBalance || 0}</p>
                        </div>

                        {/* Card 2: Pending Fees */}
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px',cursor:"pointer" }} id='card'>
                            <h3>Pending  Balance</h3>
                            <p><MdOutlineCurrencyRupee />{financialData?.pendingFees || 0}</p>
                        </div>

                        {/* Card 3: Actual Total Fees */}
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px',cursor:"pointer" }} id='card'>
                            <h3> Total Fees</h3>
                            <p><MdOutlineCurrencyRupee />{financialData?.actualTotalFees || 0}</p>
                        </div>

                        {/* Card 4: Collected Fees */}
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px',cursor:"pointer" }} id='card' onClick={gotostudentslist}>
                            <h3>Collect Fees</h3>
                            <GiCash  style={{fontSize:'2rem'}}/>
                        </div>
                    </div>
                    // bus fees..

                    
                )}
            </div>
            {/* bus fees.. */}
            <div style={{display:'flex',flexWrap:'wrap',gap:'20px',padding:'1rem'}}>
                <div style={{flex: '1 1 48%',border:'1px solid black',background:'green',height:'100px'}}>Bus Fees</div>
                <div style={{flex: '1 1 48%',border:'1px solid black',background:'green',height:'100px'}}>Hostel Fees</div>
                <div style={{flex: '1 1 48%',border:'1px solid black',background:'green',height:'100px'}}>Tution Fees</div>
                <div style={{flex: '1 1 48%',border:'1px solid black',background:'green',height:'100px'}}>Other Fees</div>
            </div>

        </div>
    );
}

export default FinancingHomepage;

