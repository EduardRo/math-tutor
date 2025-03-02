// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    async logout() {
      // your logout logic here
      this.user = null;
      this.isAuthenticated = false;
    },
    async fetchUser() {
      // Fetch user logic, e.g., API call to get user data
      this.user = { name: 'John Doe' }; // Example user data
      this.isAuthenticated = true;
    }
  }
});
