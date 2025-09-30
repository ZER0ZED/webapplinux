// Simple in-memory database (for learning purposes)
// In production, you'd use MongoDB, PostgreSQL, etc.

class Database {
  constructor() {
    this.users = [];
    this.tasks = [];
  }

  // User operations
  createUser(user) {
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // Task operations
  createTask(task) {
    this.tasks.push(task);
    return task;
  }

  findTasksByUserId(userId) {
    return this.tasks.filter(task => task.userId === userId);
  }

  findTaskById(id) {
    return this.tasks.find(task => task.id === id);
  }

  updateTask(id, updates) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
    return this.tasks[taskIndex];
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}

// Export a single instance (singleton pattern)
module.exports = new Database();