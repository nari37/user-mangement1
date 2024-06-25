import React, { createContext, useEffect, useState } from 'react'
import Login from './Login'
import {Routes,Route, json} from 'react-router-dom';
import Admin from './Admin';

import Student from './Student';
import UpdateStundent from './UpdateStundent';
import Staff from './Staff';
import Editcourse from './Editcourse';
import axios from 'axios';
import Model from './commponents/Model';

import Collectfees from './Financerelated/Collectfees';
import FinancingHomepage from './Financerelated/Financepage';
import StudentBalanceModal from './Financerelated/StudentBalanceModal';



export const DataContext = createContext();

export default function App() {
  const [stafflist,setstafflist] = useState([]);
  const [studnetlist,setstudnetlist] = useState([]);
  const [classlist,setclasslist] = useState([]);
  const [subjectlist,setsubjectlist] = useState([]);




  const[staffCout,setstaffCout] = useState(0);
  const[studentCout,setstudentCout] = useState(0);
  const[classCout,setclassCout] = useState(0);
  const[subjectCount,setsubjectCount] = useState(0);


// console.log(studnetlist)

  // console.log(staffCout)
console.log()
  // get staff list...
    useEffect(()=>{
      axios.get('http://localhost:8000/backend/admin/getstafflist')
      .then(res=> {
        setstafflist(res.data)
        setstaffCout(res.data.length)
      })

    },[stafflist])
    // get student list...
    useEffect(()=>{
      axios.get('http://localhost:8000/backend/admin/getstudentlist')
      .then(res=> {
        setstudnetlist(res.data)
        setstudentCout(res.data.length)
      })

    },[studnetlist])
    // get classlist...

useEffect (()=>{
  axios.get('http://localhost:8000/backend/admin/getclasslist')
  .then(res=>{
    setclasslist(res.data)
    setclassCout(res.data.length)
  })
},[classlist])

// get subjectlist....

useEffect(()=>{
  axios.get('http://localhost:8000/backend/admin/getsubjectlist')
  .then(res=>{
    setsubjectlist(res.data)
    setsubjectCount(res.data.length)
  })
},[subjectlist])


    
   
  return (
    <>
     <DataContext.Provider value={{staffCout,setstaffCout,studentCout,setstudentCout,classCout,setclassCout,studnetlist,setstudnetlist,stafflist,setstafflist,classlist,setclasslist,subjectlist,setsubjectlist,subjectCount}}>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/student/:id' element={<Student/>}/>
      {/* <Route path='/staff/:id' element={<Staff/>}/> */}
      <Route path='/staff/:id' element={<Staff/>}/>
      <Route path='/updateprofile' element={<UpdateStundent/>}/>
      <Route path='/editcourse/:id' element = {<Editcourse/>} />
      <Route path='/modele' element = {<Model/>} />
      <Route path='/finace' element = {<FinancingHomepage/>} />
      <Route path='/collectfees' element = {<Collectfees/>} />
      <Route path='/studentfess/:id' element = {<StudentBalanceModal/>} />    

    </Routes>
    </DataContext.Provider>
    </>
    
  )
}


