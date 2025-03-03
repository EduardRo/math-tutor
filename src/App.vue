<template>
  <div id="app" class="app-container">
    <!-- Header: Always visible -->
    <header class="app-header">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="AI Math Tutor" class="logo-image" />
        <h1 class="logo-text">AI Math Tutor</h1>
      </div>
      
      <!-- Navigation: Always visible -->
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/lessons">Lessons</router-link>
      </nav>
      
      <!-- User Menu: Conditionally visible based on authentication -->
      <div class="user-menu" v-if="isAuthenticated">
        <span class="user-name">{{ user.name }}</span>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      
      <!-- Login Button: Conditionally visible if not authenticated -->
      <div class="login-button" v-else>
        <router-link to="/login" class="login-link">Login</router-link>
      </div>
    </header>
    
    <!-- Main Content: Always visible -->
    <main class="app-content">
      <router-view />
    </main>
    
    <!-- Footer: Always visible -->
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} AI Math Tutor. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const { user, isAuthenticated, logout } = authStore;
    return { user, isAuthenticated, logout };
  }
}
</script>

<style scoped>
/* Add your styles here */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c445c;
  border-bottom: 1px solid #0be016;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  margin: 0;
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.user-menu, .login-button {
  display: flex;
  align-items: center;
}

.logout-button, .login-link {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.logout-button:hover, .login-link:hover {
  background-color: #0056b3;
}

.app-content {
  flex: 1;
  padding: 1rem;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: #2c445c;
  border-top: 1px solid #0be016;
}
</style>