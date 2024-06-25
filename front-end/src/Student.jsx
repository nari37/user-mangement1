

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Link, useParams, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faTasks, faBell, faPlus, faCalendarCheck, faTimes, faBars, faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import './css/trail.css';
// import axios from 'axios';
// import Home from './Studentrelated/Home';
// import Tasks from './Studentrelated/Tasks';
// import Studentleave from './Studentrelated/Studentleave';
// import { CgProfile } from "react-icons/cg";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import Updateprofilestudent from './Studentrelated/Updateprofilestudent';
// import Attendance from './Studentrelated/Attendance';
// import NotificationStudents from './Studentrelated/NotificationStudents';
// import Help from './Studentrelated/Help';
// import { VscFeedback } from "react-icons/vsc";
// import Feedback from './Studentrelated/Feedback';

// // topbar.....
// function TopNavbar({ isSidebarOpen, toggleSidebar,setActiveLink }) {
  
//   return (
//     <nav className="top-navbar" style={{
//       backgroundColor: 'white',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//       padding: '20px 30px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',

//     }}>
//       <div className="left">
//         <FontAwesomeIcon
//           icon={isSidebarOpen ? faTimes : faBars}
//           className="toggle-icon"
//           onClick={toggleSidebar}
//           style={{ cursor: 'pointer' ,color:'rgb(28, 66, 95)'}}
//         />
//       </div>
//       <h3 style={{fontSize: '1.5rem',color:'rgb(28, 66, 95)',}}>Student Panel</h3>
//       <div className="right" onClick={() => setActiveLink('notifications')}>
        
//           <FontAwesomeIcon icon={faBell} className="icon" style={{color:'rgb(28, 66, 95)',cursor:'pointer'}} />
        
//       </div>
//     </nav>
//   );
// }


// // bottom bar.....

// function BottomNavbar({ id, setActiveLink }) {
//   return (
//     <nav className="bottom-navbar">
     
     

//       <ul>
//       <li onClick={() => setActiveLink('home')}>
//         <Link>
//           <FontAwesomeIcon icon={faHome} />
//           <span>Home</span>
//           </Link>
//          </li>

//         <li onClick={() => setActiveLink('tasks')}>  
//            <Link> 
//             <FontAwesomeIcon icon={faTasks} />
//             <span>Tasks</span>  
//             </Link> 
//         </li>

//         <li>
//           <Link to="/new-post" className="new-post">
//             <FontAwesomeIcon icon={faPlus} />
//             <span>Post</span>
//           </Link>
//         </li>
//         <li onClick={() => setActiveLink('Attendance')}>
//           <Link>
//             <FontAwesomeIcon icon={faCalendarCheck} />
//             <span>Attendance</span>
//           </Link>
//         </li>
//         <li onClick={() => setActiveLink('profile')}>
//           <Link >
//             <FontAwesomeIcon icon={faUser} />
//             <span>Profile</span>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// //  side bar.....
   
// function Sidebar({ setActiveLink,Studentdetails}) {

//    const nav = useNavigate()
//   const handileLogout = (e) =>{
//     e.preventDefault();
//        const confirmed = window.confirm('Are you sure you want to logout?')
//        if(confirmed){
//          localStorage.removeItem('authToken')
//          localStorage.clear();
//          nav('/');
//        }
//      }
//   return (
//     <div className="sidebar" style={{
//       position: 'fixed',
//       top: '72px',
//       left: '0',
//       height: '100%',
//       width: '250px',
//       backgroundColor: 'rgb(28, 66, 95)',
//       color: '#fff',
//       padding: '20px',
//       boxSizing: 'border-box',
//       zIndex: '3000',
      
//     }}>
//      {/* disply name.. */}
   
//  <hr></hr>
// <div style={{display:'flex',alignItems:'center',padding:'0rem 1rem'}} >
//           {Studentdetails.profile ? (
//     <img src={`http://localhost:8000/files/${Studentdetails.profile}`} alt="Profile" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '10px' }} />
//   ) : (
//     <CgProfile style={{ fontSize: '2rem', marginRight: '10px',fontWeight:'600' }} />
//   )}
//   <h4 style={{marginTop:'20px',marginLeft:'10px'}}>{Studentdetails.first_name}</h4>
//   </div>
//   <hr></hr>

//       <ul style={{
//         listStyleType: 'none',
//         padding: '0',
//         margin: '0'
//       }}>
//         <li style={{
//           marginBottom: '10px'
//         }} onClick={() => setActiveLink('Help')}>
         
//             <RiCustomerService2Fill  icon={faHome} style={{ marginRight: '10px',fontSize:'1.4rem' }} />
//             <span>Help</span>
         
//         </li>
//         <li style={{
//           marginBottom: '10px'
//         }} onClick={() => setActiveLink('feedback')}>
          
//             <VscFeedback icon={faInfoCircle} style={{ marginRight: '10px',fontSize:'1.4rem' }} />
//             <span>Feed back</span>
         
//         </li>
//         <li style={{
//           marginBottom: '10px'
//         }} onClick={() => setActiveLink('apply leaves')}>
          
//             <IoCheckmarkDoneSharp  icon={faInfoCircle} style={{ marginRight: '10px',fontSize:'1.4rem' }} />
//             <span>Apply leave</span>
         
//         </li>
//         <li onClick={handileLogout}>
//           <Link  style={{
//             color: '#fff',
//             textDecoration: 'none'
//           }} >
//             <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px',fontSize:'1.4rem' }} />
//             <span>Logout</span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }



// // ..main bar....

// function Student() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState('home');
//   const [Studentdetails, setStudentdetails] = useState({});
//   const [unreadCount, setUnreadCount] = useState([]);
//   console.log(unreadCount,'hiii')
//   const { id } = useParams();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(()=>{    
//     axios.get(`http://localhost:8000/backend/student/getsinglestudent/${id}`)
//     .then(res=>setStudentdetails(res.data[0]))
//     .catch(err=>console.log(err))
//     },[Studentdetails])

  
//     useEffect(()=>{
//       axios.get(`http://localhost:8000/backend/student/unreadnotifications/${id}`)
//       .then(res => setUnreadCount(res.data))
//      },[id])

//   const renderContent = () => {
//          switch (activeLink) {
//            case 'tasks':
//              return <Tasks />;
//             case 'apply leaves':
//               return <Studentleave/>
//               case 'profile':
//                 return <Updateprofilestudent/>
//                 case 'Attendance':
//                   return <Attendance/>
//                  case 'notifications':
//                   return <NotificationStudents/> 
//                   case 'Help':
//                     return <Help/>
//                   case 'feedback':
//                     return  <Feedback Studentdetails={Studentdetails}/>
//            default:
//              return <Home />;
//          }
//       };
    

//   return (
//     <div>
//       <TopNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveLink={setActiveLink}/>
//       {isSidebarOpen && <Sidebar setActiveLink={setActiveLink} Studentdetails={Studentdetails}/>}
//       { renderContent()}
//       <BottomNavbar id={id} setActiveLink={setActiveLink} />
//     </div>
//   );
// }

// export default Student;



// ..............


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTasks, faBell, faPlus, faCalendarCheck, faTimes, faBars, faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './css/trail.css';
import axios from 'axios';
import Home from './Studentrelated/Home';
import Tasks from './Studentrelated/Tasks';
import Studentleave from './Studentrelated/Studentleave';
import { CgProfile } from "react-icons/cg";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import Updateprofilestudent from './Studentrelated/Updateprofilestudent';
import Attendance from './Studentrelated/Attendance';
import NotificationStudents from './Studentrelated/NotificationStudents';
import Help from './Studentrelated/Help';
import { VscFeedback } from "react-icons/vsc";
import Feedback from './Studentrelated/Feedback';

// TopNavbar Component
function TopNavbar({ isSidebarOpen, toggleSidebar, setActiveLink, unreadCount }) {
  return (
    <nav className="top-navbar" style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div className="left">
        <FontAwesomeIcon
          icon={isSidebarOpen ? faTimes : faBars}
          className="toggle-icon"
          onClick={toggleSidebar}
          style={{ cursor: 'pointer', color: 'rgb(28, 66, 95)' }}
        />
      </div>
      <h3 style={{ fontSize: '1.5rem', color: 'rgb(28, 66, 95)' }}>Student Panel</h3>
      <div className="right" onClick={() => setActiveLink('notifications')}>
        <FontAwesomeIcon icon={faBell} className="icon" style={{ color: 'rgb(28, 66, 95)', cursor: 'pointer' }} />
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </div>
    </nav>
  );
}

// BottomNavbar Component
function BottomNavbar({ id, setActiveLink }) {
  return (
    <nav className="bottom-navbar">
      <ul>
        <li onClick={() => setActiveLink('home')}>
          <Link>
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        <li onClick={() => setActiveLink('tasks')}>
          <Link>
            <FontAwesomeIcon icon={faTasks} />
            <span>Tasks</span>
          </Link>
        </li>
        <li>
          <Link to="/new-post" className="new-post">
            <FontAwesomeIcon icon={faPlus} />
            <span>Post</span>
          </Link>
        </li>
        <li onClick={() => setActiveLink('Attendance')}>
          <Link>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <span>Attendance</span>
          </Link>
        </li>
        <li onClick={() => setActiveLink('profile')}>
          <Link>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// Sidebar Component
function Sidebar({ setActiveLink, Studentdetails }) {
  const nav = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('authToken');
      localStorage.clear();
      nav('/');
    }
  };

  return (
    <div className="sidebar" style={{
      position: 'fixed',
      top: '72px',
      left: '0',
      height: '100%',
      width: '250px',
      backgroundColor: 'rgb(28, 66, 95)',
      color: '#fff',
      padding: '20px',
      boxSizing: 'border-box',
      zIndex: '3000',
    }}>
      <hr />
      <div style={{ display: 'flex', alignItems: 'center', padding: '0rem 1rem' }}>
        {Studentdetails.profile ? (
          <img src={`http://localhost:8000/files/${Studentdetails.profile}`} alt="Profile" style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '10px' }} />
        ) : (
          <CgProfile style={{ fontSize: '2rem', marginRight: '10px', fontWeight: '600' }} />
        )}
        <h4 style={{ marginTop: '20px', marginLeft: '10px' }}>{Studentdetails.first_name}</h4>
      </div>
      <hr />
      <ul style={{
        listStyleType: 'none',
        padding: '0',
        margin: '0'
      }}>
        <li style={{
          marginBottom: '10px'
        }} onClick={() => setActiveLink('Help')}>
          <RiCustomerService2Fill style={{ marginRight: '10px', fontSize: '1.4rem' }} />
          <span>Help</span>
        </li>
        <li style={{
          marginBottom: '10px'
        }} onClick={() => setActiveLink('feedback')}>
          <VscFeedback style={{ marginRight: '10px', fontSize: '1.4rem' }} />
          <span>Feed back</span>
        </li>
        <li style={{
          marginBottom: '10px'
        }} onClick={() => setActiveLink('apply leaves')}>
          <IoCheckmarkDoneSharp style={{ marginRight: '10px', fontSize: '1.4rem' }} />
          <span>Apply leave</span>
        </li>
        <li onClick={handleLogout}>
          <Link style={{
            color: '#fff',
            textDecoration: 'none'
          }}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px', fontSize: '1.4rem' }} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

// Main Student Component
function Student() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [Studentdetails, setStudentdetails] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const { id } = useParams();

  console.log(unreadCount)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/backend/student/getsinglestudent/${id}`)
      .then(res => setStudentdetails(res.data[0]))
      .catch(err => console.log(err));

    const fetchUnreadNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/backend/student/unreadnotifications/${id}`);
        setUnreadCount(res.data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    fetchUnreadNotifications();
  }, [id]);

  const renderContent = () => {
    switch (activeLink) {
      case 'tasks':
        return <Tasks />;
      case 'apply leaves':
        return <Studentleave />;
      case 'profile':
        return <Updateprofilestudent />;
      case 'Attendance':
        return <Attendance />;
      case 'notifications':
        return <NotificationStudents />;
      case 'Help':
        return <Help />;
      case 'feedback':
        return <Feedback Studentdetails={Studentdetails} />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <TopNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveLink={setActiveLink} unreadCount={unreadCount} />
      {isSidebarOpen && <Sidebar setActiveLink={setActiveLink} Studentdetails={Studentdetails} />}
      {renderContent()}
      <BottomNavbar id={id} setActiveLink={setActiveLink} />
    </div>
  );
}

export default Student;
