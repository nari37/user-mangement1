

import React, { useContext, useState } from 'react';
import { DataContext } from './App';

import EditSubject from './commponents/subjectrelated/EditSubject.jsx';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function Mangesubject() {
  const { subjectlist, classlist,stafflist} = useContext(DataContext);
//  console.log(stafflist[0].first_name)
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false); // State for controlling the visibility of the edit modal
  const [selectedSubject, setSelectedSubject] = useState(null); // State for storing the selected subject to edit

  // Filtered data based on search query and selected class
  const filteredData = stafflist.filter(subject => {
    const classMatch = !selectedClass || subject.course === selectedClass;
    const nameMatch = subject.teachsubject.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && nameMatch;
  });
  
  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

 

  return (
    <div>
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', maxHeight: '500px' }}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Subject Details</h3>
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor="classFilter">Filter by Class:</label>
            <select id="classFilter" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
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
        <form style={{ padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
          <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black' }} border={2}>
            {/* Table headers */}
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>S.No</th>
                <th>Related Class</th>
                <th>Assgine_Subject Name</th>               
                <th>Teach By</th>
               
              </tr>
            </thead>
            <tbody>
              {/* Render filtered data */}
              {filteredData.map((subject, index) => (
                <tr key={subject.id} style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                  <td>{index + 1}</td>
                  <td style={{padding:'10px'}}>{subject.course}</td>
                  <td style={{padding:'10px'}}>{subject.teachsubject ? subject.teachsubject : '(Not assigned)'}</td>               
                  <td style={{padding:'10px'}}>{subject.first_name}</td>
                  <td>
                    {/* <button type="button" onClick={() => openEditModal(subject)}>Edit</button>  */}

                    {/* <BiEdit onClick={() => openEditModal(subject.teachsubject)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} /> */}
                    {/* <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px', }} /> */}
                    {/* Add delete button here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      {/* Render edit modal */}
      {selectedSubject && (
        <EditSubject
          show={showEditModal}
          setShowEditModal={setShowEditModal}
          selectedSubject={selectedSubject}
          classlist={classlist}
          subjectlist={subjectlist}
          stafflist={stafflist} // Pass the staff list as a prop
        />
      )}
    </div>
  );
}
