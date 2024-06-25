

import { useEffect, useRef, useState } from "react";
import { FaCameraRetro, FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Updateprofile() {
  const {id} = useParams();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [singleStaffdetails, setsingleStaffdetails] = useState({});
    const fileInputRef = useRef(null);
    const [isShow, setIsShow] = useState(false);


   





    const handleFileButtonClick = () => {
        // Click the hidden file input element when the button is clicked
        fileInputRef.current.click();
    };

    const handileAvatar = (e) => {
        // Handle file selection
        const selectedFile = e.target.files[0];
        console.log(selectedFile);

    };

    
// adminprofile update...
const handleProfileChange = (e) => {
  const { name, value } = e.target;
  setsingleStaffdetails(prevState => ({
    ...prevState,
    [name]: value
  }));
};



    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Update profile picture if a new one is selected
        if (fileInputRef.current.files[0]) {
            const formData = new FormData();
            formData.append('profile', fileInputRef.current.files[0]);
              console.log( formData)
            axios.put(`http://localhost:8000/backend/staff/updateProfilePicstaff/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log('Profile picture updated successfully');
                setSuccessMessage('Profile picture updated successfully');

                setTimeout(() => {
                  setSuccessMessage('');
                }, 3000); 
            })
            .catch(err => {
                console.error('Error updating profile picture:', err);
                setError('Failed to update profile picture');
            });
           return
        }
    
        // Update other profile details
        
        axios.put(`http://localhost:8000/backend/staff/updateProfilestaff/${id}`, {singleStaffdetails})

        .then(res => {
            console.log('User updated successfully');
            setSuccessMessage('User updated successfully');
               
           setTimeout(() => {
          setSuccessMessage('');
        }, 3000); 
            
        })
        .catch(err => {
            console.error('Error updating user:', err);
            setError('Failed to update user');
        });
    };
    
    useEffect(()=>{
      
      axios.get(`http://localhost:8000/backend/staff/singlestaffdetails/${id}`)
      .then(res=>setsingleStaffdetails(res.data[0]))
      .catch(err=>console.log(err))
      },[])

    

    const toggleState = () => {
        setIsShow(!isShow);
    };

  return (
    <div style={{ padding: '1rem', maxWidth: '32rem', margin: '0 auto' }}>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', margin: '2rem 0' }}>Profile</h1>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {singleStaffdetails.profile ? (
        <img src={`http://localhost:8000/files/${singleStaffdetails.profile}`} alt="Profile" style={{ width: '5rem', height: '5rem', borderRadius: '50%', marginRight: '10px', marginBottom: '-30px' }} />
    ) : (
        <button type='button' onClick={handleFileButtonClick} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', alignSelf: 'center', padding: 0 }}>
            <FaCameraRetro style={{ color: 'white', fontSize: '2rem' }} />
        </button>
    )}
</div>

    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgb(28, 66, 95)', padding: '1rem', borderRadius: '0.5rem' }}>

        <input type="file" onChange={handileAvatar} hidden accept='image/*' ref={fileInputRef} />
        <button type='button' onClick={handleFileButtonClick} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', alignSelf: 'center', padding: 0 }}>
            <FaCameraRetro style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }} />
        </button>

        <input type='text' placeholder='Username...' style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', width: '100%' }} name='first_name' value={singleStaffdetails.first_name}  onChange={handleProfileChange} required />
        <input type='email' placeholder='Email...' style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', width: '100%' }} name='email' value={singleStaffdetails.email}  onChange={handleProfileChange} readOnly/>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input type={isShow ? "text" : "password"} id="typePasswordX" name="password" placeholder="Enter Password..." style={{ width: '100%' }} onChange={handleProfileChange} required />
            <div onClick={toggleState} style={{ cursor: 'pointer', marginLeft: '-45px', marginBottom: '4px' }}>
                {isShow ? <FaEyeSlash fontSize={'1.5rem'} /> : <FaRegEye fontSize={'1.5rem'} />}
            </div>
        </div>
        <button type='submit' style={{ backgroundColor: '#607D8B', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>
            Update
        </button>
    </form>
    {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <span style={{ color: 'red', cursor: 'pointer' }}>Delete</span>
        <span style={{ color: 'red', cursor: 'pointer' }}>Sign Out</span>
    </div> */}
    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    {successMessage && <p style={{ color: '#4CAF50',marginTop:'20px',display: successMessage ? 'block' : 'none'}} id="successMessage">{successMessage}</p>}
</div>
  );
}
