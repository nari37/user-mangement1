import express from 'express';
import {addcourse, addfinancier, addstaff, addstudent, addsubject, admingetdeatils, adminlogin, adminlogout, approvestaffleaves, deleteStudents, deletestaff, deletesubject, editstaffs, editstudents, editsubject, editsubjects, getclasslist, getsatffleaves, getstafflist, getstudentlist, getsubjectlist, markNotificationAsRead, notifystaff, notifystudent} from '../controllers/admin_control.js';
import {getcourse} from '../controllers/admin_control.js';
import {getsinglecourse} from '../controllers/admin_control.js';
import {updatecourse} from '../controllers/admin_control.js';
import {deletecourse} from '../controllers/admin_control.js';
import {updateprofile} from '../controllers/admin_control.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/files");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage,
  
});





const Admin = express.Router();


Admin.post('/adminlogin',adminlogin)
Admin.get('/logout',adminlogout)

Admin.get('/getadmindetails',admingetdeatils)
Admin.post('/addcourse',addcourse)
Admin.get('/getcourse', getcourse)
Admin.get('/getclasslist', getclasslist)
Admin.get('/getsubjectlist', getsubjectlist)
Admin.get('/approvestaffleaves',getsatffleaves)
Admin.put('/approvestaffleaves/:id',approvestaffleaves)
Admin.get('/singlecourse/:courseid',getsinglecourse)
// Admin.put('/editclass/:id', updatecourse);
Admin.put('/updateclass/:id', updatecourse);
Admin.post('/deletecourse/:id', deletecourse);
Admin.put('/adminupdateprofile/:id',upload.single('file'), updateprofile);





Admin.post('/addstudent', addstudent);
Admin.post('/addstaff', addstaff);
Admin.post('/addfinancier', addfinancier);

Admin.get('/getstafflist',getstafflist)
Admin.get('/getstudentlist',getstudentlist)


Admin.post('/addsubject',addsubject)
Admin.put('/editsubject/:id',editsubject)
Admin.delete('/deletesubject/:id',deletesubject)


// delete students.....

Admin.delete('/deletestudents/:id', deleteStudents)
Admin.delete('/deletestaff/:id',deletestaff)

Admin.put('/editstudents/:id',editstudents)
Admin.put('/editstaff/:id',editstaffs)
// Admin.put('/editsubject/:id',editsubjects)


// notify staff..
Admin.post('/notifystaff/:selectedStaffId',notifystaff)
Admin.post('/notifystudent/:selectedStudentId',notifystudent)
Admin.put('/notification/read/:notificationId',markNotificationAsRead)



export default Admin;