// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your view components
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';

import LoginPage from '@/authentication/LoginPage.vue';
import CallbackView from '@/authentication/CallbackPage.vue';

import GuideInFaith from '@/views/GuideInFaith.vue';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  
  {
    path: '/login', // Dynamic segment for lessonId
    name: 'Login',
    component: LoginPage,
    
  },
  {
    path: '/auth/callback',
    name: 'callback',
    component: CallbackView,
  },
  
  {
    path: '/guideinfaith',
    name: 'GuideInFaith',
    component: GuideInFaith,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode (clean URLs)
  routes, // Short for `routes: routes`
});

export default router;