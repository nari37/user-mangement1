
import db from "../index.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


dotenv.config();
// student login....
const stafflogin = (req, res) => {
  const { email, password } = req.body;
  // const {id} = req.params.id;
  //  console.log('stemail..',email)
  const sql = 'SELECT * FROM staff WHERE email = ?'; // Remove WHERE clause
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
        res.json({  id:results[0].id, ROLE_TYPE: 'Staff', email: results[0].email,gender:results[0].gender,firstname: results[0].first_name,profile:results[0].profile,address:results[0].address,course:results[0].course,course_id:results[0].course_id,teachsubject:results[0].teachsubject,teachsubject_id:results[0].teachsubject_id});


      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

const singlestaffdetails = (req, res) => {
    const {id} = req.params;

    const query = 'SELECT * FROM staff WHERE id = ?'; // Assuming your staff table has a column named 'id'
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Staff member not found');
        return;
      }
      // Send the results back as JSON
      res.send(results); // Assuming you only expect one result
    });
  }
  const classstudentslist = (req, res) => {
    const { course } = req.params;
    const query = `SELECT * FROM student WHERE course = ?`; // Assuming 'students' is your table name
  
    db.query(query, [course], (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results); // Assuming your data is in JSON format
    });
  };



  // post attendance...
  



const attendance = (req, res) => {
  console.log(req.body);

  const attendanceData = req.body; // Assuming req.body is an array of attendance objects

  // Check if attendance has already been taken for the given date
  const dateToCheck = attendanceData[0].date; // Assuming all attendance objects have the same date
   const subjectToCheck = attendanceData[0].subjectId;
   const checkAttendanceQuery = "SELECT * FROM attendance WHERE Date = ? AND subject_id = ?";
  
  db.query(checkAttendanceQuery, [dateToCheck,subjectToCheck], (error, results, fields) => {
      if (error) {
          console.error("Error checking attendance:", error);
          res.status(500).json({ error: "Error checking attendance" });
          return;
      }

      // If there are existing attendance records for the given date
      if (results.length > 0) {
          res.status(400).json({ message: "Attendance has already been taken for this date" });
          return;
      }

      // If attendance has not been taken for the given date, proceed with insertion
      const sql = "INSERT INTO attendance (staff_id, staff_name, subject_id, subject, class_id, class, student_id, student_name, Date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      // Iterate through each attendance object and insert it into the database
      attendanceData.forEach(data => {
          const values = [
              data.tutorId,
              data.tutorName,
              data.subjectId,
              data.subjectName,
              data.classId,
              data.classes,
              data.studentId,
              data.studentName,
              data.date,
              data.attendance
          ];

          db.query(sql, values, (error, results, fields) => {
              if (error) {
                  console.error("Error inserting attendance:", error);
                  // You may want to handle the error here
              } else {
                  console.log("Attendance inserted successfully");
                  // You can send a response for each successful insertion if needed
              }
          });
      });

      // Send a response indicating that the request was received and processed
      res.status(200).json({ message: "Attendance data received and inserted" });
  });
};

// apply leaves post....

const applyedleave = (req, res) => {
  console.log(req.body);

  const { staffId, fromDate, toDate, reason} = req.body;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;

  // Check if the selected start date is before the end date
  if (new Date(fromDate) > new Date(toDate)) {
      console.log('Start date cannot be after end date');
      res.status(400).send('Start date cannot be after end date');
      return;
  }

  // Check if the selected dates are in the future
  if (new Date(fromDate) < currentDate || new Date(toDate) < currentDate) {
      console.log('Please choose dates in the future');
      res.status(400).send('Please choose dates in the future');
      return;
  }

  // Query the database to check if any leave exists for the specified staff between fromDate and toDate
  const checkLeaveQuery = "SELECT * FROM staff_leave WHERE staff_id = ? AND ((From_date <= ? AND To_date >= ?) OR (From_date <= ? AND To_date >= ?) OR (From_date >= ? AND To_date <= ?))";
db.query(checkLeaveQuery, [staffId, fromDate, fromDate, toDate, toDate, fromDate, toDate], (err, rows) => {
    if (err) {
        console.error('Error checking leave:', err);
        res.status(500).send('your alredy have leaves on this dates');
        return;
    }

      // Check if any leave exists for any date within the range
      if (rows.length > 0) {
          console.log('Leave already exists for some dates within the specified range');
          res.status(400).send('Leave already exists for some dates within the specified range');
          return;
      }
      const status = 'Pending';
      // Insert leave data into the database
      const sql = "INSERT INTO staff_leave (staff_id, staff_name, From_date, To_date, Applied, reasons,status) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, [staffId, req.body.staffName, fromDate, toDate, formattedDate, reason, status], (insertErr, result) => {
          if (insertErr) {
              console.error('Error applying leave:', insertErr);
              res.status(500).send('Error applying leave');
              return;
          }
          console.log('Leave applied successfully');
          res.send("Leave applied successfully.");
      });
  });
};


// update leaves...

const updateLeave = (req, res) => {
  const { leaveId, fromDate, toDate, reason } = req.body;
   
  const currentDate = new Date();

  // Check if the selected start date is before the end date
  if (new Date(fromDate) > new Date(toDate)) {
      console.log('Start date cannot be after end date');
      res.status(400).send('Start date cannot be after end date');
      return;
  }

  // Check if the selected dates are in the future
  if (new Date(fromDate) < currentDate || new Date(toDate) < currentDate) {
      console.log('Please choose dates in the future');
      res.status(400).send('Please choose dates in the future');
      return;
  }

  // Update leave data in the database
  const updateLeaveQuery = "UPDATE staff_leave SET From_date = ?, To_date = ?, reasons = ? WHERE id = ?";
  db.query(updateLeaveQuery, [fromDate, toDate, reason, leaveId], (updateErr, result) => {
      if (updateErr) {
          console.error('Error updating leave:', updateErr);
          res.status(500).send('Error updating leave');
          return;
      }
      console.log('Leave updated successfully');
      res.send("Leave updated successfully.");
  });
};


// withdraw leave...
const withdrawleave = (req, res) => {
  const leaveId = req.params.leaveId; // Extract leave ID from request parameters

  // Construct SQL query to update leave status to "Withdraw"
  const withdrawLeaveQuery = "UPDATE staff_leave SET status = 'Withdraw' WHERE id = ?";
  
  // Execute SQL query
  db.query(withdrawLeaveQuery, [leaveId], (updateErr, result) => {
    if (updateErr) {
      console.error('Error withdrawing leave:', updateErr);
      res.status(500).send('Error withdrawing leave');
      return;
    }
    
    // Check if any rows were affected by the update operation
    if (result.affectedRows === 0) {
      console.log('Leave not found');
      res.status(404).send('Leave not found');
      return;
    }
    
    // Leave successfully withdrawn
    console.log('Leave withdrawn successfully');
    res.send("Leave withdrawn successfully.");
  });
};





// ..get leaves history...
const getleaves = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM staff_leave WHERE staff_id = ?";
  db.query(sql, [id], (err, rows) => {
      if (err) {
          console.error('Error fetching leaves:', err);
          res.status(500).send('Error fetching leaves');
          return;
      }
      res.send(rows);
  });
};
// profile update staff....

const staffprofileupdate = (req, res) => {
  const { first_name, email, password } = req.body.singleStaffdetails;
  const { id } = req.params;

  // Assuming you are using a SQL database like MySQL
  const sql = 'UPDATE staff SET first_name = ?, email = ?, password = ? WHERE id = ?';

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


// Update profile picture endpoint


const updateprofilepictureStaff= (req, res) => {
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
  const sql = "UPDATE staff SET profile=? WHERE id = ?";

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





// Exporting the attendance function to use it as a route handler




export {
    stafflogin,
    singlestaffdetails,
    classstudentslist,
    attendance,
    applyedleave,
    withdrawleave,
    updateLeave,
    getleaves,
    staffprofileupdate,
    updateprofilepictureStaff
};