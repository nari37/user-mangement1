

// import React, { useState } from 'react';
// import { Envelope } from 'react-bootstrap-icons'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './css/Login.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaEyeSlash, FaRegEye } from 'react-icons/fa';

// export default function Login() {
//     const Nav = useNavigate();
//     const [data, setData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [isShow,setIsshow] = useState('');


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData((prevState) => ({ ...prevState, [name]: value }));
//         setError(''); // Clear any previous error message when user types
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Clear previous error
//         setError('');
        
//         // Try Admin login first
//         try {
//             const res = await axios.post('http://localhost:8000/backend/admin/adminlogin', data, {
//                 withCredentials: true
//             });
        
//             if (res.data.ROLE_TYPE === 'Admin') {
//                 alert('Logged in successfully as Admin');
//                 Nav('/admin');
//                 return; // Exit function early upon successful login
//             }
//         } catch (error) {
//             // Handle admin login error
//             if (error.response && error.response.status === 401) {
//                 setError('Invalid admin credentials. Please check your email and password.');
//             } else {
//                 setError('An error occurred during admin login. Please try again later.');
//             }
//         }
        
//         // Try Student login
//         try {
//             const res = await axios.post('http://localhost:8000/backend/student/studentlogin', data, {
//                 withCredentials: true
//             });
        
//             if (res.data.ROLE_TYPE === 'Student') {
//                 alert('Logged in successfully as Student');
//                 localStorage.setItem('StudentDetails', JSON.stringify(res.data));              
//                 Nav(`/student/${res.data.id}`);
//                 return; // Exit function early upon successful login
//             }
//         } catch (error) {
//             // Handle student login error
//             if (error.response && error.response.status === 401) {
//                 setError('Invalid student credentials. Please check your email and password.');
//             } else {
//                 setError('An error occurred during student login. Please try again later.');
//             }
//         }

//         // Try Staff login
//         try {
//             const res = await axios.post('http://localhost:8000/backend/staff/stafflogin', data, {
//                 withCredentials: true
//             });
        
//             if (res.data.ROLE_TYPE === 'Staff') {
//                 alert('Logged in successfully as Staff');
//                 localStorage.setItem('StaffDetails', JSON.stringify(res.data));
//                 Nav(`/staff/${res.data.id}`);
//                 return; // Exit function early upon successful login
//             }
//         } catch (error) {
//             // Handle staff login error
//             if (error.response && error.response.status === 401) {
//                 setError('Invalid staff credentials. Please check your email and password.');
//             } else {
//                 setError('An error occurred during staff login. Please try again later.');
//             }
//         }
//     };
    


//     const toggleState = () =>{
//           setIsshow(!isShow)
//     }






//     return (
//         <div>
//             <center><h1 style={{color:'rgb(28, 66, 95)',marginTop:'7rem'}}>Student Management-System HippoCloud</h1></center>
//             <div className="login-container">  
//                 <div className="login-form-container" style={{maxWidth:'400px'}}>
//                     <form onSubmit={handleSubmit} >     
//                         <div className="form-group">    
//                             <label htmlFor="email">Email:</label>
//                             <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
//                                 <input type="email" id="email" name="email" autoComplete='off' placeholder="Enter your email..." onChange={handleChange} value={data.email} style={{width:'100%'}}/>  
//                                 <span><Envelope size={25} style={{marginLeft:'-45px',marginBottom:'10px'}} className="me-2" /></span>
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password">Password:</label>
//                             <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
//                                 <input type={isShow?"text":"password"} id="typePasswordX" name="password" placeholder="Enter your password..." onChange={handleChange} value={data.password} style={{width:'100%'}}/> 
//                                     <div onClick={toggleState} style={{cursor:'pointer',marginLeft:'-45px',marginBottom:'10px'}}>
//                                     {isShow ?<FaEyeSlash fontSize={'1.5rem'} className='eyeicon'/>:<FaRegEye fontSize={'1.5rem'} className='eyeicon'/>}                                  
//                                     </div>
//                             </div>
//                         </div>
//                         {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if exists */}
//                         <div className="form-group">
//                             <button type="submit" className='btn btn-primary' style={{background:'rgb(28, 66, 95)', width:'100%'}}>Login</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }












import React, { useState } from 'react';
import { Envelope } from 'react-bootstrap-icons'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';

export default function Login() {
    const Nav = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isShow,setIsshow] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
        setError(''); // Clear any previous error message when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous error
        setError('');
        
        // Try Admin login first
       
             axios.post('http://localhost:8000/backend/admin/adminlogin', data, {
                withCredentials: true
            }).then((res)=>{
                if(res.data.ROLE_TYPE === 'Admin'){
                    alert('Logged in successfully as Admin');
                    Nav('/admin');
                    return
                }else{ 
                        alert('Admin login error');               
                }
            })
        
            
        
        // Try Student login
        
         axios.post('http://localhost:8000/backend/student/studentlogin', data, {
                withCredentials: true
            }).then((res)=>{
                if (res.data.ROLE_TYPE === 'Student') {
                    alert('Logged in successfully as Student');
                    localStorage.setItem('StudentDetails', JSON.stringify(res.data));              
                    Nav(`/student/${res.data.id}`);
                    return; // Exit function early upon successful login
                }else{
                    alert('Student login err');
                }
            })

            

        // Try Staff login
     
             axios.post('http://localhost:8000/backend/staff/stafflogin', data, {
                withCredentials: true
            }).then((res)=>{
                if (res.data.ROLE_TYPE === 'Staff') {
                    alert('Logged in successfully as Staff');
                    localStorage.setItem('StaffDetails', JSON.stringify(res.data));
                    Nav(`/staff/${res.data.id}`);
                    return; // Exit function early upon successful login
                }else{
                    alert('Staff login err');
                }
            })
            
    }
    


    const toggleState = () =>{
          setIsshow(!isShow)
    }






    return (
        <div>
            <center><h1 style={{color:'rgb(28, 66, 95)',marginTop:'7rem'}}>Student Management-System HippoCloud</h1></center>
            <div className="login-container">  
                <div className="login-form-container" style={{maxWidth:'400px'}}>
                    <form onSubmit={handleSubmit} >     
                        <div className="form-group">    
                            <label htmlFor="email">Email:</label>
                            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                                <input type="email" id="email" name="email" autoComplete='off' placeholder="Enter your email..." onChange={handleChange} value={data.email} style={{width:'100%'}}/>  
                                <span><Envelope size={25} style={{marginLeft:'-45px',marginBottom:'10px'}} className="me-2" /></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                                <input type={isShow?"text":"password"} id="typePasswordX" name="password" placeholder="Enter your password..." onChange={handleChange} value={data.password} style={{width:'100%'}}/> 
                                    <div onClick={toggleState} style={{cursor:'pointer',marginLeft:'-45px',marginBottom:'10px'}}>
                                    {isShow ?<FaEyeSlash fontSize={'1.5rem'} className='eyeicon'/>:<FaRegEye fontSize={'1.5rem'} className='eyeicon'/>}                                  
                                    </div>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if exists */}
                        <div className="form-group">
                            <button type="submit" className='btn btn-primary' style={{background:'rgb(28, 66, 95)', width:'100%'}}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}






