import express from 'express';
import { getNotificationCounts, getUnreadNotificationsCount, getattendancedata, getnotification, getsinglestudent, getsubjectlists, markNotificationAsRead, postfeedbacks, studentlogin, updateprofilepictureStudent, updatestudentdetails, } from '../controllers/student_control.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/files");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage, });







const student = express.Router();


student.post('/studentlogin', studentlogin)
student.get('/getsinglestudent/:id',getsinglestudent)
student.put('/updateProfilePicture/:id',upload.single('profile'),updateprofilepictureStudent)
student.put('/updateProfilest/:id',updatestudentdetails)
student.get('/attendancedata/:id',getattendancedata)
student.get('/getsubjects/:id',getsubjectlists)
student.get('/notifications/:id',getnotification)
student.post('/studentfeedback',postfeedbacks)
student.get('/unreadnotifications/:id', getUnreadNotificationsCount);
student.put('/student/notification/read/:notificationId',markNotificationAsRead)



export default student;