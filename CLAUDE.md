# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start development server (with nodemon auto-reload)
npm start               # Start production server
```

### Frontend
```bash
cd frontend
python3 -m http.server 8080    # Serve frontend on port 8080
# Then visit http://localhost:8080
```

### Testing API Endpoints
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# Create task (replace TOKEN)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Task","description":"Description"}'
```

## Architecture Overview

### Request Flow
1. **Frontend** (`frontend/js/api.js`) makes HTTP request with JWT token in Authorization header
2. **Server** (`backend/src/server.js`) receives request, applies CORS and body parsing middleware
3. **Routes** (`backend/src/routes/`) determine which controller handles the endpoint
4. **Middleware** (`backend/src/middleware/auth.js`) verifies JWT token for protected routes
5. **Controllers** (`backend/src/controllers/`) contain business logic and call database methods
6. **Database** (`backend/src/config/database.js`) singleton instance stores/retrieves data from in-memory arrays
7. **Models** (`backend/src/models/`) define data structure and helper methods

### Authentication Pattern
- JWT tokens generated on login/register using `jsonwebtoken` library with secret from `.env`
- Frontend stores token in `localStorage` and includes it in `Authorization: Bearer <token>` header
- Auth middleware (`authMiddleware`) extracts token, verifies it, and attaches decoded user info to `req.user`
- Controllers access `req.user.id` to filter data by user ownership

### Database Pattern
- **Singleton**: `backend/src/config/database.js` exports single instance used across all controllers
- **In-memory**: Data stored in arrays (`this.users`, `this.tasks`) - resets on server restart
- **No ORM**: Direct array manipulation using `find()`, `filter()`, `push()`, `splice()`
- To add new entities: create model in `models/`, add array to Database class, create CRUD methods

### API Response Format
All responses follow consistent structure:
```javascript
{
  success: true/false,
  message: "...",
  data: { ... }  // optional
}
```

### Frontend Module Organization
- `api.js` - All HTTP requests and localStorage token/user management (API object)
- `auth.js` - Login/register forms, authentication UI logic
- `tasks.js` - Task CRUD UI logic and rendering
- `app.js` - Application initialization and toast notifications

Scripts loaded in order: `api.js` → `auth.js` → `tasks.js` → `app.js`

## Environment Configuration

Backend requires `.env` file:
```
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

Frontend hardcoded to `http://localhost:3000/api` in `frontend/js/api.js:2`

## API Endpoints

**Public:**
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate and get token

**Protected (require JWT token):**
- `GET /api/auth/me` - Get current user info
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task (title, description, completed)
- `DELETE /api/tasks/:id` - Delete task

All task routes verify task ownership before allowing operations.

## Key Limitations

- **In-memory database**: All data lost on server restart
- **No persistence**: No database connection or file storage
- **No validation library**: Manual validation in controllers
- **No tests**: No test suite configured
- **CORS open**: All origins allowed (development only)
- This is a learning/demonstration project, not production-ready