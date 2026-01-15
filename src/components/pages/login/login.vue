<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/authStore';

// Form data
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const successMessage = ref(false);

// Store et routeur
const authStore = useAuthStore();
const router = useRouter();

// Handle login
const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  const success = await authStore.login(username.value, password.value);
  
  if (success) {
    // Affiche le message de succès
    successMessage.value = true;
    
    // Redirige après 2 secondes
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } else {
    alert('Erreur: ' + authStore.error);
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="login-container">
    <!-- Message de succès -->
    <div v-if="successMessage" class="success-message">
      <p>✓ Connecté avec succès!</p>
      <p>Redirection en cours...</p>
    </div>

    <!-- Card de login -->
    <div v-else class="login-card">
      <div class="card-header">
        <h1 class="card-title">Maintenance System</h1>
        <p class="card-subtitle">Login to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Username Input -->
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              class="toggle-password-btn"
              @click="togglePasswordVisibility"
              :title="showPassword ? 'Hide password' : 'Show password'"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>

        <!-- Login Button -->
        <button type="submit" class="login-btn">Sign In</button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p class="footer-text">
          Don't have an account? <a href="#" class="footer-link">Create one</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.success-message {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: slideUp 0.5s ease-out;
}

.success-message p {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}

.success-message p:first-child {
  font-size: 24px;
  color: #4caf50;
  font-weight: bold;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.form-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-input {
  width: 100%;
  padding-right: 40px;
}

.toggle-password-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.login-btn {
  padding: 10px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.login-btn:hover {
  background-color: #5568d3;
}

.card-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.footer-text {
  font-size: 14px;
  color: #666;
}

.footer-link {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
