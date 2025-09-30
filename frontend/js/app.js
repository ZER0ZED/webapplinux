// Main Application File

// Toast notification function
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Initialize the application
function initApp() {
  // Initialize event listeners
  initAuthListeners();
  initTaskListeners();

  // Update UI based on authentication status
  updateUIForAuth();

  // Load tasks if user is authenticated
  if (isAuthenticated()) {
    loadTasks();
  }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);