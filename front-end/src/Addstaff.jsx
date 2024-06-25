

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import './css/Loder.css';

export default function Addstaff(props) {
  const [coursedata, setcoursedata] = useState([]);
  const [isShow,setIsshow] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    gender: '',
    password: '',
    ROLE_TYPE: '',
    address: '',
    course: '', 
    phoneNumber: '',
  });
  const [alredyemailexist, setalredyemailexist] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [val, setVal] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);

 // toggle password...

 const toggleState = () =>{
  setIsshow(!isShow)
}


  useEffect(() => {
    const formattedData = props.coursedata.map((course) => ({
      label: course.course_type,
      value: course.id,
    }));
    setcoursedata(formattedData);
  }, [props.coursedata]);

  const handleAddStaff = () => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.ROLE_TYPE ||
      !formData.address ||
      !formData.course ||
      !formData.phoneNumber
    ) {
      setErrorMessage('Please fill all fields');
      return;
    }
    setIsLoading(true);

    axios
      .post('http://localhost:8000/backend/admin/addstaff', formData)
      .then((res) => {
        console.log('Added successfully', res);
        const addstaff = document.getElementById('addStaffSuccessMessage');
        addstaff.style.display = 'block';
       
        setTimeout(() => {
          addstaff.style.display = 'none';
        }, 2000);

        setFormData({
          firstName: '',
          email: '',
          gender: '',
          password: '',
          ROLE_TYPE: '',
          address: '',
          course: '', // Change courses to course
          phoneNumber: '',
        });
        setalredyemailexist('');
        setErrorMessage('');
        // Trigger component update
        setVal((prevVal) => prevVal + 1);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 409) {
          setalredyemailexist(error.response.data);
        } else {
          setErrorMessage('An error occurred while adding staff');
        }
      }).finally(() => {
        // Stop loading
        setIsLoading(false);
    });
  };

  return (
    <>
      <div
        style={{
          maxWidth: '100%',
          background: 'green',
          height: '50px',
          color: 'white',
          borderRadius: '5px',
          marginTop: '-34px',
          paddingTop: '.8rem',
          paddingLeft: '.6rem',
          display: 'none',
          marginBottom: '30px',
        }}
        id='addStaffSuccessMessage'
      >
        {' '}
        Staff Added Successfully...
      </div>
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Add Staff</h3>
        <form style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} key={val}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1' }}>
              <label>First Name: </label>
              <input
                type='text'
                name='firstName'
                placeholder='Enter FirstName...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <label>Email: </label>
              <input
                type='email'
                name='email'
                placeholder='Enter Email...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p style={{ color: 'red' }}>{alredyemailexist}</p>
              <label>Gender: </label>
           <select
          name='gender'
          style={{ width: '100%', padding: '.6rem' }}
             onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
          <option value="">--Select Gender--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          </select>

              <label>Password: </label>
             
                 
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                                <input type={isShow?"text":"password"} id="typePasswordX" name="password" placeholder="Password..."  onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{width:'100%'}}/> 
                                    <div onClick={toggleState} style={{cursor:'pointer',marginLeft:'-45px',marginBottom:'4px'}}>
                                    {isShow ?<FaEyeSlash fontSize={'1.5rem'}/>:<FaRegEye fontSize={'1.5rem'} />}                                  
                                    </div>
                            </div>
            </div>

            <div style={{ flex: '1' }}>
              <label>RoleType:</label>
              <select
                name='ROLE_TYPE'
                style={{ padding: '.5rem', width: '100%', marginBottom: '10px' }}
                onChange={(e) => setFormData({ ...formData, ROLE_TYPE: e.target.value })}
              >
                <option>--Select--</option>
                <option value='Staff'>Staff</option>
              </select>
              <label>Address:</label>
              <input
                type='text'
                name='address'
                placeholder='Enter Address...'
                style={{ display: 'block', width: '100%' }}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <label>Select Class:</label>
             
<select
  name='course'
  id=''
  style={{ display: 'block', marginTop: '8px', width: '100%',padding:'0.6rem' }}
  onChange={(e) => {
    const [id, name] = e.target.value.split(','); // Split value into ID and name
    setFormData({ ...formData, courseId: id, course: name }); // Assuming courseId and courseName are fields in formData
  }}
  value={formData.courseId + ',' + formData.course} // Combine ID and name as value
>
  <option value=''>--Select--</option>
  {coursedata.map((course) => (
    <option key={course.value} value={`${course.value},${course.label}`}> {/* Combine ID and name */}
      {course.label}
    </option>
  ))}
</select>

              <label>Phone Number: </label>
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Enter Phone Number...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>
          <button
            type='button'
            style={{
              background: 'rgb(28, 66, 95)',
              width: '100%',
              padding: '0.5rem',
              margin: '15px auto',
              borderRadius: '10px',
              color: 'whitesmoke',
            }}
            onClick={(e) => handleAddStaff(e)}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isLoading ? (
            <div className='loader'></div>
        ) : (
            'Add Staff'
        )}
      </span>
          </button>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </form>
      </div>
    </>
  );
}

