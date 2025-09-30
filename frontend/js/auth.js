// Authentication Functions

// Check if user is logged in
function isAuthenticated() {
  return !!API.getToken();
}

// Show/Hide sections based on authentication
function updateUIForAuth() {
  const authSection = document.getElementById('authSection');
  const tasksSection = document.getElementById('tasksSection');
  const navLinks = document.getElementById('navLinks');
  const userEmail = document.getElementById('userEmail');

  if (isAuthenticated()) {
    authSection.style.display = 'none';
    tasksSection.style.display = 'block';
    navLinks.style.display = 'flex';

    const user = API.getUser();
    if (user) {
      userEmail.textContent = user.email;
    }
  } else {
    authSection.style.display = 'block';
    tasksSection.style.display = 'none';
    navLinks.style.display = 'none';
  }
}

// Handle Registration
async function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await API.register(name, email, password);

    if (response.success) {
      // Store token and user info
      API.setToken(response.data.token);
      API.setUser(response.data.user);

      showToast('Registration successful!', 'success');
      updateUIForAuth();
      loadTasks();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Handle Login
async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await API.login(email, password);

    if (response.success) {
      // Store token and user info
      API.setToken(response.data.token);
      API.setUser(response.data.user);

      showToast('Login successful!', 'success');
      updateUIForAuth();
      loadTasks();
    }
  } catch (error) {
    showToast(error.message, 'error');
  }
}

// Handle Logout
function handleLogout() {
  API.removeToken();
  API.removeUser();
  showToast('Logged out successfully', 'success');
  updateUIForAuth();
}

// Toggle between login and register forms
function showRegisterForm() {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');
}

function showLoginForm() {
  document.getElementById('registerForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
}

// Initialize auth event listeners
function initAuthListeners() {
  document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
  document.getElementById('registerFormElement').addEventListener('submit', handleRegister);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
  });
  document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
  });
}