import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';  
import connectDB from './src/config/db.js';
import certificateRoutes from './src/routes/certificateRoutes.js';
dotenv.config();

connectDB(); 
const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/certificates', certificateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});