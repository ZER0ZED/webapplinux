# Task Manager - Full Stack Application

A simple task management application demonstrating the complete full-stack experience with REST API, authentication, and CRUD operations.

## Project Structure

```
.
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration files (database)
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
│
└── frontend/               # Frontend web app
    ├── css/               # Stylesheets
    ├── js/                # JavaScript files
    │   ├── api.js         # API communication
    │   ├── auth.js        # Authentication logic
    │   ├── tasks.js       # Task management
    │   └── app.js         # Main application
    └── index.html         # Main HTML file
```

## Features

- 🔐 **User Authentication** - Register and login with JWT tokens
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🎨 **Modern UI** - Clean, responsive design
- 🔒 **Protected Routes** - Authentication middleware
- 📝 **RESTful API** - Standard API design patterns

## Tech Stack

**Backend:**
- Node.js
- Express.js
- JWT for authentication
- bcrypt for password hashing
- In-memory database (for learning)

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Fetch API for HTTP requests
- LocalStorage for token management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. **Install backend dependencies:**
```bash
cd backend
npm install
```

2. **Start the backend server:**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

3. **Open the frontend:**
```bash
cd ../frontend
```

Open `index.html` in your browser, or use a simple HTTP server:
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (install globally: npm install -g http-server)
http-server -p 8080
```

Then visit `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `GET /api/tasks/:id` - Get single task (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## How It Works

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Token is sent with every API request in Authorization header
5. Backend verifies token before processing requests

### Task Operations
1. Frontend makes API call with token
2. Backend middleware verifies token
3. Controller processes the request
4. Database performs the operation
5. Response sent back to frontend
6. UI updates automatically

## Learning Points

This project demonstrates:

- **REST API design** - Standard HTTP methods and status codes
- **Authentication** - JWT tokens and password hashing
- **Middleware** - Request processing pipeline
- **MVC pattern** - Models, Controllers, Routes separation
- **CORS** - Cross-origin requests handling
- **Error handling** - Proper error responses
- **Security** - Password hashing, token verification
- **Frontend-Backend communication** - Fetch API usage

## Next Steps

To enhance this project, you could:

1. **Add a real database** - MongoDB, PostgreSQL, MySQL
2. **Add validation** - Input validation library (e.g., Joi)
3. **Add tests** - Jest for backend, testing library for frontend
4. **Add features** - Task categories, due dates, priorities
5. **Deploy** - Host on Heroku, Vercel, or AWS
6. **Add frontend framework** - Convert to React, Vue, or Angular

## Notes

- The database is in-memory, so data resets when server restarts
- JWT secret should be changed in production
- This is a learning project - not production-ready

## License

MIT