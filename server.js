// This file sets up the main application for the Express server and connects to MongoDB.
// server.js

require('dotenv').config(); // Importing dotenv to load environment variables from a .env file
const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const app = require('./app'); // Importing the express application instance from app.js



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