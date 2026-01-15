import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'

// Crée l'application Vue avec Pinia et le routeur
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
