# Backend API

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Or start production server
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## API Testing

You can test the API using curl or tools like Postman:

### Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create a task (requires token)
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Task","description":"Task description"}'
```

### Get all tasks (requires token)
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```