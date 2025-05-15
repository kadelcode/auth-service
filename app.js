/*
 * @file app.js
 * @description This file sets up the Express application and configures middleware and routes.
 * @author Kadel
 * @date 2025-05-10
 */
const express = require('express'); // Importing express for creating the router
const app = express(); // Creating a new express application instance
const authRoutes = require('./routes/authRoutes'); // Importing authentication routes
const cors = require('cors'); // Importing cors for enabling Cross-Origin Resource Sharing
const helmet = require('helmet'); // Importing helmet for securing HTTP headers
const morgan = require('morgan'); // Importing morgan for logging HTTP requests
const cookieParser = require('cookie-parser');

const allowedOrigins = [
    'http://localhost:3000',
    'https://auth-frontend-sooty.vercel.app',
]
// Middleware to parse JSON request bodies
app.use(express.json()); // Using express.json() middleware to parse JSON request bodies

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
})); // Enabling CORS for all routes
app.use(helmet()); // Using helmet to secure HTTP headers
app.use(morgan('dev')); // Using morgan for logging HTTP requests in 'dev' format
app.use(express.json()); // Parsing JSON request bodies
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes); // Mounting authentication routes under '/api/v1/auth'

// Health check route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' }); // Sending a 200 OK response for health check
});

module.exports = app; // Exporting the express application instance for use in other files