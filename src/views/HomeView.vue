<template>
    <div>
      <h1>Welcome to the Home Page</h1>
      <router-link to="/about">Go to About</router-link>
      <router-link to="/lessons">lessons</router-link>
    </div>
    
  </template>
  
  <script>
//import LoginPage from '@/authentication/LoginPage.vue';

  export default {
    name: 'Home',
  };
  </script>