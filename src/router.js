import { createRouter, createWebHistory } from 'vue-router'

// Pages Vue - Application de Maintenance
import HomeView from './components/pages/home/home.vue'
import LoginView from './components/pages/login/login.vue'
import SignupView from './components/pages/signup/signup.vue'
import GalleryView from './components/pages/gallery/gallery.vue'
import imageUploader from './components/pages/imageUploader/imageUploader.vue'

// Define application routes
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
    path: '/signup', 
    component: SignupView,
  },
  { 
    path: '/gallery', 
    component: GalleryView,
  },
  {
    path: '/upload',
    component: imageUploader,
  }
]

// Create and configure the Vue Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
