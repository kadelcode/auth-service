const express = require('express'); // Importing express for creating the router
const router = express.Router(); // Creating a new router instance
const { register, login, profile } = require('../controllers/authController'); // Importing the controller functions for handling authentication
const authMiddleware = require('../middleware/authMiddleware'); // Importing the authentication middleware

router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login
router.get('/profile', authMiddleware(['admin', 'user']), profile); // Route for getting user profile, protected by authentication middleware
router.get('/admin', authMiddleware('admin'), (req, res) => { // Route for admin access, protected by authentication middleware
    res.status(200).json({ message: 'Welcome Admin' }); // Sending a welcome message for admin access
} // Sending a 200 OK response with the welcome message
);

module.exports = router; // Exporting the router to be used in other parts of the application