 import express from 'express';
import { login, register } from '../controllers/user.js';
import { taxpay } from '../controllers/tax.js';
import { roleAuthorize, verifyToken } from '../middleware/auth.js';

 export const Urouter = express.Router();

// Register route
Urouter.get('/paytax' ,verifyToken, taxpay);

Urouter.post('/register', register);

// Login route
Urouter.post('/login', login);

 
