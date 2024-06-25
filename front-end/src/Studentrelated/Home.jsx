import React, { useEffect, useState } from 'react';
import axios from'axios';
import { useParams } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

export default function Home() {
    const {id} = useParams();
    const [siglestudentdata, setsiglestudentdata] = useState([])
    const classnameid = siglestudentdata.courses_id;
     const [subjectlist,setsubjectlist] = useState([])

    // console.log(classnameid)

    useEffect(()=>{
           axios.get(`http://localhost:8000/backend/student/getsinglestudent/${id}`)
           .then(res => setsiglestudentdata(res.data[0]))
         },[siglestudentdata])

        //  get subject list...
  
  useEffect(() => {
    axios.get(`http://localhost:8000/backend/student/getsubjects/${classnameid}`)
    .then(res => {
        // console.log('Data received:', res.data);
        
        setsubjectlist(res.data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}, [classnameid]);

   




  return (
    <div style={{
      padding: '0.6rem',
      maxHeight: '600px', // Set the maximum height for the container
      overflowY: 'scroll', // Enable vertical scrolling
      overflowX:'hidden'
    }}>
        <h2 style={{float:'left'}}>Hello, {siglestudentdata.first_name}</h2>
        {/* section for slider */}

        <div class="card">
  <div class="card-body">
    <h3>(Class Name)</h3>
  <h2>{siglestudentdata.course}</h2>
  </div>
</div>
{/* subjects */}
<center>
<h2 style={{ padding: '1rem', textDecoration: 'underline' ,fontFamily:'revert-layer'}}>List of Subjects</h2>

</center>
<div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px', gap: '10px',cursor:'pointer' }}>
    {subjectlist.map((subject, index) => (
        <div
            key={index}
            style={{
                flex: '1 1 250px',
                padding: '10px',
                boxSizing: 'border-box',
                width: '250px',
                height: 'auto',
                boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
                background: 'rgb(28, 66, 95)',
                color: '#fff',
                borderRadius: '10px',
            }}
        >
            {/* Display teacher's profile image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
    {subject.profile ? (
        <img
            src={`http://localhost:8000/files/${subject.profile}`}
            alt="Profile"
            style={{
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                marginBottom: '10px' 
            }}
        />
    ) : (
        <CgProfile style={{ fontSize: '40px' }} /> // If no profile, use a placeholder icon
    )}
</div>


            {/* Display subject name */}
            <h4 style={{ textAlign: 'center', margin: '10px 0' }}>{subject.teachsubject}</h4>

            {/* Display teacher's name */}
            <p style={{ textAlign: 'center', margin: '5px 0' }}>{subject.first_name}</p>
        </div>
    ))}
</div>




    </div>
  )
}
