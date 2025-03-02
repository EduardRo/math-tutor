// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your view components
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import LessonView from '../views/LessonView.vue';

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
    path: '/lessons', // Dynamic segment for lessonId
    name: 'LessonView',
    component: LessonView,
    
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode (clean URLs)
  routes, // Short for `routes: routes`
});

export default router;