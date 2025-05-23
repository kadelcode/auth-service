const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for creating and verifying JSON Web Tokens
const bcrypt = require('bcryptjs'); // Importing bcrypt for hashing passwords
const User = require('../models/User'); // Importing the User model for database operations
const { setAuthCookie } = require('../utils/auth');
const registerSchema = require('../utils/validation');

require('dotenv').config(); // Importing dotenv to load environment variables from a .env file

// Register a new user
const register = async (req, res) => {
    const { name, email, password } = req.body; // Destructuring the request body to get name, email, and password

    const { error } = registerSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const existingUser = await User.findOne({ email }); // Checking if a user with the same email already exists
        if (existingUser) { // If a user with the same email exists
            return res.status(400).json({ message: 'User already exists' }); // Sending a 400 Bad Request response
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with a salt rounds of 10
        const newUser = await User.create({ // Creating a new user in the database
            name,
            email,
            password: hashedPassword, // Storing the hashed password
            roles: ['user'], // Assigning the default role of 'user'
        });

        // await newUser.save(); // Saving the new user to the database

        const token = jwt.sign( // Creating a JWT token for the new user
            { id: newUser._id, roles: newUser.roles }, // Using the user's ID and roles as payload
            process.env.JWT_SECRET, // Using the secret key from environment variables
            { expiresIn: '30d' } // Setting the token to expire in 30 days
        );

        // Set token as HttpOnly cookie
        setAuthCookie(res, token);

        return res.status(201).json({ // Sending a 201 Created response with the new user and token
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            //token, // Sending the JWT token
        });
    } catch (error) { // Catching any errors that occur during the process
        console.log(req.body); // Logging the request body for debugging purposes
        console.log(error); // Logging the error on the console
        console.error(error); // Logging the error for debugging purposes
        return res.status(500).json({ message: 'Server error' }); // Sending a 500 Internal Server Error response
    }
};


// Login existing user
const login = async (req, res) => {
    const { email, password } = req.body; // Destructuring the request body to get email and password

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' }); // Sending a 400 Bad Request response
    } // If any field is missing, send a 400 Bad Request response

    try {
        const user = await User.findOne({ email }).select('+password'); // Finding the user by email and including the password field
        if (!user) { // If no user is found with the given email
            return res.status(403).json({ message: 'Invalid credentials' }); // Sending a 400 Bad Request response
        }

        const isMatch = await bcrypt.compare(password, user.password); // Comparing the provided password with the hashed password in the database
        if (!isMatch) { // If the passwords do not match
            return res.status(400).json({ message: 'Invalid credentials' }); // Sending a 400 Bad Request response
        }

        const token = jwt.sign( // Creating a JWT token for the user
            { id: user._id, roles: user.roles }, // Using the user's ID and roles as payload
            process.env.JWT_SECRET, // Using the secret key from environment variables
            { expiresIn: '30d' } // Setting the token to expire in 30 days
        );

        setAuthCookie(res, token);

        return res.status(200).json({ // Sending a 200 OK response with the user and token
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            //token, // Sending the JWT token
        });
    } catch (error) { // Catching any errors that occur during the process
        return res.status(500).json({ message: 'Server error' }); // Sending a 500 Internal Server Error response
    }
};


// Get user profile
const profile = async (req, res) => {
    try {
        console.log('User ID from token:', req.user.id); // Logging the user ID from the token for debugging
        console.log('User roles from token:', req.user.roles); // Logging the user roles from the token for debugging

        const user = await User.findById(req.user.id).select('-password'); // Finding the user by ID from the request
        if (!user) { // If no user is found with the given ID
            return res.status(404).json({ message: 'User not found' }); // Sending a 404 Not Found response
        }
        return res.json(user); // Sending the user data as JSON response
    } catch (error) { // Catching any errors that occur during the process
        console.error('Profile error:', error)
        return res.status(500).json({ message: 'Server error' }); // Sending a 500 Internal Server Error response
    }
}

// Logout user
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        // Invalidate the token or perform any other logout logic here
        return res.status(200).json({ message: 'Logged out successfully' }); // Sending a 200 OK response
    } catch (error) { // Catching any errors that occur during the process
        return res.status(500).json({ message: 'Server error' }); // Sending a 500 Internal Server Error response
    }
}

module.exports = {
    register, // Exporting the Register function to be used in other parts of the application
    login, // Exporting the Login function to be used in other parts of the application
    // Add other functions as needed (e.g., logout, refresh token, etc.)
    profile, // Exporting the Profile function to be used in other parts of the application
    logout, // Exporting the Logout function to be used in other parts of the application
};