


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ApproveStaffleaves() {
    const [leaveRequests, setLeaveRequests] = useState([]);

    const cardStyle = {
        flex: 1,
        padding: '20px',
        margin: '10px',
        background: 'rgb(28, 66, 95)',
        borderRadius: '8px',
        color:'#fff',
        textAlign: 'center',
        cursor:'pointer'
    };

    // useEffect(() => {
    //     axios.get('http://localhost:8000/backend/admin/approvestaffleaves')
    //         .then(res => setLeaveRequests(res.data))
    //         .catch(error => console.error('Error fetching leave requests:', error));
    // }, [leaveRequests]);

    useEffect(() => {
        axios.get('http://localhost:8000/backend/admin/approvestaffleaves')
            .then(res => {
                // Sort leave requests by Applied date in descending order
                const sortedLeaveRequests = res.data.sort((a, b) => {
                    // Convert the Applied dates to Date objects and compare
                    const dateA = new Date(a.Applied);
                    const dateB = new Date(b.Applied);
                    return dateB - dateA; // Sort in descending order
                });
                // Set the sorted data to the state
                setLeaveRequests(sortedLeaveRequests);
            })
            .catch(error => console.error('Error fetching leave requests:', error));
    }, []);
    

    const handleApprove = (id) => {
      
        axios.put(`http://localhost:8000/backend/admin/approvestaffleaves/${id}`, { status: 'Approve' })
            .then((res) => {
                setLeaveRequests(res.data[0]);
                console.log(`Leave request with ID ${id} has been approved.`);
                // sweet alert..
                Swal.fire({
                    title: "Success!",
                    text: "Leave has been approved.",
                    icon: "success",
                    confirmButtonColor: "rgb(28, 66, 95)"
                });
            })
            .catch(error => console.error('Error approving leave request:', error));
    };

    const handleReject = (id) => {
        // Using SweetAlert for confirmation
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-outline-secondary",
                cancelButton: "btn btn-outline-danger"
            },
            buttonsStyling: false
        });
    
        // Display confirmation dialog
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You want to reject this leave request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            // If user confirms, send rejection request
            if (result.isConfirmed) {
                axios.put(`http://localhost:8000/backend/admin/approvestaffleaves/${id}`, { status: 'Reject' })
                    .then((res) => {
                        setLeaveRequests(res.data[0]);
                        console.log(`Leave request with ID ${id} has been rejected.`);
    
                        // Show success message
                        Swal.fire({
                            title: "Rejected!",
                            text: "Leave request has been rejected.",
                            icon: "success",
                            confirmButtonColor: "rgb(28, 66, 95)"
                        });
                    })
                    .catch(error => console.error('Error rejecting leave request:', error));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If user cancels, do nothing
                console.log(`Rejection of leave request with ID ${id} cancelled.`);
            }
        });
    };
    

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={cardStyle}>
                <h3>Staff leaves</h3>
            </div>
            <div>
                <h3>Leave Requests</h3>
                <div style={{ overflow: 'scroll' }}>
                    <table style={{  width: '100%', borderCollapse: 'collapse', marginTop: '20px',overflow:'scroll'  }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Staff Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Leave Type</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Start Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>End Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Status</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests && leaveRequests.map(leave => (
                                <tr key={leave.id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.staff_name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.reasons} applied on ({leave.Applied})</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.From_date}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leave.To_date}</td>
                                    
                                    <td style={{ border: '1px solid #ddd', color: 'white', padding: '4px',}}>
    <span style={{ 
        backgroundColor: leave.status === 'Pending' ? 'yellow' : 
                         leave.status === 'Approve' ? 'green' : 
                         leave.status === 'Reject' ? 'red' : 
                         leave.status === 'withdraw' ? 'rgb(28, 66, 95)' : 'rgb(28, 66, 95)',
        padding: '2px 4px',
        display: 'inline-block' ,
        borderRadius:'20px',
        width:'90px',
        }}>
        {leave.status}
    </span>
</td>
                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        {leave.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleApprove(leave.id)} className='btn btn-outline-success'>Approve</button>
                                                <button onClick={() => handleReject(leave.id)} style={{marginLeft:'10px'}} className='btn btn-outline-danger'>Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ApproveStaffleaves;
