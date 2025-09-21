// server.js

import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Use constants for better readability and maintenance
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employeemanagerDB'; // Default for local development

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost'
];

// Middleware
// -------------------------------------------------------------
app.use(express.json()); // Body parser for JSON data
app.use(compression()); // Gzip compression for faster responses
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// -------------------------------------------------------------

// Import routes
// -------------------------------------------------------------
import authRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

// -------------------------------------------------------------

//  Routes and Error Handling

// Base route to check if the API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});
// -------------------------------------------------------------
// User authentication routes
app.use('/api/auth', authRoutes);

// Error handling middleware (should be the last middleware added)
app.use(errorHandler);

// -------------------------------------------------------------

//  Connect to DB and Start Server

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`🌍 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  });