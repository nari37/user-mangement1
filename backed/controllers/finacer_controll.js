import db from "../index.js";

const updatefeesdetails = (req,res)=>{
  const{selectedFeeType,studentDetails, updatedData} = req.body;
console.log(req.body)
  
// .....Hostel,Tuition,Examination,Bus
  
if(selectedFeeType === 'Tuition'){
  const values = [
    updatedData
  ]
  const sql = 'UPDATE  fees_details SET (Tuition_fees,Tuition_paid,Tuition_pending,Tuition_total) VALUES (?)'
}
    
}





export{
    updatefeesdetails
}