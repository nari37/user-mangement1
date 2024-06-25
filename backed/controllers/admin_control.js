import db from "../index.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import moment from 'moment-timezone';
// import twilio from 'twilio';
dotenv.config();



// admin login....


const adminlogin = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM admin WHERE email = ?';
  db.query(sql, [email], async (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
          const storedPassword = results[0].password;
          const storedEmail = results[0].email;

          // Compare the provided password with the password stored in the database
          if (password === storedPassword && email === storedEmail) {
              // Passwords match, create a JWT token
              const token = jwt.sign({ ROLE_TYPE: email }, process.env.JWT_SECRET, { expiresIn: '30s' });

              // Send the token back to the client as a cookie
              res.cookie('jwtToken', token, { httpOnly: true }); 

              // Send additional data in the response body if needed
              res.json({ id: results[0].id, ROLE_TYPE: 'Admin', email: results[0].email, gender: results[0].gender, firstname: results[0].first_name, profile: results[0].profile, address: results[0].address });
          } else {
              // Passwords don't match
              res.status(401).json({ message: 'Invalid credentials' });
          }
      } else {
          // No user found with the provided email
          res.status(401).json({ message: 'Invalid credentials' });
      }
  });
};

// Server-side code (Node.js with Express)
const adminlogout = (req, res) => {
  res.clearCookie('jwtToken', { path: '/' }); // Set correct path for the cookie
  return res.json({ Status: "Success" });
}
 

//   get admindetails....
const admingetdeatils = (req,res)=>{
   const sql = "SELECT * FROM admin"
   db.query(sql,(err,result)=>{
if(err){
  console.log(err);
  res.status(500).json({message:"internal server error"})
}else{
  // res.status(200).json({ message: "Data received successfully", result }); 
  res.send(result)
}
   })
}








const updateprofile = (req, res) => {
  // Assuming you're using multer for handling file uploads
  const file = req.file; // Uploaded file
  const data = req.body; // Other form data

  // Extracting data from request body
  const { first_name, email, gender, password, address } = data;
  let filename = ''; // Initialize filename variable

  // Check if file is included in the request
  if (file) {
    filename = file.filename; // Get the filename if file is uploaded
  }

  // Prepare SQL query parameters
  const values = [
    first_name,
    email,
    gender,
    password,
    address,
    filename, // Assuming you want to store the file name in the database
    req.params.id // Assuming id is passed as a route parameter
  ];

  // Construct SQL query
  const sql = "UPDATE admin SET first_name=?, email=?, gender=?, password=?, address=?, profile=? WHERE id = ?";

  // Execute SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Updated successfully", result });
    }
  });
};


const addcourse = (req, res) => {
    try {
      const { course } = req.body;
  
      // Check if the course already exists
      const checkExistenceQuery = 'SELECT * FROM course WHERE course_type = ?';
      db.query(checkExistenceQuery, [course], (checkError, checkResults) => {
        if (checkError) {
          console.error('Error checking course existence:', checkError);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // If course already exists, handle it accordingly
        if (checkResults.length > 0) {
          return res.status(400).json({ error: 'Course already exists' });
        }
  
        // If course does not exist, proceed with the insertion
        const insertQuery = 'INSERT INTO course (`course_type`) VALUES (?)';
        db.query(insertQuery, [course], (insertError, result) => {
          if (insertError) {
            console.error('Error inserting course:', insertError);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          res.status(200).json({ message: 'Successfully inserted into Course table', result });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//...get course..
  

  const getcourse = (req,res) => {
    const sql = "select * from course"
    db.query(sql,(err,result)=>{
      if(!err){
        res.send(result)
      }else{
        console.log(err)
      }
    })
  }


  // get all class list
  const getclasslist = (req,res) =>{
    const sql = "select * from course";
    db.query(sql,(err,result)=>{
      if(!err){
        res.send(result)
      }else{
        console.log(err)
      }
    })
  }

  //...getsingle course....
  const getsinglecourse = (req, res) => {
    const courseid = req.params.courseid; // Use req.params.courseid
  
    try {
      const sql = 'SELECT * FROM course WHERE `id` = ?';
      db.query(sql, [courseid], (err, results) => {
        if (err) {
          console.error('Error retrieving course data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (results.length === 0) {
          // If no course is found with the given id
          return res.status(404).json({ error: 'Course not found' });
        }
  
        res.status(200).json({ message: 'Data received successfully', results });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


//   ..update single course..

const updatecourse = (req, res) => {
  const { id } = req.params;
  const { courseType } = req.body;
  console.log('course...', courseType, 'couid...', id);

  // Update the course in the courses table
  const sql = 'UPDATE course SET course_type = ? WHERE id = ?';

  db.query(sql, [courseType, id], (updateCourseErr, updateCourseResult) => {
      if (updateCourseErr) {
          console.error("Error updating course:", updateCourseErr);
          res.status(500).send("Error updating course.");
          return;
      }

      // Update corresponding course details in the staff table
      const updateStaffQuery = "UPDATE staff SET course = ?  WHERE courses_id = ?";
      db.query(updateStaffQuery, [courseType, id], (updateStaffErr, updateStaffResult) => {
          if (updateStaffErr) {
              console.error("Error updating staff course details:", updateStaffErr);
              res.status(500).send("Error updating staff course details.");
              return;
          }

          // Update corresponding course details in the student table
          const updateStudentQuery = "UPDATE student SET course= ? WHERE courses_id = ?";
          db.query(updateStudentQuery, [courseType, id], (updateStudentErr, updateStudentResult) => {
              if (updateStudentErr) {
                  console.error("Error updating student course details:", updateStudentErr);
                  res.status(500).send("Error updating student course details.");
                  return;
              }

              // Update corresponding course details in the subject table
              const sqlUpdateSubject = "UPDATE subjects SET class = ? WHERE class_id = ?";
              db.query(sqlUpdateSubject, [courseType, id], (updateSubjectErr, updateSubjectResult) => {
                  if (updateSubjectErr) {
                      console.error("Error updating subject course details:", updateSubjectErr);
                      res.status(500).send("Error updating subject course details.");
                      return;
                  }

                  res.status(200).send("Course updated successfully.");
              });
          });
      });
  });
};





const deletecourse = (req, res) => {
  const { id } = req.params;

  // Delete the class from the course table
  const deleteCourseSql = 'DELETE FROM course WHERE id = ?';
  db.query(deleteCourseSql, [id], (deleteCourseErr, deleteCourseResult) => {
      if (deleteCourseErr) {
          console.error("Error deleting course:", deleteCourseErr);
          res.status(500).send("Error deleting course.");
          return;
      }

      // Update corresponding course details in the staff table
      const updateStaffQuery = "UPDATE staff SET course = NULL,courses_id = NULL WHERE courses_id = ?";
      db.query(updateStaffQuery, [id], (updateStaffErr, updateStaffResult) => {
          if (updateStaffErr) {
              console.error("Error updating staff course details:", updateStaffErr);
              res.status(500).send("Error updating staff course details.");
              return;
          }

          // Update corresponding course details in the student table
          const updateStudentQuery = "UPDATE student SET course = NULL, courses_id = NULL WHERE courses_id = ?";
          db.query(updateStudentQuery, [id], (updateStudentErr, updateStudentResult) => {
              if (updateStudentErr) {
                  console.error("Error updating student course details:", updateStudentErr);
                  res.status(500).send("Error updating student course details.");
                  return;
              }
              

              

              // Update corresponding course details in the subject table
              const updateSubjectQuery = "DELETE FROM attendance WHERE class_id = ?";
              db.query(updateSubjectQuery, [id], (updateSubjectErr, updateSubjectResult) => {
                  if (updateSubjectErr) {
                      console.error("Error updating subject course details:", updateSubjectErr);
                      res.status(500).send("Error updating subject course details.");
                      return;
                  }

                  res.status(200).send("Course deleted successfully.");
              });
          });
      });
  });
};

// ...get all subject list...


const getsubjectlist = (req,res) =>{
  const sql = "select * from subjects";
  db.query(sql,(err,result)=>{
    if(!err){
      res.send(result)
    }else{
      console.log(err)
    }
  })
}







  // add student....

 
  const addstudent = (req, res) => {
    // Check if email already exists
    console.log('studnet add',req.body);

    const checkEmailQuery = "SELECT COUNT(*) AS count FROM student WHERE email = ?";
  
    db.query(checkEmailQuery, [req.body.email], (emailCheckErr, emailCheckResults) => {
      if (emailCheckErr) {
        return res.status(500).send(emailCheckErr);
      }
  
      const emailCount = emailCheckResults[0].count;
  
      if (emailCount > 0) {
        // Email already exists, send a response indicating the conflict
        return res.status(409).send("Email already exists");
      }
  
      // Continue with insertion if email doesn't exist
      if (!req.body.firstName) {
        return res.status(400).send("First Name is required");
      }
  
      // Ensure phoneNumber is provided
      if (!req.body.phoneNumber) {
        return res.status(400).send("Phone Number is required");
      }
  
      // console.log('Student dataaa:', req.body);
  
      const { password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      console.log('Hashed password:', hashedPassword);
  
      // Extract course labels
      const courseNames = req.body.courses.map(course => course.label);
      const course_id = req.body.courses.map(course => course.value)
      console.log(courseNames[0]);
      console.log(course_id[0]);

  
      const values = [
        req.body.ROLE_TYPE,
        req.body.firstName,
        req.body.email,
        hashedPassword,
        req.body.phoneNumber,
        req.body.gender,
        req.body.address,       
        courseNames[0], // Pass array of course names
        course_id[0]
      ];
  
      const sql = "INSERT INTO student (`ROLE_TYPE`, `first_name`, `email`, `password`, `phoneNumber`, `gender`, `address`, `course`, `courses_id`) VALUES (?)";
  
      db.query(sql, [values], (err, row) => {
        if (!err) {
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
            to: req.body.email,
            subject: 'Login Credentials for Your Account',
            html: `
              <p>Dear ${req.body.firstName},</p>
              <p>Your account has been created successfully. Please use the following credentials to log in:</p>
              <p>Email: ${req.body.email}</p>
              <p>Password: ${req.body.password}</p>
              <p>Thank you!</p>
            `
          };
  
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
              return res.status(500).send("Error sending email");
            } else {
              console.log('Email sent: ' + info.response);
              res.send(row);
            }
          });
        } else {
          res.status(500).send(err);
        }
      });
    });
  };


// add staff.....

const addstaff = (req, res) => {
  // Check if email already exists
  console.log('addstfff',req.body)
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM staff WHERE email = ?";

  db.query(checkEmailQuery, [req.body.email], (emailCheckErr, emailCheckResults) => {
      if (emailCheckErr) {
          return res.status(500).send(emailCheckErr);
      }

      const emailCount = emailCheckResults[0].count;

      if (emailCount > 0) {
          // Email already exists, send a response indicating the conflict
          return res.status(409).send("Email already exists");
      }

      // Continue with insertion if email doesn't exist
      if (!req.body.firstName) {
          return res.status(400).send("First Name is required");
      }

      // Ensure phoneNumber is provided
      if (!req.body.phoneNumber) {
          return res.status(400).send("Phone Number is required");
      }

      console.log('Staff data:', req.body);

      const { password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      console.log('Hashed password:', hashedPassword);

      
      const values = [
          req.body.ROLE_TYPE,
          req.body.firstName,
          req.body.email,
          hashedPassword,
          req.body.phoneNumber,
          req.body.gender,
          req.body.address,
          req.body.course,
          req.body.courseId,
      ];

      const sql = "INSERT INTO staff (`ROLE_TYPE`, `first_name`, `email`, `password`, `phoneNumber`, `gender`, `address`, `course`, `courses_id`) VALUES (?)";

      db.query(sql, [values], (err, row) => {
          if (err) {
              return res.status(500).send(err);
          } else {
              // Sending email to the user with login credentials
              const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: `nareshpogiri409@gmail.com`, // Your Gmail address
                      pass: `edsqsnpuxerpwlrz` // Application-specific password
                  },
                  logger: true, 
                  debug: true 
              });

              const mailOptions = {
                  from: 'nareshpogiri409@gmail.com',
                  to: req.body.email,
                  subject: 'Login Credentials for Your Account',
                  html: `
                      <p>Dear ${req.body.firstName},</p>
                      <p>Your account has been created successfully. Please use the following credentials to log in:</p>
                      <p>Email: ${req.body.email}</p>
                      <p>Password: ${req.body.password}</p>
                      <p>Thank you!</p>
                  `
              };

              transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                      console.log(error);
                      return res.status(500).send("Error sending email");
                  } else {
                      console.log('Email sent: ' + info.response);
                      return res.status(200).send("Staff added successfully and email sent");
                  }
              });
          }
      });
  });
};

// add financier....

const addfinancier = (req, res) => {
  
  console.log('financier',req.body)
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM financier WHERE email = ?";

  db.query(checkEmailQuery, [req.body.email], (emailCheckErr, emailCheckResults) => {
      if (emailCheckErr) {
          return res.status(500).send(emailCheckErr);
      }

      const emailCount = emailCheckResults[0].count;

      if (emailCount > 0) {
          // Email already exists, send a response indicating the conflict
          return res.status(409).send("Email already exists");
      }

      // Continue with insertion if email doesn't exist
      if (!req.body.firstName) {
          return res.status(400).send("First Name is required");
      }

      // Ensure phoneNumber is provided
      if (!req.body.phoneNumber) {
          return res.status(400).send("Phone Number is required");
      }

      console.log('financier data:', req.body);

      const { password } = req.body;
      const hashedPassword = bcryptjs.hashSync(password, 10);
      console.log('Hashed password:', hashedPassword);

      
      const values = [
          req.body.roleType,
          req.body.firstName,
          req.body.email,
          hashedPassword,
          req.body.phoneNumber,
          req.body.gender,
          req.body.address,                
      ];

      const sql = "INSERT INTO financier (`ROLE_TYPE`, `first_name`, `email`, `password`, `phoneNumber`, `gender`, `address`) VALUES (?)";

      db.query(sql, [values], (err, row) => {
          if (err) {
              return res.status(500).send(err);
          } else {
              // Sending email to the user with login credentials
              const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: `nareshpogiri409@gmail.com`, // Your Gmail address
                      pass: `edsqsnpuxerpwlrz` // Application-specific password
                  },
                  logger: true, 
                  debug: true 
              });

              const mailOptions = {
                  from: 'nareshpogiri409@gmail.com',
                  to: req.body.email,
                  subject: 'Login Credentials for Your Account',
                  html: `
                      <p>Dear ${req.body.firstName},</p>
                      <p>Your account has been created successfully. Please use the following credentials to log in:</p>
                      <p>Email: ${req.body.email}</p>
                      <p>Password: ${req.body.password}</p>
                      <p>Thank you!</p>
                  `
              };

              transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                      console.log(error);
                      return res.status(500).send("Error sending email");
                  } else {
                      console.log('Email sent: ' + info.response);
                      return res.status(200).send("financier added successfully and email sent");
                  }
              });
          }
      });
  });
};


// const addfinancier = async (req, res) => {
//   console.log('fin',req.body)
//   try {
//       const { roleType, firstName, email, password, phoneNumber, gender, address } = req.body;
      
//       // Validate input fields
//       if (!roleType || !firstName || !email || !password || !phoneNumber || !gender || !address) {
//           return res.status(400).json({ error: 'All fields are required.' });
//       }

//       // Check if the email already exists
//       const emailCheckQuery = 'SELECT COUNT(*) AS count FROM financier WHERE email = ?';
//       const [emailCheckResults] = await db.query(emailCheckQuery, [email]);

//       if (emailCheckResults.count > 0) {
//           return res.status(409).json({ error: 'Email already exists.' });
//       }

//       // Hash the password
//       const hashedPassword = bcryptjs.hashSync(password, 10);

//       // Insert financier into the database
//       const insertQuery = 'INSERT INTO financier (ROLE_TYPE, first_name, email, password, phoneNumber, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
//       const values = [roleType, firstName, email, hashedPassword, phoneNumber, gender, address];
//       await db.query(insertQuery, values);

//       // Set up Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//               user: 'nareshpogiri409@gmail.com',
//               pass: 'edsqsnpuxerpwlrz'
//           }
//       });

//       // Email options
//       const mailOptions = {
//           from: 'nareshpogiri409@gmail.com',
//           to: email,
//           subject: 'Your Account Login Credentials',
//           html: `
//               <p>Dear ${firstName},</p>
//               <p>Your account has been created successfully. Please use the following credentials to log in:</p>
//               <p>Email: ${email}</p>
//               <p>Password: ${password}</p>
//               <p>Thank you!</p>
//           `
//       };

//       // Send email
//       await transporter.sendMail(mailOptions);
      
//       res.status(200).json({ message: 'Financier added successfully and email sent.' });
//   } catch (error) {
//       console.error('Error adding financier:', error);
//       res.status(500).json({ error: 'Error adding financier.' });
//   }
// };



  const getstafflist = (req,res)=>{
      const sql = "select * from staff" ;
      db.query(sql,(err,result)=>{
        if(!err){
          res.send(result)
        }else{
          res.send(err)
        }
      })

  }

  // admin get students list..
  const getstudentlist = (req, res) => {
    const sql = "select * from student";
    db.query(sql, (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  };
  
  // add subject...



const addsubject = (req, res) => {
  console.log('addsubject',req.body);

  const { subjectName} = req.body;

  // Check if the subject already exists in the database
  const checkQuery = "SELECT * FROM subjects WHERE subjectname = ?";
  db.query(checkQuery, [subjectName], (checkErr, checkResult) => {
      if (checkErr) {
          console.error("Error checking subject:", checkErr);
          res.status(500).send("Error checking subject.");
          return;
      }

      // If subject already exists, send response
      if (checkResult.length > 0) {
          res.status(400).send("Subject already exists.");
          return;
      }
  
      const values = [subjectName];
      const insertQuery = "INSERT INTO subjects (`subjectname`) VALUES (?)";
      db.query(insertQuery, [values], (insertErr, insertResult) => {
          if (insertErr) {
              console.error("Error inserting subject:", insertErr);
              res.status(500).send("Error inserting subject.");
              return;
          }
          // Send success response
              res.status(200).send("Subject added successfully.");
          });     
         });

};

const editsubject = (req, res) => {
  // Extract data from request body
  const { subjectName } = req.body;
  const { id } = req.params;

  // Prepare SQL query to update subject name in the subjects table
  const updateSubjectSql = `UPDATE subjects SET subjectname = ? WHERE id = ?`;

  // Prepare SQL query to update teachsubject column in the staff table
  const updateStaffSql = `UPDATE staff SET teachsubject = ? WHERE teachsubject_id = ?`;

  // Prepare SQL query to update subject information in staff_subjectsassign table
  const updateStaffSubjectsSql = `UPDATE staff_subjectsassign SET subject_name = ? WHERE subject_id = ?`;

  // Execute the queries
  db.query(updateSubjectSql, [subjectName, id], (err, result) => {
    if (err) {
      console.error('Error updating subject:', err);
      res.status(500).json({ error: 'Error updating subject' });
    } else {
      // Update teachsubject column in the staff table
      db.query(updateStaffSql, [subjectName, id], (err, result) => {
        if (err) {
          console.error('Error updating teachsubject in staff table:', err);
          res.status(500).json({ error: 'Error updating subject' });
        } else {
          // Update subject information in staff_subjectsassign table
          db.query(updateStaffSubjectsSql, [subjectName, id], (err, result) => {
            if (err) {
              console.error('Error updating subject in staff_subjectsassign table:', err);
              res.status(500).json({ error: 'Error updating subject' });
            } else {
              console.log('Subject and related information updated successfully');
              res.status(200).json({ message: 'Subject updated successfully' });
            }
          });
        }
      });
    }
  });
};





const deletesubject = (req, res) => {
  const { id } = req.params;

  // Delete the subject from the subjects table
  const deleteQuery = "DELETE FROM subjects WHERE id = ?";
  db.query(deleteQuery, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
          console.error("Error deleting subject:", deleteErr);
          res.status(500).send("Error deleting subject.");
          return;
      }

      // Update the corresponding staff's teachsubject to NULL in the staff table
      const updateQuery = "UPDATE staff SET teachsubject = NULL, teachsubject_id = NULL WHERE teachsubject_id = ?";
      db.query(updateQuery, [id], (updateErr, updateResult) => {
          if (updateErr) {
              console.error("Error updating staff's teachsubject:", updateErr);
              res.status(500).send("Error updating staff's teachsubject.");
              return;
          }

          // Send success response
          res.status(200).send("Subject deleted successfully.");
      });
  });
};




// admin delete Students....

const deleteStudents = (req,res) =>{
    const {id} = req.params
    const sql = 'DELETE FROM student WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
      if(err){
        console.error("Error deleting student:", err);
        res.status(500).send("Error deleting student.");
      }else{
        res.status(200).send("Student deleted successfully.");
      }
    })

   
}

// edit students...
const editstudents = (req, res) => {
  const { id } = req.params; 
  const { first_name, email, phoneNumber, gender, course, status,class_id } = req.body; // Get updated student data from request body
console.log('edited...',req.body) 
  // SQL query to update the student record
  const sql = 'UPDATE student SET first_name=?, email=?, phoneNumber=?, gender=?, course=?, courses_id =?, status=? WHERE id=?';

  // Execute the SQL query
  db.query(sql, [first_name, email, phoneNumber, gender, course, class_id, status, id], (err, result) => {
    if (err) {
      console.error("Error editing student:", err);
      res.status(500).send("Error editing student.");
    } else {
      if (result.affectedRows > 0) {
        res.status(200).send("Student updated successfully.");
      } else {
        res.status(404).send("Student not found.");
      }
    }
  });
};

// delet staff...


const deletestaff = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Staff ID is required.' });
  }

  // Construct the SQL query to delete the staff member
  const deleteStaffSQL = 'DELETE FROM staff WHERE id = ?';
  const deleteSubjectSQL = 'UPDATE subjects SET staffName = NULL, staff = NULL WHERE staff = ?';

  // Execute the SQL queries to delete the staff member and update subjects table
  db.beginTransaction(function(err) {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'An error occurred while deleting the staff member.' });
    }

    db.query(deleteStaffSQL, [id], function(err, staffResult) {
      if (err) {
        db.rollback(function() {
          console.error('Error deleting staff member:', err);
          res.status(500).json({ error: 'An error occurred while deleting the staff member.' });
        });
      }

      // Check if any rows were affected by the deletion query
      if (staffResult.affectedRows === 0) {
        db.rollback(function() {
          res.status(404).json({ error: 'Staff member not found.' });
        });
      }

      db.query(deleteSubjectSQL, [id], function(err, subjectResult) {
        if (err) {
          db.rollback(function() {
            console.error('Error updating subjects table:', err);
            res.status(500).json({ error: 'An error occurred while updating subjects table.' });
          });
        }

        db.commit(function(err) {
          if (err) {
            db.rollback(function() {
              console.error('Error committing transaction:', err);
              res.status(500).json({ error: 'An error occurred while deleting the staff member.' });
            });
          }
          console.log('Transaction Complete.');
          res.status(200).json({ message: 'Staff member and related subjects deleted successfully.' });
        });
      });
    });
  });
};




//   edit staff...
const editstaffs = (req, res) => {
  console.log('Request Body....?', req.body);
  console.log('Request Params:', req.params);

  const { first_name, email, phoneNumber, gender, course, courses_id, status, teachsubject,subject_id, } = req.body;
  const { id } = req.params;

  // SQL query to update staff details
  const sql = 'UPDATE staff SET first_name=?, email=?, phoneNumber=?, gender=?, course=?, courses_id=?, status=?, teachsubject=?, teachsubject_id =? WHERE id=?';
  
  // Execute the SQL query
  db.query(sql, [first_name, email, phoneNumber, gender, course, courses_id, status, teachsubject, subject_id, id], (err, result) => {
    if (err) {
      console.error('Error updating staff details:', err);
      res.status(500).json({ error: 'An error occurred while updating staff details.' });
    } else {
      console.log('Staff details updated successfully.');
      res.status(200).json({ message: 'Staff details updated successfully.' });
    }
  });
};


// edit subjects...
const editsubjects = (req, res) => {
  console.log(req.params);
  console.log(req.body);

  // Extracting data from request body
  const { subjectname, staffName, staff_id,  class_id , class: className } = req.body;
  const { id } = req.params; // Assuming the subject ID is passed in the URL params

  // Constructing the SQL query
  const sql = 'UPDATE subjects SET subjectname = ?, staffName = ?, staff = ?, class_id = ?, class = ? WHERE id = ?'; // Assuming 'id' is the primary key

  // Executing the SQL query
  db.query(sql, [subjectname, staffName, staff_id,  class_id , className, id], (err, result) => {
      if (err) {
          console.error("Error updating subject:", err);
          res.status(500).json({ error: "Error updating subject" });
      } else {
          console.log("Subject updated successfully");
          res.status(200).json({ message: "Subject updated successfully" });
      }
  });
};

// notify staff...


// const notifystaff = (req, res) => {
//   const {selectedStaffId} = req.params; // Corrected to get the id parameter from request params
//   const {notificationMessage} = req.body; // Ensure you're accessing the correct property in the request body
//   console.log('notifyed', req.body);

//   // Insert notification message into staff table
//   const query = 'UPDATE staff SET notifications = ? WHERE id = ?'; // Corrected SQL query

//   db.query(query, [notificationMessage, selectedStaffId], (error, results, fields) => {
//     if (error) {
//       console.error('Error inserting notification message:', error);
//       res.status(500).send('Error inserting notification message');
//     } else {
//       console.log('Notification message inserted successfully');
//       res.status(200).send('Notification message inserted successfully');
//     }
//   });
// }

const notifystaff = (req, res) => {
  const { selectedStaffId } = req.params; // Get the student ID from the request parameters
  const { notificationMessage, Sendby } = req.body; // Get the message and sender from the request body

  // Get the current time and date and convert them to Indian Standard Time (IST)
  const istDateTime = moment().tz('Asia/Kolkata');
  const istDate = istDateTime.format('YYYY-MM-DD'); // Format as YYYY-MM-DD
  const istTime = istDateTime.format('h:mm A'); // Format as 12-hour time (e.g., 9:30 am, 9:30 pm)

  // Insert a new notification into the allnotifications table
  const query = `
      INSERT INTO staffnotifications (userid, notification_message, sendby, Date, Time)
      VALUES (?, ?, ?, ?, ?)
  `;

  // Execute the query with the provided values, including the IST date and time
  db.query(query, [selectedStaffId, notificationMessage, Sendby, istDate, istTime], (error, results) => {
      if (error) {
          console.error('Error inserting notification message:', error);
          res.status(500).send('Error inserting notification message');
      } else {
          console.log('Notification message inserted successfully');
          res.status(200).send('Notification message sent successfully');
      }
  });
};




// notify student...
const notifystudent = (req, res) => {
    const { selectedStudentId } = req.params; // Get the student ID from the request parameters
    const { notificationMessage, Sendby, Pic} = req.body; // Get the message and sender from the request body

    // Get the current time and date and convert them to Indian Standard Time (IST)
    const istDateTime = moment().tz('Asia/Kolkata');
    const istDate = istDateTime.format('YYYY-MM-DD'); // Format as YYYY-MM-DD
    const istTime = istDateTime.format('h:mm A'); // Format as 12-hour time (e.g., 9:30 am, 9:30 pm)

    // Insert a new notification into the allnotifications table
    const query = `
        INSERT INTO studentnotifications (userid, notification_message, sendby, Pic, Date, Time)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with the provided values, including the IST date and time
    db.query(query, [selectedStudentId, notificationMessage, Sendby, Pic, istDate, istTime], (error, results) => {
        if (error) {
            console.error('Error inserting notification message:', error);
            res.status(500).send('Error inserting notification message');
        } else {
            console.log('Notification message inserted successfully');
            res.status(200).send('Notification message sent successfully');
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




// staff leave approvels..

const getsatffleaves = (req,res) => {
   const sql = 'select * from staff_leave'
   db.query(sql,(err,result)=>{
    if(!err){
      res.send(result)
    }else{
      console.log(err)
    }
   })
}

// staff approve leaves...
const approvestaffleaves = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
console.log(status)
  // Assuming you're using some SQL database
  const sql = 'UPDATE staff_leave SET status = ? WHERE id = ?';

  // Execute the query with status and id as parameters
  db.query(sql, [status, id], (err, result) => {
      if (err) {
          console.error('Error updating leave request:', err);
          res.status(500).json({ error: 'An error occurred while updating leave request.' });
      } else {
          console.log(`Leave request with ID ${id} has been updated with status: ${status}`);
          res.status(200).json({ message: `Leave request with ID ${id} has been updated with status: ${status}` });
      }
  });
};



export {
  updateprofile,
  admingetdeatils,
    adminlogin,
    adminlogout,
    addcourse,
    getcourse,
    getclasslist,
    getsubjectlist,
    getsinglecourse,
    updatecourse,
    deletecourse,
    addstudent,
    addstaff,
    addfinancier,
    getstafflist,
    getstudentlist,
    addsubject,
    editsubject,
    deletesubject,
    deleteStudents,
    deletestaff,
    editstudents,
    editstaffs,
    editsubjects,
    notifystaff,
   notifystudent,
    getsatffleaves,
    approvestaffleaves,
    markNotificationAsRead
}
 