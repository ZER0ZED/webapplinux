// Task Management Functions

// Load and display all tasks
async function loadTasks() {
  try {
    const response = await API.getTasks();

    if (response.success) {
      displayTasks(response.data);
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Display tasks in the UI
function displayTasks(tasks) {
  const tasksList = document.getElementById('tasksList');

  if (tasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task above to get started!</p>
      </div>
    `;
    return;
  }

  tasksList.innerHTML = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(task => createTaskHTML(task))
    .join('');
}

// Create HTML for a single task
function createTaskHTML(task) {
  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-header">
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
      </div>
      ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
      <div class="task-meta">Created on ${createdDate}</div>
      <div class="task-actions">
        <button class="btn btn-small ${task.completed ? 'btn-outline' : 'btn-success'}" onclick="toggleTaskComplete('${task.id}', ${task.completed})">
          ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button class="btn btn-small btn-danger" onclick="deleteTask('${task.id}')">
          Delete
        </button>
      </div>
    </div>
  `;
}

// Handle adding a new task
async function handleAddTask(e) {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  try {
    const response = await API.createTask(title, description);

    if (response.success) {
      showToast('Task added successfully!', 'success');
      document.getElementById('addTaskForm').reset();
      loadTasks();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Toggle task completion status
async function toggleTaskComplete(taskId, currentStatus) {
  try {
    const response = await API.updateTask(taskId, {
      completed: !currentStatus
    });

    if (response.success) {
      showToast('Task updated!', 'success');
      loadTasks();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Delete a task
async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await API.deleteTask(taskId);

    if (response.success) {
      showToast('Task deleted!', 'success');
      loadTasks();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize task event listeners
function initTaskListeners() {
  document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
}