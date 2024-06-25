import express from 'express';
import mysql from 'mysql';
import Admin from './Routes/AdminRoute.js';
import staff from './Routes/StaffRoute.js';
import student from './Routes/StudentRoute.js';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import finacer from './Routes/FinacerRoute.js';
import Finacer from './Routes/FinacerRoute.js';

dotenv.config();


 const app = express();
  app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static('public'))

const db = mysql.createConnection({
    password:'',
    host:'localhost',
    user:'root',
    database:'user_management'
})


 

db.connect((err)=>{
    if(!err){
        console.log('database connected successfully...');
    }   
        else{
            console.log('database not connected..');
        }
})



app.use('/backend/admin',Admin)
app.use('/backend/staff',staff)
app.use('/backend/student',student)
app.use('/backend/finacer',Finacer)






app.listen(8000,()=>{
    console.log('hello server is running on port...8000')
})


export default db;