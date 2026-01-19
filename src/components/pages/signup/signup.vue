<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Form data
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const successMessage = ref(false);
const errorMessage = ref('');

// Router
const router = useRouter();

// Handle signup
const handleSignup = async () => {
  // Validation
  if (!username.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    // Create new user
    const response = await axios.post('http://localhost:3000/api/users/create', {
      userName: username.value,
      userPWD: password.value
    });

    if (response.data) {
      // Show success message
      successMessage.value = true;
      errorMessage.value = '';

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Account creation failed';
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <div class="signup-container">
    <!-- Message de succès -->
    <div v-if="successMessage" class="success-message">
      <p>✓ Account created successfully!</p>
      <p>Redirecting to login...</p>
    </div>

    <!-- Card de signup -->
    <div v-else class="signup-card">
      <div class="card-header">
        <h1 class="card-title">Create your account</h1>
        <p class="card-subtitle">Join our maintenance system</p>
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSignup" class="signup-form">
        <!-- Username Input -->
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            placeholder="Choose a username"
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
              placeholder="Enter a strong password"
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

        <!-- Confirm Password Input -->
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <div class="password-input-wrapper">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              class="toggle-password-btn"
              @click="toggleConfirmPasswordVisibility"
              :title="showConfirmPassword ? 'Hide password' : 'Show password'"
            >
              <span v-if="showConfirmPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>

        <!-- Signup Button -->
        <button type="submit" class="signup-btn">Create Account</button>
      </form>

      <!-- Footer -->
      <div class="card-footer">
        <p class="footer-text">
          Already have an account? <router-link to="/login" class="footer-link">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
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

.signup-card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
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

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.signup-form {
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
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  padding: 0;
}

.toggle-password-btn:hover {
  opacity: 0.7;
}

.signup-btn {
  padding: 10px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
}

.signup-btn:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.signup-btn:active {
  transform: translateY(0);
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
  cursor: pointer;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
