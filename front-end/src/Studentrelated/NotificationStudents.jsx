// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { CgProfile } from 'react-icons/cg';

// export default function NotificationStudents() {
//   const [notifications, setNotifications] = useState([]);
//   const { id } = useParams();

//   // Fetch notifications from the backend when the component mounts
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/backend/student/notifications/${id}`);
//         // Sort notifications based on date and time
//         const sortedNotifications = response.data.sort((a, b) => {
//           const dateA = new Date(`${a.Date} ${a.Time}`);
//           const dateB = new Date(`${b.Date} ${b.Time}`);
//           return dateB - dateA; // Sort in descending order
//         });
//         setNotifications(sortedNotifications);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [id]);

//   // Render the notifications as cards
//   return (
   
//     <>
//     <h2 style={{padding:'0.8rem',fontFamily:'revert'}}>Notifications:</h2>

//     {notifications.map((notification, index)=>(   
//     <div style={{maxWidth:'80%',margin:'10px auto',boxShadow:' 5px 4px 11px 0px rgba(48,37,37,0.75)',borderRadius:'8px',marginBottom:'20px'}}>
   
//    <div key={index} style={{display:'flex',width:'100%',padding:'10px',alignItems:'center'}}>
//    <div >
   
//    {/* <img src="https://th.bing.com/th?id=OIP.0GSgnZDVwXfEgTtYKUHBiQHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" style={{width:'60px',height:'60px',borderRadius:'50%'}}/> */}
   
//    {notification.Pic ? (
//     <img src={`http://localhost:8000/files/${notification.Pic}`} alt="Profile" style={{width:'60px',height:'60px',borderRadius:'50%'}} />
//   ) : (
//     <CgProfile style={{ fontSize: '2rem' }} />
//   )}
   
//    </div>
   
//    <div style={{fontFamily:'cursive',fontWeight:'800',marginLeft:'10px'}}> 
//    <p style={{fontFamily:'revert',fontWeight:'400',marginBottom:'-8px'}}>From</p>
//    {notification.sendby}
//    </div>
//    </div>
   
//    <div style={{padding:'10px',fontFamily:'revert',fontWeight:'600',}}>
//    {notification.notification_message}
//    </div>
   
   
//    <div style={{width:'100%',display:'flex',justifyContent:'space-between',padding:'10px'}}>
//    <div style={{color:'#3C5B6F',fontWeight:'300',fontFamily:'monospace'}}>
//       Date:{notification.Date}
//    </div>
//    <div style={{color:'#3C5B6F',fontWeight:'300',fontFamily:'monospace'}}>
//        Time:{notification.Time}
//    </div>
//    </div>
   
//    </div>
//   ))}
 
   
//     </>
//   );
// }




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

// Function to mark a notification as read
const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.put(`http://localhost:8000/backend/admin/notification/read/${notificationId}`);
    console.log('Notification marked as read');
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

export default function NotificationStudents() {
  const [notifications, setNotifications] = useState([]);
  const { id } = useParams();

  // Fetch notifications from the backend when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/backend/student/notifications/${id}`);
        // Sort notifications based on date and time
        const sortedNotifications = response.data.sort((a, b) => {
          const dateA = new Date(`${a.Date} ${a.Time}`);
          const dateB = new Date(`${b.Date} ${b.Time}`);
          return dateB - dateA; // Sort in descending order
        });
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [id]);

  const handleNotificationClick = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, is_read: 1 } : notification
    ));
  };

  // Render the notifications as cards
  return (
    <>
      <h2 style={{ padding: '0.8rem', fontFamily: 'revert' }}>Notifications:</h2>

      {notifications.map((notification, index) => (
        <div
          key={index}
          style={{
            maxWidth: '80%',
            margin: '10px auto',
            boxShadow: '5px 4px 11px 0px rgba(48,37,37,0.75)',
            borderRadius: '8px',
            marginBottom: '20px',
            backgroundColor: notification.is_read ? 'lightgrey' : 'white',
            cursor: 'pointer'
          }}
          onClick={() => handleNotificationClick(notification.id)}
        >
          <div style={{ display: 'flex', width: '100%', padding: '10px', alignItems: 'center' }}>
            <div>
              {notification.Pic ? (
                <img src={`http://localhost:8000/files/${notification.Pic}`} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
              ) : (
                <CgProfile style={{ fontSize: '2rem' }} />
              )}
            </div>

            <div style={{ fontFamily: 'cursive', fontWeight: '800', marginLeft: '10px' }}>
              <p style={{ fontFamily: 'revert', fontWeight: '400', marginBottom: '-8px' }}>From</p>
              {notification.sendby}
            </div>
          </div>

          <div style={{ padding: '10px', fontFamily: 'revert', fontWeight: '600' }}>
            {notification.notification_message}
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <div style={{ color: '#3C5B6F', fontWeight: '300', fontFamily: 'monospace' }}>
              Date: {notification.Date}
            </div>
            <div style={{ color: '#3C5B6F', fontWeight: '300', fontFamily: 'monospace' }}>
              Time: {notification.Time}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
