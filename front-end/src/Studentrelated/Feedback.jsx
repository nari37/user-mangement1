import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { RiChatSmile3Fill } from "react-icons/ri";

export default function Feedback({Studentdetails}) {
    // State to track star rating
    const [rating, setRating] = useState(0);

    // State to track written review
    const [review, setReview] = useState('');
   
    

    // Function to handle star rating click
    const handleStarClick = (star) => {
        setRating(star);
    };

    // Function to handle review input change
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data to be sent in the POST request
        const data = {
            rating,
            review,
            sendby: Studentdetails.first_name,
        };
        console.log(data)
        
        try {
            // Send POST request to the server
            const response = await axios.post('http://localhost:8000/backend/student/studentfeedback', data);
            
            // Log the server response
            console.log(response.data);

            // Clear the form fields after successful submission
            setRating(0);
            setReview('');

            // Optionally, you could show a success message to the user
            Swal.fire({
                title: "Feedback",
                text: "Response send successfully",  
                icon: "success",       
                confirmButtonColor: "rgb(28, 66, 95)"
            });
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error submitting feedback:', error);

            // Optionally, you could show an error message to the user
            alert('Failed to submit feedback. Please try again.');
        }
    };


    return (
        <div style={{ padding: '1rem' }}>
            <center style={{ margin: '20px' }}>
                <h2 style={{color:'rgb(28, 66, 95)'}}>Feedback <RiChatSmile3Fill /></h2>
            </center>
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: '600px', // Adjust the width as needed
                    margin: '0 auto',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    borderRadius: '8px',
                }}
            >
                {/* Star rating */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleStarClick(star)}
                            style={{
                                fontSize: '2rem',
                                color: star <= rating ? '#FFD700' : '#ccc', // Yellow for selected stars
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                        >
                            &#9733; {/* Unicode character for star */}
                        </span>
                    ))}
                </div>

                {/* Review textarea */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Write your review:
                    </label>
                    <textarea
                        value={review}
                        onChange={handleReviewChange}
                        placeholder='Write review...'
                        style={{ width: '100%', padding: '0.5rem', height: '100px' }}
                        required
                    />
                </div>

                {/* Submit button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '0.7rem',
                            backgroundColor: 'rgb(28, 66, 95)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '30%', // Adjust width as needed
                        }}
                       
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
}
