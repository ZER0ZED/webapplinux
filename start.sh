#!/bin/bash

# Task Manager - Start Script
echo "🚀 Starting Task Manager Application..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running!"
    echo "Start it with: sudo systemctl start mongod"
    exit 1
fi

echo -e "${GREEN}✅ MongoDB is running${NC}"

# Start backend in background
echo -e "${BLUE}Starting backend on port 3000...${NC}"
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../backend.pid
cd ..

# Wait a bit for backend to start
sleep 2

# Start frontend in background
echo -e "${BLUE}Starting frontend on port 8080...${NC}"
cd frontend
python3 -m http.server 8080 > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../frontend.pid
cd ..

echo ""
echo -e "${GREEN}✅ Application started successfully!${NC}"
echo ""
echo "🌐 Frontend: http://localhost:8080"
echo "🔧 Backend:  http://localhost:3000"
echo "📊 MongoDB:  mongodb://localhost:27017/taskmanager"
echo ""
echo "📋 Logs:"
echo "   Backend:  tail -f logs/backend.log"
echo "   Frontend: tail -f logs/frontend.log"
echo ""
echo "⚠️  To stop the app, run: ./stop.sh"