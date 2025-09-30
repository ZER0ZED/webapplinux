const Task = require('../models/Task');
const db = require('../config/database');

// Get all tasks for the logged-in user
exports.getAllTasks = (req, res) => {
  try {
    const tasks = db.findTasksByUserId(req.user.id);

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get a single task by ID
exports.getTaskById = (req, res) => {
  try {
    const task = db.findTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if task belongs to user
    if (task.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create a new task
exports.createTask = (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // Create task
    const task = new Task(title, description || '', req.user.id);
    db.createTask(task);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update a task
exports.updateTask = (req, res) => {
  try {
    const task = db.findTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if task belongs to user
    if (task.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // Update task
    const updates = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const updatedTask = db.updateTask(req.params.id, updates);

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete a task
exports.deleteTask = (req, res) => {
  try {
    const task = db.findTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if task belongs to user
    if (task.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    db.deleteTask(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};