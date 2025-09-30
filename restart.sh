#!/bin/bash

# Task Manager - Restart Script
echo "🔄 Restarting Task Manager Application..."

./stop.sh
sleep 1
./start.sh