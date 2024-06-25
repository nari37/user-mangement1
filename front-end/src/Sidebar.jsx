


// import React, { useState } from 'react';
// import './css/Admin.css';
// // import './css/tr.css';
//   import { IoIosArrowForward } from "react-icons/io";
//   import { CgProfile } from "react-icons/cg";
//   import { FaHome } from "react-icons/fa";
//   import { ImProfile } from "react-icons/im";
//   import { SiDiscourse } from "react-icons/si";
//   import { MdOutlineMenuBook } from "react-icons/md";
//   import { IoTimer } from "react-icons/io5";
//   import { IoIosPersonAdd } from "react-icons/io";
//   import { MdManageAccounts } from "react-icons/md";
//   import { AiFillNotification } from "react-icons/ai";
//   import { MdOutlineDateRange } from "react-icons/md";
//   import { VscFeedback } from "react-icons/vsc";
//   import { FaMessage } from "react-icons/fa6";
//   import { TiTickOutline } from "react-icons/ti";
//   import { RiLogoutCircleRLine } from "react-icons/ri";
// import { Link } from 'react-bootstrap-icons';

// function Sidebar({ openSidebarToggle, OpenSidebar }) {
//     const [coursesSubMenu, setCoursesSubMenu] = useState(false);
//     const [SubjectsSubMenu, setSubjectsSubMenu] = useState(false);

//     const [SessionsSubMenu, setSessionsSubMenu] = useState(false);


//     const toggleCoursesSubMenu = () => {
//       setCoursesSubMenu(!coursesSubMenu);
//     }
//     const toggleSubjectsSubMenu = (e) => {
//         e.preventDefault();
//         setSubjectsSubMenu(!SubjectsSubMenu);
//       }
//       const toggleSessionsSubMenu = (e) => {
//         e.preventDefault();
//         setSessionsSubMenu(!SessionsSubMenu);
//       }
//   return (
//     <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
//       <div className="sidebar-title">
//         <div className="sidebar-brand">
//           <CgProfile className="icon_header" /> Name
//         </div>
//         <span className="icon close_icon" id="xbtn" onClick={OpenSidebar}>
//           X
//         </span>
//       </div>

//       <ul className="sidebar-list">

//       <li className='sidebar-list-item'>
        
//                 <a href="">
//                     <FaHome className='icon'/> Home
//                 </a>
         
//             </li>
//             <li className='sidebar-list-item'>
//                 <a href="">
//                     <ImProfile className='icon'/> Update Profile
//                 </a>
//             </li>



//         <li className="sidebar-list-item">
//           <a href="#" onClick={toggleCoursesSubMenu}>
//             <SiDiscourse className="icon" /> Courses
//             <IoIosArrowForward className="icon" />
//             {coursesSubMenu && (
//               <ul className="sub-menu">
//                 <li>
//                   <a href="#">Add Course</a>
//                 </li>
//                 <li>
//                   <a href="#">Manage Course</a>
//                 </li>
//               </ul>
//             )}
//           </a>
//         </li>
//         <li className='sidebar-list-item'>
//                  <a href=""  onClick={toggleSubjectsSubMenu}>
//                      <MdOutlineMenuBook  className='icon'/> Subjects<span>
//                          <IoIosArrowForward  className='icon'/>
//                          {SubjectsSubMenu && (
//               <ul className="sub-menu">
//                 <li>
//                   <a href="#">Add Subject</a>
//                 </li>
//                 <li>
//                   <a href="#">Manage Subject</a>
//                 </li>
//               </ul>
//             )}
                         
//                          </span>
//                  </a>
//              </li>
//              <li className='sidebar-list-item' style={{cursor:'pointer'}}>
//                  <a href="" onClick={toggleSessionsSubMenu}>
//                      <IoTimer  className='icon'/> Sessions<span>
//                          <IoIosArrowForward  className='icon'/>
                         
//                          {SessionsSubMenu&& (
//               <ul className="sub-menu">
//                 <li>
//                   <a href="#">Add Sessions</a>
//                 </li>
//                 <li>
//                   <a href="#">Manage Sessions</a>
//                 </li>
//               </ul>
//             )}
                         
//                          </span>
//                  </a>
//              </li>                   
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <IoIosPersonAdd className='icon'/> Add Student
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <MdManageAccounts className='icon'/> manage Student
//                  </a>
//              </li>

//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <IoIosPersonAdd className='icon'/> Add Staff
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <MdManageAccounts className='icon'/> manage Staff
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <AiFillNotification className='icon'/> Notify Staff
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <AiFillNotification className='icon'/> Notify Student
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <MdOutlineDateRange className='icon'/> View Attendance
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <VscFeedback className='icon'/> Student Feedback
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <FaMessage className='icon'/> Staff Feedback
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <TiTickOutline className='icon'/> StaffLeave
//                  </a>
//              </li>
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <TiTickOutline className='icon'/> StudentLeave
//                  </a>
//              </li>
           
//              <li className='sidebar-list-item'>
//                  <a href="">
//                      <RiLogoutCircleRLine className='icon'/> Logout
//                  </a>
//              </li>
//       </ul>
//     </aside>
//   );
// }

// export default Sidebar;

import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar} id='close'>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
