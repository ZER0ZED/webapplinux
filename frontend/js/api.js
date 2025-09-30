// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API Helper Functions
const API = {
  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },

  // Set token to localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  },

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  },

  // Get user info from localStorage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Set user info to localStorage
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Remove user info from localStorage
  removeUser() {
    localStorage.removeItem('user');
  },

  // Generic fetch wrapper
  async request(endpoint, options = {}) {
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Auth API calls
  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async getCurrentUser() {
    return this.request('/auth/me');
  },

  // Task API calls
  async getTasks() {
    return this.request('/tasks');
  },

  async getTask(id) {
    return this.request(`/tasks/${id}`);
  },

  async createTask(title, description) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description })
    });
  },

  async updateTask(id, updates) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  async deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }
};