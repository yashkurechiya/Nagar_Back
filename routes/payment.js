import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.js';
import { verifyToken } from '../middleware/auth.js';
 

const Prouter = express.Router();
Prouter.post("/create-order", createOrder);
Prouter.post("/verify", verifyToken ,verifyPayment);

export default Prouter;