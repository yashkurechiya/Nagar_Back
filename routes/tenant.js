import express from 'express'
import { getTanant, registerTenant } from '../controllers/tenant.js';

export const Trouter = express.Router();

Trouter.post('/register', registerTenant);
Trouter.get('/getTenant', getTanant);