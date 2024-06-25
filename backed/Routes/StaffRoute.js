import express from 'express'
import { applyedleave, attendance, classstudentslist, getleaves, singlestaffdetails, stafflogin, staffprofileupdate, updateLeave, updateprofilepictureStaff, withdrawleave } from '../controllers/staff_controll.js';
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




const staff = express.Router();

staff.post('/stafflogin', stafflogin)
staff.get('/singlestaffdetails/:id', singlestaffdetails)


staff.get('/classstudentslist/:course',classstudentslist)
staff.put('/withdrawleave/:leaveId',withdrawleave)

// attendance...

staff.post('/attendance',attendance)
staff.post('/staffapplyedleaves/:id',applyedleave)
staff.get('/staffgetleaves/:id',getleaves)
staff.put('/updateleave/:selectedLeaveId',updateLeave)
// profile update...


// staff.put('/updatestaffprofile/:id',upload.single('profile'),staffprofileupdate)


staff.put('/updateProfilestaff/:id',staffprofileupdate)
staff.put('/updateProfilePicstaff/:id',upload.single('profile'),updateprofilepictureStaff)

export default  staff;