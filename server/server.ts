import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs'
import cors from 'cors';
import path from 'path';
import connectDB from './configs/db';
const app = express();
const port = 5000; // Or any port you want
app.use(cors());

// Mongoose setup

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: Number,  // In a real-world application, you should hash the password
});


connectDB();
app.use(express.json());
const setupRoutes = async () => {
  const files = fs.readdirSync('./Routes');
  for (const file of files) {
    const modulePath = path.join(__dirname, 'Routes', file);
    // Dynamic import
    const { default: route } = await import(modulePath);
    app.use('/api', route);
  }
};
setupRoutes().then(()=>{
  app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
  });
});