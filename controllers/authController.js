const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for creating and verifying JSON Web Tokens
const bcrypt = require('bcrypt'); // Importing bcrypt for hashing passwords
const User = require('../models/User'); // Importing the User model for database operations

// Register a new user
const register = async (req, res) => {
    const { name, email, password } = req.body; // Destructuring the request body to get name, email, and password

    if (!name || !email || !password) { // Checking if any of the required fields are missing
        return res.status(400).json({ message: 'Please fill all fields' }); // Sending a 400 Bad Request response
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
        });

        await newUser.save(); // Saving the new user to the database

        const token = jwt.sign( // Creating a JWT token for the new user
            { id: newUser._id }, // Using the user's ID as payload
            process.env.JWT_SECRET, // Using the secret key from environment variables
            { expiresIn: '30d' } // Setting the token to expire in 30 days
        );

        return res.status(201).json({ // Sending a 201 Created response with the new user and token
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token, // Sending the JWT token
        });
    } catch (error) { // Catching any errors that occur during the process
        return res.status(500).json({ message: 'Server error' }); // Sending a 500 Internal Server Error response
    }
};


module.exports = {
    register, // Exporting the Register function to be used in other parts of the application
};