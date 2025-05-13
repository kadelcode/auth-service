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
- **JWT** for authentication
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
| Method | Endpoint                    | Description              | Access        |
| ------ | --------------------------- | ------------------------ | ------------- |
| POST   | ```/api/v1/auth/register``` | Register a new user      | Public        |
| POST   | ```/api/v1/auth/login```    | Login & retrieve JWT     | Public        |
| GET    | ```/api/v1/auth/profile```  | Get current user profile | Authenticated |
| GET    | ```/api/v1/auth/admin```    | Admin-only route         | Admin Only    |
| GET    | ```/api/v1/health```        | Health check             | Public        |

---

## Running Tests
```
npm test
```

---

## 🐳 Docker Setup
Build & Run
```
docker build -t auth-service .
docker run -p 5000:5000 --env-file .env auth-service
```

Or with Docker Compose
```
docker-compose up --build
```

---

## 🔒 Security Best Practices
- Passwords are hashed using ```bcryptjs```.
- JWTs include roles & expire after a configurable time.
- Role-based access is enforced via middleware.
- Basic protection against common vulnerabilities (e.g., CORS setup, input validation).

---

## 📄 API Documentation
The project includes a Swagger/OpenAPI spec (```swagger.json```) for easy API exploration. Use tools like Swagger UI or Postman to test the endpoints.


## 🛠 Project Structure
```
auth-service/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── validators/
├── tests/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── README.md
└── server.js
```

---

## 📢 Future Improvements
- 🔑 OAuth integration (Google, Facebook)

- 🔄 Refresh tokens

- 🔐 Two-factor authentication (2FA)

- 🔗 Password reset via email

- 📊 Admin dashboard

---

## 👤 Author
[Kadel](https://kadel.vercel.app/)

---

## 📃 License
This project is licensed under the MIT License.
