
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Managestudent from './Managestudent';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import './css/Loder.css';


export default function Addstudent(props) {
  const [coursedata, setcoursedata] = useState([]);
  const [isShow,setIsshow] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    gender: '',
    password: '',
    ROLE_TYPE: '',
    address: '',
    courses: [],
    phoneNumber: '',
  });
  const [val, setval]=useState(0);
  const [alredyemailexist, setalredyemailexist] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(''); // State for storing selected course ID
  const nav =useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const formattedData = props.coursedata.map((course) => ({
      label: course.course_type,
      value: course.id,
    }));
    setcoursedata(formattedData);
  }, [props.coursedata]);

  const handleAddStudent = () => {
    if (
      formData.firstName === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.gender === '' ||
      formData.ROLE_TYPE === '' ||
      formData.address === '' ||
      selectedCourseId === '' || // Use selectedCourseId from state
      formData.phoneNumber === ''
    ) {
      setErrorMessage('Please fill all fields');
      return;
    }
    setIsLoading(true);
    // Update formData with selectedCourseId
    setFormData({ ...formData, courses: [{ value: selectedCourseId, label: '' }] });

    axios
      .post('http://localhost:8000/backend/admin/addstudent', formData)
      .then((res) => {
        console.log('Added successfully', res);
        const addstudent = document.getElementById('addstudent');
        addstudent.style.display = 'block';
       
        setTimeout(() => {
          addstudent.style.display = 'none';
        }, 2000);
        setval(val+1)
        setFormData({
          firstName: '',
          email: '',
          gender: '',
          password: '',
          ROLE_TYPE: '',
          address: '',
          courses: '', // Reset courses to an empty array
          phoneNumber: '',
        });
        setSelectedCourseId('');
        nav(<Managestudent/>);
        if (res.status === 409) {
          setalredyemailexist(res.data) 
         
        }
      
      })
      .catch((error) => {
        console.error('Error:', error);
      }).finally(() => {
        // Stop loading
        setIsLoading(false);
    });
  };


    // toggle password...
    const toggleState = () =>{
      setIsshow(!isShow)
}
  return (
    <>
      <div style={{ maxWidth: '100%', background: 'green', height: '50px', color: 'white', borderRadius: '5px', marginTop: '-34px', paddingTop: '.8rem', paddingLeft: '.6rem', display: 'none', marginBottom: '30px' }} id='addstudent'>
       Student Added Successfully..
      </div>
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }} >
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Add Student</h3>
        <form style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} key={val}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1' }}>
              <label>First Name: </label>
              <input type='text' name='firstName' placeholder='Enter FirstName...' style={{ width: '100%' }} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
              <label>Email: </label>
              <input type='email' name='email' placeholder='Enter Email...' style={{ width: '100%' }} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <p style={{ color: 'red' }}>{alredyemailexist}</p>
              <label>Gender: </label>
              <select name='gender' style={{ width: '100%', padding:'0.6rem' }} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value=''>-- Select Gender --</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
             
                    <label>Password: </label>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                                <input type={isShow?"text":"password"} id="typePasswordX" name="password" placeholder="Password..." onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{width:'100%'}}/> 
                                    <div onClick={toggleState} style={{cursor:'pointer',marginLeft:'-45px',marginBottom:'4px'}}>
                                    {isShow ?<FaEyeSlash fontSize={'1.5rem'}/>:<FaRegEye fontSize={'1.5rem'} />}                                  
                                    </div>
                            </div>
           
            </div>
            <div style={{ flex: '1' }}>
              <label>RoleType:</label>
              <select name='ROLE_TYPE' id='' style={{ padding: '.5rem', width: '100%', marginBottom: '10px' }} onChange={(e) => setFormData({ ...formData, ROLE_TYPE: e.target.value })} >
                <option>--Select--</option>
                <option value='Student'>Student</option>
              </select>
              <label>Address:</label>
              <input type='text' name='address' placeholder='Enter Address...' style={{ display: 'block', width: '100%' }} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              <label >Select Class:</label>
              <select
                name='courses'
                id=''
                style={{ display: 'block', width: '100%', marginTop: '8px',padding:'0.7rem'}}
                onChange={(e) => {
                  const courseId = e.target.value;
                  setSelectedCourseId(courseId);
                  setFormData({ ...formData, courses: [{ value: courseId, label: e.target.options[e.target.selectedIndex].text }] });
                }}
                value={selectedCourseId}
              >
                <option value='' disabled>-- Select Class --</option>
                {coursedata.map(course => (
                  <option key={course.value} value={course.value} >
                    {`${course.label}`}
                  </option>
                ))}
              </select>
              <label>Contact Number:</label>
              <input type='tel' name='phoneNumber' placeholder='Enter Phone Number...' style={{ display: 'block', width: '100%' }} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
            </div>
          </div>
          <button type='button' style={{ background: 'rgb(28, 66, 95)', width: '100%', padding: '0.5rem', margin: '15px auto', borderRadius: '10px', color: 'whitesmoke' }} onClick={(e) => handleAddStudent(e)}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isLoading ? (
            <div className='loader'></div>
        ) : (
            'Add Student'
        )}
      </span>
            </button>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>} {/* Display error message if any */}
        </form>
      </div>
    </>
  );
}



