const express = require('express'); // Importing express for creating the router
const router = express.Router(); // Creating a new router instance
const { register, login, profile, logout } = require('../controllers/authController'); // Importing the controller functions for handling authentication
const authMiddleware = require('../middleware/authMiddleware'); // Importing the authentication middleware
const ROLES = require('../config/roles'); // Importing the roles configuration

router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login
router.get('/profile', authMiddleware([ROLES.USER, ROLES.ADMIN]), profile); // Route for getting user profile, protected by authentication middleware
router.get('/admin', authMiddleware([ROLES.ADMIN]), (req, res) => { // Route for admin access, protected by authentication middleware
    res.status(200).json({ message: 'Welcome Admin' }); // Sending a welcome message for admin access
}) // Sending a 200 OK response with the welcome message
router.get('/logout', authMiddleware(), logout); // Sending a 200 OK response with the logout message


module.exports = router; // Exporting the router to be used in other parts of the application