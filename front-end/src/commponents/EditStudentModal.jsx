

// // import axios from 'axios';
// // import React, { useState, useEffect } from 'react';
// // import { Modal, Button } from 'react-bootstrap'; 

// // export default function EditStudentModal({ show, setShowEditModal, selectedStudent,classlist }) {
// //   const [editedStudent, setEditedStudent] = useState({
// //     class_id: selectedStudent.courses_id,
// //     ...selectedStudent
// //   }); // Initialize as empty object

// //   // console.log('ddd',classlist)
// //   console.log('st',selectedStudent)


// //   // useEffect(() => {
// //   //   // Update editedStudent state when selectedStudent prop changes
// //   //   setEditedStudent(selectedStudent);
// //   // }, [selectedStudent]);

  
// //   useEffect(() => {
// //     setEditedStudent({
// //       ...selectedStudent,
      
// //       courses_id: selectedStudent.courses_id
// //     });
// //   }, [selectedStudent]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedStudent(prevState => ({
// //       ...prevState,
// //       [name]: value
// //     }));

// //     console.log(name, value)

// //     if (name === 'course') {
// //       console.log('huuuu',editedStudent)
// //       const selectedClass = classlist.find(item => item.course_type === value);
// //       if (selectedClass) {
// //         setEditedStudent(prevState => ({
// //           ...prevState,
// //           class_id: selectedClass.id // Assuming 'id' is the property holding the class ID
// //         }));
// //       }
// //     }

// //   };

// //   const handleSaveChanges = () => {

// //     const editedData = {
// //       ...editedStudent,
// //       class_id: editedStudent.class_id // Assuming class_id is already set correctly
// //     }
// //     // Perform save changes operation here, e.g., calling an API
// //     console.log('Saving changes:', editedData);
// //        const id = editedData.id;
// //     axios.put(`http://localhost:8000/backend/admin/editstudents/${id}`,editedData)
// //     .then(res=>console.log(res.data))
// //     .catch(err=>console.log(err))
// //     // Close the modal after saving changes
// //     setShowEditModal(false);
// //   };

// //   return (
// //     <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '100px 0 0 0'}}>
// //       <Modal.Header closeButton>
// //         <Modal.Title>Edit Student Details</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         {/* Inputs for editing student details */}
// //         <label>First Name:</label>
// //      <input
// //      type="text"
// //      name="first_name"
// //      value={editedStudent?.first_name || ''}
// //      onChange={handleInputChange}
// //      className="form-control"
// //         />

// //       <label>Email:</label>
// //        <input
// //         type="email"
// //         name="email"
// //         value={editedStudent?.email || ''}
// //          onChange={handleInputChange}
// //          className="form-control"
// //          />
// //          <label>Phonenumber:</label>
// //        <input
// //         type='number'
// //         name="phoneNumber"
// //         value={editedStudent?.phoneNumber || ''}
// //          onChange={handleInputChange}
// //          className="form-control"
// //          />

// //        <label>Gender:</label>
// //          <select
// //   name="gender"
// //   value={editedStudent?.gender || ''}
// //   onChange={handleInputChange}
// //   className="form-control"
// //  >
// //   <option value="">-- Select Gender --</option>
// //   <option value="Male">Male</option>
// //   <option value="Female">Female</option>
// // </select>

// // <label>class:</label>
// // <select
// //   name="course"
// //   value={editedStudent?.course || ''}
// //   onChange={handleInputChange}
// //   className="form-control"
// //  >

// //  <option value="">-- Select Class --</option>
// //   {classlist && classlist.map((classItem) => (
// //     <option key={classItem.id} value={classItem.course_type}>{classItem.course_type}</option>
// //   ))}
// //  </select>

// //  <label>Status:</label>
// //  <select
// //   name="status"
// //   value={editedStudent?.status || ''}
// //   onChange={handleInputChange}
// //   className="form-control"
// // >
// //   <option value="">-- Select Status --</option>
// //   <option value="active">Active</option>
// //   <option value="inactive">Inactive</option>
// // </select>


         

// //         {/* Add more inputs for other student details as needed */}

// //       </Modal.Body>
// //       <Modal.Footer>
// //         {/* Close button */}
// //         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
// //           Close
// //         </Button>
// //         {/* Save changes button */}
// //         <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
// //           Save changes
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //   );
// // }








// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap'; 

// export default function EditStudentModal({ show, setShowEditModal, selectedStudent,classlist }) {
//   const [editedStudent, setEditedStudent] = useState({
//     class_id: selectedStudent.courses_id,
//     ...selectedStudent
//   }); // Initialize as empty object

//   // console.log('ddd',classlist)

//   console.log('st',selectedStudent)


  
//   useEffect(() => {
//     setEditedStudent({
//       ...selectedStudent,
      
//       courses_id: selectedStudent.courses_id
//     });
//   }, [selectedStudent]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedStudent(prevState => ({
//       ...prevState,
//       [name]: value
//     }));

//     console.log(name, value)
    
//     if (name === 'course') {
//       console.log('huuuu',editedStudent)
//       const selectedClass = classlist.find(item => item.course_type === value);
//       if (selectedClass) {
//         setEditedStudent(prevState => ({
//           ...prevState,
//           class_id: selectedClass.id // Assuming 'id' is the property holding the class ID
//         }));
//       }
//     }

//   };

//   const handleSaveChanges = () => {

//     const editedData = {
//       ...editedStudent,
//       class_id: editedStudent.class_id // Assuming class_id is already set correctly
//     }
//     // Perform save changes operation here, e.g., calling an API
//     console.log('Saving changes:', editedData);
//        const id = editedData.id;
//     axios.put(`http://localhost:8000/backend/admin/editstudents/${id}`,editedData)
//     .then(res=>console.log(res.data))
//     .catch(err=>console.log(err))
//     // Close the modal after saving changes
//     setShowEditModal(false);
//   };

//   return (
//     <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '100px 0 0 0'}}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Student Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* Inputs for editing student details */}
//         <label>First Name:</label>
//      <input
//      type="text"
//      name="first_name"
//      value={editedStudent?.first_name || ''}
//      onChange={handleInputChange}
//      className="form-control"
//         />

//       <label>Email:</label>
//        <input
//         type="email"
//         name="email"
//         value={editedStudent?.email || ''}
//          onChange={handleInputChange}
//          className="form-control"
//          />
//          <label>Phonenumber:</label>
//        <input
//         type='number'
//         name="phoneNumber"
//         value={editedStudent?.phoneNumber || ''}
//          onChange={handleInputChange}
//          className="form-control"
//          />

//        <label>Gender:</label>
//          <select
//   name="gender"
//   value={editedStudent?.gender || ''}
//   onChange={handleInputChange}
//   className="form-control"
//  >
//   <option value="">-- Select Gender --</option>
//   <option value="Male">Male</option>
//   <option value="Female">Female</option>
// </select>

// <label>class:</label>
// <select
//   name="course"
//   value={editedStudent?.course || ''}
//   onChange={handleInputChange}
//   className="form-control"
//  >

//  <option value="">-- Select Class --</option>
//   {classlist && classlist.map((classItem) => (
//     <option key={classItem.id} value={classItem.course_type}>{classItem.course_type}</option>
//   ))}
//  </select>

//  <label>Status:</label>
//  <select
//   name="status"
//   value={editedStudent?.status || ''}
//   onChange={handleInputChange}
//   className="form-control"
// >
//   <option value="">-- Select Status --</option>
//   <option value="active">Active</option>
//   <option value="inactive">Inactive</option>
// </select>


         

//         {/* Add more inputs for other student details as needed */}

//       </Modal.Body>
//       <Modal.Footer>
//         {/* Close button */}
//         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//           Close
//         </Button>
//         {/* Save changes button */}
//         <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
//           Save changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }



// .....


import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function EditStudentModal({ show, setShowEditModal, selectedStudent, classlist }) {
  const [editedStudent, setEditedStudent] = useState({
    class_id: '',
    first_name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    course: '',
    status: '',
    ...selectedStudent 
  });

  useEffect(() => {
    if (selectedStudent) {
      setEditedStudent({
        ...selectedStudent,
        class_id: selectedStudent.courses_id || ''
      });
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (name === 'course') {
      const selectedClass = classlist.find(classItem => classItem.course_type === value);
      if (selectedClass) {
        setEditedStudent(prevState => ({
          ...prevState,
          class_id: selectedClass.id
        }));
      }
    }
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:8000/backend/admin/editstudents/${editedStudent.id}`, editedStudent)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setShowEditModal(false);
  };

  return (
    <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '100px 0 0 0' }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={editedStudent.first_name || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={editedStudent.email || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Phonenumber:</label>
        <input
          type='number'
          name="phoneNumber"
          value={editedStudent.phoneNumber || ''}
          onChange={handleInputChange}
          className="form-control"
        />
        <label>Gender:</label>
        <select
          name="gender"
          value={editedStudent.gender || ''}
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
          value={editedStudent.course || ''}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">-- Select Class --</option>
          {classlist && classlist.map((classItem) => (
            <option key={classItem.id} value={classItem.course_type}>{classItem.course_type}</option>
          ))}
        </select>
        <label>Status:</label>
        <select
          name="status"
          value={editedStudent.status || ''}
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

