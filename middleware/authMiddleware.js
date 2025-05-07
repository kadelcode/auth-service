const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization; // Getting the authorization header from the request

        // Checking if the authorization header is present and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) { 
            return res.status(401).json({ message: 'Unauthorized' }); // Sending a 401 Unauthorized response
        }

        const token = authHeader.split(' ')[1]; // Extracting the token from the authorization header
        if (!token) { // If no token is found
            return res.status(401).json({ message: 'Unauthorized' }); // Sending a 401 Unauthorized response
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token using the secret key
            req.user = decoded; // Attaching the decoded user information to the request object

            if (roles.length && !roles.includes(req.user.role)) { // Checking if the user has the required role
                return res.status(403).json({ message: 'Forbidden' }); // Sending a 403 Forbidden response
            }

            next(); // Proceeding to the next middleware or route handler
        } catch(err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};