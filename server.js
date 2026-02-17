import express from 'express';
import mongoose from 'mongoose';
import { Urouter } from './routes/user.js';
import { Crouter } from './routes/complaint.js';
import { configDotenv } from 'dotenv';
import cors from 'cors'
import Prouter from './routes/payment.js';
import { Trouter } from './routes/tenant.js';

const app = express();

configDotenv();

// Middleware
app.use(express.json());
app.use(cors());
// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nagarsewa';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/', (req, res) => {
    res.send("NagarSewa API is running");
});
app.use("/uploads", express.static("uploads"));
app.use('/api/users', Urouter);
app.use("/api/payment", Prouter);
app.use('/api', Crouter);
app.use('/api/tenant',Trouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})