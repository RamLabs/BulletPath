// Description: Main entry point for the application.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import './styles/app.css'

const app = createApp(App);
app.use(router);
app.mount('#app');
