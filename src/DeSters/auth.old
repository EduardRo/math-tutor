import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    isAuthenticated: false
  }),
  actions: {
    login(user,token){
      this.user = user;
      this.accessToken = token;
      this.isAuthenticated = true;
      localStorage.setItem('acessToken', token);
    },
    async logout() {
      // your logout logic here
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem('acessToken');
      this.isAuthenticated = false;
    },
    async fetchUser() {
      // Fetch user logic, e.g., API call to get user data
      this.user = { name: 'John Doe' }; // Example user data
      this.isAuthenticated = true;
    }
  }
});