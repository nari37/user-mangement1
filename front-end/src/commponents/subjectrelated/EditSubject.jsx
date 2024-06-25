// // import React, { useState, useEffect } from 'react';
// // import { Modal, Button } from 'react-bootstrap';
// // import axios from 'axios';

// // export default function EditSubject({ show, setShowEditModal, selectedSubject, classlist, stafflist }) {
// //   const [editedSubject, setEditedSubject] = useState({});

// //   useEffect(() => {
// //     setEditedSubject(selectedSubject);
// //   }, [selectedSubject]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedSubject(prevState => ({
// //       ...prevState,
// //       [name]: value
// //     }));
// //   };

// //   const handleSaveChanges = () => {
// //     console.log('Saving changes:', editedSubject);
// //     const id = editedSubject.id;

// //     axios.put(`http://localhost:8000/backend/admin/editsubject/${id}`, editedSubject)
// //       .then(res => console.log(res.data))
// //       .catch(err => console.log(err));
// //     setShowEditModal(false);
// //   };

// //   return (
// //     <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '55px 0 0 0' }}>
// //       <Modal.Header closeButton>
// //         <Modal.Title>Edit Subject Details</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <label>Subject Name:</label>
// //         <input
// //           type="text"
// //           name="subjectname"
// //           value={editedSubject?.subjectname || ''}
// //           onChange={handleInputChange}
// //           className="form-control"
// //         />

// //         <label>Related Class:</label>
// //         <select
// //           name="class"
// //           value={editedSubject?.class || ''}
// //           onChange={handleInputChange}
// //           className="form-control"
// //         >
// //           <option value="">-- Select Class --</option>
// //           {classlist.map((classItem, index) => (
// //             <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
// //           ))}
// //         </select>

// //         <label>Teach By:</label>
// //         <select
// //           name="staffName"
// //           value={editedSubject?.staffName || ''}
// //           onChange={handleInputChange}
// //           className="form-control"
// //         >
// //           <option value="">-- Select Staff --</option>
// //           {stafflist.map((staff, id) => (
// //             <option key={id} value={staff.first_name}>{staff.first_name}</option>
// //           ))}
// //         </select>
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
// //           Close
// //         </Button>
// //         <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
// //           Save changes
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //   );
// // }




// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';

// export default function EditSubject({ show, setShowEditModal, selectedSubject, classlist, stafflist }) {
//   const [editedSubject, setEditedSubject] = useState({});

//   useEffect(() => {
//     setEditedSubject(selectedSubject);
//   }, [selectedSubject]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedSubject(prevState => ({
//       ...prevState,
//       [name]: value
//     }));

//     // If you want to send the staff and class IDs along with their names
//     if (name === 'class') {
//       const selectedClass = classlist.find(item => item.course_type === value);
//       if (selectedClass) {
//         setEditedSubject(prevState => ({
//           ...prevState,
//           class_id: selectedClass.id // Assuming 'id' is the property holding the class ID
//         }));
//       }
//     }

//     if (name === 'staffName') {
//       const selectedStaff = stafflist.find(staff => staff.first_name === value);
//       if (selectedStaff) {
//         setEditedSubject(prevState => ({
//           ...prevState,
//           staff_id: selectedStaff.id // Assuming 'id' is the property holding the staff ID
//         }));
//       }
//     }
//   };

//   const handleSaveChanges = () => {
//     console.log('Saving changes:', editedSubject);
//     const id = editedSubject.id;

//     axios.put(`http://localhost:8000/backend/admin/editsubject/${id}`, editedSubject)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));
//     setShowEditModal(false);
//   };

//   return (
//     <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '55px 0 0 0' }}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Subject Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <label>Subject Name:</label>
//         <input
//           type="text"
//           name="subjectname"
//           value={editedSubject?.subjectname || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         />

//         <label>Related Class:</label>
//         <select
//           name="class"
//           value={editedSubject?.class || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         >
//           <option value="">-- Select Class --</option>
//           {classlist.map((classItem, index) => (
//             <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
//           ))}
//         </select>

//         <label>Teach By:</label>
//         <select
//           name="staffName"
//           value={editedSubject?.staffName || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         >
//           <option value="">-- Select Staff --</option>
//           {stafflist.map((staff, id) => (
//             <option key={id} value={staff.first_name}>{staff.first_name}</option>
//           ))}
//         </select>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
//           Save changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';

// export default function EditSubject({ show, setShowEditModal, selectedSubject, classlist, stafflist }) {
//   const [editedSubject, setEditedSubject] = useState({});

//   useEffect(() => {
//     setEditedSubject(selectedSubject);
//   }, [selectedSubject]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedSubject(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSaveChanges = () => {
//     console.log('Saving changes:', editedSubject);
//     const id = editedSubject.id;

//     axios.put(`http://localhost:8000/backend/admin/editsubject/${id}`, editedSubject)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err));
//     setShowEditModal(false);
//   };

//   return (
//     <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '55px 0 0 0' }}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Subject Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <label>Subject Name:</label>
//         <input
//           type="text"
//           name="subjectname"
//           value={editedSubject?.subjectname || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         />

//         <label>Related Class:</label>
//         <select
//           name="class"
//           value={editedSubject?.class || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         >
//           <option value="">-- Select Class --</option>
//           {classlist.map((classItem, index) => (
//             <option key={index} value={classItem.course_type}>{classItem.course_type}</option>
//           ))}
//         </select>

//         <label>Teach By:</label>
//         <select
//           name="staffName"
//           value={editedSubject?.staffName || ''}
//           onChange={handleInputChange}
//           className="form-control"
//         >
//           <option value="">-- Select Staff --</option>
//           {stafflist.map((staff, id) => (
//             <option key={id} value={staff.first_name}>{staff.first_name}</option>
//           ))}
//         </select>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSaveChanges} style={{ background: 'rgb(28, 66, 95)' }}>
//           Save changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function EditSubject({ show, setShowEditModal, selectedSubject, }) {
  const [editedSubject, setEditedSubject] = useState({});

  useEffect(() => {
    setEditedSubject(selectedSubject);
  }, [selectedSubject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSubject(prevState => ({
      ...prevState,
      [name]: value
    }));

    
   
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', editedSubject);
    const id = editedSubject.id;

    axios.put(`http://localhost:8000/backend/admin/editsubject/${id}`, editedSubject)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setShowEditModal(false);
  };

  return (
    <Modal show={show} onHide={() => setShowEditModal(false)} style={{ margin: '55px 0 0 0' }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Subject Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Subject Name:</label>
        <input
          type="text"
          name="subjectname"
          value={editedSubject?.subjectname || ''}
          onChange={handleInputChange}
          className="form-control"
        />

       
      
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

