


import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { ImUserTie } from "react-icons/im";
import { IoIosHome } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaBookmark, FaCalendarCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import { TiTick } from "react-icons/ti";
import { SiTask } from "react-icons/si";
import { FaTasks } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { MdOutlineArrowDropDown, MdOutlineReviews } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { RiChatSmile3Fill } from "react-icons/ri";
import './css/Staff.css'; 
 
import Takeattendance from './Staffrealted/Takeattendance.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyLeave from './Staffrealted/ApplyLeave.jsx';
import Updateprofile from './Staffrealted/Updateprofile.jsx';
import StudentTasks from './Studentrelated/StudentTasks.jsx';
import Addtask from './Studentrelated/Addtask.jsx';
import Viewattendence from './Staffrealted/Viewattendence.jsx';


export default function Staff() {
  const navigate = useNavigate();
  const {id} = useParams();
  // console.log('staffids',id)
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [singleStaffdetails,setsingleStaffdetails] = useState({});
  const staffDetails = JSON.parse(localStorage.getItem('StaffDetails'));
// console.log('sishsh',singleStaffdetails)

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
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
  function closesidebar(){
    setSidebarOpen(false);
  }
  // ......

    // get singleStaff details...

    useEffect(()=>{
      
    axios.get(`http://localhost:8000/backend/staff/singlestaffdetails/${id}`)
    .then(res=>setsingleStaffdetails(res.data[0]))
    .catch(err=>console.log(err))
    },[singleStaffdetails])

  
// logout funtion....

const handleLogout = () =>{
  const confirmed = window.confirm('Are you sure you want to logout?')
  if(confirmed){
    localStorage.removeItem('authToken')
    localStorage.clear();
    navigate('/');
  }
}


  const renderContent = () => {
    switch (activeLink) {
      case 'Update':
        return (
          // <div style={cardStyle}>
          //   <h3>Update Profile Content</h3>         
          // </div>
          <Updateprofile />
        );
      case 'Take Attendance':
        return (
          <Takeattendance singleStaffdetails={singleStaffdetails}/>
        );
      case 'View Attendance':
        return(
        <Viewattendence />
      );
        
        case 'Notification':
        return (
          <div style={cardStyle}>
            <h3>Notifications</h3>        
          </div>
        );
        case 'apply leave':
          return (
            
            <ApplyLeave singleStaffdetails={singleStaffdetails}/>
          );
          case 'Give Task':
            return (
              
              <Addtask/>
            );
            case 'Students Tasks':
            return (
              
              <StudentTasks/>
            );
            
            case 'Feed back':
            return (
              <div style={cardStyle}  >
                <h3>Feedback <RiChatSmile3Fill style={{marginBottom:'-3px'}} /></h3> 
                <form style={{ maxWidth: '600px', margin: '10px auto' }}>
              <label htmlFor="feedback">Your Feedback:</label>
              <textarea name="feedback" id="feedback" cols="30" rows="5" style={{ width: '100%' }}></textarea>
              <br></br>
              <button type="submit" style={{background:'rgb(28, 66, 95)'}}>Submit Feedback</button>
            </form>       
              </div>
            );
            case 'LogOut':
              return (
                <div style={cardStyle}>
                  <h3>LogOut</h3>        
                </div>
              );
      
      default:
        return (
          <div  style={{ background: 'rgb(184, 192, 198)', display: 'flex',flexWrap:'wrap',zIndex:'1', }}>
            <div style={cardStyle}>
        <h3>Total Students</h3>
        <p>100</p>
      </div>

      <div style={cardStyle}>
        <h3>Total Attendance</h3>
        <p>75%</p>
      </div>
      <div style={cardStyle}>
        <h3>Total leaves</h3>
        <p>20%</p>
      </div>
      <div style={cardStyle}>
        <h3>Total Subjects</h3>
        <p>2</p>
      </div>
      
    </div>
        );
    }
  };

  // toggle attendance..
  // const SubAttendance = () =>{

  // }

  const SubAttendance = () => {
    let subdrop = document.getElementById('Attendance');
    if(subdrop.style.display === 'none'){
      subdrop.style.display = 'block';
    }else{
      subdrop.style.display = "none";
    }
 }

  return (
    <>
    <div className='main'  >
      
      <div className={isSidebarOpen?'sidebaropenstaff':'sidebarclosestaff'} >
      <div style={{display:'flex',alignItems:'center',padding:'0rem 1rem',justifyContent:'space-around'}} > <span style={{fontSize:'2rem'}} ><ImUserTie style={{marginLeft:'-14px'}} /></span><h3 style={{marginTop:'20px',marginLeft:'-20px'}}>Staff Panel</h3><GrClose style={{fontSize:'2.3rem',background:'#00224D',padding:'0 4px',borderRadius:'4px',display:'none',marginTop:'10px',marginRight:'-17px',cursor:'pointer'}} id='closestaff' onClick={closesidebar}/></div>
        <hr></hr>
        <div style={{display:'flex',alignItems:'center',padding:'0rem 1rem'}} >
          {singleStaffdetails.profile ? (
    <img src={`http://localhost:8000/files/${singleStaffdetails.profile}`} alt="Profile" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '10px' }} />
  ) : (
    <CgProfile style={{ fontSize: '2rem', marginRight: '10px' }} />
  )}
  <h4 style={{marginTop:'20px',marginLeft:'10px'}}>{singleStaffdetails.first_name}</h4>
  </div>
        <hr></hr>
        <div className='sidebar-list' >
        <ul>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={handleLinkClick}><IoIosHome style={{fontSize:'1.7rem',marginRight: '0.5rem',marginBottom:'5px'}} />Home</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={() => handleLinkClick('Update')}><ImProfile style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}} />Update Profile</li>


         
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer',alignItems:'center',display:'flex', justifyContent: 'space-between'}} onClick={SubAttendance}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    <FaCalendarCheck style={{fontSize:'1.3rem',marginRight: '0.5rem',marginBottom:'3px'}}/>
    <span>Attendance</span>
     </div>
    <span style={{marginLeft:'45px',fontSize:'1.6rem',marginRight:'-3px'}}><MdOutlineArrowDropDown  /></span>
      </li>

         <ul style={{cursor:'pointer',marginLeft:'20px',lineHeight:'1',display:'none',transition:'1s'}} id='Attendance' >
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={() => handleLinkClick('Take Attendance')}>Take Attandance</li>
           <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={() => handleLinkClick('View Attendance')}>View Attandance</li>
           </ul>

          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={()=>handleLinkClick('apply leave')}><TiTick style={{fontSize:'1.7rem',marginRight: '0.5rem',marginBottom:'5px'}}/>Applay leave</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={()=>handleLinkClick('Give Task')}><SiTask style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}}/>Add Task</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={()=>handleLinkClick('Students Tasks')}><FaTasks style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}}/>Students List</li>       
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={()=>handleLinkClick('Feed back')}><VscFeedback style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}}/>Feed back</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'13px',cursor:'pointer'}} onClick={()=>handleLinkClick('Notification')}><IoIosNotifications style={{fontSize:'1.7rem',marginRight: '0.5rem',marginBottom:'5px'}} />Notifications</li>
          <li style={{padding:'0.8rem 1rem',marginTop:'30px',cursor:'pointer'}} onClick={handleLogout}><IoMdLogOut style={{fontSize:'1.5rem',marginRight: '0.5rem',marginBottom:'5px'}} />LogOut</li>
        </ul>
        </div>

      </div> 

      <div style={{display:'flex',flexDirection:'column',gap:'2.5rem',boxShadow:'2px 2px 2px solid black',width:'100%',border:'2px solid white',padding:'0.8rem',background:'white',color:'rgb(28, 66, 95)',zIndex:'1000',backgroundAttachment:'fixed'}} >
     <div className='Header'  style={{display:'flex',gap:'1.5rem',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',alignItems:'center',padding:'0.5rem',position:'sticky',backgroundAttachment:'fixed'}}>  <div><MdOutlineMenu className="menu-icon" onClick={toggleSidebar} style={{fontSize:'2rem'}} /></div><div><h3 style={{marginTop:'16px'}}>Student mangement System</h3></div> 
      </div>
     {/*  */}
     <div id='change_section' onClick={menuclose} >
      
     { renderContent()}
    </div>
      {/*  */}
      </div> 

    </div>

    

    </>
  );
}
