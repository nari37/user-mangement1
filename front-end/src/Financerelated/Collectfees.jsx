import React, { useContext, useState } from 'react'
import { DataContext } from '../App'
import StudentBalanceModal from './StudentBalanceModal';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


export default function Collectfees() {
    const { studnetlist, classlist } = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [selectedStudent, setSelectedStudent] = useState(null); 

    // Filtered data based on selected class and search query
  const filteredData = studnetlist.filter(student => {
    const classMatch = !selectedClass || student.course === selectedClass;
    const nameMatch = student.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && nameMatch;
  });

   const nav = useNavigate()
  // Function to handle view balance button click
  const handleViewBalanceClick = (id) => {
    // setSelectedStudent(student);
    nav(`/studentfess/${id}`)
    setShowModal(true);
};
 // Function to close the modal
 const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
};
  return (
  <>
      <div  style={{display:'flex',margin:'0.5rem',padding:'1.4rem',width:'100%',flexFlow:'wrap'}}>
      <div style={{ flex: 1, paddingRight: '0.5rem' }}>
        <label htmlFor="classFilter">Filter by Class:</label>
        <select id="classFilter" onChange={(e) => setSelectedClass(e.target.value)} style={{ padding: '0.6rem' ,width:'60%'}}>
          <option value="">All</option>
          {classlist.map((classItem, index) => (
            <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, paddingLeft: '0.5rem' }}>
        <input placeholder='Search name...' onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%' }} />
      </div>
      </div>
{/* table for students */}
<div style={{overflow:'scroll'}}>
      <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black', width: '100%' ,tableLayout:'auto'}} border={2}>
        {/* Table headers */}
        <thead style={{ background: 'black', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render student data */}
          {filteredData.map((student, index) => (
            <tr key={student.id} style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td>{student.first_name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button  className='btn btn-success'  onClick={() => handleViewBalanceClick(student.id)}>Collect <MdOutlineCurrencyRupee /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    
            {/* The modal component */}
            {/* <StudentBalanceModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                selectedStudent={selectedStudent}
            /> */}
  </>
  )
}




