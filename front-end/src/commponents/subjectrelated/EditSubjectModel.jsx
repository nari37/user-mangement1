

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Assuming you're using Bootstrap for modal styling

export default function EditSubjectModal({ show, handleClose, editedSubject }) {
    
    const [editedName, setEditedName] = useState('');

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };
    
    useEffect(() => {
        if (editedSubject) {
            setEditedName(editedSubject.name);
        }
    }, [editedSubject]);

    const handleSubmit = () => {
        // Extract the id from the editedSubject
        const id = editedSubject.id;

        // Send a PUT request to update the subject on the server
        axios.put(`http://localhost:8000/backend/admin/editsubject/${id}`, { subjectName: editedName })
            .then((res) => {
                // Handle the response if needed
                console.log('Subject updated successfully:', res.data);
                handleClose(); // Close the modal after successful update
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error updating subject:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Subject Name:</label>
                <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    className="form-control"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} style={{ background: 'rgb(28, 66, 95)' }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
