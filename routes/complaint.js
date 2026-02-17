import express from 'express'
import  { createComplaint, getComplaints, myComplaints } from '../controllers/complaints.js';
import { roleAuthorize, verifyToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { deleteComplaint, updateStatus, uploadImage } from '../controllers/adminComplaints.js';

export const Crouter = express.Router();


Crouter.post('/complaints', verifyToken,roleAuthorize("user") ,upload.single("image"),
createComplaint);
Crouter.get('/all',getComplaints)
Crouter.post('/indi/:id/update',verifyToken, roleAuthorize("authority"), updateStatus)
Crouter.post('/indi/:id/afterImage',verifyToken, roleAuthorize("authority"), upload.single("image"), uploadImage)
Crouter.get('/myComplaints', verifyToken, roleAuthorize("user"), myComplaints);
Crouter.delete('/:id/rejectComplaint', verifyToken, roleAuthorize("authority"), deleteComplaint)