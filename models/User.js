const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling

const userSchema = new mongoose.Schema({ // Defining the schema for the User model
    name: {
        type: String, // The name field is of type String
        required: true, // This field is required
        minlength: 3, // Minimum length of the name is 3 characters
        maxlength: 50, // Maximum length of the name is 50 characters
        trim: true, // Trims whitespace from both ends of the string
    },
    username: {
        type: String, // The username field is of type String
        required: true, // This field is required
        unique: true, // The username must be unique across all users
        minlength: 3, // Minimum length of the username is 3 characters
        maxlength: 20, // Maximum length of the username is 20 characters
        trim: true, // Trims whitespace from both ends of the string
    },
    email: {
        type: String, // The email field is of type String
        required: true, // This field is required
        unique: true, // The email must be unique across all users
        trim: true, // Trims whitespace from both ends of the string
        lowercase: true, // Converts the email to lowercase
        trim: true, // Trims whitespace from both ends of the string
        match: [ // Regular expression to validate the email format
            /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/,
            'Please fill a valid email address',
        ],
    },
    password: {
        type: String, // The password field is of type String
        required: true, // This field is required
        minlength: 6, // Minimum length of the password is 6 characters
        maxlength: 1024, // Maximum length of the password is 1024 characters
        select: false, // Do not include this field when converting to JSON
    },
    roles: {
        type: [String], // The roles field is an array of Strings
        enum: ['user', 'admin'], // The roles can only be 'user' or 'admin'
        default: ['user'], // Default role is 'user'
    },
}, { timestamps: true }) // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('User', userSchema); // Export the User model based on the schema
// This model can be used to interact with the 'users' collection in the MongoDB database
