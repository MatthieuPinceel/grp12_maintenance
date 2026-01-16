import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

/**
 * Authentication Store (Pinia)
 * 
 * Manages user authentication state, JWT token handling, and session persistence.
 * Provides centralized authentication state management across the application.
 * 
 * Features:
 * - User login/logout functionality
 * - JWT token storage and transmission
 * - Session restoration from localStorage
 * - Automatic axios header configuration
 * 
 * @module authStore
 */
export const useAuthStore = defineStore('auth', () => {
  // ============================================
  // STATE: Core authentication data
  // ============================================
  
  const user = ref(null); // Current authenticated user
  const token = ref(null); // JWT token for authenticated requests
  const isAuthenticated = ref(false); // Authentication status flag
  const loading = ref(false); // Loading state for async operations
  const error = ref(null); // Error message from failed operations

  // ============================================
  // COMPUTED PROPERTIES: Derived state
  // ============================================

  const isLoggedIn = computed(() => isAuthenticated.value); // Whether user is currently logged in
  const currentUser = computed(() => user.value); // Current user object or null
  const authToken = computed(() => token.value); // Current JWT token or null

  // ============================================
  // ACTIONS: Authentication operations
  // ============================================

  /**
   * Authenticate user with username and password
   * 
   * Makes POST request to backend login endpoint, retrieves JWT token,
   * stores credentials in localStorage, and configures axios for authenticated requests.
   * 
   * @async
   * @param {string} username - User's login username
   * @param {string} password - User's login password
   * @returns {Promise<boolean>} True if authentication successful, false otherwise
   */
  const login = async (username, password) => {
    loading.value = true;
    error.value = null;

    try {
      // Call backend login endpoint with credentials
      const response = await axios.post('http://localhost:3000/api/users/login', {
        userName: username,
        userPWD: password
      });

      // Validate successful authentication response
      if (response.data.success) {
        // Store authenticated user data and token
        user.value = response.data.user;
        token.value = response.data.token;
        isAuthenticated.value = true;

        // Configure axios to include JWT token in all subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Persist authentication state to localStorage for session restoration
        localStorage.setItem('authUser', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authPassword', password);

        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Authentication failed';
      isAuthenticated.value = false;
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Clear authentication state and logout user
   * 
   * Removes user data, token, and authentication headers.
   * Clears localStorage entries and resets axios default headers.
   */
  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    error.value = null;
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authPassword');
    delete axios.defaults.headers.common['Authorization'];
  };

  /**
   * Restore authentication from persisted localStorage data
   * 
   * Called on application initialization to restore user session
   * from previous browser session if valid token exists.
   * Restores axios authorization header automatically.
   */
  const checkAuth = () => {
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
      isAuthenticated.value = true;
      
      // Restore axios Authorization header for authenticated requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  };

  // ============================================
  // EXPORTS: Public API
  // ============================================

  return {
    // State exports
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Computed properties exports
    isLoggedIn,
    currentUser,
    authToken,
    
    // Action exports
    login,
    logout,
    checkAuth
  };
});
