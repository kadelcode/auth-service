/*
    * server.js
    * This file sets up an Express server with MongoDB connection, middleware for security and logging,
    * and routes for authentication. It also includes error handling and a health check endpoint.
    */

require('dotenv').config(); // Importing dotenv to load environment variables from a .env file
const express = require('express'); // Importing express for creating the server
const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const cors = require('cors'); // Importing cors for enabling Cross-Origin Resource Sharing
const helmet = require('helmet'); // Importing helmet for securing HTTP headers
const morgan = require('morgan'); // Importing morgan for logging HTTP requests

const authRoutes = require('./routes/authRoutes'); // Importing authentication routes
// const errorHandler = require('./middleware/errorHandler'); // Importing custom error handling middleware

const app = express(); // Creating an instance of express

app.use(cors()); // Enabling CORS for all routes
app.use(helmet()); // Using helmet to secure HTTP headers
app.use(morgan('dev')); // Using morgan for logging HTTP requests in 'dev' format
app.use(express.json()); // Parsing JSON request bodies

// Routes
app.use('/api/v1/auth', authRoutes); // Mounting authentication routes under '/api/v1/auth'

// Health check route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' }); // Sending a 200 OK response for health check
});

// Eror handling middleware (must be defined after all routes)
// app.use(errorHandler); // Using custom error handling middleware

const PORT = process.env.PORT || 5000; // Setting the port from environment variables or defaulting to 5000
// const MONGO_URI = process.env.MONGO_URI; // Getting MongoDB URI from environment variables

// Database connection
mongoose.connect(process.env.MONGO_URI) // Connecting to MongoDB using the URI from environment variables
.then(() => {
    console.log('MongoDB connected'); // Logging success message on successful connection
    app.listen(PORT, () => { // Starting the server on the specified port
        console.log(`Server is running on port ${PORT}`); // Logging the server start message
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error); // Logging error message on connection failure
    process.exit(1); // Exiting the process with failure code
});