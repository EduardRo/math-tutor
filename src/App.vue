<template>
  <div id="app" class="app-container">
    <header class="app-header" v-if="isAuthenticated">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="AI Math Tutor" class="logo-image" />
        <h1 class="logo-text">AI Math Tutor</h1>
      </div>
      
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        
        <router-link to="/about">About</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/lessons">Lessons</router-link>
        
        
        
        
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
    //const selectedLessonId = '1'; // Example: Replace with dynamic logic

    return { user, isAuthenticated, logout };
  }
}
</script>