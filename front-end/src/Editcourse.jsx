import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/Admin.css';

export default function EditCourse() {
    const { id } = useParams();
    const [data, setData] = useState({course_type:''});
    const nav =useNavigate();
    console.log(data);

    useEffect(() => {
        axios.get(`http://localhost:8000/backend/admin/singlecourse/${id}`)
            .then((res) => setData(res.data.results[0]))
            .catch((error) => {
                console.error('Error fetching single course data:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
   
        axios.put(`http://localhost:8000/backend/admin/editclass/${id}`, data)
    .then((res) => {
      console.log(res);
     
      const editClassElement = document.getElementById('editclass');
      editClassElement.style.display = 'block';
      setTimeout(() => {
        editClassElement.style.display = 'none';
        nav('/admin');
      }, 2000);
    })
       
    };

    return (
        <>
        <div style={{maxWidth:'100%',background:'green',height:'50px',color:'white',borderRadius:'5px',marginTop:'10px',paddingTop:'.8rem',paddingLeft:'.6rem',display:'none',marginBottom:'30px'}} id='editclass'>Class Edited Successfully</div>
        <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
            <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Edit Course</h3>
            <form style={{ padding: '1rem' }} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="course_type"
                    value={data.course_type}
                    onChange={handleInputChange}
                    style={{ width: "96%" }}
                />
                <button type="submit" style={{background:'rgb(28, 66, 95)',width:'80%',padding:'0.5rem',margin:'10px auto',borderRadius:'10px',color:'whitesmoke'}} >Edit Class</button>
            </form>
        </div>
        </>
    );
}
