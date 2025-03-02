import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/router.js';

const app = createApp(App);
app.use(createPinia()); // Register Pinia
app.use(router);        // Register Vue Router
app.mount('#app');      // Mount the configured app