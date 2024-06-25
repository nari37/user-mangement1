import React, { useState } from 'react';

export default function Help() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [issueType, setIssueType] = useState('payment');
    const [issueDescription, setIssueDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            name,
            email,
            phone,
            issueType,
            issueDescription,
        });
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Help</h2>
            <form
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '800px', // Adjust width as needed
                    margin: '0 auto',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
                onSubmit={handleSubmit}
            >
                <div style={{width:'100%',display:"flex",flexWrap:'wrap',gap:"10px"}}>
                {/* First column */}
                <div style={{ width: '48%' }}>
                    {/* Name input */}
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                            required
                            readOnly
                        />
                    </label>

                    {/* Email input */}
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                            required
                            readOnly
                        />
                    </label>
                 
                </div>

                {/* Second column */}
                <div style={{ width: '48%' }}>
                    {/* Select issue */}
                    <label style={{ display: 'block', marginBottom: '0.5rem', }}>
                        Issue:
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            style={{ width: '100%', padding: '0.7rem', marginBottom: '1rem' }}
                            required
                        >
                            <option value="payment">Payment</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
           {/* Phone number input */}
           <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Phone Number:
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                            required
                            readOnly
                        />
                    </label>                
                </div>

                </div>
                {/* Issue description textarea */}
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Describe Your Issue:
                        <textarea
                        placeholder='Write your issue'
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', height: '100px' }}
                            required
                        />
                    </label>

                 {/* Submit button */}
                 <button
                        type="submit"
                        style={{
                            padding: '0.7rem',
                            backgroundColor: 'rgb(28, 66, 95)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                        }}
                    >
                        Submit Issue
                    </button>

            </form>
        </div>
    );
}
