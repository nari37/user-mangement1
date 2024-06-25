

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BiEdit } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/leave.css';


function ApplyLeave(props) {
    const staffname = props.singleStaffdetails.first_name;
  
    const { id } = useParams();
   
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [leaveHistory,setleaveHistory] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [editData, setEditData] = useState({
        fromDate: '',
        toDate: '',
        reason: ''
    });


    // post leave..
    const handleSubmit = (e) => {
        e.preventDefault();

        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        const currentDate = new Date();

        // Check if the selected start date is before the end date
        if (startDate > endDate) {
            Swal.fire({
                title: "Error!",
                text: "Start date cannot be after end date.",
                icon: "error",
                confirmButtonColor: "rgb(28, 66, 95)"
            });
            return; // Stop further execution
        }

        // Check if the selected dates are in the future
        if (startDate < currentDate || endDate < currentDate) {
            Swal.fire({
                title: "Error!",
                text: "Please choose dates in the future.",
                icon: "error",
                confirmButtonColor: "rgb(28, 66, 95)"
            });
            return; // Stop further execution
        }

        // Prepare the data to be sent to the backend
        const leaveData = {
            staffId: id,
            staffName: staffname,
            fromDate: fromDate,
            toDate: toDate,
            reason: reason
        };

        // Send leave application data to the backend
        axios.post(`http://localhost:8000/backend/staff/staffapplyedleaves/${id}`, leaveData)
            .then((res) => {
                console.log(res.data);
                Swal.fire({
                    title: "Success!",
                    text: "Leave has been applied successfully.",
                    icon: "success",
                    confirmButtonColor: "rgb(28, 66, 95)"
                });
                // Clear form fields
                setFromDate('');
                setToDate('');
                setReason('');
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to apply leave. Please try again later.",
                    icon: "error",
                    confirmButtonColor: "rgb(28, 66, 95)"
                });

              
            });
    }

    // update leave...
    const handleEditSubmit = (e) => {
        e.preventDefault();     
        const startDate = new Date(editData.fromDate);
        const endDate = new Date(editData.toDate);
        const currentDate = new Date();
    
        // Check if the selected start date is before the end date
        if (startDate > endDate) {
            Swal.fire({
                title: "Error!",
                text: "Start date cannot be after end date.",
                icon: "error",
                confirmButtonColor: "rgb(28, 66, 95)"
            });
            return; // Stop further execution
        }
    
        // Check if the selected dates are in the future
        if (startDate < currentDate || endDate < currentDate) {
            Swal.fire({
                title: "Error!",
                text: "Please choose dates in the future.",
                icon: "error",
                confirmButtonColor: "rgb(28, 66, 95)"
            });
            return; // Stop further execution
        }
    
        // Prepare the data to be sent to the backend
        const updatedLeaveData = {
            leaveId: selectedLeaveId,
            fromDate: editData.fromDate,
            toDate: editData.toDate,
            reason: editData.reason,
            
        };
    
        // Send updated leave data to the backend
        axios.put(`http://localhost:8000/backend/staff/updateleave/${selectedLeaveId}`, updatedLeaveData)
            .then((res) => {
                console.log(res.data);
                Swal.fire({
                    title: "Success!",
                    text: "Leave has been updated successfully.",
                    icon: "success",
                    confirmButtonColor: "rgb(28, 66, 95)"
                });
                // Clear form fields
                setEditData({
                    fromDate: '',
                    toDate: '',
                    reason: ''
                });
                setShowEditModal(false);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update leave. Please try again later.",
                    icon: "error",
                    confirmButtonColor: "rgb(28, 66, 95)"
                });
            });
    };


    // cancelled leave...

    // Function to handle withdraw action
    const handleWithdraw = (leaveId) => {    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be cancel",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, withdraw it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with withdrawal
                axios.put(`http://localhost:8000/backend/staff/withdrawleave/${leaveId}`)
                    .then((res) => {
                        // Reload leave history after successful withdrawal
                        setleaveHistory((prevLeaveHistory) =>
                            prevLeaveHistory.filter((leave) => leave.id !== leaveId)
                        );
                        Swal.fire(
                            "Withdrawn!",
                            "Your leave has been withdrawn.",
                            "success"
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire(
                            "Error!",
                            "Failed to withdraw leave. Please try again later.",
                            "error"
                        );
                    });
            }
        });
    }
    

    // get leave history...
  
         useEffect(()=>{
            axios.get(`http://localhost:8000/backend/staff/staffgetleaves/${id}`)
            .then((res)=>setleaveHistory(res.data))
            .catch((err)=>console.log(err))
         },[leaveHistory])

// Function to filter leave history based on selected status
const filteredLeaveHistory = leaveHistory.filter(leave => {
    if (selectedStatus === '') {
        return true; // Show all records if no status is selected
    } else {
        return leave.status === selectedStatus; // Show records with matching status
    }
});

// Other functions...

    const openEditModal = (leaveId,fromDate,toDate,reasons) => {
        setSelectedLeaveId(leaveId);
        setEditData({
            fromDate: fromDate,
            toDate: toDate,
            reason: reasons
        });
    
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setSelectedLeaveId(null);
        setShowEditModal(false);
    };

   
    return (
        <>
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Apply Leave</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>From Date:</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>To Date:</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Reason:</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'rgb(28, 66, 95)', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
            </form>
           
        </div>
{/* ... */}
         <div>
              
                    <h2 style={{ float: 'left' }}>Leaves History:</h2>               
                <div style={{ marginTop: '20px', float: 'right' }}>
                    <label htmlFor="leaveStatus">Select Leave Status:</label>
                    <select id="leaveStatus" onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="Pending" >Pending</option>
                        <option value="Reject">Reject</option>
                        <option value="Approve">Approve</option>
                        <option value="Withdraw">Withdraw</option>
                        

                    </select>
                </div>
              
            
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px',overflow:'scroll' }}>
        <thead>
            <tr>
            
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>From/To</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Reason</th>

                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Applied</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredLeaveHistory.map((leave) => (
                
                <tr key={leave.id}>
        
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.staff_name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.From_date} to {leave.To_date}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.reasons}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.Applied}</td>
                     
                    <td style={{ border: '1px solid #ddd', color: 'white', padding: '8px' }}>
    <span style={{ 
        backgroundColor: leave.status === 'Pending' ? 'yellow' : 
                         leave.status === 'Approve' ? 'green' : 
                         leave.status === 'Reject' ? 'red' : 
                         leave.status === 'withdraw' ? 'rgb(28, 66, 95)' : 'rgb(28, 66, 95)',
        padding: '2px 4px',
        display: 'inline-block' ,
        borderRadius:'20px',
        width:'90px'}}>
        {leave.status}
    </span>
</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {leave.status === 'Pending' && (
                            <>
                                <BiEdit onClick={() => openEditModal(leave.id, leave.From_date, leave.To_date, leave.reasons)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginRight: '17px' }} />
                                <Button onClick={() => handleWithdraw(leave.id)}>Withdraw</Button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

 

                 {/* Edit Modal */}
                 {showEditModal && (
  <Modal show={showEditModal} onHide={closeEditModal} style={{ margin: '200px 0 0 0' }}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Leave</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            value={editData.fromDate}
            onChange={(e) => setEditData({ ...editData, fromDate: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div>
          <label>To Date:</label>
          <input
            type="date"
            value={editData.toDate}
            onChange={(e) => setEditData({ ...editData, toDate: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Reason:</label>
          <textarea
            value={editData.reason}
            onChange={(e) => setEditData({ ...editData, reason: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          ></textarea>
        </div>
        <Button variant="primary" type="submit" style={{background:'rgb(28, 66, 95)'}}>Update</Button>
      </form>
    </Modal.Body>
  </Modal>
)}

                
            </div>

        </>
    );
}

export default ApplyLeave;
