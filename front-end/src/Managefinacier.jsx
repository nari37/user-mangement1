// import React from 'react'
// import { BiEdit } from 'react-icons/bi';
// import { RiDeleteBin5Line } from 'react-icons/ri';

// export default function Managefinacier() {
//   const [showDetails, setShowDetails] = useState({});
//   const [selectedfinacer, setSelectedStudent] = useState(null);

  
//   // Function to open edit modal
//   const openEditModal = (student) => {
//     setSelectedStudent(student);
//     setShowEditModal(true);
//   };
//   // Toggle detailed data visibility for a row
//   const toggleDetails = (id) => {
//     setShowDetails({ ...showDetails, [id]: !showDetails[id] });
//   };
//   // delete students...


//   const deletefinacer = (id) =>{   
//     const confirmed = window.confirm('Are you sure you want to delete this user')
//     if(confirmed){
//       axios.delete(`http://localhost:8000/backend/admin/deletefinacer/${id}`)
//       .then(res =>console.log(res.data))
//       .catch(err =>console.log(err))
//     }else{
//       console.log('Deletion Cancelled..')
//     }
      
//   }
//   return (
//     <>
//     <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', maxHeight: '500px' }}>
//     <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}> Finacier Details</h3>
//     <form style={{ padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
//           <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black' }} border={2}>
//             {/* Table headers */}
//             <thead>
//               <tr>
//                 <th style={{ padding: '10px' }}>S.No</th>
//                 <th>Name</th>
//                 <th>Class Type</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Render filtered data */}
//               {filteredData.map((item, index) => (
//                 <React.Fragment key={item.id}>
//                   <tr style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
//                     <td>{index + 1}</td>
//                     <td style={{padding:'10px'}}>{item.first_name}</td>
//                     <td style={{padding:'10px'}}>{item.course}</td>
//                     <td style={{padding:'10px'}}>{item.status}</td>
//                     <td>
//                       {/* Toggle button for additional details */}
//                       <button onClick={(e) => { e.preventDefault(); toggleDetails(item.id); }} style={{background:'rgb(50, 48, 48)',color:'white',borderRadius:'5px'}}>
//                         {showDetails[item.id] ? 'Hide Details' : 'Show Details'}
//                       </button>
//                       <BiEdit onClick={() => openEditModal(item)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} />
//                       <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'} style={{ marginLeft: '17px' }} onClick={()=>deletefinacer(item.id)}/>
//                     </td>
//                   </tr>
//                   {/* Detailed data row */}
//                   {showDetails[item.id] && (
//                     <tr style={{ background: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
//                       <td colSpan={5}>
//                         <div>
//                           <strong>Email:</strong> {item.email}
//                         </div>
//                         <div>
//                           <strong>Gender:</strong> {item.gender}
//                         </div>
//                         <div>
//                           <strong>Address:</strong> {item.address}
//                         </div>
//                         <div>
//                           <strong>Role Type:</strong> {item.ROLE_TYPE}
//                         </div>
//                         <div>
//                           <strong>phoneNumber:</strong> {item.phoneNumber}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </form>
//     </div>
//     </>
//   )
// }



import React from 'react'

export default function Managefinacier() {
  return (
    <div>Managefinacier</div>
  )
}
