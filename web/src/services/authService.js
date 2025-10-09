const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'; 

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return await response.json();
  },

  async signup(userData) {
    const response = await fetch(`${API_URL}/account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Signup failed');
    }

    return await response.json();
  },

  // FIXED: Enhanced OAuth handler
  handleOAuthSuccess(token, userData) {
    if (token && userData) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/login';
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Basic token validation (you might want to add JWT expiration check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
};

export default authService;