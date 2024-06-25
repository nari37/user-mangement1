 
import db from "../index.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';



dotenv.config();
// student login....
const studentlogin = (req, res) => {
  const { email, password } = req.body;
  // const {id} = req.params.id;
  //  console.log('stemail..',email)
  const sql = 'SELECT * FROM student WHERE email = ?'; // Remove WHERE clause
  db.query(sql, [email], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      // Compare the hashed password with the provided password
      const hashedPasswordFromDB = results[0].password;

      const passwordMatch = await bcryptjs.compare(password, hashedPasswordFromDB);

      if (passwordMatch) {
        // Admin credentials are valid, create a JWT token
        const token = jwt.sign({ ROLE_TYPE: email }, process.env.JWT_SECRET, { expiresIn: '2d' });

        // Send the token back to the client as a cookie
        res.cookie('cookie', token);

        // Send additional data in the response body if needed
        res.json({  id:results[0].id, ROLE_TYPE: 'Student', email: results[0].email,gender:results[0].gender,firstname: results[0].first_name,profile:results[0].profile,address:results[0].address});


      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};


// update profile...
// const studentprofilepicupdate = (req,res) =>{
//      console.log(req.file)
//      console.log(req.body)
// }


// Update profile picture endpoint
const updateprofilepictureStudent= (req, res) => {
  const file = req.file; // Uploaded file
   console.log(file)
  // Check if file is included in the request
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Prepare SQL query parameters
  const values = [
    file.filename, // Assuming you want to store the file name in the database
    req.params.id // Assuming id is passed as a route parameter
  ];

  // Construct SQL query
  const sql = "UPDATE student SET profile=? WHERE id = ?";

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Profile picture updated successfully", result });
    }
  });
}


// update student details...



const updatestudentdetails = (req, res) => {
  const { first_name, email, password } = req.body.Studentdetails;
  const { id } = req.params;

  // Assuming you are using a SQL database like MySQL
  const sql = 'UPDATE student SET first_name = ?, email = ?, password = ? WHERE id = ?';

  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Execute the SQL query with the provided parameters
  db.query(sql, [first_name, email, hashedPassword, id], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      return res.status(500).send('Failed to update student');
    }

    console.log('Student updated successfully');

    // Sending email to the student with login credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nareshpogiri409@gmail.com', // Your Gmail address
        pass: 'edsqsnpuxerpwlrz' // Your Gmail password or app-specific password
      }
    });

    const mailOptions = {
      from: 'nareshpogiri409@gmail.com',
      to: email,
      subject: 'Login Credentials for Your Account',
      html: `
        <p>Dear ${first_name},</p>
        <p>Your account has been updated successfully. Please use the following credentials to log in:</p>
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>
        <p>Thank you!</p>
      `
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending email");
      } else {
        console.log('Email sent: ' + info.response);
        // Send the response after the email has been sent successfully
        res.status(200).send('Student updated successfully');
      }
    });
  });
};



const getsinglestudent = (req,res) =>{
    const {id} = req.params
  const sql = "select * from student where id=?";
  db.query(sql,[id],(err,result)=>{
    if(!err){
          res.send(result)
          }else{
            console.log(err)
          }
  })
} 


// get attendance list...

const getattendancedata = (req,res)=>{
  const {id} = req.params;
  const sql = 'select * from attendance where student_id = ?';
  db.query(sql,id,(err,result)=>{
    if(!err){
      res.send(result)
      }else{
        console.log(err)
      }
  })
}

// get subject list..from staff...

const getsubjectlists  = (req,res) =>{
  const {id} = req.params;
  console.log(id)
  const sql = 'select * from staff where courses_id =?'
  db.query(sql,id,(err,result)=>{
    if(err){
    return res.status(500).send('getting staff error')
    }else{
      return res.status(200).send(result)
    }
  })

}

// get noifications...

const getnotification = (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);

  const sql = "SELECT * FROM studentnotifications WHERE userid = ?";
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error in getting notifications:', err);
          return res.status(501).json('Error in getting notifications');
      } else {
          console.log('Result:', result); // Log the result to inspect the data
          return res.status(200).json(result);
      }
  });
};

// post feed backs

const postfeedbacks = (req,res)=>{
   const {rating,review,sendby} = req.body
  //  console.log('hii', req.body)
   
   const sql = 'insert into studentsfeedback (rating,review,sendby) values (?,?,?)'
   db.query(sql,[rating,review,sendby],(err,results)=>{
    if(err){
      console.log(err)
      return res.status(500).send('feed back post error')
    }else{
      console.log(results)
      return res.status(200).send('feed back send successfully...')
    }
   })
}


// unread notifications...

const getUnreadNotificationsCount = (req, res) => {
  const { studentId } = req.params;

  const query = `SELECT COUNT(*) AS unreadCount FROM studentnotifications WHERE userid = ? AND is_read = 0`;

  db.query(query, [studentId], (error, results) => {
      if (error) {
          console.error('Error fetching unread notifications count:', error);
          res.status(500).send('Error fetching unread notifications count');
      } else {
          res.status(200).json({ unreadCount: results[0].unreadCount });
          console.log( results[0].unreadCount,'resultsss')
      }
  });
};


// read notification....

const markNotificationAsRead = (req, res) => {
  const { notificationId } = req.params;

  const query = `UPDATE studentnotifications SET is_read = 1 WHERE id = ?`;

  db.query(query, [notificationId], (error, results) => {
      if (error) {
          console.error('Error marking notification as read:', error);
          res.status(500).send('Error marking notification as read');
      } else {
          res.status(200).send('Notification marked as read');
      }
  });
};


// ...notification count...
const getNotificationCounts = (req, res) => {
  const { studentId } = req.params;

  const query = `
    SELECT
      SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) AS unreadCount,
      SUM(CASE WHEN is_read = 1 THEN 1 ELSE 0 END) AS readCount
    FROM studentnotifications
    WHERE userid = ?
  `;

  db.query(query, [studentId], (error, results) => {
    if (error) {
      console.error('Error fetching notification counts:', error);
      res.status(500).send('Error fetching notification counts');
    } else {
      res.status(200).json(results[0]);
    }
  });
};




export {
  studentlogin,
  updateprofilepictureStudent,
  updatestudentdetails,
  getsinglestudent,
  getattendancedata,
  getsubjectlists,
  getnotification,
  postfeedbacks,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  getNotificationCounts
};

