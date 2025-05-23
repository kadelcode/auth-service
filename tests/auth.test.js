jest.setTimeout(30000); // Setting a timeout for the tests to 30 seconds

const request = require('supertest'); // Importing supertest for testing HTTP requests
const app = require('../app'); // Importing the express application instance from app.js

const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const { MongoMemoryServer } = require('mongodb-memory-server'); // Importing MongoMemoryServer for in-memory MongoDB instance

let mongo; // Variable to store the MongoDB memory server instance
let cookie;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create(); // Creating a new in-memory MongoDB server instance
    const uri = mongo.getUri(); // Getting the URI for the in-memory MongoDB server
    await mongoose.connect(uri); // Connecting to the in-memory MongoDB server
});

afterAll(async () => {
    await mongoose.connection.close(); // Closing the MongoDB connection
    await mongo.stop(); // Stopping the in-memory MongoDB server
});

describe('Authentication Routes', () => {
    let token; // Variable to store the JWT token

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                email: 'testuser@gmail.com',
                password: 'testpassword',
            });
        expect(res.statusCode).toEqual(201); // Expecting a 201 Created response
        //expect(res.body).toHaveProperty('token'); // Expecting the response to have a token property

    });

    // Test case for logging in an existing user
    it('should login an existing user and set a cookie', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'testuser@gmail.com',
                password: 'testpassword',
            });
        expect(res.statusCode).toEqual(200); // Expecting a 200 OK response
        expect(res.headers['set-cookie']).toBeDefined();

        // Save the cookie to use in future requests
        cookie = res.headers['set-cookie'][0];
        //expect(res.body).toHaveProperty('token'); // Expecting the response to have a token property
        //token = res.body.token; // Storing the token for later use
    }); // Test case for logging in an existing user

    it('should access the profile route with a valid cookie', async () => {
        const res = await request(app)
            .get('/api/v1/auth/profile')
            .set('Cookie', cookie); // Use the cookie in the request
            //.set('Authorization', `Bearer ${token}`); // Setting the Authorization header with the token

        expect(res.statusCode).toEqual(200); // Expecting a 200 OK response
        expect(res.body).toHaveProperty('name', 'Test User'); // Expecting the response to have a username property
        expect(res.body).toHaveProperty('email', 'testuser@gmail.com'); // Expecting the response to have an email property
    }); // Test case for accessing the profile route with a valid token

    it('should not access the profile route without a token', async () => {
        const res = await request(app)
            .get('/api/v1/auth/profile'); // No token provided

        expect(res.statusCode).toEqual(401); // Expecting a 401 Unauthorized response
        expect(res.body).toHaveProperty('message', 'Unauthorized'); // Expecting the response to have an Unauthorized message
    }); // Test case for accessing the profile route without a token

    
}); // Starting the test suite for authentication routes