<template>
  <div id="app" class="app-container">
    <!-- Header -->
    <header class="app-header">
      <!-- Logo on the left -->
      <div class="logo">
        <img src="@/assets/logo.svg" alt="AI Math Tutor" class="logo-image" />
        <h1 class="logo-text">AI Math Tutor</h1>
      </div>

      <!-- Navigation and Login/Logout -->
      <div class="nav-container">
        <nav class="main-nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/lessons">Lessons</router-link>
          <router-link to="/youtube">YouTube</router-link>
        </nav>

        <!-- Login/Logout Button -->
        <div class="auth-section">
          <div v-if="isAuthenticated" class="user-menu">
            <span class="user-name">{{ user.name }}</span>
            <button @click="logout" class="logout-button">Logout</button>
          </div>
          <router-link v-else to="/login" class="login-link">Login</router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>© {{ new Date().getFullYear() }} AI Math Tutor. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import {computed} from 'vue';
import { useRouter } from 'vue-router';


export default {
  name: 'App',
  setup() {
    /** Old code
    const authStore = useAuthStore();
    const { user, isAuthenticated, logout } = authStore;
    console.log('user:', user);
    console.log('isAuthenticated:', isAuthenticated);
    return { user, isAuthenticated, logout };
    */
    const authStore = useAuthStore();
    const router = useRouter();

    // Ensure reactivity
    const { user, token } = storeToRefs(authStore);
    const isAuthenticated = computed(() => !!token.value); // Check if a token exists

    const logout = () => {
      authStore.clearAuth();
      router.push('/'); // Redirect to home page
    };

    return { user, isAuthenticated, logout };
  },
  
};
</script>

<style scoped>
/* Reset box-sizing */
* {
  box-sizing: border-box;
}

/* General Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1280px; /* Fixed width */
  margin: 0 auto; /* Center the container horizontally */
}

/* Header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c445c;
  border-bottom: 1px solid #0be016;
  flex-wrap: nowrap;
}

/* Logo */
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
  color: white;
}

/* Navigation and Auth Container */
.nav-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Navigation */
.main-nav {
  display: flex;
  gap: 1rem;
}

.main-nav a {
  color: rgb(255, 243, 243);
  text-decoration: none;
  font-size: 1rem;
}

.main-nav a:hover {
  text-decoration: underline;
}

/* Auth Section */
.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  color: white;
  font-size: 1rem;
}

.logout-button,
.login-link {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
}

.logout-button:hover,
.login-link:hover {
  background-color: #0056b3;
}

/* Main Content */
.app-content {
  flex: 1;
  padding: 2rem;
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: #2c445c;
  border-top: 1px solid #0be016;
  color: white;
}
</style>