#!/bin/bash

echo "======================================"
echo "   TASK MANAGER DATABASE VIEWER"
echo "======================================"
echo ""

# Connect to MongoDB and run commands
mongosh taskmanager --quiet --eval '

// Show database stats
print("📊 DATABASE: taskmanager");
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
print("");

// Users
print("👥 USERS:");
print("────────────────────────────────────────");
let userCount = db.users.countDocuments();
print("Total users: " + userCount);
print("");

if (userCount > 0) {
    db.users.find({}, {password: 0, __v: 0}).forEach(function(user) {
        print("  ID:    " + user._id);
        print("  Name:  " + user.name);
        print("  Email: " + user.email);
        print("  Created: " + user.createdAt);
        print("");
    });
}

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
print("");

// Tasks
print("✅ TASKS:");
print("────────────────────────────────────────");
let taskCount = db.tasks.countDocuments();
print("Total tasks: " + taskCount);
print("");

if (taskCount > 0) {
    db.tasks.find().forEach(function(task) {
        print("  ID:       " + task._id);
        print("  Title:    " + task.title);
        print("  Desc:     " + task.description);
        print("  Done:     " + task.completed);
        print("  User ID:  " + task.userId);
        print("  Created:  " + task.createdAt);
        print("");
    });
}

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
'