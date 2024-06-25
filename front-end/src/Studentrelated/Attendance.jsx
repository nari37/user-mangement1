

// ....................


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useParams } from 'react-router-dom';
import '../css/piechart.css';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/backend/student/attendancedata/${id}`)
            .then((res) => {
                setAttendanceData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
            });
    }, []);

    // Aggregate data by subject
    const subjectsData = attendanceData.reduce((acc, curr) => {
        const { subject, status } = curr;
        if (!acc[subject]) {
            acc[subject] = { subject, presents: 0, absents: 0 };
        }
        acc[subject][status === 'Present' ? 'presents' : 'absents']++;
        return acc;
    }, {});

    // Define colors for presents and absents
    const COLORS = ['rgb(28, 66, 95)', '#FF8042'];

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap',maxHeight: '600px',overflowY: 'scroll',padding:'1.5rem' }}>
            {Object.values(subjectsData).map((entry, index) => {
                const total = entry.presents + entry.absents;
                const overallPercentage = total ? ((entry.presents / total) * 100).toFixed(0) : 0;

                return (
                    <div key={`pie-container-${index}`} style={{ textAlign: 'center', marginBottom: '20px', minWidth: '200px', flex: '1 0 auto', }}>
                        
                        <center>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={[
                                    { name: 'Presents', value: entry.presents },
                                    { name: 'Absents', value: entry.absents }
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * total).toFixed(0)}`}
                            >
                                {Object.keys(entry).map((key, idx) => (
                                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        </center>

                        <center>
                        <div style={{ marginTop: '10px', fontSize: '20px' }}>{entry.subject}</div>
                        <div>Overall Percentage: <b>{overallPercentage}%</b></div>
                        </center>
                    </div>
                );
            })}
        </div>
    );
};

export default Attendance;
