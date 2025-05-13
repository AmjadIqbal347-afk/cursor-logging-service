// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  // Store the start time
  const start = Date.now();
  // Listen for the response to finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    // Log method, URL, status code, and duration
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Import the logs router
const logsRouter = require('./routes/logs');
// Use the logs router for /logs endpoints
app.use('/logs', logsRouter);

// Global error handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server on port 3000 or the value from environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //console.log(process.env.PG_PASSWORD);
});
