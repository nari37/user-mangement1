
// import React, { useState, useEffect } from 'react';
// import jsPDF from 'jspdf';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../css/report.css';

// export default function StudentBalanceModal() {
//     const { id } = useParams();
//     const [studentDetails, setStudentDetails] = useState(null);
//     const [selectedFeeType, setSelectedFeeType] = useState('');
    
//     // States for each fee type
//     const [tuitionData, setTuitionData] = useState({
//         fullFees: 0,
//         amountPaid: 0,
//         remaining: 0,
//         dueDate: '',
//         notes: ''
//     });

//     const [hostelData, setHostelData] = useState({
//         fullFees: 0,
//         amountPaid: 0,
//         remaining: 0,
//         dueDate: '',
//         notes: ''
//     });

//     const [examData, setExamData] = useState({
//         fullFees: 0,
//         amountPaid: 0,
//         remaining: 0,
//         dueDate: '',
//         notes: ''
//     });

//     const [busData, setBusData] = useState({
//         fullFees: 0,
//         amountPaid: 0,
//         remaining: 0,
//         dueDate: '',
//         notes: ''
//     });

//     // The feeData state will hold the data for the currently selected fee type
//     const feeData = (() => {
//         switch (selectedFeeType) {
//             case 'Tuition':
//                 return tuitionData;
//             case 'Hostel':
//                 return hostelData;
//             case 'Examination':
//                 return examData;
//             case 'Bus':
//                 return busData;
//             default:
//                 return {};
//         }
//     })();

//     // Fetch student details on component mount
//     useEffect(() => {
//         axios.get(`http://localhost:8000/backend/student/getsinglestudent/${id}`)
//             .then(res => setStudentDetails(res.data[0]))
//             .catch(err => console.log(err));
//     }, [id]);

    

//     // Generate PDF report based on fee data and title
// const generatePDF = (title, data) => {
//     const doc = new jsPDF();
//     doc.text(`${title} Report`, 10, 20);
    
//     // Add recipient name
//     doc.text(`Received with thanks from ${studentDetails?.first_name?.toUpperCase()}`, 10, 30);
    
//     // Add amount paid, remaining, due date, and notes
//     doc.text(`Amount Paid: ${data.amountPaid}`, 10, 40);
//     doc.text(`Remaining: ${data.remaining}`, 10, 50);
//     doc.text(`Due Date: ${data.dueDate}`, 10, 70);
//     doc.text(`Notes: ${data.notes}`, 10, 80);
    
//     // Get current date and time
//     const currentDateTime = new Date();
//     const formattedDate = currentDateTime.toLocaleDateString(); // Format the date
//     const formattedTime = currentDateTime.toLocaleTimeString(); // Format the time
    
//     // Add date and time of report generation
//     doc.text(`Report Generated on: ${formattedDate} at ${formattedTime}`, 10, 90);
    
//     // Save the PDF file with a dynamic filename
//     doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}_report_${formattedDate}.pdf`);
// };



//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         generatePDF(`${selectedFeeType} Fees`, feeData);
//     };

//     // Handle changes in input fields and update the fee data
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         const updatedData = { ...feeData, [name]: value };
//         if (name === 'fullFees' || name === 'amountPaid') {
//             const fullFees = parseFloat(updatedData.fullFees) || 0;
//             const amountPaid = parseFloat(updatedData.amountPaid) || 0;
//             updatedData.remaining = fullFees - amountPaid;
//         }

//         // Update the specific fee type state
//         switch (selectedFeeType) {
//             case 'Tuition':
//                 setTuitionData(updatedData);
//                 break;
//             case 'Hostel':
//                 setHostelData(updatedData);
//                 break;
//             case 'Examination':
//                 setExamData(updatedData);
//                 break;
//             case 'Bus':
//                 setBusData(updatedData);
//                 break;
//             default:
//                 break;
//         }
//     };

//     return (
//         <div className="container-fees">
//             <h2>Academic Expenses Tracker (<span style={{color:'rgb(28, 66, 95)'}}>{studentDetails?.first_name?.toUpperCase()}</span>)</h2>
//             {/* Dropdown select for fee types */}
//             <div style={{ marginBottom: '10px' }}>
//                 <label htmlFor="feeTypeSelect">Select Fee Type:</label>
//                 <select id="feeTypeSelect" value={selectedFeeType} onChange={(e) => setSelectedFeeType(e.target.value)} style={{ marginLeft: '10px' }}>
//                     <option value="">Select Fee Type</option>
//                     <option value="Tuition">Tuition Fees</option>
//                     <option value="Hostel">Hostel Fees</option>
//                     <option value="Examination">Examination Fees</option>
//                     <option value="Bus">Bus Fees</option>
//                 </select>
//             </div>

//             {/* Conditional rendering based on selected fee type */}
//             {selectedFeeType && (
//                 <div className={`${selectedFeeType.toLowerCase()}-fees`}>
//                     <h3>{selectedFeeType} Fees</h3>
//                     <form onSubmit={handleFormSubmit}>
//                         <label htmlFor="full-fees">Full Fees:</label>
//                         <input
//                             type="number"
//                             id="full-fees"
//                             name="fullFees"
//                             value={feeData.fullFees}
//                             onChange={handleChange}
//                             placeholder="Enter full fees"
//                         />
//                         <label htmlFor="amount-paid">Amount Paid:</label>
//                         <input
//                             type="number"
//                             id="amount-paid"
//                             name="amountPaid"
//                             value={feeData.amountPaid}
//                             onChange={handleChange}
//                             placeholder="Enter amount paid"
//                         />
//                         <label htmlFor="remaining">Remaining:</label>
//                         <input
//                             type="number"
//                             id="remaining"
//                             name="remaining"
//                             value={feeData.remaining}
//                             readOnly
//                         />
//                         <label htmlFor="due-date">Due Date:</label>
//                         <input
//                             type="date"
//                             id="due-date"
//                             name="dueDate"
//                             value={feeData.dueDate}
//                             onChange={handleChange}
//                         />
//                         <label htmlFor="notes">Notes:</label>
//                         <textarea
//                             id="notes"
//                             name="notes"
//                             value={feeData.notes}
//                             onChange={handleChange}
//                             placeholder="Enter any additional notes"
//                             style={{ width: '90%' }}
//                         />
//                        {/* Container for buttons */}
//         <div style={{ display: 'flex', gap:'8px',maxWidth:'100%' }}>
//             {/* Update button */}
//             <button type="button" className="btn" style={{maxWidth:"49%"}}>Update</button>
            
//             {/* Generate Report button */}
//             <button type="submit" className="btn" style={{maxWidth:"39%"}}>Generate Report</button>
//         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/report.css';

export default function StudentBalanceModal() {
    const { id } = useParams();
    const [studentDetails, setStudentDetails] = useState(null);
    const [selectedFeeType, setSelectedFeeType] = useState('');


   
    // States for each fee type
    const [tuitionData, setTuitionData] = useState({
        fullFees: 0,
        amountPaid: 0,
        remaining: 0,
        dueDate: '',
        notes: ''
    });

    const [hostelData, setHostelData] = useState({
        fullFees: 0,
        amountPaid: 0,
        remaining: 0,
        dueDate: '',
        notes: ''
    });

    const [examData, setExamData] = useState({
        fullFees: 0,
        amountPaid: 0,
        remaining: 0,
        dueDate: '',
        notes: ''
    });

    const [busData, setBusData] = useState({
        fullFees: 0,
        amountPaid: 0,
        remaining: 0,
        dueDate: '',
        notes: ''
    });

    // Determine the fee data based on the selected fee type
    const feeData = (() => {
        switch (selectedFeeType) {
            case 'Tuition':
                return tuitionData;
            case 'Hostel':
                return hostelData;
            case 'Examination':
                return examData;
            case 'Bus':
                return busData;
            default:
                return {};
        }
    })();

    // Fetch student details on component mount
    useEffect(() => {
        axios.get(`http://localhost:8000/backend/student/getsinglestudent/${id}`)
            .then(res => setStudentDetails(res.data[0]))
            .catch(err => console.log(err));
    }, [id]);

    // Generate PDF report based on fee data and title
    const generatePDF = (title, data) => {
        const doc = new jsPDF();
        doc.text(`${title} Report`, 10, 20);

        // Add recipient name
        doc.text(`Received with thanks from ${studentDetails?.first_name?.toUpperCase()}`, 10, 30);

        // Add amount paid, remaining, due date, and notes
        doc.text(`Amount Paid: ${data.amountPaid}`, 10, 40);
        doc.text(`Remaining: ${data.remaining}`, 10, 50);
        doc.text(`Due Date: ${data.dueDate}`, 10, 60);
        doc.text(`Notes: ${data.notes}`, 10, 70);

        // Get current date and time
        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString();
        const formattedTime = currentDateTime.toLocaleTimeString();

        // Add date and time of report generation
        doc.text(`Report Generated on: ${formattedDate} at ${formattedTime}`, 10, 80);

        // Save the PDF file with a dynamic filename
        doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}_report_${formattedDate}.pdf`);
    };

    // Function to update fee details
    const updateFeeDetails = async (feeId, updatedData) => {
        try {
            // Make a PUT request to update the fee data in the backend
            const response = await axios.put(`http://localhost:8000/backend/finacer/fees/${feeId}`, {updatedData,selectedFeeType,studentDetails});

            // Handle response if necessary
            console.log('Fee details updated successfully:', response.data);
            alert('Fee details updated successfully.');
        } catch (error) {
            console.error('Error updating fee details:', error);
            alert('An error occurred while updating the fee details.');
        }
    };

    // Handle Update button click
    const handleUpdateClick = async () => {
        try {
            // Determine the appropriate fee ID and student ID
            const feeId = feeData.fee_id; // Assuming fee ID is available in feeData
            const studentId = studentDetails.id;
console.log('fees details',feeData)

            // Prepare the updated data for the PUT request
            const updatedData = {
                student_id: studentId,
                fullFees: feeData.fullFees,
                amountPaid: feeData.amountPaid,
                remaining: feeData.remaining,
                dueDate: feeData.dueDate,
                notes: feeData.notes
            };

            // Call updateFeeDetails to update the fee details in the backend
            await updateFeeDetails(feeId, updatedData);
        } catch (error) {
            console.error('Error updating fee details:', error);
            alert('An error occurred while updating the fee details.');
        }
    };

    // Handle changes in input fields and update the fee data
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Parse numbers and calculate remaining amount
        const updatedData = { ...feeData, [name]: value };
        if (name === 'fullFees' || name === 'amountPaid') {
            const fullFees = parseFloat(updatedData.fullFees) || 0;
            const amountPaid = parseFloat(updatedData.amountPaid) || 0;
            updatedData.remaining = fullFees - amountPaid;
        }

        // Update the specific fee type state
        switch (selectedFeeType) {
            case 'Tuition':
                setTuitionData(updatedData);
                break;
            case 'Hostel':
                setHostelData(updatedData);
                break;
            case 'Examination':
                setExamData(updatedData);
                break;
            case 'Bus':
                setBusData(updatedData);
                break;
            default:
                break;
        }
    };

    return (
        <div className="container-fees">
            <h2>Academic Expenses Tracker (<span style={{color:'rgb(28, 66, 95)'}}>{studentDetails?.first_name?.toUpperCase()}</span>)</h2>
            {/* Dropdown select for fee types */}
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="feeTypeSelect">Select Fee Type:</label>
                <select id="feeTypeSelect" value={selectedFeeType} onChange={(e) => setSelectedFeeType(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="">Select Fee Type</option>
                    <option value="Tuition">Tuition Fees</option>
                    <option value="Hostel">Hostel Fees</option>
                    <option value="Examination">Examination Fees</option>
                    <option value="Bus">Bus Fees</option>
                </select>
            </div>

            {/* Conditional rendering based on selected fee type */}
            {selectedFeeType && (
                <div className={`${selectedFeeType.toLowerCase()}-fees`}>
                    <h3>{selectedFeeType} Fees</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="full-fees">Full Fees:</label>
                        <input
                            type="number"
                            id="full-fees"
                            name="fullFees"
                            value={feeData.fullFees}
                            onChange={handleChange}
                            placeholder="Enter full fees"
                        />
                        <label htmlFor="amount-paid">Amount Paid:</label>
                        <input
                            type="number"
                            id="amount-paid"
                            name="amountPaid"
                            value={feeData.amountPaid}
                            onChange={handleChange}
                            placeholder="Enter amount paid"
                        />
                        <label htmlFor="remaining">Remaining:</label>
                        <input
                            type="number"
                            id="remaining"
                            name="remaining"
                            value={feeData.remaining}
                            readOnly
                        />
                        <label htmlFor="due-date">Due Date:</label>
                        <input
                            type="date"
                            id="due-date"
                            name="dueDate"
                            value={feeData.dueDate}
                            onChange={handleChange}
                        />
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={feeData.notes}
                            onChange={handleChange}
                            placeholder="Enter any additional notes"
                            style={{ width: '90%' }}
                        />
                        {/* Container for buttons */}
                        <div style={{ display: 'flex', gap: '8px', maxWidth: '100%' }}>
                            {/* Update button */}
                            <button type="button" className="btn" style={{ maxWidth: '49%' }} onClick={handleUpdateClick}>Update</button>

                            {/* Generate Report button */}
                            <button type="submit" className="btn" style={{ maxWidth: '49%' }} onClick={() => generatePDF(`${selectedFeeType} Fees`, feeData)}>Generate Report</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
