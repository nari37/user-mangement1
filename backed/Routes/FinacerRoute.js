import express from 'express';
import { updatefeesdetails } from '../controllers/finacer_controll.js';


const Finacer = express.Router()

Finacer.put('/fees/:feeId',updatefeesdetails)

export default Finacer;