
// Managestudent.js
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './App';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditStudentModal from './commponents/EditStudentModal.jsx'; // Import the edit modal component
import axios from 'axios';

export default function Managestudent() {
  const { studnetlist, classlist } = useContext(DataContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Toggle visibility of detailed data
  const [showDetails, setShowDetails] = useState({});
  // State for selected class filter
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to open edit modal
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  // Toggle detailed data visibility for a row
  const toggleDetails = (id) => {
    setShowDetails({ ...showDetails, [id]: !showDetails[id] });
  };

  // Filtered data based on selected class and search query
  const filteredData = studnetlist.filter(item => {
    const classMatch = !selectedClass || (item.course && item.course.includes(selectedClass));
    const nameMatch = item.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && nameMatch;
  });

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // delete students...


  const deleteStudent = (id) =>{   
    const confirmed = window.confirm('Are you sure you want to delete this user')
    if(confirmed){
      axios.delete(`http://localhost:8000/backend/admin/deletestudents/${id}`)
      .then(res =>console.log(res.data))
      .catch(err =>console.log(err))
    }else{
      console.log('Deletion Cancelled..')
    }
      
  }

  return (
    <div>
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', maxHeight: '500px' }}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Students Details</h3>
        {/* Filter and search */}
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="classFilter">Filter by Class:</label>
            <select id="classFilter" onChange={(e) => setSelectedClass(e.target.value)} style={{ padding: '0.4rem' }}>
              <option value="">All</option>
              {classlist.map((classItem, index) => (
                <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
              ))}
            </select>
          </div>
          <div style={{ width: '50%' }}>
            <input placeholder='Search name...' onChange={handleSearch} style={{ width: '100%' }} />
          </div>
        </div>
        {/* Table */}
        <form style={{ padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
          <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black' }} border={2}>
            {/* Table headers */}
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>S.No</th>
                <th>Name</th>
                <th>Class Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render filtered data */}
              {filteredData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <tr style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                    <td>{index + 1}</td>
                    <td style={{padding:'10px'}}>{item.first_name}</td>
                    <td style={{padding:'10px'}}>{item.course}</td>
                    <td style={{padding:'10px'}}>{item.status}</td>
                    <td>
                      {/* Toggle button for additional details */}
                      <button onClick={(e) => { e.preventDefault(); toggleDetails(item.id); }} style={{background:'rgb(50, 48, 48)',color:'white',borderRadius:'5px'}}>
                        {showDetails[item.id] ? 'Hide Details' : 'Show Details'}
                      </button>
                      <BiEdit onClick={() => openEditModal(item)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} />
                      <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} onClick={()=>deleteStudent(item.id)}/>
                    </td>
                  </tr>
                  {/* Detailed data row */}
                  {showDetails[item.id] && (
                    <tr style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                      <td colSpan={5}>
                        <div>
                          <strong>Email:</strong> {item.email}
                        </div>
                        <div>
                          <strong>Gender:</strong> {item.gender}
                        </div>
                        <div>
                          <strong>Address:</strong> {item.address}
                        </div>
                        <div>
                          <strong>Role Type:</strong> {item.ROLE_TYPE}
                        </div>
                        <div>
                          <strong>phoneNumber:</strong> {item.phoneNumber}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      {/* Edit modal */}
      <EditStudentModal show={showEditModal} setShowEditModal={setShowEditModal} selectedStudent={selectedStudent} classlist={classlist}/>
    </div>
  );
}
