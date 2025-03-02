<template>
  <div id="app" class="app-container">
    <header class="app-header" v-if="isAuthenticated">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="AI Math Tutor" class="logo-image" />
        <h1 class="logo-text">AI Math Tutor</h1>
      </div>

      <nav class="main-nav">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/lessons">Lessons</router-link>
        <router-link to="/progress">My Progress</router-link>
        <router-link to="/subscription">Subscription</router-link>
      </nav>

      <div class="user-menu">
        <span class="user-name">{{ user.name }}</span>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </header>

    <main class="app-content">
      <router-view />
    </main>

    <footer class="app-footer" v-if="isAuthenticated">
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
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #2d3748;
  background-color: #f7fafc;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3182ce;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.main-nav a:hover, .main-nav a.router-link-active {
  color: #3182ce;
  border-bottom-color: #3182ce;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c53030;
}

.app-content {
  flex: 1;
}

.app-footer {
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}
</style>
