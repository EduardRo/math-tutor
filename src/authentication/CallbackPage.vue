<template>
    <div>
      <p>Logging you in...</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
  
    // Decode the token (it might be URL-encoded)
    const token = decodeURIComponent(urlParams.get('token'));
    const user = JSON.parse(urlParams.get('user'));
  
    if (token && user) {
      authStore.setToken(token);
      authStore.setUser(user);
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  });
  </script>
  