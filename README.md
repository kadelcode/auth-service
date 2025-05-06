# Authentication & Authorization Microservice

A robust Node.js microservice handles user registration, login, JWT-based authentication, and role-based access control (RBAC). Buit with Express.js and MongoDB, it's designed for security, scalability, and easy integration with any frontend app.

---

## Features
- ✅ User registration & login

- 🔐 Password hashing with bcrypt

- 🛡 JWT-based authentication

- 🏷 Role-based access control (RBAC)

- 🔄 Token expiration handling

- 🔗 Protected routes with middleware

- 📈 API health check endpoint

- 🚀 Ready for Docker deployment

- 🧪 Unit & integration tests (Jest)

- 📄 API documentation (Swagger/OpenAPI ready)

---

## Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentivation
- **bcryptjs** for password hashing
- **dotenv** for environment configs
- **Joi/express-validator** (optional) for input validation
- **Jest/Supertest** for testing

---

## Getting Started

1. Clone the Repo
```
git clone https://github.com/kadelcode/auth-service.git
cd auth-service
```

2. Install Dependencies
```
npm install
```

3. Set Up Environment Variables
Create a ```.env``` file based on ```.env.example```:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

4. Run the Service
```
npm run dev
```
The service will be running at ```http://localhost:5000```.

---

## API Endpoints
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
