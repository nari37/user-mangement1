

import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { DataContext } from './App';
import Swal from 'sweetalert2';

export default function NotifyStaff({adminDetails}) {
  const Sendby = adminDetails?.first_name || '';
  const { stafflist, classlist } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState(null); // State to store the selected staff ID

  console.log(notificationMessage)
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Filter staff based on selected class and search query
  const filteredStaff = stafflist.filter(staff => {
    const classMatch = !selectedClass || staff.course === selectedClass;
    const nameMatch = staff.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && nameMatch;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNotifyClick = (id) => {
 
    // Store the selected staff ID in state
    setSelectedStaffId(id);
    handleShowModal();
  };
  const handleSendNotification = () => {   
    if (selectedStaffId && notificationMessage) {
      // Make PUT request to send notification
      axios.post(`http://localhost:8000/backend/admin/notifystaff/${selectedStaffId}`, { notificationMessage,Sendby })
        .then(response => {
          // Handle success
          console.log('Notification sent successfully:', response.data);
          handleCloseModal();
          Swal.fire({
            title: "Success!",
            text: "Notification sent successfully.",
            icon: "success",
            confirmButtonColor: "rgb(28, 66, 95)"
          });
        })
        .catch(error => {
          // Handle error
          console.error('Error sending notification:', error);
        });
    } else {
      console.error('No staff selected to notify or message empty.');
    }
  };
  
  return (
    <div>
      <h3>Notify Staff</h3>
      <div style={{display:'flex',justifyContent:'space-between',margin:'0.5rem'}}>
        <div>
          <label htmlFor="classFilter">Filter by Class:</label>
          <select id="classFilter" onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">All</option>
            {classlist.map((classItem, index) => (
              <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
            ))}
          </select>
        </div>
        <div style={{ width: '50%' }}>
          <input type="text" placeholder="Search name..." onChange={handleSearch} style={{ width: '100%' }}/>
        </div>
      </div>
      <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black', width: '100%' }} border={2}>
        <thead style={{ background: 'black', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staff, index) => (
            <tr key={staff.id} style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td>{staff.first_name}</td>
              <td>{staff.email}</td>
              <td>{staff.course}</td>
              <td>
                <button onClick={() => handleNotifyClick(staff.id)} className='btn btn-success'>Notify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} style={{ margin: '200px 0 0 0' }}>
        <Modal.Header closeButton>
          <Modal.Title>Send Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <textarea type='text' placeholder='Write your message...'  onChange={(e) => setNotificationMessage(e.target.value)} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendNotification} style={{ background: 'rgb(28, 66, 95)' }}>
            Send Notification
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
