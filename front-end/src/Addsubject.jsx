


import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from './App';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import EditSubjectModal from './commponents/subjectrelated/EditSubjectModel';


export default function AddSubject() {
    const { subjectlist } = useContext(DataContext);
    const [data, setData] = useState({
        subjectName: '',
    });
    const [showEditModal, setShowEditModal] = useState(false); // State for controlling the visibility of the edit modal
    const [editedSubject, setEditedSubject] = useState({ id: null, name: '' }); // State for storing the subject being edited

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!data.subjectName) {
            alert("Please fill in all the fields.");
            return;
        }

        const postData = {
            subjectName: data.subjectName,
        };

        const response = await axios.post('http://localhost:8000/backend/admin/addsubject', postData);
        console.log('Data submitted successfully:', response.data);

        // Show success message
        const addsubjectElement = document.getElementById('addsubject');
        addsubjectElement.style.display = 'block';
        setTimeout(() => {
            addsubjectElement.style.display = 'none';
        }, 2000);

        // Clear form fields after successful submission
        setData({
            subjectName: '', // Reset subjectName
        });
    };

    // Function to open edit modal and set the subject to be edited
    const openEditModal = (subject) => {
        setEditedSubject({ id: subject.id, name: subject.subjectname });
        setShowEditModal(true);
    };

    // Function to close the edit modal
    const closeEditModal = () => {
        setShowEditModal(false);
    };

    // delete subject...


    const handileDelete = (id) =>{

        const confirm = window.confirm('are you sure you want to delete this subject?')
        if(confirm){
            axios.delete(`http://localhost:8000/backend/admin/deletesubject/${id}`)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        }else{
            console.log('delation cancelled by user...')
        }
     
    }

    return (
        <>
            <div style={{ maxWidth: '100%', background: 'green', height: '50px', color: 'white', borderRadius: '5px', marginTop: '-34px', paddingTop: '.8rem', paddingLeft: '.6rem', display: 'none', marginBottom: '30px' }} id='addsubject'>Subject Added Successfully</div>
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
                <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Add Subject</h3>
                <form style={{ padding: '1rem' }} onSubmit={handleSubmit}>
                    <label style={{ display: 'block' }}>Subject Name:</label>
                    <input
                        type="text"
                        placeholder='Subject name..'
                        style={{ width: '100%' }}
                        value={data.subjectName}
                        onChange={(e) => setData({ ...data, subjectName: e.target.value })}
                    />

                    <button type="submit" style={{ background: 'rgb(28, 66, 95)', width: '100%', padding: '0.5rem', margin: '15px auto', borderRadius: '10px', color: 'whitesmoke' }}>
                        Add Subject
                    </button>
                </form>
            </div>
            
            <center style={{ margin: '20px' }}>
                <h3>All Subject List</h3>
                <div style={{ overflowY: 'scroll', overflowX: 'scroll' }}>
                    <table style={{ textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px' }}>S.No</th>
                                <th style={{ padding: '10px' }}>Subject Name</th>
                                <th style={{ padding: '10px' }}>Actions</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjectlist.map((subject, index) => (
                                <tr key={index} style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                                    <td style={{ padding: '10px' }}>{index + 1}</td>
                                    <td style={{ padding: '10px' }}>{subject.subjectname}</td>
                                    <td style={{ padding: '10px' }}>
                                        <BiEdit onClick={() => openEditModal(subject)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginRight: '10px' }} />
                                        <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'} onClick={()=>handileDelete(subject.id)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </center>

            {/* Render edit modal */}
            <EditSubjectModal
                show={showEditModal}
                handleClose={closeEditModal}
                editedSubject={editedSubject}
            />
        </>
    );
}
