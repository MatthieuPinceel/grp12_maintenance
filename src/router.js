import { createRouter, createWebHistory } from 'vue-router'

// Pages Vue - Application de Maintenance
import HomeView from './components/pages/home/home.vue'
import LoginView from './components/pages/login/login.vue'
import GalleryView from './components/pages/gallery/gallery.vue'
import UploadView from './components/components/upload/imageUpload.vue'

// Définition des routes de l'application
const routes = [
  { 
    path: '/', 
    component: HomeView,
  },
  { 
    path: '/login', 
    component: LoginView,
  },
  { 
    path: '/gallery', 
    component: GalleryView,
  },
  {
    path: '/upload',
    component: UploadView,
  }
]

// Création du routeur avec historique du navigateur
const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
