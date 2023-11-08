import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import Router from './config/router/router.js';

const app = createApp(App);
const pinia = createPinia();
app.use(Router);
app.use(pinia);
app.mount('#app');
