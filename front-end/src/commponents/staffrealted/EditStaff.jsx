

import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';



export default function EditStaffModal({ show, setShowEditModal, selectedStaff, subjectlist, classlist }) {
  const [editedStaff, setEditedStaff] = useState({
    subject_id: selectedStaff.teachsubject_id,
    courses_id: selectedStaff.courses_id,
    ...selectedStaff 
  });



// console.log('khkhhhh...',classlist)

// console.log('selectedstaff...',selectedStaff)


  useEffect(() => {
    setEditedStaff({
      ...selectedStaff,
      subject_id: selectedStaff.teachsubject_id,
      courses_id: selectedStaff.courses_id
    });
  }, [selectedStaff]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value)

    setEditedStaff(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'teachsubject') {
      const selectedSubject = subjectlist.find(subject => subject.subjectname === value);
      if (selectedSubject) {
        setEditedStaff(prevState => ({
          ...prevState,
          teachsubject_id: selectedSubject.id,
          subject_id: selectedSubject.id
        }));
      }
    }

    if (name === 'course') {
      const selectedClass = classlist.find(classItem => classItem.course_type === value);
      console.log(selectedClass.id)
      if (selectedClass) {
        setEditedStaff(prevState => ({
          ...prevState,
          // class_id: selectedClass.id,
          courses_id: selectedClass.id
        }));
      }
    }
  };

  const handleSaveChanges = () => {
    const editedData = { ...editedStaff };
    console.log(editedData)
    axios.put(`http://localhost:8000/backend/admin/editstaff/${editedData.id}`, editedData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setShowEditModal(false);
  };

  return (
    <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '55px 0 0 0' }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={editedStaff.first_name || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={editedStaff.email || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Phonenumber:</label>
        <input
          type='number'
          name="phoneNumber"
          value={editedStaff.phoneNumber || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Gender:</label>
        <select
          name="gender"
          value={editedStaff.gender || ''}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label>Class:</label>
        <select
          name="course"
          value={editedStaff.course || ''}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Class --</option>
          {classlist && classlist.map((classItem) => (
            <option key={classItem.id} value={classItem.course_type}>{classItem.course_type}</option>
          ))}
        </select>
        <label>Teach-subject:</label>
        <select
          name="teachsubject"
          value={editedStaff.teachsubject || ''}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Subject --</option>
          {subjectlist && subjectlist.map((subjectItem) => (
            <option key={subjectItem.id} value={subjectItem.subjectname}>{subjectItem.subjectname}</option>
          ))}
        </select>
        <label>Status:</label>
        <select
          name="status"
          value={editedStaff.status || ''}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Status --</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
