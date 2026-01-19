<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from './../../../stores/authStore.js';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Check if user is authenticated
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="logo"> Owl Viewer </router-link>
      <nav class="nav">
        
        <router-link to="/gallery" class="nav-btn"> Gallery </router-link>
        <router-link v-if="isAuthenticated" to="/upload" class="nav-btn"> Upload </router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-btn login-btn"> Login </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;

  background: rgb(92, 83, 83);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 1000;
  min-height: 75px;
}

.header-content {
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 40px;
  padding: 0 20px;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-btn {
  position: relative;
  padding: 10px 25px;
  min-width: 150px;

  border: none;
  border-radius: 8px;
  
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;

  background-color: #9a9a9a;
  color: white;

  cursor: pointer;
  transition: all 0.25s ease;
  
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  min-width: 150px;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.4);
  min-width: 200px;
}

.nav-btn:active {
  box-shadow: none;
}

.signup-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: 700;
  letter-spacing: 1px;
}

.signup-btn:hover {
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
</style>
