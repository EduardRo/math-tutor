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

  const token = urlParams.get('token');
  const user = urlParams.get('user');

  console.log('Received token:', token);
  console.log('Received user:', user);

  if (token && user) {
    try {
      authStore.setToken(decodeURIComponent(token));
      authStore.setUser(JSON.parse(user));
      
      console.log('isAuthenticated after login:', authStore.isAuthenticated);
      
      router.push({ name: 'Home' });
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push({ name: 'Login' });
    }
  } else {
    console.warn('Token or user missing in callback URL');
    router.push({ name: 'Login' });
  }
});
</script>
