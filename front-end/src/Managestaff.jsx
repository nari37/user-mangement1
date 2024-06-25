


import React, { useContext, useState } from 'react';
import { DataContext } from './App';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import  EditStaffModal  from './commponents/staffrealted/EditStaff.jsx'; 
import axios from 'axios';

export default function Managestaff() {
  const { stafflist, classlist, subjectlist } = useContext(DataContext);

  // Toggle visibility of detailed data
  const [showDetails, setShowDetails] = useState({});
  // State for selected class and subject filters
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedStaff, setSelectedStaff] = useState(null); // State for selected staff member

  // Toggle detailed data visibility for a row
  const toggleDetails = (id) => {
    setShowDetails({ ...showDetails, [id]: !showDetails[id] });
  };

  // Function to open the edit modal and set the selected staff member
  const openEditModal = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };

  // Function to delete a staff member
  const deleteStaffs = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user')
    if(confirmed){
      axios.delete(`http://localhost:8000/backend/admin/deletestaff/${id}`)
      .then(res =>console.log(res.data))
      .catch(err =>console.log(err))
    }else{
      console.log('Deletion Cancelled..')
    }
    
  };

  // Filtered data based on selected class, subject, and search query
  const filteredData = stafflist.filter(item => {
    const classMatch = !selectedClass || item.course === selectedClass;
    const subjectMatch = !selectedSubject || item.teachsubject === selectedSubject;
    const nameMatch = item.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && subjectMatch && nameMatch;
  });

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // delete staff....

  
  const deleteStaff = (id) =>{   
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
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',}}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Staff Details</h3>
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="classFilter">Filter by Class:</label>
            <select id="classFilter" onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">All</option>
              {classlist.map((classItem, index) => (
                <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subjectFilter">Filter by Subject:</label>
            <select id="subjectFilter" onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">All</option>
              {/* Map over the subjectlist array to generate options */}
              {subjectlist.map((subject, index) => (
                <option key={index} value={subject.subjectname}>{subject.subjectname}</option>
              ))}
            </select>
          </div>
          <div style={{ width: '50%' }}>
            <input placeholder='Search name...' onChange={handleSearch} style={{ width: '100%' }} />
          </div>
        </div>
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
                      <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} onClick={() => deleteStaffs(item.id)} />
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
                          <strong>Teach-Subject:</strong> {item.teachsubject ? item.teachsubject : '(Not assigned)'}
                        </div>
                        <div>
                          <strong>Phonenumber:</strong> {item.phoneNumber}
                        </div>
                        <div>
                          <strong>Address:</strong> {item.address}
                        </div>
                        <div>
                          <strong>Role Type:</strong> {item.ROLE_TYPE}
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
      {/* Render edit modal */}
      {selectedStaff && (
        <EditStaffModal
          show={showEditModal}
          setShowEditModal={setShowEditModal}
          selectedStaff={selectedStaff}
          subjectlist={subjectlist}
          classlist={classlist}
          subject_id={selectedStaff.subject_id}
          courses_id={selectedStaff.courses_id}
        />
      )}
    </div>
  );
}
