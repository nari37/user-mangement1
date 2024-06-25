import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DataContext } from './App';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Notifystudent({adminDetails}) {
  const Sendby = adminDetails?.first_name || ''; // Use optional chaining and provide a default value
  const Pic = adminDetails?.profile || ''; 
 
  const { studnetlist, classlist } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Filtered data based on selected class and search query
  const filteredData = studnetlist.filter(student => {
    const classMatch = !selectedClass || student.course === selectedClass;
    const nameMatch = student.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    return classMatch && nameMatch;
  });

  
  const handleNotifyClick = (id) => {
 
    // Store the selected student ID in state
    setSelectedStudentId(id);
    handleShowModal();
  };

  // send notification..,

  const handleSendNotification = () => {   
    if (selectedStudentId && notificationMessage) {
      // Make PUT request to send notification
      axios.post(`http://localhost:8000/backend/admin/notifystudent/${selectedStudentId}`, { notificationMessage,Sendby,Pic})
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
      <h3>Notify Students</h3>
      <div  style={{display:'flex',justifyContent:'space-between',margin:'0.5rem'}}>
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
        <input placeholder='Search name...' onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%' }} />
      </div>
      </div>
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
                <button onClick={() => handleNotifyClick(student.id)} className='btn btn-success'>Notify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} style={{ margin: '200px 0 0 0' }}>
        <Modal.Header closeButton>
          <Modal.Title>Send Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
           <textarea
      placeholder="Write your message..."
      
      onChange={(e) => setNotificationMessage(e.target.value)}
      style={{ width: '100%' }} // Adjust the width as desired
      />
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Send notification button */}
          <Button variant="primary" onClick={handleSendNotification} style={{ background: 'rgb(28, 66, 95)' }}>
            Send Notification
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
