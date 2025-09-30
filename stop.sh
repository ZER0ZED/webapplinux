#!/bin/bash

# Task Manager - Stop Script
echo "🛑 Stopping Task Manager Application..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Kill backend
if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        kill $BACKEND_PID 2>/dev/null
        # Also kill nodemon child processes
        pkill -P $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Backend stopped${NC}"
    fi
    rm backend.pid
fi

# Kill frontend
if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Frontend stopped${NC}"
    fi
    rm frontend.pid
fi

# Kill any remaining node/python processes on ports 3000/8080
pkill -f "nodemon src/server.js" 2>/dev/null
pkill -f "node src/server.js" 2>/dev/null
pkill -f "python3 -m http.server 8080" 2>/dev/null

echo -e "${GREEN}✅ Application stopped${NC}"