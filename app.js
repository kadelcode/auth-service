/*
 * @file app.js
 * @description This file sets up the Express application and configures middleware and routes.
 * @author Kadel
 * @date 2025-05-10
 */
const express = require('express'); // Importing express for creating the router
const app = express(); // Creating a new express application instance
const authRoutes = require('./routes/authRoutes'); // Importing authentication routes

// Middleware to parse JSON request bodies
app.use(express.json()); // Using express.json() middleware to parse JSON request bodies

// Routes
app.use('/api/v1/auth', authRoutes); // Mounting authentication routes under '/api/v1/auth'

module.exports = app; // Exporting the express application instance for use in other files