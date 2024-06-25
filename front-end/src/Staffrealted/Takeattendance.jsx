
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function TakeAttendance(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [attendance, setAttendance] = useState({});
    const [classstudentslist, setClassStudentsList] = useState([]);
    const course = props.singleStaffdetails.course;
    const classid = props.singleStaffdetails.courses_id;

    console.log(props.singleStaffdetails)
   const subjectid = props.singleStaffdetails.teachsubject_id;
    const trainerId = props.singleStaffdetails.id; // Assuming this is the ID of the trainer
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  useEffect(() => {
        axios.get(`http://localhost:8000/backend/staff/classstudentslist/${course}`)
            .then(res => {
                const initialAttendance = {};
                res.data.forEach(student => {
                    initialAttendance[student.id] = "Absent";
                });
                setAttendance(initialAttendance);
                setClassStudentsList(res.data);
            });
    }, [course]);

    // handile change 
    const handleCheckboxChange = (studentId) => {
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            [studentId]: prevAttendance[studentId] === "Present" ? "Absent" : "Present"
        }));
    };


    // .....select all function....
    const handleSelectAll = () => {
        const newAttendance = {};
        classstudentslist.forEach(student => {
            newAttendance[student.id] = "Present";
        });
        setAttendance(newAttendance);
    };
// submit attendence....

    


    const handleSaveAttendance = () => {
      
        const attendanceData = currentStudents.map(student => ({
            tutorId: trainerId,
            tutorName: props.singleStaffdetails.first_name,
            subjectId: subjectid, // Assuming you have subject ID available
            subjectName: props.singleStaffdetails.teachsubject,
            classes: props.singleStaffdetails.course,
            classId: classid, // Assuming you have class ID available
            studentId: student.id,
            studentName: student.first_name,
            date: formattedDate,
            attendance: attendance[student.id]
        }));
          console.log(attendanceData)
        axios.post('http://localhost:8000/backend/staff/attendance', attendanceData)
        .then(response => {

            // Show success message using SweetAlert
        Swal.fire({
            title: "Success!",
            text: "Attendance has been successfully saved.",
            icon: "success",
            confirmButtonColor:"rgb(28, 66, 95)"
        });
            console.log(response.data);
            // Handle success if needed
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === "Attendance has already been taken for this date") {
                // Show SweetAlert message for duplicate attendance
                Swal.fire({
                    title: "Oops...",
                    text: "Attendance has already been taken for this date.",
                    icon: "error",
                    confirmButtonColor: "rgb(28, 66, 95)"
                })
            }
        });
    };
    

    const totalPages = Math.ceil(classstudentslist.length / 10);

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;
    const currentStudents = classstudentslist.slice(startIndex, endIndex);

    const tablehide = () => {
        const hide = document.getElementById('studentlist');
        if (hide.style.display === "none") {
            hide.style.display = "block";
        } else {
            hide.style.display = "none";
        }
    };
    return (
        <div >
            <h3>School Name:</h3>
            <p>Today: {formattedDate}</p>
            <p style={{ fontWeight: 'bold', backgroundColor: 'rgb(28, 66, 95)', color: 'white', padding: '0.7rem', borderRadius: '5px' }}>Subject Name: {props.singleStaffdetails.teachsubject}</p>
            <p style={{ fontWeight: 'bold', backgroundColor: 'rgb(28, 66, 95)', color: 'white', padding: '0.7rem', borderRadius: '5px' }}>Teacher Name: {props.singleStaffdetails.first_name}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <p style={{ fontWeight: 'bold', backgroundColor: 'rgb(28, 66, 95)', color: 'white', padding: '0.7rem', borderRadius: '5px', width: '70%' }}>ClassName </p>
                <p style={{ fontWeight: 'bold',  background: '#2eb3ce', color: 'white', padding: '0.7rem', borderRadius: '5px', width: '30%' }}>{props.singleStaffdetails.course}</p>
            </div>

            <p style={{ fontWeight: 'bold', backgroundColor: 'rgb(28, 66, 95)', color: 'white', padding: '0.7rem', borderRadius: '5px' }}>List of Class Students: {classstudentslist.length}</p>
            <center>
                <Button onClick={tablehide} style={{ margin: '10px', background: '#2eb3ce' ,border:'2px solid #2eb3ce'}}>Take Attendance Today</Button>
            </center>

            <div id="studentlist">
            <button type="button" class="btn btn-light" style={{float:'right',margin:'20px',color:'rgb(28, 66, 95)'}}  onClick={handleSelectAll}>Select All</button>
                <table style={{ width: '100%' }} >
                    <thead style={{ padding: '0.6rem' }}>
                        <tr style={{ background: "black", color: 'white', height: '40px', padding: '0.5rem' }}>
                           
                            <th style={{ padding: '0.6rem' }}>Name</th>
                            <th style={{ padding: '0.6rem' }}>Roll Number</th>
                            <th style={{ padding: '0.6rem' }}>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map(student => (
                            <tr key={student.id} >
                                
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={attendance[student.id] === "Present"}
                                        onChange={() => handleCheckboxChange(student.id)}
                                        style={{ cursor: 'pointer',width:'60px',height:'20px',border:'none', outline: 'none',boxShadow:'none',marginTop:'8px'}}
                                    /><span style={{ marginBottom: '20px' }}>{student.first_name}</span></td>
                                <td>{student.id}</td>
                                <td>{attendance[student.id]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={handleSaveAttendance} style={{ margin: '10px', background: 'green' ,border:'2px solid green'}}>Save Attendance</Button>

                <div style={{margin:'2rem'}}>
                    <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} class="btn btn-secondary" style={{cursor:'pointer'}}>Previous</button>
                    <span>{currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages} style={{ background: '#00224D', color: 'white', borderRadius: '4px', cursor: 'pointer' }} class="btn btn-info" >Next</button>
                </div>
            </div>
        </div>
    );
}

export default TakeAttendance;

