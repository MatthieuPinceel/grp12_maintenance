import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const isLoggedIn = computed(() => isAuthenticated.value);
  const currentUser = computed(() => user.value);
  const authToken = computed(() => token.value);

  // Actions
  const login = async (username, password) => {
    loading.value = true;
    error.value = null;

    try {
      // Appel au endpoint de login du backend
      const response = await axios.post('http://localhost:3000/api/users/login', {
        userName: username,
        userPWD: password
      });

      // Vérifie que la connexion a réussi
      if (response.data.success) {
        // Stocke les données utilisateur et le token
        user.value = response.data.user;
        token.value = response.data.token;
        isAuthenticated.value = true;

        // Ajoute le token au header Authorization pour les futures requêtes
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Stocke en localStorage
        localStorage.setItem('authUser', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);

        return true;
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur de connexion';
      isAuthenticated.value = false;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    error.value = null;
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  const checkAuth = () => {
    // Vérifie si l'utilisateur est déjà connecté (depuis localStorage)
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
      isAuthenticated.value = true;
      
      // Ajoute le token au header Authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Computed
    isLoggedIn,
    currentUser,
    authToken,
    
    // Actions
    login,
    logout,
    checkAuth
  };
});
