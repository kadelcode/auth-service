/*
* This middleware function is used to authenticate users based on JWT tokens.
*/

require('dotenv').config(); // Importing dotenv to load environment variables from a .env file
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for JWT token verification

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        // const authHeader = req.headers.authorization; // Getting the authorization header from the request
        const token = req.cookies.token;

        console.log(token);

        // Checking if the authorization header is present and starts with 'Bearer '
        /*if (!authHeader || !authHeader.startsWith('Bearer ')) { 
            return res.status(401).json({ message: 'Unauthorized' }); // Sending a 401 Unauthorized response
        }*/

        // const token = authHeader.split(' ')[1]; // Extracting the token from the authorization header
        if (!token) { // If no token is found
            return res.status(401).json({ message: 'Unauthorized TEST' }); // Sending a 401 Unauthorized response
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token using the secret key
            req.user = decoded; // Attaching the decoded user information to the request object

            console.log('Decoded token:', decoded); // Logging the decoded token for debugging
            console.log('User roles:', decoded.roles); // Logging the user roles for debugging

            if (roles.length) {
                const userRoles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles]; // Ensuring roles are in array format
                const hasRole = roles.some(role => userRoles.includes(role)); // Checking if the user has any of the required roles

                if (!hasRole) {
                    return res.status(403).json({ message: 'Forbidden: Insuffient role' }); // Sending a 403 Forbidden response if the user does not have the required role
                }
            }

            next(); // Proceeding to the next middleware or route handler
        } catch(err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware; // Exporting the authentication middleware function
// This middleware can be used to protect routes and check user roles