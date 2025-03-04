import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: !!localStorage.getItem('token'),  // Ensure reactivity
  }),
  actions: {
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token; // Make sure Vue detects the change
      localStorage.setItem('token', token);
      console.log('Token set:', token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User set:', this.user);
    },
    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    initialize() {
      console.log('Initializing auth state...');
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

      if (token && user) {
        this.token = token;
        this.user = user;
        this.isAuthenticated = !!token;
        console.log('Auth restored:', this.token, this.user);
      }
    },
  },
});
