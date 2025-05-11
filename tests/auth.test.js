jest.setTimeout(30000); // Setting a timeout for the tests to 30 seconds

const request = require('supertest'); // Importing supertest for testing HTTP requests
const app = require('../app'); // Importing the express application instance from app.js

const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const { MongoMemoryServer } = require('mongodb-memory-server'); // Importing MongoMemoryServer for in-memory MongoDB instance

let mongo; // Variable to store the MongoDB memory server instance
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
                username: 'testuser',
                email: 'testuser@gmail.com',
                password: 'testpassword',
            });
        expect(res.statusCode).toEqual(201); // Expecting a 201 Created response
        expect(res.body).toHaveProperty('token'); // Expecting the response to have a token property
    });
}); // Starting the test suite for authentication routes