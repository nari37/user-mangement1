
import React, { useEffect, useMemo, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { ImUserTie } from "react-icons/im";
import { IoIosHome } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin5Line, RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import { FaBookmark, FaEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

import './css/Admin.css';   
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Addstaff from './Addstaff';
import Addstudent from './Addstudent';
import Managestudent from './Managestudent';
import Addsubject from './Addsubject';
import Mangesubject from './Mangesubject';
import { Button, Modal } from 'react-bootstrap';
import Managestaff from './Managestaff';
import Adminhomepage from './Adminhomepage';
import Notifystaff from './Notifystaff';
import Notifystudent from './Notifystudent';
import Cookies from 'js-cookie';
import { BiEdit } from 'react-icons/bi';

import ApproveStaffleaves from './leaves/ApproveStaffleaves';
import Assignsubject from './Assignsubject';
import Addfinancier from './Addfinancier';
import Managefinacier from './Managefinacier';

export default function Admin() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [course, setCourse] = useState({course:''});
  const [coursedata, setCoursedata] = useState([]);
  const [singlecoursedata, setsinglecoursedata] = useState({});
  const [editedClassData, setEditedClassData] = useState({});
  // profileupdate state..
  const [profileData, setprofileFormData] = useState({
    first_name: '',
    email: '',
    gender: '',
    password: '',
    address: '', 

  });
  
   const [avatarfile, setAvatarfile] = useState(null);

   const [admindetails, setAdmindetails] = useState({});

    
    const [isShow,setIsshow] = useState('');


    const adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
  //  const FirstName = adminDetails.data[0].first_name
  

 // Define state for managing modal visibility, selected course, and course type
 // State for managing modal visibility, course data, and edited course type
 const [showModal, setShowModal] = useState(false);
 const [courseData, setCourseData] = useState([]);
 const [editedCourse, setEditedCourse] = useState({ id: null, courseType: '' });
// console.log(adminDetails)


// Function to handle opening modal for editing course
const handleEditCourse = (item) => {
  setEditedCourse({ id: item.id, courseType: item.course_type });
  setShowModal(true);
};

// Function to handle closing modal
const handleCloseModal = () => {
  setShowModal(false);
  setEditedCourse({ id: null, courseType: '' });
};


 // Function to handle saving changes to the course
 const editClass = (id) => {
 console.log(id)
  axios.put(`http://localhost:8000/backend/admin/updateclass/${id}`,editedCourse)
  .then(res=>console.log(res.data))
  console.log('Editing class with id:', id);
  
  // After completing the edit, close the modal
  handleCloseModal();
};

 



useEffect (()=>{
  axios.get('http://localhost:8000/backend/admin/getclasslist')
  .then(res=>setCoursedata(res.data))
},[coursedata])


   

  // console.log(adminDetails)
  useEffect(() => {
  axios.get(`http://localhost:8000/backend/admin/getadmindetails`)
    .then(res => {
      if (res.data && res.data.length > 0) {
        setAdmindetails(res.data[0]); // Assuming admin details are stored as an array and you want the first item
        localStorage.setItem('adminDetails', JSON.stringify(res.data[0]));
      }
    })
    .catch(err => console.log(err));
}, []);

  


// adminprofile update...
const handleProfileChange = (e) => {
  const { name, value } = e.target;
  setAdmindetails(prevState => ({
    ...prevState,
    [name]: value
  }));
};


const handileAvatar = (e)=>{
 const selectedAvatarfile = e.target.files[0];
 setAvatarfile(selectedAvatarfile)
 console.log('slected avatar:',selectedAvatarfile)
}

const updateadmin = (id) => {
 const adminid = id;
  const formDatatosend = new FormData();
   console.log(admindetails)

   for(const key in admindetails ){
    formDatatosend.append(key, admindetails[key])
   }

   console.log('ahsuahs',formDatatosend)


   // Append avatar file
  if (avatarfile) {
    formDatatosend.append('file', avatarfile);
  }
  axios.put(`http://localhost:8000/backend/admin/adminupdateprofile/${adminid}`, formDatatosend, {
    headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for form data
    },
   
})
    .then(res => {
      console.log(res)
      // alert('updated successfully..')
      const adminupdatemessege = document.getElementById('updateadmin');
      adminupdatemessege.style.display = 'block'
      setTimeout(()=>{
        adminupdatemessege.style.display = 'none'
      },2000)
   
    })
    .catch(err => console.log(err));
}






//  console.log(singlecoursedata)
// get single course...
// console.log(course)
  const handleLinkClick =  (link, courseid) => {
    setActiveLink(link);
   
    if (courseid) {
      axios.get(`http://localhost:8000/backend/admin/singlecourse/${courseid}`)
        .then((res) => setsinglecoursedata(res.data.results[0]))
        .catch((error) => {
          console.error('Error fetching single course data:', error);
        });
        return
    }
  };
// coursedit state..


// update single course...
const updatecourse = () => {
 
  const editClassId = singlecoursedata.id; // Assuming singlecoursedata contains the data of the class being edited
  if (!editedClassData || !editedClassData.course_type) {
    alert('Please enter class details');
    return;
  }
  axios.post(`http://localhost:8000/backend/admin/editclass/${editClassId}`, editedClassData)
    .then((res) => {
      console.log(res);
      // Show success message or handle response
      // For example, show a success message to the user
      const editClassElement = document.getElementById('editclass');
      editClassElement.style.display = 'block';
      setTimeout(() => {
        editClassElement.style.display = 'none';
        setActiveLink('Manage Course'); // Redirect to the manage course section after editing
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      // Handle error response
      alert('Edit Failed');
    });
};
//  add or post course...
const addcourse = ()=>{
  if(!course.course){
    alert('Adding Faild');
    return
  }
     axios.post('http://localhost:8000/backend/admin/addcourse',course)
     .then((res)=>{
      console.log(res)
     
      // alert('Added Successfully') 
      
    const addCourseElement = document.getElementById('addcourse');
  
    addCourseElement.style.display = 'block';
   setTimeout(() => {
     addCourseElement.style.display = 'none'; 
     setActiveLink('Manage Course')    
 }, 2000);

 setCourse({course:''});
 
     }).catch((err) =>{
       console.log(err)
       alert('Adding Faild')
     })
}
// delete course...
const deletecourse = (id,e) => {
  e.preventDefault();
  const shouldDelete = window.confirm('Are you sure you want to delete');
  if(shouldDelete){
  axios.post(`http://localhost:8000/backend/admin/deletecourse/${id}`)
      .then((res) => {
          console.log(res);
          const deleteCourseElement = document.getElementById("deletecourse");
          deleteCourseElement.style.display = 'block';
          setTimeout(() => {
            deleteCourseElement.style.display = 'none';
            setActiveLink('Manage Course')         
        },1000);
       
      })
      .catch((err) => {
          console.log(err);
       
      });
    } else{
      console.log('Deletion cancelled by user');
    
    }
};



  // go to editcourse page..
  const inputeditcourse = (e) =>{
    const { name, value} = e.target;
    setsinglecoursedata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  


//   ... subcourse...
   const Subcourses = () => {
      let subdrop = document.getElementById('subcourse');
      if(subdrop.style.display === 'none'){
        subdrop.style.display = 'block';
      }else{
        subdrop.style.display = "none";
      }
   }
//    .....

const subsubject = ()=>{
    let subdrop2 = document.getElementById('subsubject')
    if(subdrop2.style.display === 'none'){
        subdrop2.style.display = 'block'
    }else{
        subdrop2.style.display = 'none'
    }
}
// ....

const subsession = () =>{
    let subdrop3 = document.getElementById('subsession')
    if(subdrop3.style.display === 'none'){
        subdrop3.style.display = 'block'
    }else{
        subdrop3.style.display = 'none'
    }
}


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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const menuclose = () =>{
    setSidebarOpen(false);
  }
 
  // ......

 
  

// logout funtion....

const handleLogout = () =>{
  const confirmed = window.confirm('Are you sure you want to logout?')
  if(confirmed){
    // localStorage.removeItem('jwtToken');
    // Cookies.remove('jwtToken')
    localStorage.clear();
    axios.get('http://localhost:8000/backend/admin/logout')
    .then(res =>{
      if(res.data.Status === "Success"){        
        navigate('/');
      }
    })
   
  }
}

// Function to handle clicking on the "Leave" option
const handleLeaveClick = () => {
  let leaveDropdown = document.getElementById('leave-options');
  if (leaveDropdown.style.display === 'none') {
    leaveDropdown.style.display = 'block';
  } else {
    leaveDropdown.style.display = 'none';
  }
};
// Function to handle clicking on the "Notify" option
const handleNotifyClick = () => {
  let notifyDropdown = document.getElementById('notify-options');
  if (notifyDropdown.style.display === 'none') {
    notifyDropdown.style.display = 'block';
  } else {
    notifyDropdown.style.display = 'none';
  }
};
// Function to handle clicking on the "staff" option

const handleStaffClick = ()=>{
 const staffDropdown = document.getElementById('staff-options');
 if (staffDropdown.style.display === 'none'){
  staffDropdown.style.display ='block';
 }else{
  staffDropdown.style.display ='none';
 }
}

// Function to handle clicking on the "student" option

const handleStudentClick = ()=>{
  const studentDropdown = document.getElementById('student-options');
  if (studentDropdown.style.display === 'none'){
    studentDropdown.style.display ='block';
  }else{
    studentDropdown.style.display ='none';
  }
 }

 
// Function to handle clicking on the "feedback" option

const handlefeedbackClick = ()=>{
  const feedbackDropdown = document.getElementById('feedback-options');
  if (feedbackDropdown.style.display === 'none'){
    feedbackDropdown.style.display ='block';
  }else{
    feedbackDropdown.style.display ='none';
  }
 }

//  togglepassword...

const toggleState = () =>{
  setIsshow(!isShow)
}

function closesidebar(){
  setSidebarOpen(false);
}
// profile get...




// console.log(admindetails)

  const renderContent = () => {

    switch (activeLink) {
      case 'Update':
        return (
          <>
          <div style={{maxWidth:'100%',background:'green',height:'50px',color:'white',borderRadius:'5px',marginTop:'-34px',paddingTop:'.8rem',paddingLeft:'.6rem',display:'none',marginBottom:'30px'}} id='updateadmin'>Profile Updated Successfully</div>  
          <div style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',maxWidth:'70%',margin:'10px auto',borderRadius:'5px',overflow:'hidden'}}>
          <h3 style={{background:'rgb(50, 48, 48)',padding:'1rem',color:'white'}} >Update Profile</h3>
         
 <form style={{ padding: '1rem'}}  >
 {/* Render form fields without relying on admindetails[0] */}
 <label>
   First Name:
  <input
  type="text"
  name="first_name"
  placeholder='Enter FirstName...'
  onChange={handleProfileChange}
  value={admindetails.first_name || ''} // Use admindetails.first_name
  style={{ width: '100%' }}
/>
 </label>
    <label>
      Email:
      <input
        type="email" width="100%"
        name="email"
        placeholder='Enter Email...'
        onChange={ handleProfileChange}
        value={admindetails.email || ''}
        style={{width:'100%'}}
      />
    </label>
    <label>
      Gender:
      <input
        type="text"
        name="gender"
        placeholder='Gender...'
        onChange={handleProfileChange}
        value={admindetails.gender || ''}
        style={{display:'block',width:'100%'}}
      />
    </label>

    <label> Password:
    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
      <input
      type={isShow?"text":"password"}
        name="password"
        value={admindetails.password || ''}
        placeholder='Enter Password...'
        onChange={ handleProfileChange}
        style={{display:'block',width:'100%'}}
        
      />
     <div onClick={toggleState} style={{cursor:'pointer',marginLeft:'-45px',marginBottom:'5px'}}>
    {isShow ?<FaEyeSlash fontSize={'1.5rem'}/>:<FaRegEye fontSize={'1.5rem'} />} 
    </div>

     </div>
     </label>
     <label>
      Profile:
    <input type="file" onChange={(e) => handileAvatar(e)}  style={{display:'block',width:'100%'}} />
    </label>
    <label>
      Address:  
    <input
      type="text"
      name="address"
      placeholder="Enter Address..."
      onChange={handleProfileChange}
      value={admindetails.address}
      style={{display:'block',width:'100%'}}
    />
    </label>

    <button
      type="button"
      onClick={() => updateadmin(admindetails.id)}
      style={{background:'rgb(28, 66, 95)',width:'100%',padding:'0.5rem',margin:'10px auto',borderRadius:'10px',color:'whitesmoke'}}
    >
      Update
    </button>
  </form>


          
        </div>
        </>
      );
      
        case 'Add Class':
            return (
              <>
              <div style={{maxWidth:'100%',background:'green',height:'50px',color:'white',borderRadius:'5px',marginTop:'-34px',paddingTop:'.8rem',paddingLeft:'.6rem',display:'none',marginBottom:'30px'}} id='addcourse'>Class created Successfully...</div>

                <div style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',maxWidth:'130%',}} >
                <h3 style={{background:'rgb(50, 48, 48)',padding:'1rem',color:'white'}}>Create Class</h3>
                <form style={{padding:'1rem',}} >
               <label style={{display:'block'}}>
               </label>
                    Class Name:
                    <input
                      type="text"
                      
                      onChange={e =>setCourse({...course, course:e.target.value})}
                      style={{marginBottom:'10px',width:'100%'}} 
                      placeholder='Add Class...'             
                    />
                
                  <button type="button" style={{background:'rgb(28, 66, 95)',width:'80%',padding:'0.5rem',margin:'10px auto',borderRadius:'10px',color:'whitesmoke'}} onClick={addcourse} >
                    Submit
                  </button>
                </form>
              </div>
              </>
            );
            case 'Manage Course':
                return ( 
      <>
      {/* Render course details table */}
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' , }}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Class Details</h3>
        <form style={{ padding: '1rem',maxHeight: '400px', overflowY: 'scroll'  }}>
          <table style={{ textAlign: 'center', borderCollapse: 'collapse', border: '1px solid black'  }} border={2}>
            {/* Table headers */}
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>S.No</th>
                <th>Class Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Table body with course data */}
              {coursedata.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '20px' }}>{index + 1}</td>
                  <td>{item.course_type}</td>
                  <td style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    {/* Edit button with onClick handler */}

                    <BiEdit  onClick={() => handleEditCourse(item)} fontSize={'1.3rem'} cursor={'pointer'} style={{ marginRight: '20px' }} />
                    


                    {/* Delete button */}

                    <RiDeleteBin5Line fontSize={'1.3rem'} cursor={'pointer'}  onClick={(e) => deletecourse(item.id, e)}/>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>

     {/* Modal for editing course */}
     <Modal show={showModal} onHide={handleCloseModal} style={{ margin: '200px 0 0 0' }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input field for editing course type */}
          <input
            type="text"
            value={editedCourse.courseType}
            onChange={(e) => setEditedCourse({ ...editedCourse, courseType: e.target.value })}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {/* Save changes button */}
          <Button variant="primary" onClick={() => editClass(editedCourse.id)} style={{ background: 'rgb(28, 66, 95)' }}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
          
                );
           case 'Assgin Subjects':
            return(
            <>
            <Assignsubject/>
            </>
            )


                case 'editclass':
                  return (
                    <>
                    <div style={{maxWidth:'100%',background:'green',height:'50px',color:'white',borderRadius:'5px',marginTop:'-34px',paddingTop:'.8rem',paddingLeft:'.6rem',display:'none',marginBottom:'30px'}} id='editclass'> Edited Successfully</div>
                    <div style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'}}>
                    <h3 style={{background:'#263043',padding:'1rem',color:'white'}}>Edit Course</h3>
                    <div style={{padding:'1rem'}} >
                 <input type="text"   name="course_type"  style={{width:"100%",marginBottom:'20px'}}  value={singlecoursedata.course_type} onChange={inputeditcourse} />
                 <center><button onClick={updatecourse} style={{background:'rgb(28, 66, 95)',maxWidth:'40%',margin:'1rem auto',borderRadius:'20px'}}>Edit Course</button></center>
                    </div>
                  </div>
                  </>
                  )
                
        case 'Add Subject':
        return (
          <Addsubject />
        );
        case 'Manage Subject':
        return (
         <Mangesubject/>
        );
        case 'Add Session':
            return (
              <div style={cardStyle}>
                <h3>Add Sessions</h3>          
              </div>
            );
            case 'Manage Session':
                return (
                  <div style={cardStyle}>
                    <h3>Manage Session</h3>          
                  </div>
                );
            case 'Add Staff':
                return (
                 <>
                 <Addstaff coursedata = {coursedata}/>
                 </>
                  
                );
                case 'Manage Staff':
                    return (
                     
                      <Managestaff/>
                    );
                    case 'Add Student':
                        return (
                          <>
                          <Addstudent  coursedata = {coursedata}/>
                          </>
                        );
                        case 'Manage Student':
                        return (
                          <>
                          <Managestudent/>
                          </>
                        );
                        case 'Notify Student':
                        return (
                          // <div style={cardStyle}>
                          //   <h3>Notify student</h3>          
                          // </div>
                          <Notifystudent adminDetails={adminDetails}/>
                        );
                        case 'Notify Staff':
                        return (
                          // <div style={cardStyle}>
                          //   <h3>Notify staff</h3>          
                          // </div>

                          <Notifystaff  adminDetails={adminDetails}/>
                        );
                        
                        case 'Student Feedback':
                        return (
                          <div style={cardStyle}>
                            <h3>Student Feedback</h3>          
                          </div>
                        );
                        case 'Staff Feedback':
                        return (
                          <div style={cardStyle}>
                            <h3>Staff Feedback</h3>          
                          </div>
                        );
                        case 'Staff Leave':
                            return (                           
                              <ApproveStaffleaves />
                            );
                            case 'Add Financier':
                                return (
                                 <Addfinancier/>
                                ); 
                                case 'Manage Financier':
                                  return (
                                   <Managefinacier/>
                                  ); 
                                                                           
            case 'LogOut':
              return (
                <div style={cardStyle}  >
                  <h3 >LogOut</h3>        
                </div>
              );
      
      default:
        return (
    <Adminhomepage/>
        );
    }
  };

  return (
    <>
    <div className='main' style={{height:'100%'}}>
      
      <div className={isSidebarOpen?'sidebaropen':'sidebarclose'} id='mysidebar' style={{height:'100%'}}>
      <div style={{ height:'100%', overflowY: 'scroll',maxHeight:'100vh' ,}}>
        <div style={{display:'flex',alignItems:'center',padding:'0rem 1rem',justifyContent:'space-around'}} ><span style={{fontSize:'2rem'}} ><RiUserSettingsLine style={{marginLeft:'-10px'}} /></span><h5 style={{marginLeft:'-10px',marginBottom:'-10px'}}>Admin Panel</h5><GrClose style={{fontSize:'2.3rem',background:'#00224D',padding:'0 4px',borderRadius:'4px',display:'none',marginTop:'10px',marginRight:'-17px',cursor:'pointer'}} id='closeadmin' onClick={closesidebar}/></div>
        <hr></hr>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0rem 1rem' }}>
  {admindetails.profile ? (
    <img src={`http://localhost:8000/files/${admindetails.profile}`} alt="Profile" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '10px' }} />
  ) : (
    <CgProfile style={{ fontSize: '2rem', marginRight: '10px' }} />
  )}
  <h5 style={{ marginBottom: '-10px' }}>{admindetails.first_name}</h5>
</div>

        <hr></hr>
        <div className='sidebar-list' >
        <ul>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={handleLinkClick}><IoIosHome style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}} />Home</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={() => handleLinkClick('Update')}><ImProfile style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}} />Update Profile</li>
       




          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer', display: 'flex', justifyContent: 'space-between'}} onClick={handleStudentClick}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <MdPersonAddAlt1 style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Student</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem'}}><MdOutlineArrowDropDown /></span>
</li>

  <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='student-options'>
    <li onClick={() => handleLinkClick('Add Student')} >Add Students</li>
    <li onClick={() => handleLinkClick('Manage Student')}>Manage Students</li>
    {/* Add more studnet options here if needed */}
  </ul>



     
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer', display: 'flex', justifyContent: 'space-between'}} onClick={handleStaffClick}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <MdManageAccounts style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Staff</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem'}}><MdOutlineArrowDropDown /></span>
</li>

  <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='staff-options'>
    <li onClick={() => handleLinkClick('Add Staff')} >Add Staff</li>
    <li onClick={() => handleLinkClick('Manage Staff')}>Manage Staff</li>
    <li onClick={() => handleLinkClick('Add Financier')} >Add Financier</li>
    <li onClick={() => handleLinkClick('Manage Financier')}>Manage Financier</li>
    {/* Add more staff options here if needed */}
  </ul>



           <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer',alignItems:'center',display:'flex', justifyContent: 'space-between'}} onClick={Subcourses}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    <FaBookmark style={{fontSize:'1.3rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Class</span>
     </div>
    <span style={{marginLeft:'45px',fontSize:'1.6rem',marginRight:'-3px'}}><MdOutlineArrowDropDown  /></span>
      </li>
          <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none',transition:'1s'}} id='subcourse' >
            <li onClick={() => handleLinkClick('Add Class')} >Add Class</li>
            <li onClick={() => handleLinkClick('Manage Course')}>Manage Class</li>
            {/* <li onClick={() => handleLinkClick('Assgin Subjects')}>Assgin Subjects</li> */}

            {/*  Add more Class options here if needed   */}
          </ul>


          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer',alignItems:'center',display:'flex', justifyContent: 'space-between'}} onClick={subsubject}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <IoBookSharp style={{fontSize:'1.3rem',marginRight: '0.5rem',marginBottom:'3px'}} />
    <span>Subject</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem'}}><MdOutlineArrowDropDown style={{marginRight:'-4px',position:'relative'}} /></span>
</li>

          <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='subsubject' >
            <li onClick={() => handleLinkClick('Add Subject')} >Add Subject</li>
            <li onClick={() => handleLinkClick('Manage Subject')}> Subject Details</li>
             {/* Add more Subject options here if needed */}
          </ul>
   

  <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer', display: 'flex', justifyContent: 'space-between'}} onClick={handleNotifyClick}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <AiOutlineNotification style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Notify</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem'}}><MdOutlineArrowDropDown /></span>
</li>

  <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='notify-options'>
    <li onClick={() => handleLinkClick('Notify Staff')} >Notify Staff</li>
    <li onClick={() => handleLinkClick('Notify Student')}>Notify Student</li>
    
  </ul>


        
  <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer', display: 'flex', justifyContent: 'space-between'}} onClick={handlefeedbackClick}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <VscFeedback style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Feedback</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem',marginRight:'6px',position:'relative'}}><MdOutlineArrowDropDown /></span>
</li>

  <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='feedback-options'>
    <li onClick={() => handleLinkClick('Student Feedback')} >Student Feedback</li>
    <li onClick={() => handleLinkClick('Staff Feedback')}>Staff Feedback</li>
    {/* Add more leave options here if needed */}
  </ul>

  <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer', display: 'flex', justifyContent: 'space-between'}} onClick={handleLeaveClick}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TiTick style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Leaves</span>
  </div>
  <span style={{marginLeft:'45px',fontSize:'1.6rem'}}><MdOutlineArrowDropDown /></span>
</li>

  <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none'}} id='leave-options'>
    <li onClick={() => handleLinkClick('Staff Leave')} >Staff Leaves</li>
  </ul>

         <li style={{padding:'2rem 2rem',marginTop:'40px', cursor:'pointer'}} onClick={handleLogout}>
        <IoMdLogOut style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'3px'}}/> LogOut
        </li>
        </ul>

        </div>

        </div>
      </div> 

      <div style={{display:'flex',flexDirection:'column',gap:'2.5rem',boxShadow:'2px 2px 2px solid black',width:'100%',border:'2px solid white',padding:'0.8rem',background:'white',color:'rgb(28, 66, 95)',zIndex:'1000'}} >
     <div className='Header'  style={{display:'flex',gap:'1.5rem',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',alignItems:'center',padding:'1.4rem'}}>  <div><MdOutlineMenu className="menu-icon" onClick={toggleSidebar} /></div><div><h3 style={{marginBottom:'-10px',marginLeft:'-10px',}}>User Management-System HippoCloud's</h3></div> 
      </div>
     {/*  */}
     
     <div id='change_section' onClick={menuclose}>
      
     { renderContent()}
    </div>
      {/*  */}
      </div> 

    </div>

    </>
  );
}







